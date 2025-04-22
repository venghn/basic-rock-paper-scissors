const prompt = require('prompt-sync')({ sigint: true });

// VARIABLE DEFINITIONS
let human=0;
let cpu=0;

let MOVESET= ['r', 'p', 's'];
let ROUNDS= prompt('Welcome to Rock Paper Scissors. How many rounds to play? ');

// FUNCTION DEFINITIONS
// Function determines who wins
let roundCalc=(cpu, player)=> {
    switch(player){
        case 'r':
            switch(cpu){
                case 'r': console.log('Tie.'); break;
                case 'p': cpu=cpu+1; break;
                case 's': human=human+1; break;
            }; break;
        case 'p':
            switch(cpu){
                case 'r': human=human+1; break;
                case 'p': console.log('Tie.'); break;
                case 's': cpu=cpu+1; break;
            }; break;
        case 's':
            switch(cpu){
                case 'r': cpu=cpu+1; break;
                case 'p': human=human+1; break;
                case 's': console.log('Tie'); break;
            }; break;
    }
};

// Plays x amount of rounds till win
// Takes in x amount of rounds
let game=n=>{
    for (let i=0; i<n; i++){
        let cpuMove= Math.floor(Math.random() * 3) // 0 to 2
        let humanMove= prompt("Make your move (Rock=r, Paper=p, Scissors=s): ");
        
        roundCalc(MOVESET[cpuMove], humanMove)
    };
    (human>cpu) ? console.log("You Win."):console.log("You Lose.");
};game(ROUNDS);