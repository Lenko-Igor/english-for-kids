"use strict";
exports.__esModule = true;
exports.header = void 0;
require("../styles/header/header.css");
var element_1 = require("./element");
var Header = /** @class */ (function () {
    function Header() {
        this.menuModal = element_1.element.create('div', 'modal', ['sideBar-modal']);
        this.sideBar = element_1.element.create('div', 'sideBar', ['sideBar-wrap']);
        this.menu = element_1.element.create('ul', '', ['sideBar']);
        this.buttonMenu = element_1.element.create('div', '', ['menu-button']);
        this.buttonLogin = element_1.element.create('div', 'login', ['sideBar-login']);
        this.selector = element_1.element.create('label', '', ['switch-label', 'switch-label__train']);
    }
    Header.prototype.create = function (listCategories) {
        var header = element_1.element.create('header', '', ['header']);
        header.insertAdjacentElement('afterbegin', this.getSwitch());
        header.insertAdjacentElement('afterbegin', this.getMenuButton());
        header.insertAdjacentElement('afterbegin', this.getSideBar(listCategories));
        return header;
    };
    Header.prototype.getSwitch = function () {
        var switchWrap = element_1.element.create('div', '', ['switch-wrap']);
        var switchCheckbox = element_1.element.create('input', 'switch', ['switch-checkbox']);
        var switchLever = element_1.element.create('div', '', ['switch-lever', 'switch-lever__train']);
        switchCheckbox.setAttribute('type', 'checkbox');
        this.selector.setAttribute('for', 'switch');
        this.selector.insertAdjacentElement('afterbegin', switchLever);
        this.selector.insertAdjacentElement('afterbegin', switchCheckbox);
        switchWrap.insertAdjacentElement('afterbegin', this.selector);
        return switchWrap;
    };
    Header.prototype.getMenuButton = function () {
        var menu = element_1.element.create('div', '', ['header-menu']);
        this.buttonMenu.insertAdjacentHTML('afterbegin', "\n      <i class=\"menu-icon fas fa-bars\"></i>\n      <i class=\"menu-icon far fa-window-close hidden\"></i>\n    ");
        menu.insertAdjacentElement('afterbegin', this.buttonMenu);
        return menu;
    };
    Header.prototype.getSideBar = function (list) {
        var _this = this;
        list.push('Main Page');
        list.forEach(function (elem) {
            var li = element_1.element.create('li', '', ['sideBar-row']);
            li.insertAdjacentElement('afterbegin', _this.getLinkSideBar(elem));
            _this.menu.insertAdjacentElement('afterbegin', li);
        });
        this.sideBar.insertAdjacentElement('afterbegin', this.getLoginButton());
        this.sideBar.insertAdjacentElement('afterbegin', this.menu);
        this.menuModal.insertAdjacentElement('afterbegin', this.sideBar);
        return this.menuModal;
    };
    Header.prototype.getLinkSideBar = function (text) {
        var link = element_1.element.createLink('#cards', text, ['sideBar-link']);
        if (text === 'Main Page')
            link.classList.add('selected');
        link.innerHTML = text;
        return link;
    };
    Header.prototype.getLoginButton = function () {
        this.buttonLogin.insertAdjacentHTML('afterbegin', "\n      <p class=\"sideBar-login__title\">Login</p>\n    ");
        return this.buttonLogin;
    };
    Header.prototype.toMarkSelectedItemSideBar = function (nameItem) {
        var links = this.menu.querySelectorAll('.sideBar-link');
        links.forEach(function (link) {
            if (link.classList.contains('selected')) {
                link.classList.remove('selected');
            }
            if (link.id === nameItem) {
                link.classList.add('selected');
            }
        });
    };
    Header.prototype.changeFacade = function (typeGame) {
        if (typeGame === 'play') {
            this.selector.classList.remove('switch-label__train');
            this.selector.classList.add('switch-label__play');
            this.sideBar.style.background = 'linear-gradient(180deg, #ffd86f 0%, #fc6262 100%)';
        }
        else {
            this.selector.classList.add('switch-label__train');
            this.selector.classList.remove('switch-label__play');
            this.sideBar.style.background = 'linear-gradient(180deg, #0099AE 0%, #00BF82 100%)';
        }
    };
    Header.prototype.toOpenColoseModalMenu = function () {
        var icons = document.querySelectorAll('.menu-icon');
        icons.forEach(function (icon) {
            icon.classList.toggle('hidden');
        });
        this.menuModal.classList.toggle('visible');
        this.sideBar.classList.toggle('open');
    };
    return Header;
}());
exports.header = new Header();
