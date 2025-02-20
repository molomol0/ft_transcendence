export const pongBindings = {
    player1UpBind: 'w',
    player1DownBind: 's',
    player2UpBind: 'ArrowUp',
    player2DownBind: 'ArrowDown'
};

export const pongColors = {
    player1Side: 0x222222,
    player2Side: 0x222222,
    player1Paddle: 0x797979,
    player2Paddle: 0x797979
};

export const pongSet = {
    selectedMode: 'local 1v1',
    current_match: 1,
    game_announcement: false,
    players_names: ["player 1", "player 2", "player 3", "player 4", null, null, null],
};

export function getMatchWinners() {
    const semifinal1Winner = document.getElementById('semifinal1');
    const semifinal2Winner = document.getElementById('semifinal2');
    const finalWinner = document.getElementById('final');

    if (semifinal1Winner && semifinal2Winner && finalWinner) {
        return { semifinal1Winner, semifinal2Winner, finalWinner };
    }
    
    return null;
}

export function getMatchPlayers() {
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const player3 = document.getElementById('player3');
    const player4 = document.getElementById('player4');

    if (player1 && player2 && player3 && player4) {
        return { player1, player2, player3, player4 };
    }
    
    return null;
}