'use strict'
import {GuessTheNumber} from "./game/guessTheNumber.js";

let game;

document.getElementById('playButton').addEventListener('click', (e)=>{
    document.querySelector('.main-menu').style.display = 'none';
    document.querySelector('.set-range').style.display = 'flex';
})


document.getElementById('setRange').addEventListener('click', (e)=>{
    e.preventDefault();

    const {min, max} = getRange();
    if(min > max) return;
    if(!min && isNaN(min) || !max && isNaN(max)) return;

    resetValues();

    document.querySelector('.set-range').style.display = 'none';
    document.querySelector('.guess-number').style.display = 'flex';
    document.querySelector('.refresh').style.display = 'block';

    setRange(min, max);
    game = new GuessTheNumber(min, max);

    function getRange(){
        let form = document.querySelector('.range form');
        return {
            min: +form.querySelector('[name="min"]').value,
            max: +form.querySelector('[name="max"]').value,
        }
    }
    function setRange(min, max){
        document.getElementById('min').innerText = min;
        document.getElementById('max').innerText = max;
    }
})


document.getElementById('guessHandler').addEventListener('click', (e)=>{
    let value = document.getElementById('guess').value;
    if(!value || isNaN(value)) {
        document.getElementById('message').innerText = 'Please, enter a number';
        return;
    }
    if(value < game.min || value > game.max){
        document.getElementById('message').innerText = 'You are out of the range!';
        return;
    }

    document.getElementById('guess').value = '';
    let {message, hint, guessed, guessCounter} = game.guess(+value);

    document.getElementById('message').innerText = message;
    document.getElementById('hint').innerText = hint;
    if (guessed){
        document.getElementById('guessHandler').disabled = true;
        document.getElementById('guessCounter').innerText = `It took ${guessCounter} attempts to guess the number`;
    }
})


document.querySelector('.refresh').addEventListener('click', (e) => {
    document.querySelectorAll('.sections').forEach(section => section.style.display = 'none');
    document.querySelector('.set-range').style.display = 'flex';
    document.querySelector('.refresh').style.display = 'none';
})


function resetValues(){
    // reset to the base state all values on guess-number section
    document.getElementById('guessHandler').disabled = false;
    document.getElementById('guess').value = '';
    document.getElementById('guessCounter').innerText = '';
    document.getElementById('hint').innerText = '';
    document.getElementById('message').innerText = '';
}