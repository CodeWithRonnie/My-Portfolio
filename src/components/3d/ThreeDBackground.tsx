import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Vector3 } from 'three';

const ParticleMaterial = ({ color }) => {
  const ref = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  }), [color]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.uTime.value = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <shaderMaterial
      ref={ref}
      uniforms={uniforms}
      vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec2 uResolution;
        varying vec2 vUv;

        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv;
          
          // Create a gradient effect
          float gradientY = 1.0 - abs(uv.y - 0.5) * 2.0;
          float gradientX = 1.0 - abs(uv.x - 0.5) * 2.0;
          float gradient = gradientX * gradientY;
          
          // Add some noise
          float n = noise(uv * 10.0 + uTime);
          
          // Apply time-based distortion
          float distortion = sin(uTime + uv.x * 10.0) * 0.1 + cos(uTime + uv.y * 8.0) * 0.1;
          
          // Create final color
          vec3 color = uColor * (gradient + n * 0.1 + distortion);
          
          // Add glow effect
          float glow = pow(gradient, 3.0) * 0.5;
          color += uColor * glow;
          
          gl_FragColor = vec4(color, 0.7 * gradient);
        }
      `}
      transparent={true}
      blending={THREE.AdditiveBlending}
    />
  );
};

interface ParticleProps {
  position: [number, number, number];
  size?: number;
  color?: string;
  speed?: number;
}

const Particle = ({ position, size = 0.1, color = "#8a56e0", speed = 1 }: ParticleProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(new Vector3(...position));
  const randomOffset = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      
      // Gentle floating movement
      ref.current.position.y = initialPosition.current.y + Math.sin(time * speed + randomOffset.current) * 0.3;
      ref.current.position.x = initialPosition.current.x + Math.cos(time * speed * 0.5 + randomOffset.current) * 0.2;
      
      // Subtle rotation
      ref.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      ref.current.rotation.z = Math.cos(time * 0.3) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[size, size]} />
      <ParticleMaterial color={color} />
    </mesh>
  );
};

export const ThreeDBackground = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 3
      ] as [number, number, number],
      size: Math.random() * 0.3 + 0.1,
      color: i % 3 === 0 ? "#e83a7c" : i % 3 === 1 ? "#8a56e0" : "#6a3ce8",
      speed: Math.random() * 0.5 + 0.1
    }));
  }, []);

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      // Subtle group movement based on mouse
      groupRef.current.rotation.x = mouse.y * 0.1;
      groupRef.current.rotation.y = mouse.x * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle) => (
        <Particle 
          key={particle.id}
          position={particle.position}
          size={particle.size}
          color={particle.color}
          speed={particle.speed}
        />
      ))}
      <Plane args={[40, 40]} position={[0, 0, -5]} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="#0e0e2c" transparent opacity={0.8} side={THREE.DoubleSide} />
      </Plane>
    </group>
  );
};
