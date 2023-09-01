buttons = document.querySelectorAll('button');

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

const gameOver = function() {
    activePlayer = playerContoroller.getActivePlayer();
    let values = {};

    const allEqualHorizontal = arr => arr.every(val => val === arr[0]);
    const allEqualVertical = arr => { 
        if ((arr[0][0] == arr[1][0] && arr[1][0] == arr[2][0]) && (arr[0][0] !== 0 && arr[1][0] !== 0 && arr[2][0] !== 0)) {
            if(arr[0][0] == 'X') {
                letter = 'X';
            } else {
                letter = 'Y';
            }
            values = {
                boolean: true,
                letter
            }
        } 
        if ((arr[0][1] == arr[1][1] && arr[1][1] == arr[2][1]) && (arr[0][1] !== 0 && arr[1][1] !== 0 && arr[2][1] !== 0)) {
            if(arr[0][1] == 'X') {
                letter = 'X';
            } else {
                letter = 'Y';
            }
            values = {
                boolean: true,
                letter
            }
        }
        if ((arr[0][2] == arr[1][2] && arr[1][2] == arr[2][2]) && (arr[0][2] !== 0 && arr[1][2] !== 0 && arr[2][2] !== 0)) {
            if(arr[0][2] == 'X') {
                letter = 'X';
            } else {
                letter = 'Y';
            }
            values = {
                boolean: true,
                letter
            }
        }
    }
    const allEqualDiagonal = arr => {
        if ((arr[0][0] == arr[1][1] && arr[1][1] == arr[2][2]) && (arr[0][0] !== 0 && arr[1][1] !== 0 && arr[2][2] !== 0)) {
            if(arr[0][0] == 'X') {
                letter = 'X';
            } else {
                letter = 'Y';
            }
            values = {
                boolean: true,
                letter
            }
        } 
        if ((arr[0][2] == arr[1][1] && arr[1][1] == arr[2][0]) && (arr[0][2] !== 0 && arr[1][1] !== 0 && arr[2][0] !== 0)) {
            if(arr[0][1] == 'X') {
                letter = 'X';
            } else {
                letter = 'Y';
            }
            values = {
                boolean: true,
                letter
            }
        }
    }

    const everyValueIsEqual = () => {
        for (let i = 0; i < 3; i++) {
            if (allEqualHorizontal(currentBoard[i])) {
                if (currentBoard[i][0] === 'X') {
                    values = {
                        boolean: true,
                        letter: 'X'
                    }
                } else if (currentBoard[i][0] === 'Y') {
                    values = {
                        boolean: true,
                        letter: 'Y'
                    }
                }
            }
        }
        allEqualVertical(currentBoard);
        allEqualDiagonal(currentBoard);
    }

    const getValues = () => values;

    const winner = () => {
        if(values.boolean) {
            if (values.letter === 'X') {
                console.log('PlayerX has won');
            } else if (values.letter === 'Y') {
                console.log('PlayerY has won');
            }
        }
    };

    return {
        everyValueIsEqual,
        getValues,
        winner
    }
}();

const gameController = function() {   
    currentBoard = board.getBoard();

    const renderBoard = () => {
        console.log(board.getBoard());
        console.log(`${playerContoroller.getActivePlayer().name}'s turn`);
    }

    const playRound = (row, column, id) => {
        if (document.getElementById(id).innerHTML !== 'X' && document.getElementById(id).innerHTML !== 'Y') {
            board.getBoard()[row][column] = playerContoroller.getActivePlayer().value;
            document.getElementById(id).innerHTML = playerContoroller.getActivePlayer().value;
            gameOver.everyValueIsEqual();
            if(gameOver.getValues().boolean) {
                gameOver.winner();
            } else {
                playerContoroller.switchPlayerTurn();
                renderBoard();
            }
        }
    }

    return {
        playRound,
        renderBoard
    }
}();

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let row = button.id.charAt(0);
        let column = button.id.charAt(1);
        gameController.playRound(row, column, button.id);
    })
});

gameController.renderBoard();



