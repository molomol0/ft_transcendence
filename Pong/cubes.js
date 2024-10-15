import * as THREE from 'three';

export function createCubes(scene) {
    const platformWidth = 50;
    const platformLength = 30;
    const cubeSize = 1;
    const cubes = [];

    const createRoundedBox = (width, height, depth, radius, smoothness) => {
        const shape = new THREE.Shape();
        const eps = 0.00001;
        const radius0 = radius - eps;
        shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
        shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
        shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
        shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
        const geometry = new THREE.ExtrudeBufferGeometry(shape, {
            depth: depth - radius0 * 2,
            bevelEnabled: true,
            bevelSegments: smoothness * 2,
            steps: 1,
            bevelSize: radius,
            bevelThickness: radius0,
            curveSegments: smoothness
        });
        geometry.center();
        return geometry;
    };

    // Left side cubes
    for (let i = -1; i < 2; i++) {
        for (let j = 0; j < platformLength; j++) {
            const geometry = createRoundedBox(cubeSize, cubeSize, cubeSize, 0.18, 4);
            const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(i - platformWidth / 2 + 0.5, 0, j - platformLength / 2 + 0.5);
            cube.userData.gridPosition = { x: i, z: j };
            cubes.push(cube);
            scene.add(cube);
        }
    }

    // Right side cubes
    for (let i = platformWidth - 2; i < platformWidth + 1; i++) {
        for (let j = 0; j < platformLength; j++) {
            const geometry = createRoundedBox(cubeSize, cubeSize, cubeSize, 0.18, 4);
            const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(i - platformWidth / 2 + 0.5, 0, j - platformLength / 2 + 0.5);
            cube.userData.gridPosition = { x: i, z: j };
            cubes.push(cube);
            scene.add(cube);
        }
    }

    return cubes;
}
