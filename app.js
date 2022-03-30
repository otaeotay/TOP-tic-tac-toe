let xturn = true;
const gameStatus = document.querySelector('.status');
const resetBtn = document.querySelector('.reset')

const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const gameboard = (()=> {
    let board = ['', '', '', '', '', '', '', '', ''];


    const playTurn = (turn, currentPlay) => {
        board[turn] = currentPlay
        if (checkX()) {
            gameStatus.innerText = 'X wins!'
        } else if (checkO()) {
            gameStatus.innerText = 'O wins!'
        }
        return board;
    }
    
    const checkX = () => {
        return winningComb.some((combination) => {
            return combination.every((i) => {
                return board[i] == 1;
            })
        })
    };

    const checkO = () => {
        return winningComb.some((combination) => {
            return combination.every((i) => {
              return board[i] == 2;
            })
        })
    };

    const reset = () => {
        const boardReset = document.querySelectorAll('.tile');
        boardReset.forEach(space => {
            space.innerText='';
            space.classList.remove('occupied');
        });
        gameStatus.innerText = ''
        return board = ['', '', '', '', '', '', '', '', ''];
    }

    return{playTurn, reset}
})();

const player = (name) => {
    const getName = () => name;
    const currentPlayer = () => {
        if (xturn){
            xturn = false;
            gameStatus.innerText = 'O Turn';
            return 'X';           
        } else {
            xturn = true;
            gameStatus.innerText = 'X Turn';
            return 'O';            
        }
    }
    return{getName, currentPlayer};
};

const boardDisplay = document.querySelector('.board');
const game = gameboard;
const whichTurn = player('Jeff');

for (let i = 0; i < 3; i++) {
    const boardRow = document.createElement('div');
    for (let j = 0; j < 3; j++) {
        const boardTile = document.createElement('div');
        boardTile.textContent = '';
        boardTile.classList.add('tile');
        boardTile.addEventListener('click', (e) => {
            boardTile.classList.add('occupied');
            const current = whichTurn.currentPlayer();
            e.target.textContent = `${current}`;
            if (current == 'X'){
                game.playTurn([i*3+j], 1);
            } else{
                game.playTurn([i*3+j], 2);
            }
        })
        boardRow.appendChild(boardTile);
    }
    boardRow.classList.add('row');
    boardDisplay.appendChild(boardRow);
}

resetBtn.addEventListener('click', () => {
    game.reset();
})