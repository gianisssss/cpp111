var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

var imgOrder = ["21", "13", "4", "2", "8", "25", "1", "6", "7", "9", "3", "10", "11", "12", "14", "15", "16", "17", "18", "19", "20", "22", "23", "24", "5"];

var highestScore = localStorage.getItem('highestScore') || 0; // Retrieve highest score from local storage

window.onload = function () {
    initializeGame();
}

function initializeGame() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    updateLeaderboard();
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (!otherTile.src.includes("5.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;
    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;

        if (puzzleIsSolved()) {
            handleGameEnd();
        }
    }
}

function puzzleIsSolved() {
    // Add logic to check if the puzzle is solved based on your requirements
    // For example, check if all tiles are in the correct order
    // Return true if the puzzle is solved, otherwise return false
}

function handleGameEnd() {
    if (turns < highestScore || highestScore === 0) {
        highestScore = turns;
        localStorage.setItem('highestScore', highestScore);
        updateLeaderboard();
    }

    document.getElementById("startButton").addEventListener("click", initializeGame);
}

function updateLeaderboard() {
    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = `<li><span>Highest Score:</span> ${highestScore} turns</li>`;
}