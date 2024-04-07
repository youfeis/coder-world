// components/babylon-canvas.tsx

'use client';

import { Engine, Scene } from 'react-babylonjs';
import React, { useEffect } from 'react';
import { Vector3, HemisphericLight, MeshBuilder, ArcRotateCamera } from '@babylonjs/core';

const BabylonCanvas: React.FC = () => {

  const preventScroll = (event: WheelEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    const canvas = document.getElementById('babylon-canvas');
    // Add event listener to disable scroll
    canvas?.addEventListener('wheel', preventScroll, { passive: false });

    // Cleanup function to remove event listener
    return () => {
      canvas?.removeEventListener('wheel', preventScroll);
    };
  }, []);

  return (
    <Engine antialias={true} adaptToDeviceRatio={true} canvasId="babylon-canvas">
      <Scene>
        {/* 相机配置 */}
        <arcRotateCamera
          name="camera1"
          alpha={Math.PI / 2}
          beta={Math.PI / 2}
          radius={10}
          target={Vector3.Zero()}
          setPosition={[new Vector3(0, 5, -10)]}
        />

        {/* 光源配置 */}
        <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />

        {/* 球体配置 */}
        <sphere name="sphere1" diameter={2} segments={32} position={new Vector3(0, 1, 0)} />

        {/* 地面配置 */}
        <ground name="ground1" width={6} height={6} subdivisions={2} />
      </Scene>
    </Engine>
  );
};

export default BabylonCanvas;
