import '../styles/buttonGame/buttonGame.css'
import { element } from './element'

class ButtonGame {
  public feild: HTMLElement
  public start: HTMLButtonElement
  public repeat: HTMLButtonElement
  constructor() {
    this.feild = element.create('div', '', ['feild-button-game'])
    this.start = element.createButton('start', 'start game', ['button-game', 'startGame'])
    this.repeat = element.createButton('repeat', '', ['button-game', 'repeatGame'])
  }

  init(typeGame: string): HTMLElement {
    this.renderButtons(typeGame)
    this.repeat.innerHTML = `<i class="fas fa-redo-alt"></i>`
    this.feild.insertAdjacentElement('afterbegin', this.start)
    this.feild.insertAdjacentElement('afterbegin', this.repeat)

    return this.feild
  }

  renderButtons(typeGame: string) {
    if (typeGame === 'train') {
      this.start.classList.add('novisible')
      this.repeat.classList.add('novisible')
    } else {
      this.start.classList.remove('novisible')
      this.repeat.classList.add('novisible')
    }
  }

  clickStartButton() {
    this.start.classList.add('novisible')
    this.repeat.classList.remove('novisible')
  }
}

export const buttonGame: ButtonGame = new ButtonGame()