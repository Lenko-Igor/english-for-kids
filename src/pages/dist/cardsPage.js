"use strict";
exports.__esModule = true;
var cards_1 = require("../components/cards");
var element_1 = require("../components/element");
var buttonGame_1 = require("../components/buttonGame");
var stars_1 = require("../components/stars");
var CardsPage = /** @class */ (function () {
    function CardsPage(cardsProps, typeGame, categoryName) {
        this.cardsProps = cardsProps;
        this.typeGame = typeGame;
        this.categoryName = categoryName;
        this.page = this.init(this.typeGame);
        this.cards = this.page.querySelectorAll('.card-wrap');
        this.startButton = element_1.element.createButton('start', 'start game', ['startButton']);
    }
    CardsPage.prototype.init = function (typeGame) {
        var wrap = element_1.element.create('div', '', ['container']);
        wrap.insertAdjacentElement('afterbegin', buttonGame_1.buttonGame.init(typeGame));
        wrap.insertAdjacentElement('afterbegin', this.createCards(this.cardsProps));
        wrap.insertAdjacentElement('afterbegin', stars_1.stars.feild);
        return wrap;
    };
    CardsPage.prototype.createCards = function (cardsProps) {
        return cards_1.cards.createCards(cardsProps);
    };
    CardsPage.prototype.renderPage = function (typeGame) {
        this.changeStyleCards(typeGame);
        buttonGame_1.buttonGame.renderButtons(typeGame);
        this.closePlugsCards();
    };
    CardsPage.prototype.changeStyleCards = function (typeGame) {
        this.cards.forEach(function (card) {
            var cardFooter = card.querySelector('.card-footer');
            if (typeGame === 'train') {
                cardFooter.classList.remove('hidden');
                cardFooter.classList.add('visible');
            }
            else {
                cardFooter.classList.remove('visible');
                cardFooter.classList.add('hidden');
            }
        });
    };
    CardsPage.prototype.openPlugCard = function (title) {
        var plug = this.page.querySelector("#" + title + "-plug");
        plug.classList.add('opened');
    };
    CardsPage.prototype.closePlugsCards = function () {
        var plugs = this.page.querySelectorAll('.card-plug');
        plugs.forEach(function (plug) { return plug.classList.remove('opened'); });
    };
    CardsPage.prototype.changeStyleStartButton = function () {
        buttonGame_1.buttonGame.clickStartButton();
    };
    CardsPage.prototype.playAudioTrain = function (title) {
        var linkAudio = this.cardsProps
            .filter(function (data) { return (data.word === title); })[0].audioSrc;
        new Audio("../src/assets/" + linkAudio).play();
    };
    return CardsPage;
}());
exports["default"] = CardsPage;
