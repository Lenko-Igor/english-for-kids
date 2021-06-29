"use strict";
exports.__esModule = true;
exports.card = void 0;
require("../styles/card/card.css");
var element_1 = require("./element");
var Card = /** @class */ (function () {
    function Card() {
    }
    Card.prototype.createCard = function (card) {
        var cardWrap = element_1.element.create('div', '', ['card-container']);
        var plug = element_1.element.create('div', card.word + "-plug", ['card-plug']);
        cardWrap.insertAdjacentElement('afterbegin', this.card(card));
        cardWrap.insertAdjacentElement('afterbegin', plug);
        return cardWrap;
    };
    Card.prototype.createCategory = function (category, img) {
        return this.category(category, img);
    };
    Card.prototype.card = function (card) {
        var feild = element_1.element.create('div', card.word, ['card-wrap']);
        feild.insertAdjacentHTML('afterbegin', "\n      <div class=\"card front\">\n        <div class=\"card-img\" \n          style=\"background: url('../src/assets/" + card.image + "') no-repeat center\">\n        </div>\n        <div class=\"card-footer visible\">\n          <h2 class=\"card-description\">" + card.word + "</h2>\n          <div id=\"turn\" class=\"card-turn\"></div>  \n        </div>\n      </div>\n      <div class=\"card back\">\n        <div class=\"card-img\" \n          style=\"background: url('../src/assets/" + card.image + "') no-repeat center\">\n        </div>\n        <h2 class=\"card-description\">" + card.translation + "</h2>\n      </div>\n    ");
        var turn = feild.querySelector('#turn');
        turn.addEventListener('click', function () {
            toggle();
            feild.addEventListener('mouseleave', toggle);
        });
        function toggle() {
            feild.removeEventListener('mouseleave', toggle);
            feild.classList.toggle('rotate');
        }
        return feild;
    };
    Card.prototype.category = function (category, img) {
        var categoryFeild = element_1.element.create('div', category, ['category-wrap']);
        categoryFeild.insertAdjacentHTML('afterbegin', "\n      <div class=\"category-header train\">\n        <div class=\"category-img\" \n          style=\"background: url('../src/assets/" + img + "') no-repeat center; background-size: cover\">\n        </div>\n      </div>\n      <div class=\"category-footer\">\n        <h2 class=\"category-title\">" + category + "</h2>\n      </div>\n    ");
        return categoryFeild;
    };
    return Card;
}());
exports.card = new Card();
