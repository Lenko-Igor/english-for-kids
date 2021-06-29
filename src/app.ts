import HomePage from './pages/homePage'
import CardsPage from './pages/cardsPage'
import { header } from './components/header'
import { footer } from './components/footer'
import { cardsData } from './components/cards-data'
import { CardData, Score } from './components/types'
import { element } from './components/element'
import { buttonGame } from './components/buttonGame'
import { endGame } from './components/endGame'

const wrap: HTMLElement = element.create('div', 'app', ['app'])

class View {
  readonly app: HTMLElement
  readonly main: HTMLElement

  constructor(app: HTMLElement) {
    this.app = app
    this.main = element.create('main', 'main', ['main'])
  }

  init(listCategories: string[]) {
    this.app.insertAdjacentElement('afterbegin', footer.create())
    this.app.insertAdjacentElement('afterbegin', this.main)
    this.app.insertAdjacentElement('afterbegin', header.create(listCategories))
  }

  showHomePage(homePage: HomePage, typeGame: string) {
    this.main.innerHTML = ''
    this.main.insertAdjacentElement('afterbegin', homePage.page)
    window.location.hash = '#home'
  }

  showCardsPage(cardsPage: CardsPage, typeGame: string, nameCategory: string) {
    this.main.innerHTML = ''
    this.main.insertAdjacentElement('afterbegin', cardsPage.page)
    const nameHash: string = nameCategory.split(' ').join('')
    window.location.hash = `#cards/${nameHash}`
  }

  showEndGame(scoreError: number) {
    this.main.innerHTML = ''
    this.main.insertAdjacentElement('afterbegin', endGame.getPage(scoreError))
  }
}

class Model {
  private view: View
  private categories: string[]
  private cards: (CardData[])[]
  private cardsProps: CardData[]
  private images: string[]
  readonly homePage: HomePage
  public cardsPage?: CardsPage
  private typeGame: string
  private play: boolean
  private randomIndex: number
  private randomCardsProps?: CardData[]
  private score: Score

  constructor(view: View) {
    this.view = view
    this.categories = cardsData[0] as string[]
    this.cards = cardsData.filter((elem, i) => (i)) as (CardData[])[]
    this.cardsProps = []
    this.images = this.cards.map(arr => arr[0].image)
    this.homePage = new HomePage(this.categories, this.images)
    this.cardsPage
    this.typeGame = 'train'
    // === for play game
    this.play = false
    this.randomIndex = 0
    this.randomCardsProps
    this.score = { correct: 0, error: 0 }
    this.init()
  }

  init() {
    this.view.init(this.categories)
    this.view.showHomePage(this.homePage, this.typeGame)
  }

  getHomePage(itemName: string) {
    this.homePage.changeFacade(this.typeGame)
    this.view.showHomePage(this.homePage, this.typeGame,)
    header.toMarkSelectedItemSideBar(itemName)
  }

  getCardsPage(itemName: string) {
    this.cardsProps = this.getCardsProps(itemName)
    this.cardsPage = new CardsPage(this.cardsProps, this.typeGame)
    this.randomCardsProps = this.cardsProps.slice()//create copy of cardsProps for play random audio
    this.view.showCardsPage(this.cardsPage, this.typeGame, itemName)
    header.toMarkSelectedItemSideBar(itemName)
  }

  getCardsProps(nameCategory: string): CardData[] {
    const index: number = this.categories.indexOf(nameCategory)
    return this.cards[index]
  }

  toOpenColoseModalMenu() {
    header.toOpenColoseModalMenu()
  }

  clickItemMenu(itemName: string) {
    (itemName === 'Main Page')
      ? this.getHomePage(itemName)
      : this.getCardsPage(itemName)
  }

  selectTypeGame(selection: boolean) {
    this.stopGame()
    this.typeGame = (selection) ? 'play' : 'train';
    header.changeFacade(this.typeGame)
    this.homePage.changeFacade(this.typeGame)
    if (this.cardsPage) {
      this.cardsPage.renderPage(this.typeGame)
    }
  }

  selectCategory(categoryName: string) {
    this.getCardsPage(categoryName)
    header.toMarkSelectedItemSideBar(categoryName)
  }

