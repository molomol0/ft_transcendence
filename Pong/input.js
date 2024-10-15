export const pressedKeys = {};

export function handleKeyboard(event) {
    if (event.type === 'keydown') {
        pressedKeys[event.key] = true;
    } else if (event.type === 'keyup') {
        pressedKeys[event.key] = false;
    }
}

export function handleMouseWheel(camera) {
    return function (event) {
        const zoomSpeed = 0.1;
        const zoomFactor = event.deltaY > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
        camera.position.y *= zoomFactor;
        camera.position.z *= zoomFactor;
        camera.lookAt(0, 0, 0);
    };
}
