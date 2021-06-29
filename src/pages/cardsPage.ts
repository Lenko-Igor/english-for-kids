import { cards } from '../components/cards'
import { CardData } from '../components/types'
import { element } from '../components/element'
import { buttonGame } from '../components/buttonGame'
import { stars } from '../components/stars'


export default class CardsPage {
  public page: HTMLElement
  readonly cardsProps: CardData[]
  public cards: NodeListOf<Element>
  public startButton: HTMLButtonElement
  private typeGame: string

  constructor(cardsProps: CardData[], typeGame: string) {
    this.cardsProps = cardsProps
    this.typeGame = typeGame
    this.page = this.init(this.typeGame)
    this.cards = this.page.querySelectorAll('.card-wrap')
    this.changeStyleCards(this.typeGame)
    this.startButton = element.createButton('start', 'start game', ['startButton'])
  }

  init(typeGame: string): HTMLElement {
    const wrap: HTMLElement = element.create('div', '', ['container'])

    wrap.insertAdjacentElement('afterbegin', buttonGame.init(typeGame))
    wrap.insertAdjacentElement('afterbegin', this.createCards(this.cardsProps))
    wrap.insertAdjacentElement('afterbegin', stars.feild)

    return wrap
  }

  createCards(cardsProps: CardData[]): HTMLElement {
    return cards.createCards(cardsProps)
  }

  renderPage(typeGame: string) {
    this.changeStyleCards(typeGame)
    buttonGame.renderButtons(typeGame)
    this.closePlugsCards()
  }

  changeStyleCards(typeGame: string) {
    this.cards.forEach(card => {
      const cardFooter: HTMLElement = card.querySelector('.card-footer') as HTMLElement

      if (typeGame === 'train') {
        cardFooter.classList.remove('hidden')
        cardFooter.classList.add('visible')
      } else {
        cardFooter.classList.remove('visible')
        cardFooter.classList.add('hidden')
      }
    })
  }

  openPlugCard(title: string) {
    const plug: HTMLElement = this.page.querySelector(`#${title}-plug`) as HTMLElement
    plug.classList.add('opened')
  }

  closePlugsCards() {
    const plugs: NodeListOf<Element> = this.page.querySelectorAll('.card-plug')

    plugs.forEach(plug => plug.classList.remove('opened'))
  }

  changeStyleStartButton() {
    buttonGame.clickStartButton()
  }

  playAudioTrain(title: string) {
    const linkAudio: string = this.cardsProps
      .filter(data => (data.word === title))[0].audioSrc as string

    new Audio(`assets/${linkAudio}`).play()
  }

  showStar(status: string) {
    stars.addStar(status)
  }

  clearStars() {
    stars.clearStarsFeild()
  }

}