  clickCard(title: string) {
    if (this.typeGame === 'train') this.cardsPage?.playAudioTrain(title)
    if (this.play) this.checkCard(title)
  }

  checkCard(title: string) {
    if (this.randomCardsProps && this.randomCardsProps[this.randomIndex].word === title) {
      new Audio(`assets/audio/correct.mp3`).play()
      this.cardsPage?.openPlugCard(title)
      this.cardsPage?.showStar('correct')
      this.randomCardsProps.splice(this.randomIndex, 1)
      this.setScore('correct')
      if (this.randomCardsProps.length >= 1) {
        this.randomPlayAudio()
      } else {
        (this.score.error)
          ? new Audio(`assets/audio/failure.mp3`).play()
          : new Audio(`assets/audio/success.mp3`).play()
        this.view.showEndGame(this.score.error)
        this.stopGame()
        setTimeout(() => {
          this.getHomePage('Main Page')
        }, 3000)
      }
    } else {
      new Audio(`assets/audio/error.mp3`).play()
      this.cardsPage?.showStar('')
      this.setScore('error')
    }
  }

  setScore(result: string) {
    (result === 'correct') ? this.score.correct++ : this.score.error++
  }

  startGame() {
    this.play = true
    this.cardsPage?.changeStyleStartButton()
    this.randomPlayAudio()
  }

  stopGame() {
    this.play = false
    this.randomCardsProps = this.cardsProps.slice()
    this.cardsPage?.clearStars()
    this.score = { correct: 0, error: 0 }
  }

  randomPlayAudio() {
    if (this.randomCardsProps) {
      const max: number = this.randomCardsProps.length
      this.randomIndex = Math.floor(Math.random() * (max - 0)) + 0
      const linkAudio: string = this.randomCardsProps[this.randomIndex].audioSrc
      new Audio(`assets/${linkAudio}`).play()
    }
  }

  repeatPlayAudio() {
    if (this.randomCardsProps) {
      const linkAudio: string = this.randomCardsProps[this.randomIndex].audioSrc
      new Audio(`assets/${linkAudio}`).play()
    }
  }
}

class Controller {
  readonly app: HTMLElement
  readonly model: Model
  readonly categories: NodeListOf<Element>

  constructor(app: HTMLElement, model: Model) {
    this.app = app
    this.model = model
    this.categories = this.model.homePage.cardsCategories
    this.init()
  }

  init() {
    this.setEventsOnHeader()
    this.setEventsOnCategories()
    this.setEventsOnStartButton()
  }

  setEventsOnHeader() {
    const buttonMenu: HTMLElement = header.buttonMenu
    const selector: HTMLElement = header.selector
    const menuModal: HTMLElement = header.menuModal
    const menuItems: NodeListOf<HTMLAnchorElement> = header.menu.querySelectorAll('a')

    buttonMenu.addEventListener('click', () => {
      this.model.toOpenColoseModalMenu()
    })

    menuModal.addEventListener('click', () => {
      this.model.toOpenColoseModalMenu()
    })

    menuItems.forEach(item => item.addEventListener('click', (event) => {
      event.preventDefault();
      this.model.clickItemMenu(item.id)
      this.setEventsOnCards()
    }))

    const checkbox: HTMLInputElement = selector.querySelector('#switch') as HTMLInputElement
    checkbox.addEventListener('change', () => {
      this.model.selectTypeGame(checkbox.checked)
    })
  }

  setEventsOnCategories() {
    this.categories.forEach(category => {
      category.addEventListener('click', () => {
        this.model.selectCategory(category.id)
        this.setEventsOnCards()
      })
    })

  }

  setEventsOnCards() {
    const page: CardsPage = this.model.cardsPage as CardsPage

    page.cards.forEach(card => {
      card.addEventListener('click', () => {
        if (!card.classList.contains('rotate')) {
          this.model.clickCard(card.id)
        }
      })
    })
  }

  setEventsOnStartButton() {
    buttonGame.start.addEventListener('click', () => {
      this.model.startGame()
    })

    buttonGame.repeat.addEventListener('click', () => {
      this.model.repeatPlayAudio()
    })
  }
}


const view: View = new View(wrap)
const model: Model = new Model(view)
const controller: Controller = new Controller(wrap, model)

export const app: HTMLElement = view.app

