import '../styles/stars/stars.css'
import { element } from "./element";

class Stars {
  public feild: HTMLElement

  constructor() {
    this.feild = element.create('div', '', ['feild-stars'])
  }

  createStar(props: string): HTMLImageElement {
    const starWrap: HTMLElement = element.create('div', '', ['star'])
    const star: HTMLImageElement = document.createElement('img')
    if (props === 'correct') {
      star.src = 'assets/icons/star-win.svg'
      star.alt = 'starWin'
    } else {
      star.src = 'assets/icons/star.svg'
      star.alt = 'star'
    }
    starWrap.insertAdjacentElement('afterbegin', star)
    return star
  }

  addStar(props: string) {
    this.feild.insertAdjacentElement('beforeend', this.createStar(props))
  }

  clearStarsFeild() {
    this.feild.innerHTML = ''
  }
}

export const stars: Stars = new Stars()