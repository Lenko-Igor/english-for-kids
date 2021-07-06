import HomePage from './pages/homePage' 
import CardsPage from './pages/cardsPage'
import Statistics from './pages/statistics'
import { header } from './components/header'
import { footer } from './components/footer'
import { cardsData } from './components/cards-data'
import { CardData, Score, StatisticData } from './components/types'
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

  showCardsPage(cardsPage: CardsPage) {
    this.main.innerHTML = ''
    this.main.insertAdjacentElement('afterbegin', cardsPage.page)
  }

  showStatisticPage(statistic: HTMLElement) {
    this.main.innerHTML = ''
    this.main.insertAdjacentElement('afterbegin', statistic)
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
  readonly statistic: Statistics
  private typeGame: string
  private itemName: string
  private play: boolean
  private randomIndex: number
  private randomCardsProps?: CardData[]
  private score: Score
  private statisticData: StatisticData[]
  private nameLocalStorage: string

  constructor(view: View) {
    this.view = view
    this.categories = cardsData[0] as string[]
    this.cards = cardsData.filter((elem, i) => (i)) as (CardData[])[]
    this.cardsProps = []
    this.images = this.cards.map(arr => arr[0].image)
    this.homePage = new HomePage(this.categories, this.images)
    this.statistic = new Statistics()
    this.cardsPage
    this.typeGame = 'train'
    this.itemName = 'Main Page'
    this.nameLocalStorage = 'myEnglishKids'
    this.statisticData = JSON.parse(localStorage.getItem(this.nameLocalStorage) as string) ?? this.resetStatisticData() 
    // === for play game
    this.play = false
    this.randomIndex = 0
    this.randomCardsProps 
    this.score = {correct: 0, error: 0}
    this.init()
  }

  init() {
    this.view.init(this.categories)
    window.location.hash = "#home";
    this.updateState()
  }

  resetStatisticData(): StatisticData[] {
    const data: StatisticData[] = []

    this.categories.forEach((category, i) => {
      this.cards[i].forEach(card => {
        const props: StatisticData = {
          category: category,
          word: card.word,
          translation: card.translation,
          trained: 0,
          correct: 0,
          incorrect: 0,
          proportion: 0
        }
        data.push(props)
      })
    })
    return data
  }

  getHomePage(itemName: string) {
    this.homePage.changeFacade(this.typeGame)
    this.view.showHomePage(this.homePage, this.typeGame)
    header.toMarkSelectedItemSideBar(itemName)
  }

  getCardsPage(itemName: string | CardData[]) {
    if (typeof itemName === 'string') {
      this.cardsProps = this.getCardsProps(itemName)
      this.cardsPage = new CardsPage(this.cardsProps, this.typeGame)
      if (this.cardsProps){
        //create copy of cardsProps for play random audio
        this.randomCardsProps = this.cardsProps.slice()
      }
      this.view.showCardsPage(this.cardsPage)
      header.toMarkSelectedItemSideBar(itemName)
    } else {
      this.cardsProps = itemName
      this.cardsPage = new CardsPage(this.cardsProps, this.typeGame)
      if (this.cardsProps){
        //create copy of cardsProps for play random audio
        this.randomCardsProps = this.cardsProps.slice()
      }
      this.view.showCardsPage(this.cardsPage)
    }
  }

  getStatisticPage() {
    this.view.showStatisticPage(this.statistic.createStatistics(this.statisticData))
    header.toMarkSelectedItemSideBar(this.itemName)
  }

  getCardsProps(nameCategory: string): CardData[] {
    const index: number = this.categories.indexOf(nameCategory)
    return this.cards[index]
  }

  toOpenColoseModalMenu() {
    header.toOpenColoseModalMenu()
  }

  clickItemMenu(itemName: string) {
    this.itemName = itemName
    this.updateState()
  }

  updateState() {
    const hash: string = window.location.hash
    if (hash === '#home') {
      this.getHomePage(this.itemName)
    } else if (hash === '#statistics') {
      this.getStatisticPage()
    } else {
      this.getCardsPage(this.itemName)
    }

  }

  selectTypeGame(selection: boolean) {
    this.stopGame()
    this.typeGame = (selection)? 'play' : 'train';
    header.changeFacade(this.typeGame)
    this.homePage.changeFacade(this.typeGame)
    if (this.cardsPage) {
      this.cardsPage.renderPage(this.typeGame)
    }
  }

  clickCard(title: string) {
    if (this.typeGame === 'train') {
      const item: StatisticData = this.statisticData.filter(e => e.word === title)[0]
      item.trained++
      this.cardsPage?.playAudioTrain(title)
    } 
    if (this.play) this.checkCard(title)
  }

  checkCard(title: string) {
    if (this.randomCardsProps) {
      const randomTitle: string = this.randomCardsProps[this.randomIndex].word
      
      if (randomTitle === title) {
        new Audio(`assets/audio/correct.mp3`).play()
        this.cardsPage?.openPlugCard(title)
        this.cardsPage?.showStar('correct')
        this.randomCardsProps.splice(this.randomIndex, 1)
        this.setScore('correct', title)
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
        this.setScore('error', randomTitle)
      }
    }
  }

  setScore(result: string, title: string) {
    const item: StatisticData = this.statisticData.filter(e => e.word === title)[0]
    if (result === 'correct') {
      this.score.correct++
      item.correct++
      item.proportion = Math.floor(item.correct*100 / (item.correct + item.incorrect))
    } else {
      this.score.error++
      item.incorrect++
    }
  }

  startGame() {
    this.play = true
    this.cardsPage?.changeStyleStartButton()
    this.randomPlayAudio()
  }

  stopGame() {
    this.play = false
    if (this.cardsProps) {
      this.randomCardsProps = this.cardsProps.slice()      
    }
    this.cardsPage?.clearStars()
    this.score = {correct: 0, error: 0}
    localStorage.setItem(this.nameLocalStorage, JSON.stringify(this.statisticData))
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

  resetStatistic() {
    this.statisticData.forEach(item => {
      item.trained = 0
      item.correct = 0
      item.incorrect = 0
      item.proportion = 0
    })
    this.getStatisticPage()
    localStorage.setItem(this.nameLocalStorage, JSON.stringify(this.statisticData))
  }

  repeatDifficultWords() {
    const cardsProps: CardData[] = []
    const filterProportionStatistic: StatisticData[] = this.statisticData.filter((item) => {
      return (item.proportion > 0 && item.proportion < 100)
    })
    const sortProportion: StatisticData[] = this.statistic.sortAscending(filterProportionStatistic, 'proportion')
    
    if (sortProportion.length > 8) {
      sortProportion.splice(8)
    }
        
    sortProportion.forEach((item, i) => {
      const data: CardData[] = this.getCardsProps(item.category)
      const prop: CardData = data.filter(elem => elem.word === item.word)[0]
      cardsProps.push(prop)
    })

    this.getCardsPage(cardsProps)
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
    window.addEventListener("hashchange", () => {
      this.model.updateState()
      if(this.model.cardsPage?.cards) {
        this.setEventsOnCards()
      }
    })
    this.setEventsOnHeader()
    this.setEventsOnCategories()
    this.setEventsOnStartButton()
    this.setEvebtsOnStatisticButton()
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
      this.model.clickItemMenu(item.id)
      const hash: string = window.location.hash

      if (hash === '#cards') {
        this.setEventsOnCards()
      }
    }))

    const checkbox: HTMLInputElement = selector.querySelector('#switch') as HTMLInputElement
    checkbox.addEventListener('change', () => {
      this.model.selectTypeGame(checkbox.checked)
    })
  }

  setEventsOnCategories() {
    this.categories.forEach(category => {
      category.addEventListener('click', () => {
        this.model.clickItemMenu(category.id)
      })
    })
  }

  setEventsOnCards() {
    if (this.model.cardsPage) {
      const page: CardsPage = this.model.cardsPage as CardsPage
      page.cards.forEach(card => {
        card.addEventListener('click', () => {
          if (!card.classList.contains('rotate')) {
            this.model.clickCard(card.id)
          }
        })
      })
    }
  }

  setEventsOnStartButton() {
    buttonGame.start.addEventListener('click', () => {
      this.model.startGame()
    })

    buttonGame.repeat.addEventListener('click', () => {
      this.model.repeatPlayAudio()
    })
  }

  setEvebtsOnStatisticButton() {
    this.model.statistic.reset.addEventListener('click', () => this.model.resetStatistic())
    this.model.statistic.repeat.addEventListener('click', () => {
      this.model.repeatDifficultWords()
      this.setEventsOnCards()
    })
  }
}


const view: View = new View(wrap)
const model: Model = new Model(view)
const controller: Controller = new Controller(wrap, model)

export const app: HTMLElement = view.app

