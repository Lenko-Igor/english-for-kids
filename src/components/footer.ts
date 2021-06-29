import { element } from './element'

class Footer {
  constructor() {}

  create(): HTMLElement {
    const footer: HTMLElement = element.create('footer', 'footer', ['footer'])
    footer.insertAdjacentHTML('afterbegin', `
      <a class="footer-git" 
        href="https://github.com/Lenko-Igor" 
        title="GitHub" 
        target="_blank">
      </a> 
      <div class="footer-rsschool">
        <p class="footer-rsschool__year">2021</p>
        <a class="footer-rsschool__img" 
          href="https://rs.school/js/" 
          title="rsschool" target="_blank">
        </a>
      </div>
    `)
    return footer
  }
}

export const footer: Footer = new Footer()