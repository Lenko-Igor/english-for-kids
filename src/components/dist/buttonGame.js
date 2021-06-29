"use strict";
exports.__esModule = true;
exports.buttonGame = void 0;
require("../styles/buttonGame/buttonGame.css");
var element_1 = require("./element");
var ButtonGame = /** @class */ (function () {
    function ButtonGame() {
        this.feild = element_1.element.create('div', '', ['feild-button-game']);
        this.start = element_1.element.createButton('start', 'start game', ['button-game', 'startGame']);
        this.repeat = element_1.element.createButton('repeat', '', ['button-game', 'repeatGame']);
    }
    ButtonGame.prototype.init = function (typeGame) {
        this.renderButtons(typeGame);
        this.repeat.innerHTML = "<i class=\"fas fa-redo-alt\"></i>";
        this.feild.insertAdjacentElement('afterbegin', this.start);
        this.feild.insertAdjacentElement('afterbegin', this.repeat);
        return this.feild;
    };
    ButtonGame.prototype.renderButtons = function (typeGame) {
        if (typeGame === 'train') {
            this.start.classList.add('novisible');
            this.repeat.classList.add('novisible');
        }
        else {
            this.start.classList.remove('novisible');
            this.repeat.classList.add('novisible');
        }
    };
    ButtonGame.prototype.clickStartButton = function () {
        this.start.classList.add('novisible');
        this.repeat.classList.remove('novisible');
    };
    return ButtonGame;
}());
exports.buttonGame = new ButtonGame();
