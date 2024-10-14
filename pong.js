// Environment settings
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Game settings
const lineLength = 5; // Length of the player lines
const targetHeight = 0.6; // Height at which the cubes should be raised
const liftSpeed = 0.1; // Speed at which the cubes should be raised/lowered
const moveSpeed = 0.3; // Speed at which the players can move
const initialBallSpeed = 0.2; // Initial speed of the ball
const ballSizeScale = 5; // Size of the ball
const speedIncreaseFactor = 1.05; // Factor by which the ball speed increases on player's collision

// Plateform dimensions
const platformWidth = 50;  // Platform width
const platformLength = 30; // Platform length
const cubeSize = 1;
const cubes = [];

// Scores
let player1Score = 0;
let player2Score = 0;

const createRoundedBox = (width, height, depth, radius, smoothness) => {
	const shape = new THREE.Shape();
	// epsilone to prevent rendering errors
	const eps = 0.00001;
	const radius0 = radius - eps;
	//shape each corner as quarter circle
	shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
	shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
	shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
	shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
	//extrude the shape to the depth
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
// for (let i = 0; i < platformWidth; i++) {
for (let i = -1; i < 2; i ++) {

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
for (let i = platformWidth - 2; i < platformWidth + 1; i ++) {

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

//// Flat middle platform
// const   middle = createRoundedBox(platformWidth - 3, cubeSize, platformLength, 0.18, 4);
// const   material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
// const   cube = new THREE.Mesh(middle, material);
// cube.position.set(0, 0, 0);
// cube.userData.gridPosition = { x: 0, z: 0 };
// cubes.push(cube);
// scene.add(cube);

// Add lighting to see the rounded edges better
const ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Ajuster la position de la caméra pour la nouvelle plateforme
camera.position.y = Math.max(platformWidth, platformLength) * 0.8;
camera.position.z = Math.max(platformWidth, platformLength) * 1;
camera.lookAt(0, 0, 0);

// Variables pour suivre la position actuelle des curseurs
if (lineLength == platformLength)
	centerZ = 0;
else
	centerZ = Math.floor((platformLength - lineLength) / 2);
let player1Positions = Array(lineLength).fill().map((_, index) => ({ x: 0, z: centerZ + index }));
let player2Positions = Array(lineLength).fill().map((_, index) => ({ x: platformWidth - 1, z: centerZ + index }));


// Create ball
const ballGeometry = new THREE.SphereGeometry(0.2 * ballSizeScale, 32, 32);
// const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
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

// Ball movement
let ballSpeed = initialBallSpeed;
let ballVelocity = new THREE.Vector3(ballSpeed, 0, ballSpeed);

// Object to track pressed keys
const pressedKeys = {};

// Update player's cube positions
function updateCubeSelection() {
	cubes.forEach(cube => {
		cube.material.color.setHex(0x00ffff);
		cube.userData.targetY = 0;
	});

	const updatePlayerCubes = (positions, color) => {
		positions.forEach((pos) => {
			const cube = cubes.find(cube =>
				cube.userData.gridPosition.x === Math.floor(pos.x) &&
				cube.userData.gridPosition.z === Math.floor(pos.z)
			);
			if (cube) {
				cube.material.color.setHex(color);
				cube.userData.targetY = targetHeight;
			}
		});
	};

	updatePlayerCubes(player1Positions, 0xffffff);
	updatePlayerCubes(player2Positions, 0xffffff);
}

// Update player positions based on pressed keys
function updatePlayerPositions() {
	const movePlayer = (positions, direction) => {
		const newPositions = positions.map(pos => ({
			x: pos.x,
			z: pos.z + direction * moveSpeed
		}));

		// Check if any cube in the line would go out of bounds
		if (newPositions.every(pos => pos.z >= 0 && pos.z < platformLength)) {
			return newPositions;
		}
		return positions;
	};

	// Player 1 movement
	if (pressedKeys['w'] || pressedKeys['a']) {
		player1Positions = movePlayer(player1Positions, -1);
	}
	if (pressedKeys['s'] || pressedKeys['d']) {
		player1Positions = movePlayer(player1Positions, 1);
	}

	// Player 2 movement
	if (pressedKeys['ArrowUp'] || pressedKeys['ArrowRight']) {
		player2Positions = movePlayer(player2Positions, -1);
	}
	if (pressedKeys['ArrowDown'] || pressedKeys['ArrowLeft']) {
		player2Positions = movePlayer(player2Positions, 1);
	}
}

function updateBallPosition() {
	// Calculate potential new position
	const potentialPosition = ball.position.clone().add(ballVelocity);

	// Check for collisions with raised cubes
	let collision = false;
	cubes.forEach(cube => {
		if (cube.position.y > 0.3) { // Only check cubes that are raised 
			const dx = Math.abs(potentialPosition.x - cube.position.x);
			const dz = Math.abs(potentialPosition.z - cube.position.z);
			if (dx < 0.6 && dz < 0.6) {
				collision = true;
				if (dx > dz) {
					ballVelocity.x *= -1;
				} else {
					ballVelocity.z *= -1;
				}
				// Increase ball speed, but cap it at maxBallSpeed
				ballSpeed = ballSpeed * speedIncreaseFactor;
				ballVelocity.normalize().multiplyScalar(ballSpeed);
			}
		}
	});

	// Only update the ball position if no collision occurred
	if (!collision) {
		ball.position.copy(potentialPosition);
	}

	// Make ball bounce on walls
	if (ball.position.z < -platformLength / 2 + 0.5 || ball.position.z > platformLength / 2 - 0.5) {
		ballVelocity.z *= -1;
		ball.position.z = Math.max(Math.min(ball.position.z, platformLength / 2 - 0.5), -platformLength / 2 + 0.5);
	}

	// Check if ball is behind player lines
	if (ball.position.x < -platformWidth / 2 - 1) //left side
	{
		player2Score++;
		updateScoreDisplay();
		resetBall();
	}
	else if (ball.position.x > platformWidth / 2 + 1) //right side
	{
		player1Score++;
		updateScoreDisplay();
		resetBall();
	}
}

function resetBall() {
	ball.position.set(0, 1, 0);
	ballSpeed = initialBallSpeed;
	ballVelocity = new THREE.Vector3(ballSpeed * (Math.random() > 0.5 ? 1 : -1), 0, ballSpeed * (Math.random() > 0.5 ? 1 : -1));
}

function updateScoreDisplay() {
	const scoreDisplay = document.getElementById('scoreDisplay');
	scoreDisplay.textContent = `${player1Score} | ${player2Score}`;
}

// Animation loop
function animate() {
	requestAnimationFrame(animate);

	updatePlayerPositions();
	updateCubeSelection();
	updateBallPosition();

	// Raise/lower cubes animation
	cubes.forEach(cube => {
		if (cube.userData.targetY !== undefined) {
			cube.position.y += (cube.userData.targetY - cube.position.y) * liftSpeed;
		}
	});

	renderer.render(scene, camera);
}

// Keyboard event handlers
function onKeyDown(event) {
	pressedKeys[event.key] = true;
}

function onKeyUp(event) {
	pressedKeys[event.key] = false;
}

// Mouse wheel event handler
function onMouseWheel(event) {
	const zoomSpeed = 0.1;
	const zoomFactor = event.deltaY > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
	
	camera.position.y *= zoomFactor;
	camera.position.z *= zoomFactor;
	
	camera.lookAt(0, 0, 0);
}

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);
window.addEventListener('wheel', onMouseWheel, false);

// Start the animation loop
animate();