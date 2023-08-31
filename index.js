const board = function() {
    const blocks = 3;
    let board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(0);
        }
    }

    const getBoard = () => board;

    return {
        getBoard
    }
}()

const playerContoroller = function() {
    const players = [
        {
            name: 'playerX',
            value: 'X'
        },
        {
            name: 'playerY',
            value: 'Y'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    return {
        getActivePlayer,
        switchPlayerTurn
    }
}();

const gameController = function() {
    const cellButtton = function() {
        chooseCellButton = document.createElement('button');
        chooseCellButton.innerHTML = 'Choose Cell';
        document.body.appendChild(chooseCellButton);
        chooseCellButton.onclick = () => {
            const row = prompt('enter row');
            const column = prompt('enter col');
            playRound(row, column);
        }
    }

    const renderBoard = () => {
        console.log(board.getBoard());
        console.log(`${playerContoroller.getActivePlayer().name}'s turn`);
    }

    const playRound = (row, column) => {
        board.getBoard()[row][column] = playerContoroller.getActivePlayer().value;
        playerContoroller.switchPlayerTurn();
        renderBoard();
    }

    return {
        cellButtton,
        renderBoard
    }
}();

gameController.renderBoard();
gameController.cellButtton();


