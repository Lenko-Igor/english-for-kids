"use strict";
exports.__esModule = true;
var cards_1 = require("../components/cards");
var HomePage = /** @class */ (function () {
    function HomePage(nameCategories, images) {
        this.nameCategories = nameCategories;
        this.images = images;
        this.page = this.init();
        this.cardsCategories = this.page.querySelectorAll('.category-wrap');
    }
    HomePage.prototype.init = function () {
        return this.createCategorys(this.nameCategories, this.images);
    };
    HomePage.prototype.createCategorys = function (categories, images) {
        return cards_1.cards.createCategorys(categories, images);
    };
    HomePage.prototype.changeFacade = function (typeGame) {
        this.cardsCategories.forEach(function (card) {
            var headerCard = card.querySelector('.category-header');
            if (typeGame === 'train') {
                headerCard.classList.remove('play');
                headerCard.classList.add('train');
            }
            else {
                headerCard.classList.remove('train');
                headerCard.classList.add('play');
            }
        });
    };
    return HomePage;
}());
exports["default"] = HomePage;
