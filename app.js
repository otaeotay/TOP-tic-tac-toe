let xturn = true;
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

const winner = document.querySelector('.winner');

const gameboard = (()=> {
    let board = ['', '', '', '', '', '', '', '', ''];


    const playTurn = (turn, currentPlay) => {
        board[turn] = currentPlay
        if (checkX()) {
            winner.innerText = 'X wins!'
        } else if (checkO()) {
            winner.innerText = 'O wins!'
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

    return{playTurn}
})();

const player = (name) => {
    const getName = () => name;
    const currentPlayer = () => {
        if (xturn){
            xturn = false;
            return 'X';           
        } else {
            xturn = true;
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
            const current = whichTurn.currentPlayer();
            e.target.textContent = `${current}`;
            if (current == 'X'){
                game.playTurn([i*3+j], 1);
            } else{
                game.playTurn([i*3+j], 2);
            }
            console.log(game.playTurn());
        })
        boardRow.appendChild(boardTile);
    }
    boardRow.classList.add('row');
    boardDisplay.appendChild(boardRow);
}