import * as THREE from 'three';

let ballSpeed = 0.2;
const ballSizeScale = 5;
let ballVelocity = new THREE.Vector3(ballSpeed, 0, ballSpeed);
const speedIncreaseFactor = 1.05;

export function createBall(scene) {
    const ballGeometry = new THREE.SphereGeometry(0.2 * ballSizeScale, 32, 32);
    const ballMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        specular: 0x888888,
        shininess: 30
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 1, 0);
    ball.castShadow = true;
    ball.receiveShadow = true;
    scene.add(ball);

    return ball;
}

export function updateBallPosition(ball) {
    const platformLength = 30;
    const platformWidth = 50;

    const potentialPosition = ball.position.clone().add(ballVelocity);
    let collision = false;

    // Check for collisions with raised cubes
    cubes.forEach(cube => {
        if (cube.position.y > 0.3) {
            const dx = Math.abs(potentialPosition.x - cube.position.x);
            const dz = Math.abs(potentialPosition.z - cube.position.z);
            if (dx < 0.6 && dz < 0.6) {
                collision = true;
                if (dx > dz) {
                    ballVelocity.x *= -1;
                } else {
                    ballVelocity.z *= -1;
                }
                ballSpeed = ballSpeed * speedIncreaseFactor;
                ballVelocity.normalize().multiplyScalar(ballSpeed);
            }
        }
    });

    if (!collision) {
        ball.position.copy(potentialPosition);
    }

    if (ball.position.z < -platformLength / 2 + 0.5 || ball.position.z > platformLength / 2 - 0.5) {
        ballVelocity.z *= -1;
        ball.position.z = Math.max(Math.min(ball.position.z, platformLength / 2 - 0.5), -platformLength / 2 + 0.5);
    }

    if (ball.position.x < -platformWidth / 2 - 1) {
        // Handle player 2 scoring
        resetBall(ball);
    } else if (ball.position.x > platformWidth / 2 + 1) {
        // Handle player 1 scoring
        resetBall(ball);
    }
}

export function resetBall(ball) {
    ball.position.set(0, 1, 0);
    ballSpeed = 0.2;
    ballVelocity = new THREE.Vector3(ballSpeed * (Math.random() > 0.5 ? 1 : -1), 0, ballSpeed * (Math.random() > 0.5 ? 1 : -1));
}
