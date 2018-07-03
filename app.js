/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// const rollDiceBtn = document.get
const startNewGameBtn = document.querySelector('.btn-new').addEventListener('click',startGame);
const rollDiceBtn = document.querySelector('.btn-roll').addEventListener('click',makeTurn);
const holdBtn = document.querySelector('.btn-hold').addEventListener('click',holdPoints);
const diceImg = document.querySelector('.dice');
const diceImg2 = document.querySelector('.dice2');

var player_1_score = document.querySelector('#score-0');
var player_2_score = document.querySelector('#score-1');
var player_1_current = document.querySelector('#current-0');
var player_2_current = document.querySelector('#current-1');
var player_1_panel = document.querySelector('.player-0-panel');
var player_2_panel = document.querySelector('.player-1-panel');

var user_1_score = 0;
var user_2_score = 0;
var temporaryScore = [];
var temporaryScore2 = [];
var turn = 1;
var isGamePlaying = false;

function rollDice(){
    if (isGamePlaying){
        const dice = getRandomDiceNumber();
        const dice2 = getRandomDiceNumber();
        if(dice === 1 || dice2 === 1){
            if(dice === 1){
                diceImg.classList.add('shakeIt2');
                setTimeout(()=>{diceImg.classList.remove('shakeIt2');},900);
                setTimeout(()=>{
                    diceImg.classList.add('hide-dice');
                    diceImg2.classList.add('hide-dice');
                },950);
            }
            if(dice2 === 1){
                diceImg2.classList.add('shakeIt2');
                setTimeout(()=>{diceImg2.classList.remove('shakeIt2');},900);
                setTimeout(()=>{
                    diceImg.classList.add('hide-dice');
                    diceImg2.classList.add('hide-dice');
                },950);
            }
        }else{
            diceImg.classList.add('fadeIn');
            setTimeout(()=>{diceImg.classList.remove('fadeIn');},300);
            diceImg2.classList.add('fadeIn');
            setTimeout(()=>{diceImg2.classList.remove('fadeIn');},300);
        }
        diceImg.src = `dice-${dice}.png`;
        diceImg2.src = `dice-${dice2}.png`;
        temporaryScore.push(dice);
        temporaryScore2.push(dice2);
        return temporaryScore
    }
}

function getRandomDiceNumber(){
    return Math.floor(Math.random() * 6) + 1;
}

function makeTurn(){
    if (isGamePlaying){
        const diceTurn = rollDice();
        diceImg.classList.remove('hide-dice');
        diceImg2.classList.remove('hide-dice');
        playerTurn(turn);
    }else{
        shakeNewBtnAlert();
    }
}

function playerTurn(player){
    player % 2 !== 0 ? player = player_1_current : player = player_2_current;
    var points = temporaryScore.reduce((accumulator, currentValue) => accumulator + currentValue);
    var points2 = temporaryScore2.reduce((accumulator, currentValue) => accumulator + currentValue);
    player.innerHTML = points + points2
    if(temporaryScore.includes(1) || temporaryScore2.includes(1)) {
        points = 0
        points2 = 0
        temporaryScore = [];
        temporaryScore2 = [];
        turn++;
        player.innerHTML = 0
        keepUpdating()
        return;
    }
}

function holdPoints(){
    if(isGamePlaying){
        if (temporaryScore.length == 0){
            shakeRollBtnAlert();
        }else{
            var points1 = temporaryScore.reduce((accumulator, currentValue) => accumulator + currentValue);
            var points2 = temporaryScore2.reduce((accumulator, currentValue) => accumulator + currentValue);
            var points = points1 + points2;
            turn % 2 !== 0 ? user_1_score+=points : user_2_score+=points;
            turn % 2 !== 0 ? player_1_score.innerHTML = user_1_score : player_2_score.innerHTML = user_2_score;
            temporaryScore = [];
            turn++;
            keepUpdating()
        }
    }else{
        shakeNewBtnAlert();
    }
}

function shakeNewBtnAlert(){
    var newBtn = document.querySelector('.btn-new')
    newBtn.classList.add('shakeIt');
    setTimeout(()=>{newBtn.classList.remove('shakeIt');},700);
}

function shakeRollBtnAlert(){
    var rollbtn = document.querySelector('.btn-roll')
    rollbtn.classList.add('shakeIt');
    setTimeout(()=>{rollbtn.classList.remove('shakeIt');},700);
}

function keepUpdating(){
    if(turn % 2 !== 0){
        setTimeout(()=>{
            player_2_panel.classList.remove('active');
            player_1_panel.classList.add('active');
        },800);
    }else{
        setTimeout(()=>{
            player_1_panel.classList.remove('active');
            player_2_panel.classList.add('active');
        },800);
    }
    if (user_1_score > 99 || user_2_score > 99){
        isGamePlaying = false;
        if(user_1_score > 99){
            player_1_panel.classList.add('winner');
            player_2_panel.classList.add('loser');
        }
        if(user_2_score > 99){
            player_1_panel.classList.add('loser');
            player_2_panel.classList.add('winner');
        }
    }
}

function startGame(){
    player_1_score.innerHTML = 0
    player_2_score.innerHTML = 0
    player_1_current.innerHTML = 0
    player_2_current.innerHTML = 0
    user_1_score = 0;
    user_2_score = 0;
    temporaryScore = [];
    temporaryScore2 = [];
    turn = 1;
    isGamePlaying = true;
    diceImg.removeAttribute('style');
    diceImg2.removeAttribute('style');
    player_1_panel.classList.remove('loser');
    player_1_panel.classList.remove('winner');
    player_2_panel.classList.remove('loser');
    player_2_panel.classList.remove('winner');
}
