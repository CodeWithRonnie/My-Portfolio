import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useGLTF, Float, MeshWobbleMaterial, MeshDistortMaterial, RoundedBox } from '@react-three/drei';
import { Group, Mesh } from 'three';
import * as THREE from 'three';

const CodeBlock = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const ref = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2 + rotation[1];
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <RoundedBox args={[4, 3, 0.2]} radius={0.1} smoothness={4}>
        <MeshDistortMaterial
          color="#1a1528"
          distort={0.1}
          speed={1}
          metalness={0.2}
          roughness={0.8}
        />
      </RoundedBox>

      <group position={[0, 0.8, 0.15]} scale={0.15}>
        <Text
          color="#e83a7c"
          anchorX="left"
          anchorY="middle"
          position={[-1.6, 0.6, 0]}
          fontSize={0.5}
          font="/fonts/JetBrainsMono-Bold.woff"
        >
        const Portfolio = () =&gt; {'{'}
      </Text>

      <Text
        color="#8a56e0"
        anchorX="left"
        anchorY="middle"
        position={[-1.4, -0.5, 0]}
        fontSize={0.5}
        font="/fonts/JetBrainsMono-Regular.woff"
      >
        return (
      </Text>
        
        <Text
          color="#27c93f"
          anchorX="left"
          anchorY="middle"
          position={[-1.2, -0.4, 0]}
          fontSize={0.5}
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          {'<'}Developer name="Mamikie Maemu" {'/>'} 
        </Text>
        
        <Text
          color="#8a56e0"
          anchorX="left"
          anchorY="middle"
          position={[-1.4, -0.9, 0]}
          fontSize={0.5}
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          );
        </Text>
        
        <Text
          color="#e83a7c"
          anchorX="left"
          anchorY="middle"
          position={[-1.6, -1.4, 0]}
          fontSize={0.5}
          font="/fonts/JetBrainsMono-Bold.woff"
        >
          {'}'};
        </Text>
      </group>
    </group>
  );
};

const FloatingBadge = ({ position, text, color = "#8a56e0" }) => {
  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      position={position}
    >
      <RoundedBox args={[2, 0.5, 0.1]} radius={0.2} smoothness={4}>
        <MeshWobbleMaterial
          color={color}
          factor={0.1}
          speed={2}
          metalness={0.3}
          roughness={0.7}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.1]}
        color="white"
        fontSize={0.15}
        font="/fonts/Poppins-SemiBold.woff"
        maxWidth={1.8}
        textAlign="center"
      >
        {text}
      </Text>
    </Float>
  );
};

export const HeroModel = ({ mousePosition }) => {
  const group = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (group.current) {
      // Subtle follow mouse movement
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        (mousePosition.x * Math.PI) / 10,
        0.1
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        (mousePosition.y * Math.PI) / 10,
        0.1
      );
    }
  });

  return (
    <group ref={group}>
      <CodeBlock position={[0, 0, 0]} />
      
      <FloatingBadge
        position={[-2.5, 1.5, 0.5]}
        text="React"
        color="#61DAFB"
      />
      
      <FloatingBadge
        position={[2.2, 1.2, 0.3]}
        text="TypeScript"
        color="#3178C6"
      />
      
      <FloatingBadge
        position={[-2, -1.5, 0.7]}
        text="UI/UX"
        color="#e83a7c"
      />
      
      <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.1} position={[2, -1.3, 0.4]}>
        <MeshWobbleMaterial
          color="#8a56e0"
          factor={0.4}
          speed={2}
        />
      </RoundedBox>

      <mesh position={[-1.8, 1, -0.5]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#e83a7c" metalness={0.5} roughness={0.2} />
      </mesh>

      <mesh position={[1.8, -1, -0.3]}>
        <torusGeometry args={[0.2, 0.1, 16, 32]} />
        <meshStandardMaterial color="#27c93f" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
};
