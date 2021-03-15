import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Canvas, useThree, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./styles.css";
import "./in.css";
import "./index.html";
extend({ OrbitControls });
// Geometry
function GroundPlane() {
  return (
    <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}

function BackDrop() {
  return (
    <mesh receiveShadow position={[0, -1, -5]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}
function Sphere() {
  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

// Lights
function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}
function FillLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      intensity={brightness}
      color={color}
      position={[4, 0, 4]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}

function RimLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={1.5}
      height={1.5}
      intensity={brightness}
      color={color}
      position={[1, 4, -2]}
      rotation={[0, 0, 0]}
      castShadow
    />
  );
}
const Scene = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree();
  return (
    <>
      <Sphere />
      <orbitControls args={[camera, domElement]} />
    </>
  );
};
function App() {
  const [light, setLight] = useState(true);
  return (
    <>
      <Canvas className="canvas">
        <Scene />
        <GroundPlane />

        <BackDrop />
        {light && <KeyLight brightness={6} color={"#ffc9f9"} />}
        <FillLight brightness={10} color={"#008000"} />
        <RimLight brightness={30} color={"#ADD8E6"} />
        <Sphere />
      </Canvas>
      <button
        onClick={() => {
          setLight(!light);
        }}
      >
        Toggle
      </button>
    </>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
