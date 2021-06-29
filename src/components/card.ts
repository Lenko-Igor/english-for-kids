import '../styles/card/card.css'
import { element } from './element'
import { CardData } from './types'

class Card {
  constructor() { }

  createCard(card: CardData): HTMLElement {
    const cardWrap: HTMLElement = element.create('div', '', ['card-container'])
    const plug: HTMLElement = element.create('div', `${card.word}-plug`, ['card-plug'])

    cardWrap.insertAdjacentElement('afterbegin', this.card(card))
    cardWrap.insertAdjacentElement('afterbegin', plug)

    return cardWrap
  }

  createCategory(category: string, img: string): HTMLElement {
    return this.category(category, img)
  }

  card(card: CardData): HTMLElement {
    const feild: HTMLElement = element.create('div', card.word, ['card-wrap'])
    feild.insertAdjacentHTML('afterbegin', `
      <div class="card front">
        <div class="card-img" 
          style="background: url('assets/${card.image}') no-repeat center">
        </div>
        <div class="card-footer visible">
          <h2 class="card-description">${card.word}</h2>
          <div id="turn" class="card-turn"></div>  
        </div>
      </div>
      <div class="card back">
        <div class="card-img" 
          style="background: url('assets/${card.image}') no-repeat center">
        </div>
        <h2 class="card-description">${card.translation}</h2>
      </div>
    `)

    const turn: HTMLElement = feild.querySelector('#turn') as HTMLElement

    turn.addEventListener('click', () => {
      toggle()
      feild.addEventListener('mouseleave', toggle)
    })

    function toggle() {
      feild.removeEventListener('mouseleave', toggle)
      feild.classList.toggle('rotate')
    }

    return feild
  }

  category(category: string, img: string): HTMLElement {
    const categoryFeild: HTMLElement = element.create('div', category, ['category-wrap'])
    categoryFeild.insertAdjacentHTML('afterbegin', `
      <div class="category-header train">
        <div class="category-img" 
          style="background: url('../src/assets/${img}') no-repeat center; background-size: cover">
        </div>
      </div>
      <div class="category-footer">
        <h2 class="category-title">${category}</h2>
      </div>
    `)
    return categoryFeild
  }

}

export const card: Card = new Card()