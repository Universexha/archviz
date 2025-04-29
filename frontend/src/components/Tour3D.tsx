import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

const Tour3D = () => {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <Suspense fallback={null}>
          {/* Renderizar la imagen en una esfera invertida */}
          <mesh>
            <sphereGeometry args={[5, 60, 40]} />
            <meshBasicMaterial 
              map={new THREE.TextureLoader().load("/3d.jpg")} 
              side={THREE.BackSide}
            />
          </mesh>
          {/* Controles para mover la vista */}
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Tour3D;
 