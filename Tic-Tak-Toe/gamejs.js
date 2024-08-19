let turn = "X";

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

const isWin = () => {
    const boxtexts = document.querySelectorAll('.btext');
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    return wins.some(combination => {
        return combination.every(index => {
            return boxtexts[index].innerText === turn;
        });
    });
}

const isDraw = () => {
    const boxtexts = document.querySelectorAll('.btext');
    return Array.from(boxtexts).every(boxtext => boxtext.innerText !== '');
}

const resetGame = () => {
    let boxtexts = document.querySelectorAll('.btext');
    boxtexts.forEach(boxtext => boxtext.innerText = '');
    turn = "X";
    document.querySelector(".info").innerText = "Turn of X";
}

document.querySelector('button').addEventListener('click', resetGame);

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.btext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            if (isWin()) {
                document.querySelector('.info').innerText = `${turn} Wins!`;
                Array.from(boxes).forEach(element => element.removeEventListener('click', arguments.callee));
            } else if (isDraw()) {
                document.querySelector('.info').innerText = "It's a Draw!";
            } else {
                turn = changeTurn();
                document.querySelector('.info').innerText = `Turn of ${turn}`;
            }
        }
    });
});
