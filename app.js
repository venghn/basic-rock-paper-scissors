// VARIABLE DEFINITIONS
let human=0; let cpu=0;
let ROCK="Rock"; let PAPER="Paper"; let SCISSORS="Scissors";
let SCORETYPE="score"; let MESSAGETYPE="message";
let MOVESET= [ROCK, PAPER, SCISSORS];
let ROUNDS=0;

// DOM Manipulation
const gameArea=document.getElementById("game");
const scoreDisplay=document.getElementById("scoreDisplay");

function displayScore(score){
    let showScore=document.createElement("div");
    (()=>{(score=="human")? 
        (()=>{showScore.textContent=`Human: ${human}`; showScore.id="humanScore"})(): 
        (()=>{showScore.textContent=`CPU: ${cpu}`; showScore.id="cpuScore"})();
    })();
    scoreDisplay.appendChild(showScore);
};

// Input the amount of rounds
// Intializes the game after entering rounds
const roundAmount=document.getElementById("roundAmount");
roundAmount.addEventListener('keydown', (event)=>{
    if (event.key=="Enter"){
        ROUNDS=roundAmount.value;
        let roundField=document.getElementById("roundEnter");
        roundField.remove();

        displayScore("human"); displayScore("cpu");

        // Create Buttons
        for (let move of MOVESET){
            let btnMove=document.createElement("button");
            btnMove.textContent=`${move}`; btnMove.id=`${move}`;
            btnMove.classList.add("btnMove")
    
            gameArea.appendChild(btnMove);
        }

        playGame(ROUNDS)
    }
})


let humanWin=()=>{displayText("Won round"); human+=1};
let cpuWin=()=>{displayText("Lost round"); cpu+=1};
let tie=()=>{displayText("Tie.")};

// FUNCTION DEFINITIONS
// Function determines who wins the round
let roundCalc=(cpu, player)=> {
    switch(player){
        case ROCK:
            switch(cpu){
                case ROCK: tie(); break;
                case PAPER: cpuWin(); break;
                case SCISSORS: humanWin(); break;
            }; break;
        case PAPER:
            switch(cpu){
                case ROCK: humanWin(); break;
                case PAPER: tie(); break;
                case SCISSORS: cpuWin(); break;
            }; break;
        case SCISSORS:
            switch(cpu){
                case ROCK: cpuWin(); break;
                case PAPER: humanWin(); break;
                case SCISSORS: tie(); break;
            }; break;
    }; 
    // Update Score Display
    (()=>{
        let humanScore=document.getElementById("humanScore");
        let cpuScore=document.getElementById("cpuScore");
        humanScore.remove(); cpuScore.remove(); displayScore("human"); displayScore("cpu");
    })();
};

function displayText(message){
    let displayMessage=document.getElementById("gameMessage");
    if (displayMessage !=null){console.log(displayMessage.remove())}
    let gameMessage=document.createElement("div");
    gameMessage.id="gameMessage";
    gameMessage.textContent=message;
    gameArea.appendChild(gameMessage);
}



// Plays x amount of rounds till win
// Takes in x amount of rounds
let btnMoves=document.getElementsByClassName("btnMove")
let playGame=async n=>{
    if (n==0){ (human==cpu) ? displayText("You Tied! Game Over.") :
        (human>cpu) ? displayText("You Win! Game Over."):displayText("You Lose! Game Over."); return;}

    let cpuMove= Math.floor(Math.random() * 3) // 0 to 2
    let humanMove=await new Promise((resolve) =>{
        for (let btnMove of btnMoves) {
            btnMove.addEventListener('click', function handler() {
                resolve(btnMove.id);
                btnMove.removeEventListener('click', handler); // Remove listener after click
            });
        }
    })
    
    roundCalc(MOVESET[cpuMove], humanMove);
    playGame(n-1)
};








