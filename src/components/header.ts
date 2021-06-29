import '../styles/header/header.css'
import { element } from './element'

class Header {
  public menuModal: HTMLElement
  public sideBar: HTMLElement
  public menu: HTMLElement
  public buttonMenu: HTMLElement
  public buttonLogin: HTMLElement
  public selector: HTMLElement
  
  constructor() {
    this.menuModal = element.create('div', 'modal', ['sideBar-modal'])
    this.sideBar = element.create('div', 'sideBar', ['sideBar-wrap'])
    this.menu = element.create('ul', '', ['sideBar'])
    this.buttonMenu = element.create('div', '', ['menu-button'])
    this.buttonLogin = element.create('div', 'login', ['sideBar-login'])
    this.selector = element.create('label', '', ['switch-label', 'switch-label__train'])
  }  

  create(listCategories: string[]): HTMLElement {
    const header: HTMLElement = element.create('header', '', ['header'])
    
    header.insertAdjacentElement('afterbegin', this.getSwitch())
    header.insertAdjacentElement('afterbegin', this.getMenuButton())
    header.insertAdjacentElement('afterbegin', this.getSideBar(listCategories))

    return header
  }

  getSwitch(): HTMLElement {
    const switchWrap: HTMLElement = element.create('div', '', ['switch-wrap'])
    const switchCheckbox: HTMLElement = element.create('input', 'switch', ['switch-checkbox'])
    const switchLever: HTMLElement = element.create('div', '', ['switch-lever', 'switch-lever__train'])

    switchCheckbox.setAttribute('type', 'checkbox') 
    this.selector.setAttribute('for', 'switch')
    this.selector.insertAdjacentElement('afterbegin', switchLever)
    this.selector.insertAdjacentElement('afterbegin', switchCheckbox)
    switchWrap.insertAdjacentElement('afterbegin', this.selector)
    
    return switchWrap
  }

  getMenuButton(): HTMLElement {
    const menu: HTMLElement = element.create('div', '', ['header-menu'])
    
    this.buttonMenu.insertAdjacentHTML('afterbegin', `
      <i class="menu-icon fas fa-bars"></i>
      <i class="menu-icon far fa-window-close hidden"></i>
    `)
    menu.insertAdjacentElement('afterbegin', this.buttonMenu)

    return menu
  }

  getSideBar(list: string[]): HTMLElement {
    list.push('Main Page')
    
    list.forEach(elem => {
      const li: HTMLElement = element.create('li', '', ['sideBar-row'])
      li.insertAdjacentElement('afterbegin', this.getLinkSideBar(elem))
      this.menu.insertAdjacentElement('afterbegin', li)
    })
    this.sideBar.insertAdjacentElement('afterbegin', this.getLoginButton())
    this.sideBar.insertAdjacentElement('afterbegin', this.menu)
    this.menuModal.insertAdjacentElement('afterbegin', this.sideBar)

    return this.menuModal
  }

  getLinkSideBar(text: string): HTMLAnchorElement {
    const link: HTMLAnchorElement = element.createLink('#cards', text, ['sideBar-link'])
    
    if (text === 'Main Page') link.classList.add('selected')
    link.innerHTML = text
    
    return link
  }

  getLoginButton(): HTMLElement {
    this.buttonLogin.insertAdjacentHTML('afterbegin', `
      <p class="sideBar-login__title">Login</p>
    `)
    
    return this.buttonLogin
  }

  toMarkSelectedItemSideBar(nameItem: string) {
    const links: NodeListOf<Element> = this.menu.querySelectorAll('.sideBar-link')

    links.forEach(link => {
      if (link.classList.contains('selected')) {
        link.classList.remove('selected')
      }
      if(link.id === nameItem) {
        link.classList.add('selected')
      }
    })
  }

  changeFacade(typeGame: string) {
    if (typeGame === 'play') {
      this.selector.classList.remove('switch-label__train')
      this.selector.classList.add('switch-label__play')
      this.sideBar.style.background = 'linear-gradient(180deg, #ffd86f 0%, #fc6262 100%)'
    } else {
      this.selector.classList.add('switch-label__train')
      this.selector.classList.remove('switch-label__play')
      this.sideBar.style.background = 'linear-gradient(180deg, #0099AE 0%, #00BF82 100%)'
    }
  }

  toOpenColoseModalMenu() {
    const icons: NodeListOf<Element> = document.querySelectorAll('.menu-icon')
    
    icons.forEach(icon => {
      icon.classList.toggle('hidden')
    })
    this.menuModal.classList.toggle('visible')
    this.sideBar.classList.toggle('open')
  }
}

export const header: Header = new Header()