import * as THREE from 'three';
import { createCubes } from './cubes.js';
import { createBall } from './ball.js';

export function initScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add cubes and ball to the scene
    const cubes = createCubes(scene);
    const ball = createBall(scene);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Set up camera position
    camera.position.y = Math.max(50, 30) * 0.8;
    camera.position.z = Math.max(50, 30) * 1;
    camera.lookAt(0, 0, 0);

    return { scene, camera, cubes, ball };
}

export function animateScene(scene, camera) {
    const renderer = new THREE.WebGLRenderer();
    renderer.render(scene, camera);
}
