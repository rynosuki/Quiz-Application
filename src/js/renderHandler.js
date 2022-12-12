/**
 *
 */
export default class renderHandler {
  /**
   * Creates a new renderHandler.
   *
   * @param {number} state The state of the game.
   */
  constructor (state) {
    this.workDiv = document.getElementsByClassName('Main')[0]
    this.state = state
    this.renderLeaderboardButton()
    this.showLeaderboard = false
  }

  /**
   * Render home screen.
   */
  renderStart () {
    const createRender = this.createElement({ type: 'div', className: 'Information-Wrapper' })
    createRender.append(this.createElement({ type: 'h1', innerHTML: 'Welcome to Quiz' }))
    createRender.append(this.createElement({ type: 'button', id: 'Event-Button', innerHTML: 'Start' }))

    this.workDiv.innerHTML = createRender.outerHTML

    document.getElementById('Event-Button').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.NameChoice))
  }

  /**
   * Renders the enter name screen.
   */
  renderNameRequest () {
    const createRender = this.createElement({ type: 'div', className: 'Information-Wrapper' })
    createRender.append(this.createElement({ type: 'h1', innerHTML: 'Enter your name:' }))
    createRender.append(this.createElement({ type: 'input', style: 'text', id: 'Input-Text', name: 'answer' }))
    createRender.append(this.createElement({ type: 'button', id: 'Event-Submit', innerHTML: 'Submit' }))

    this.workDiv.innerHTML = createRender.outerHTML

    document.getElementById('Event-Submit').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.Question))
  }

  /**
   * Renders the question and its answers.
   *
   * @param {string} question The question to be rendered.
   * @param {object} data The answers to be rendered.
   */
  renderQuestion (question, data) {
    const holdDiv = this.createElement({ type: 'div' })
    let createRender = this.createElement({ type: 'div', className: 'Information-Wrapper' })
    createRender.append(this.createElement({ type: 'h1', innerHTML: question }))
    createRender.append(this.createElement({ type: 'p', id: 'timer', innerHTML: 'Time left: 10' }))
    holdDiv.append(createRender)

    createRender = this.createElement({ type: 'div', className: 'Form-Wrapper' })
    const formDetails = this.createElement({ type: 'form', className: 'Form-Details' })
    formDetails.append(this.renderAnswers(data))
    formDetails.append(this.createElement({ type: 'button', id: 'Event-Submit', innerHTML: 'Submit' }))
    createRender.appendChild(formDetails)
    holdDiv.append(createRender)

    this.workDiv.innerHTML = holdDiv.outerHTML

    document.getElementById('Event-Submit').addEventListener(
      'click', e => {
        e.preventDefault()
        this.state.changeState(this.state.gameStates.Answered)
      })
  }

  /**
   * Renders answered screen.
   */
  renderAnswered () {
    const createRender = this.createElement({ type: 'div', className: 'Information-Wrapper' })
    createRender.append(this.createElement({ type: 'h1', innerHTML: 'You answered correctly!' }))
    createRender.append(this.createElement({ type: 'button', id: 'Event-Submit', innerHTML: 'Next Question' }))

    this.workDiv.innerHTML = createRender.outerHTML

    document.getElementById('Event-Submit').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.Question))
  }

  /**
   * Renders the game lost screen.
   */
  renderGameLost () {
    const createRender = this.createElement({ type: 'div', className: 'Information-Wrapper' })
    createRender.append(this.createElement({ type: 'h1', innerHTML: 'You lost!' }))
    createRender.append(this.createElement({ type: 'button', id: 'Event-Submit', innerHTML: 'Restart' }))

    this.workDiv.innerHTML = createRender.outerHTML

    document.getElementById('Event-Submit').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.Start))
  }

  /**
   * Renders the game won screen.
   *
   * @param {number} timeTaken The time taken to complete the game.
   */
  renderGameWon (timeTaken) {
    const createRender = this.createElement({ type: 'div', className: 'Information-Wrapper' })
    createRender.append(this.createElement({ type: 'h1', innerHTML: 'You won in ' + timeTaken + ' seconds' }))
    createRender.append(this.createElement({ type: 'button', id: 'Event-Submit', innerHTML: 'Play again!' }))

    this.workDiv.innerHTML = createRender.outerHTML

    document.getElementById('Event-Submit').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.Start))
  }

  /**
   * Renders the leaderboard button.
   */
  renderLeaderboardButton () {
    const leaderBoardButton = document.getElementsByClassName('Leaderboard')[0]
    leaderBoardButton.addEventListener('click', e => {
      this.renderLeaderboard()
    })
  }

  /**
   * Renders the leaderboard.
   */
  renderLeaderboard () {
    const workDiv = this.createElement({ type: 'div', className: 'leaderBoard' })
    const storage = JSON.parse(localStorage.getItem('topList'))
    workDiv.append(this.createElement({ type: 'h1', innerHTML: 'Leaderboard' }))
    for (let i = 0; i < storage.length; i++) {
      workDiv.append(this.createElement({
        type: 'p',
        innerHTML: (i + 1) + '. ' + storage[i].name + ' - ' + storage[i].score
      }))
    }

    const leaderboard = document.getElementsByClassName('Show-Leaderboard')[0]
    const leaderBoardButton = document.getElementsByClassName('Leaderboard')[0]
    if (!this.showLeaderboard) {
      leaderboard.appendChild(workDiv)
      this.showLeaderboard = !this.showLeaderboard
      leaderBoardButton.className = 'Leaderboard active'
    } else {
      let child = leaderboard.lastElementChild
      while (child) {
        leaderboard.removeChild(child)
        child = leaderboard.lastElementChild
      }
      this.showLeaderboard = !this.showLeaderboard
      leaderBoardButton.className = 'Leaderboard'
    }
  }

  /**
   * Renders the answers.
   *
   * @param {object} data The answers to be rendered.
   * @returns {object} The answers.
   */
  renderAnswers (data = undefined) {
    if (data === undefined) {
      return this.createElement({ type: 'input', style: 'text', id: 'input', name: 'answer' })
    } else {
      const tempDiv = this.createElement({ type: 'div' })
      for (const i of Object.keys(data)) {
        const workDiv = this.createElement({ type: 'div', id: 'answerDiv' })
        workDiv.append(this.createElement({
          type: 'label',
          innerHTML: data[i],
          htmlFor: i
        }))
        workDiv.append(this.createElement({
          type: 'input',
          style: 'radio',
          name: 'answer',
          id: i,
          value: i
        }))
        tempDiv.append(workDiv)
      }
      return tempDiv
    }
  }

  /**
   * Creates an element with the given data.
   *
   * @param {object} elementData - Containing parameters for element creation. Possible params include.
   * @param {string} elementData.type - Element type, e.g. 'div', 'button'.
   * @param {string} elementData.style - Type of element, e.g. 'radio', 'checkbox'.
   * @param {string} elementData.id - Id of element.
   * @param {string} elementData.innerHTML - HTML content of element.
   * @param {string} elementData.value - Value inside of element.
   * @param {string} elementData.name - Name of element.
   * @param {string} elementData.className - Class of DOM object.
   * @param {HTMLElement} elementData.htmlFor - Id for the binding of element.
   * @returns {HTMLElement} - Full element with its data.
   */
  createElement (elementData) {
    const tempElement = document.createElement(elementData.type)
    if (elementData.style !== undefined) {
      tempElement.type = elementData.style
    }
    if (elementData.id !== undefined) {
      tempElement.id = elementData.id
    }
    if (elementData.innerHTML !== undefined) {
      tempElement.innerHTML = elementData.innerHTML
    }
    if (elementData.value !== undefined) {
      tempElement.value = elementData.value
    }
    if (elementData.name !== undefined) {
      tempElement.name = elementData.name
    }
    if (elementData.className !== undefined) {
      tempElement.className = elementData.className
    }
    if (elementData.htmlFor !== undefined) {
      tempElement.htmlFor = elementData.htmlFor
    }
    return tempElement
  }
}
