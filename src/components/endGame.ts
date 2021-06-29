import '../styles/endGame/endGame.css'
import { element } from './element'

class EndGame {
  constructor() {}

  getPage(count: number): HTMLElement {
    const elem: HTMLElement = element.create('div', '', ['end-game'])
    if (!count) {
      elem.insertAdjacentHTML('afterbegin', `
      <div class="end-game__img end-game__img-success"></div>
    `)
    } else {
      elem.insertAdjacentHTML('afterbegin', `
      <div class="end-game__wrap">
        <h2 class="end-game__title">Errors: ${count}</h2>
        <div class="end-game__img end-game__img-failure"></div>      
      </div>
    `)
    }

    return elem
  }
}

export const endGame: EndGame = new EndGame()