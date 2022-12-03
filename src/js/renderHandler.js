export default class renderHandler {
  constructor(state) {
    this.workDiv = document.getElementsByClassName('Main')[0]
    this.state = state
  }
  
  renderStart() {
    this.workDiv.innerHTML = 
    `<div class='Information-Wrapper'>
      <h1>Welcome to Quiz</h1>
      <button id="Event-Button">Start</button>
    </div>
    `

    document.getElementById('Event-Button').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.NameChoice))
  }

  renderNameRequest() {
    this.workDiv.innerHTML =  `
    <div class='Information-Wrapper'>
      <h1>Enter your name:</h1>
      <input id='Input-Text' type='text' name='answer'>
      <button id='Event-Submit'>Submit</button>
    </div>
    `

    document.getElementById('Event-Submit').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.Question))
  }

  renderQuestion(question, data) {
    let formInput = this.renderAnswers(data)
    this.workDiv.innerHTML = `
    <div class='Information-Wrapper'>
      <h1>${question}</h1>
    </div>
    <div class='Form-Wrapper'>
      <form class='Form-Details' onsubmit='event.preventDefault();'>
        ${formInput}
        <button id='Event-Submit'>Submit</button>
      </form>
    </div>
    `

    document.getElementById('Event-Submit').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.Answered))
  }

  renderAnswered() {
    this.workDiv.innerHTML = `
    <div class='Information-Wrapper'>
      <h1>You answered correctly!</h1>
      <button id='Event-Submit'>Next Question</button>
    </div>
    `

    document.getElementById('Event-Submit').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.Question))
  }

  renderGameLost(reason) {
    this.workDiv.innerHTML = `
    <div class='Information-Wrapper'>
      <h1>You lost! Due to ${reason}</h1>
      <button id='Event-Submit'>Restart</button>
    </div>
    `

    document.getElementById('Event-Submit').addEventListener(
      'click', () => this.state.changeState(this.state.gameStates.Start))
  }

  renderGameWon(timeTaken) {
    this.workDiv.innerHTML = `
    <div class='Information-Wrapper'>
      <p>You won in ${timeTaken} seconds</p>
    </div>
    `
  }

  renderLeaderboard() {
    // return ""
    // <div class='Leaderboard'>


    // </div>
  }

  renderAnswers(data = undefined) {
    let returnString = ""
    if(data == undefined) {
      returnString += this.createElement({type: 'input', style: 'text', id: 'input', name: 'answer'})
    } else {
      for (let i = 1; i < Object.keys(data).length + 1; i++) {
        returnString += "<div>"
        returnString += this.createElement({
          type: 'input',
          style: 'radio',
          name: 'answer',
          value: 'alt' + i,
        })
        returnString += this.createElement({
          type: 'text',
          innerHTML: data['alt' + i]
        })
        returnString += "</div>"
      }
    }
    return returnString
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
    let tempDiv = document.createElement('div')
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
    tempDiv.appendChild(tempElement)
    return tempDiv.innerHTML
  }
}
