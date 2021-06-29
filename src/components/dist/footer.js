"use strict";
exports.__esModule = true;
exports.footer = void 0;
var element_1 = require("./element");
var Footer = /** @class */ (function () {
    function Footer() {
    }
    Footer.prototype.create = function () {
        var footer = element_1.element.create('footer', 'footer', ['footer']);
        footer.insertAdjacentHTML('afterbegin', "\n    <a class=\"footer-git\" href=\"https://github.com/Lenko-Igor\" title=\"GitHub\" target=\"_blank\"></a> \n    <div class=\"footer-rsschool\">\n      <p class=\"footer-rsschool__year\">2021</p>\n      <a class=\"footer-rsschool__img\" href=\"https://rs.school/js/\" title=\"rsschool\" target=\"_blank\"></a>\n    </div>\n    ");
        return footer;
    };
    return Footer;
}());
exports.footer = new Footer();
