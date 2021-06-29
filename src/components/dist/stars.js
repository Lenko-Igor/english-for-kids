"use strict";
exports.__esModule = true;
exports.stars = void 0;
require("../styles/stars/stars.css");
var element_1 = require("./element");
var Stars = /** @class */ (function () {
    function Stars() {
        this.feild = element_1.element.create('div', '', ['feild-stars']);
    }
    Stars.prototype.createStar = function (props) {
        var starWrap = element_1.element.create('div', '', ['star']);
        var star = document.createElement('img');
        if (props === 'win') {
            star.src = './star-win.svg';
            star.alt = 'starWin';
        }
        else {
            star.src = './star.svg';
            star.alt = 'star';
        }
        starWrap.insertAdjacentElement('afterbegin', star);
        return star;
    };
    Stars.prototype.addStar = function (props) {
        this.feild.insertAdjacentElement('beforeend', this.createStar(props));
    };
    return Stars;
}());
exports.stars = new Stars();
