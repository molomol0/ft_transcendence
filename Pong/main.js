import { initScene, animateScene } from './scene.js';
import { handleKeyboard, handleMouseWheel } from './input.js';
import { updateBallPosition, resetBall } from './ball.js';
import { updatePlayerPositions, updateCubeSelection } from './players.js';

// Initialize the scene
const { scene, camera, cubes, ball } = initScene();

// Set up input handlers
window.addEventListener('keydown', handleKeyboard, false);
window.addEventListener('keyup', handleKeyboard, false);
window.addEventListener('wheel', handleMouseWheel(camera), false);

// Start the animation loop
function animate() {
    requestAnimationFrame(animate);

    updatePlayerPositions();
    updateCubeSelection(cubes);
    updateBallPosition(ball);

    // Render the scene
    animateScene(scene, camera);
}

animate();
