"use strict";
exports.__esModule = true;
exports.cards = void 0;
var element_1 = require("./element");
var card_1 = require("./card");
var Cards = /** @class */ (function () {
    function Cards() {
        this.sectionCategories = element_1.element.create('section', '', ['categories']);
        this.sectionCards = element_1.element.create('section', '', ['cards']);
    }
    Cards.prototype.createCards = function (cards) {
        this.sectionCards.innerHTML = '';
        this.getCards(cards, this.sectionCards);
        return this.sectionCards;
    };
    Cards.prototype.createCategorys = function (categoriesData, images) {
        var _this = this;
        categoriesData.forEach(function (props, i) {
            var img = images[i];
            _this.sectionCategories.insertAdjacentElement('afterbegin', card_1.card.createCategory(props, img));
        });
        return this.sectionCategories;
    };
    Cards.prototype.getCards = function (cards, container) {
        var reverseCardsData = cards.reverse();
        reverseCardsData.forEach(function (props) { return container.insertAdjacentElement('afterbegin', card_1.card.createCard(props)); });
    };
    return Cards;
}());
exports.cards = new Cards();
