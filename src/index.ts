import './styles/main/main.css'
import { app } from './app'


document.addEventListener('DOMContentLoaded', () => {
  const body: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement
  body.insertAdjacentElement('afterbegin', app)
})

