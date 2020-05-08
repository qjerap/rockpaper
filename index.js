const rules = document.getElementById("rules"),
    rulesOpenBtn = document.getElementById("rules-btn"),
    rulesCloseBtn = document.getElementById("rules-btn-close");

const picks = document.getElementById("picks"),
    result = document.getElementById("result"),
    playerPicked = document.getElementById("playerPicked"),
    computerPicked = document.getElementById("computerPicked"),
    showScore = document.getElementById("score"),
    resultMessage = document.getElementById("result-message"),
    showWinner = document.getElementById("show-winner"),
    playAgain = document.getElementById("play-again");

const win = document.getElementById("win"),
    lose = document.getElementById("lose");

const pickType = ["rock", "paper", "scissors"];
let playerPick = "";
let computerPick = "";
let winner = "";
let score = 0;



function getLocalStorage() {
    score = Number(localStorage.getItem("score"));
    showScore.innerHTML = score;
};

function saveToLocalStorage() {
    localStorage.setItem("score", JSON.stringify(score))
};

function getPlayerPick(e) {
    if (e.target.id) {
        playerPick = e.target.id;
    } else if (e.target.parentElement.id) {
        playerPick = e.target.parentElement.id;
    } else {
        playerPick = e.target.parentElement.parentElement.id;
    }
}

function getComputerPick() {
    computerPick = pickType[Math.floor(Math.random() * pickType.length)];
}
// Compare player pick to computer pick and return the winner
function getWinner(player, computer) {
    if (player === computer) return "draw";
    if (player === "rock") return computer === "paper" ? "computer" : "player";
    if (player === "paper")
        return computer === "scissors" ? "computer" : "player";
    if (player === "scissors") return computer === "rock" ? "computer" : "player";
}

// DISPLAY/HIDE RULES ON CLICK
function showRules() {
    rules.style.display = "flex";
}

function closeRules(e) {
    if (e.target.id === "rules" || e.target.id === "rules-btn-close") {
        rules.style.display = "none";
    }
}

// Event Listener

picks.addEventListener("click", (e) => {
    getPlayerPick(e);
    getComputerPick();
    winner = getWinner(playerPick, computerPick);

    // IF no winner/bug
    if (!winner) return;
    // Otherwise...

    picks.classList.add("slideout");
    picks.onanimationend = function(e) {
        picks.classList.remove("slideout");
        picks.style.display = "none";
        result.classList.add("slidein");
        showWinner.classList.add("pop-slide-in");
        result.style.display = "grid";
    };

    result.onanimationend = (e) => {
        result.classList.remove("slidein");
    };

    playerPicked.innerHTML = "";
    playerPicked.innerHTML = `
    <div class="icon-outer ${playerPick} slidein " id="${playerPick}">
      <div class="icon-inner">
          <img src="images/icon-${playerPick}.svg" alt="">
      </div>
    </div>
    `;

    computerPicked.innerHTML = `
    <div class="icon-outer pending slidein rotate">
      <div class="icon-inner">
    
      </div>
    </div>
    `;

    computerPicked.onanimationend = (e) => {
        computerPicked.innerHTML = `
      <div class="icon-outer ${computerPick} pop-in" id="${computerPick}">
      <div class="icon-inner">
          <img src="images/icon-${computerPick}.svg" alt="">
      </div>
    </div>
      `;

        computerPicked.onanimationend = (e) => {
            computerPicked.innerHTML = `
        <div id="comp" class="icon-outer ${computerPick} " id="${computerPick}">
        <div class="icon-inner">
            <img src="images/icon-${computerPick}.svg" alt="">
        </div>
      </div>
        `;

            showScore.innerHTML = score;
        };
    };

    // ON PENDING ANIMATION END, APPEND COMPUTER CHOICE

    // If player WON
    if (winner === "player") {
        resultMessage.innerText = "YOU WIN";
        resultMessage.nextElementSibling.style.color = "green";
        score += 1;
    }
    // If player LOSE
    else if (winner === "computer") {
        resultMessage.innerText = "YOU LOSE";
        resultMessage.nextElementSibling.style.color = "red";
        score === 0 ? score : (score -= 1);
    }
    // If DRAW
    else {
        resultMessage.innerText = "DRAW";
    }
    // SAVE SCORE on LOCALSTORAGE
    saveToLocalStorage()
});

// RESET GAME on BTN click
playAgain.addEventListener("click", () => {
    result.classList.add("slideout");
    result.onanimationend = (e) => {
        result.style.display = "none";
        result.classList.remove("slideout");
        picks.classList.add("slidein");
        picks.style.display = "flex";
    };
    picks.onanimationend = (e) => {
        picks.classList.remove("slidein");
        resultMessage.nextElementSibling.style.color = "initial";
    };
});

rulesOpenBtn.addEventListener("click", showRules);
rules.addEventListener("click", closeRules);

document.onload = getLocalStorage()