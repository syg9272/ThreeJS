import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function ThreeJS() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      // 장면 만들기
      const scene = new THREE.Scene();
      // 브라우저에 렌더링
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        // 테두리 계단 현상 해결
        antialias: true,
      });
      // 색상 정보 변경해야 브라우저에서 잘 보임
      renderer.outputEncoding = THREE.sRGBEncoding;

      // 3D model 보여줄 때 필요한 것들
      // 1. 카메라 2. 조명 3. 배경

      // 1. 카메라 (원근법 O)
      const camera = new THREE.PerspectiveCamera(30, 1);

      // 마우스 컨트롤
      const controls = new OrbitControls(camera, canvasRef.current);

      // (x축, y축, zoom) ?
      camera.position.set(0, 0, 4);
      controls.update();
      const loader = new GLTFLoader();
      // 3. 배경
      scene.background = new THREE.Color("white");
      // 2. 조명
      const light = new THREE.DirectionalLight(0xffffff, 10);
      scene.add(light);
      // GLTF 파일 가져오기
      loader.load("/scene.gltf", (object) => {
        scene.add(object.scene);
        function animate() {
          requestAnimationFrame(animate);
          // 기본 애니메이션
          object.scene.rotation.y += 0.005;
          // orditcontrols
          controls.update();
          renderer.render(scene, camera);
        }
        animate();
      });
    }
  }, [canvasRef]);
  return <canvas ref={canvasRef} id="canvas" width={1000} height={1000} />;
}

export default ThreeJS;
