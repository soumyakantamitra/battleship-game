function fillBoard(player) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let box = document.createElement("div");
            box.classList.add(`row-${i}`);
            box.classList.add(`col-${j}`);
            player.appendChild(box);
        }
    }
}

function renderBoard(board, boardLayout, computer) {
    
    const symbols = {"-1" : "", "0" : "0", "1" : "1", "2" : "2", "3" : "3", "4" : "4", "5" : "5", "x" : "x"}
    if (!computer) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let box = boardLayout.querySelector(`.row-${i}.col-${j}`);
                // box.textContent = symbols[board[i][j]];
                if (symbols[board[i][j]] != "" && symbols[board[i][j]] != "0" && symbols[board[i][j]] != "x") {
                    box.style.background = "lightgreen";
                    box.style.border = "2px solid #0d570d"
                }
                else if (symbols[board[i][j]] == "0") {
                    box.style.background = "lightblue";
                }
                else if (symbols[board[i][j]] == "x") {
                    box.style.background = "red";
                    box.style.border = "2px solid #640000"
                }
            }
        }
    }
    else {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let box = boardLayout.querySelector(`.row-${i}.col-${j}`);
                // box.textContent = symbols[board[i][j]];
                if (symbols[board[i][j]] != "" && symbols[board[i][j]] != "0" && symbols[board[i][j]] != "x") {
                    // box.style.background = "lightgreen";
                    // box.style.border = "2px solid #0d570d"
                }
                else if (symbols[board[i][j]] == "0") {
                    box.style.background = "lightblue";
                }
                else if (symbols[board[i][j]] == "x") {
                    box.style.background = "#ff2c2c";
                    box.style.border = "2px solid #640000"
                }
            }
        }
    }
    
}


function disableAttack() {
    p2Board.style.pointerEvents = "none";
}

function hideShipfromContainer(id) {
    document.querySelector(`#${id}`).style.display = "none";
}

function enableBattleButton(computer) {
    if (computer == false) {
        document.querySelector(".battle-button").disabled = false;
        noticeBoard("Commence the battle");
    }
    
}

function disableBattleButton() {
    document.querySelector(".battle-button").disabled = true;
}

function noticeBoard(message) {
    const notice = document.querySelector(".notice h1");
    notice.textContent = `${message}`;
}


export {fillBoard, renderBoard, hideShipfromContainer, enableBattleButton, disableBattleButton, noticeBoard};