export let player1Positions = Array(5).fill().map((_, index) => ({ x: 0, z: index }));
export let player2Positions = Array(5).fill().map((_, index) => ({ x: 49, z: index }));

export function updatePlayerPositions() {
    const moveSpeed = 0.3;
    const platformLength = 30;

    const movePlayer = (positions, direction) => {
        const newPositions = positions.map(pos => ({
            x: pos.x,
            z: pos.z + direction * moveSpeed
        }));

        if (newPositions.every(pos => pos.z >= 0 && pos.z < platformLength)) {
            return newPositions;
        }
        return positions;
    };

    if (pressedKeys['w']) {
        player1Positions = movePlayer(player1Positions, -1);
    }
    if (pressedKeys['s']) {
        player1Positions = movePlayer(player1Positions, 1);
    }

    if (pressedKeys['ArrowUp']) {
        player2Positions = movePlayer(player2Positions, -1);
    }
    if (pressedKeys['ArrowDown']) {
        player2Positions = movePlayer(player2Positions, 1);
    }
}

export function updateCubeSelection(cubes) {
    cubes.forEach(cube => {
        cube.position.y = 0;
    });

    player1Positions.forEach(pos => {
        const cube = cubes.find(c => c.userData.gridPosition.x === pos.x && c.userData.gridPosition.z === pos.z);
        if (cube) cube.position.y = 0.5;
    });

    player2Positions.forEach(pos => {
        const cube = cubes.find(c => c.userData.gridPosition.x === pos.x && c.userData.gridPosition.z === pos.z);
        if (cube) cube.position.y = 0.5;
    });
}
