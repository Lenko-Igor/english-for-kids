class Element {
  constructor() {}

  create(tagName: string, id?: string, classes?: string[]): HTMLElement {
    const element: HTMLElement = document.createElement(tagName)
    
    if (id) element.id = id
    if (classes) element.classList.add(...classes)

    return element
  }

  createLink( path: string, id?: string, classes?: string[]): HTMLAnchorElement {
    const element: HTMLAnchorElement = document.createElement('a')
    
    if (id) element.id = id
    if (classes) element.classList.add(...classes)
    element.href = path

    return element
  }

  createButton(id: string, title: string, classes?: string[]): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button')

    button.id = id
    button.insertAdjacentHTML('afterbegin', `<p class="${id}-title">${title}</p>`)
    if (classes) button.classList.add(...classes)

    return button
  }
}

export const element: Element = new Element()