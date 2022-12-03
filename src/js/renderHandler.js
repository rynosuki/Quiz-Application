export default class renderHandler {
  constructor(state) {
    this.workDiv = document.getElementsByClassName('Main')[0]
    this.state = state
    this.renderLeaderboardButton()
    this.showLeaderboard = false
  }
  
  renderStart() {
    let createRender = this.createElement({type: 'div', className: 'Information-Wrapper'})
    createRender.append(this.createElement({type: 'h1', innerHTML: 'Welcome to Quiz'}))
    createRender.append(this.createElement({type: 'button', id: 'Event-Button', innerHTML: 'Start'}))
    
    this.workDiv.innerHTML = createRender.outerHTML

    document.getElementById('Event-Button').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.NameChoice))
  }

  renderNameRequest() {
    let createRender = this.createElement({type: 'div', className:'Information-Wrapper'})
    createRender.append(this.createElement({type: 'h1', innerHTML: 'Enter your name:'}))
    createRender.append(this.createElement({type: 'input', style: 'text', id: 'Input-Text', name: 'answer'}))
    createRender.append(this.createElement({type: 'button', id: 'Event-Submit', innerHTML: 'Submit'}))

    this.workDiv.innerHTML = createRender.outerHTML

    document.getElementById('Event-Submit').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.Question))
  }

  renderQuestion(question, data) {
    let holdDiv = this.createElement({type: 'div'})
    let createRender = this.createElement({type: 'div', className: 'Information-Wrapper'})
    createRender.append(this.createElement({type: 'h1', innerHTML: question}))
    createRender.append(this.createElement({type:'p', id: 'timer', innerHTML:'Time left: 10'}))
    holdDiv.append(createRender)

    createRender = this.createElement({type: 'div', className: 'Form-Wrapper'})
    let formDetails = this.createElement({type: 'form', className: 'Form-Details'})
    formDetails.append(this.renderAnswers(data))
    formDetails.append(this.createElement({type: 'button', id: 'Event-Submit', innerHTML: 'Submit'}))
    createRender.appendChild(formDetails)
    holdDiv.append(createRender)

    this.workDiv.innerHTML = holdDiv.outerHTML

    document.getElementById('Event-Submit').addEventListener(
      'click', e => {
        e.preventDefault()
        this.state.changeState(this.state.gameStates.Answered)
      })
  }

  renderAnswered() {
    let createRender = this.createElement({type: 'div', className: 'Information-Wrapper'})
    createRender.append(this.createElement({type: 'h1', innerHTML: 'You answered correctly!'}))
    createRender.append(this.createElement({type: 'button', id: 'Event-Submit', innerHTML: 'Next Question'}))
    
    this.workDiv.innerHTML = createRender.outerHTML

    document.getElementById('Event-Submit').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.Question))
  }

  renderGameLost() {
    let createRender = this.createElement({type: 'div', className: 'Information-Wrapper'})
    createRender.append(this.createElement({type: 'h1', innerHTML: 'You lost!'}))
    createRender.append(this.createElement({type: 'button', id: 'Event-Submit', innerHTML: 'Restart'}))
    
    this.workDiv.innerHTML = createRender.outerHTML

    document.getElementById('Event-Submit').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.Start))
  }

  renderGameWon(timeTaken) {
    let createRender = this.createElement({type: 'div', className: 'Information-Wrapper'})
    createRender.append(this.createElement({type: 'h1', innerHTML: 'You won in ' + timeTaken + " seconds"}))
    createRender.append(this.createElement({type: 'button', id: 'Event-Submit', innerHTML: 'Play again!'}))
    
    this.workDiv.innerHTML = createRender.outerHTML

    document.getElementById('Event-Submit').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.Start))
  }

  renderLeaderboardButton() {
    let leaderBoardButton = document.getElementsByClassName('Leaderboard')[0]
    leaderBoardButton.addEventListener('click', e => {
      this.renderLeaderboard()
    })
  }

  renderLeaderboard() {
    let workDiv = this.createElement({type: 'div', className: 'leaderBoard'})
    let storage = JSON.parse(localStorage.getItem('topList'))
    workDiv.append(this.createElement({type: 'h1', innerHTML: 'Leaderboard'}))
    for (let i = 0; i < 5; i++) {
      workDiv.append(this.createElement({
        type: 'p',
        innerHTML: i + ". " + storage[i].name + " - " + storage[i].value
      }))
    }
    
    let leaderboard = document.getElementsByClassName('Show-Leaderboard')[0]
    let leaderBoardButton = document.getElementsByClassName('Leaderboard')[0]
    if(!this.showLeaderboard) {
      leaderboard.appendChild(workDiv)
      this.showLeaderboard = !this.showLeaderboard
      leaderBoardButton.className = 'Leaderboard active'
    } else {
      let child = leaderboard.lastElementChild; 
        while (child) {
            leaderboard.removeChild(child);
            child = leaderboard.lastElementChild;
        }
      this.showLeaderboard = !this.showLeaderboard
      leaderBoardButton.className = 'Leaderboard'
    }
    
  }

  renderAnswers(data = undefined) {
    if(data == undefined) {
      return this.createElement({type: 'input', style: 'text', id: 'input', name: 'answer'})
    } else {
      let tempDiv = this.createElement({type: 'div'})
      for (let i = 1; i < Object.keys(data).length + 1; i++) {
        let workDiv = this.createElement({type: 'div'})
        
        workDiv.append(this.createElement({
          type: 'input',
          style: 'radio',
          name: 'answer',
          value: 'alt' + i,
        }))
        workDiv.append(this.createElement({
          type: 'text',
          innerHTML: data['alt' + i]
        }))
        tempDiv.append(workDiv)
      }
      return tempDiv
    }
  }

  /**
  * 
  * @param {*} Object containing parameters for element creation. Possible params include ->
  * @param type element type, e.g. 'div', 'button'.
  * @param style type of element, e.g. 'radio', 'checkbox'.
  * @param id id of element.
  * @param innerHTML html content of element.
  * @param value value inside of element.
  * @param name name of element.
  * @returns full element with its data.
  */
  createElement(elementData) {
    let tempElement = document.createElement(elementData.type)
    if(elementData.style != undefined) {
      tempElement.type = elementData.style
    }
    if(elementData.id != undefined) {
      tempElement.id = elementData.id
    }
    if(elementData.innerHTML != undefined) {
      tempElement.innerHTML = elementData.innerHTML
    }
    if(elementData.value != undefined) {
      tempElement.value = elementData.value
    }
    if(elementData.name != undefined) {
      tempElement.name = elementData.name
    }
    if(elementData.className != undefined) {
      tempElement.className = elementData.className
    }
    return tempElement
  }
}
