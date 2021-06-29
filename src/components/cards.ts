import { element } from './element'
import { card } from './card'
import { CardData } from './types'

class Cards {
  private sectionCategories: HTMLElement
  private sectionCards: HTMLElement
  constructor() {
    this.sectionCategories = element.create('section', '', ['categories'])
    this.sectionCards = element.create('section', '', ['cards'])
  }

  createCards(cards: CardData[]): HTMLElement {
    this.sectionCards.innerHTML = ''
    this.getCards(cards, this.sectionCards)

    return this.sectionCards
  }

  createCategorys(categoriesData: string[], images: string[]): HTMLElement {
    categoriesData.forEach((props, i) => {
      const img: string = images[i]
      this.sectionCategories.insertAdjacentElement('afterbegin', card.createCategory(props, img))
    })

    return this.sectionCategories
  }

  getCards(cards: CardData[], container: HTMLElement) {
    const reverseCardsData: CardData[] = cards.reverse()
    reverseCardsData.forEach(props => container.insertAdjacentElement('afterbegin', card.createCard(props)))
  }
}

export const cards: Cards = new Cards()