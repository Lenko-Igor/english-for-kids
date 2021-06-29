import { cards } from '../components/cards'

export default class HomePage {
  public page: HTMLElement
  public cardsCategories: NodeListOf<Element>
  readonly nameCategories: string[]
  readonly images: string[]

  constructor(nameCategories: string[], images: string[]) {
    this.nameCategories = nameCategories
    this.images = images
    this.page = this.init()
    this.cardsCategories = this.page.querySelectorAll('.category-wrap')
  }

  init(): HTMLElement {
    return this.createCategorys(this.nameCategories, this.images)
  }

  createCategorys(categories: string[], images: string[]): HTMLElement {
    return cards.createCategorys(categories, images)
  }

  changeFacade(typeGame: string) {
    this.cardsCategories.forEach(card => {
      const headerCard: HTMLElement = card.querySelector('.category-header') as HTMLElement
      if (typeGame === 'train') {
        headerCard.classList.remove('play')
        headerCard.classList.add('train')
      } else {
        headerCard.classList.remove('train')
        headerCard.classList.add('play')
      }
    })
  }
}

