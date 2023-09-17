
export class GuessTheNumber {

    constructor(min = 1, max = 100) {
        this._min = min;
        this._max = max;

        this._guessCounter = 0;
        this._pickedNumber = this._makeUpTheNumber();
    }

    _makeUpTheNumber(){
        return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    }
    get min(){
        return this._min;
    }
    get max(){
        return this._max;
    }
    guess(number){
        this._guessCounter++;

        return {
            message: this._pickedNumber === number ? `YOU GOT IT! The picked number is ${this._pickedNumber}` : this._pickedNumber > number ? 'The picked number is higher' : 'The picked number is lower',
            hint: this._guessCounter > 3 ? this._getHint() : '',
            guessed: this._pickedNumber === number,
            guessCounter: this._guessCounter
        }
    }

    _getHint(){
        return this._pickedNumber % 2 === 0 ? 'Hint: The number is even' : 'Hint: The number is odd'
    }
}