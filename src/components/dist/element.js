"use strict";
exports.__esModule = true;
exports.element = void 0;
var Element = /** @class */ (function () {
    function Element() {
    }
    Element.prototype.create = function (tagName, id, classes) {
        var _a;
        var element = document.createElement(tagName);
        if (id)
            element.id = id;
        if (classes)
            (_a = element.classList).add.apply(_a, classes);
        return element;
    };
    Element.prototype.createLink = function (path, id, classes) {
        var _a;
        var element = document.createElement('a');
        if (id)
            element.id = id;
        if (classes)
            (_a = element.classList).add.apply(_a, classes);
        element.href = path;
        return element;
    };
    Element.prototype.createButton = function (id, title, classes) {
        var _a;
        var button = document.createElement('button');
        button.id = id;
        button.insertAdjacentHTML('afterbegin', "<p class=\"" + id + "-title\">" + title + "</p>");
        if (classes)
            (_a = button.classList).add.apply(_a, classes);
        return button;
    };
    return Element;
}());
exports.element = new Element();
