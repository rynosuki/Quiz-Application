import timerHandler from "./timerHandler.js";

export default class logicHandler {
  constructor() {
    this.timer = new timerHandler()
    this.currentUser = undefined
  }

  logicGetAnswer(data) {
    console.log(data)
    // if(this.currentQuestion.alternatives === undefined) {
    //   let answer = document.getElementById('Answer-Box').value
    //   this.#answerChecker(answer)
    // } else {
    //   let answer = new FormData(e.target).get('answer')
    //   this.#answerChecker(answer)
    // }

    // this.#postAnswer(this.currentQuestion.nextURL, {'answer': answer}).then(result => {
    //   if(result) {
    //     let answerResult = document.getElementById("Answer-Result")
    //     answerResult.innerHTML = 'Correct Answer!'
    //     document.getElementById("Submit").innerHTML = "Next Question"
    //     this.totalTimeElapsed += this.timeElapsedCurrent
    //     this.currentGameState = this.gameState.Question
    //   } else {
    //     let answerResult = document.getElementById("Answer-Result")
    //     answerResult.innerHTML = 'Wrong Answer!'
    //     this.currentGameState = this.gameState.GameOver
    //   }
    // })
  }

  logicLeaderboard() {

  }

  logicGameLost() {

  }

  logicGameWon() {

  }

  setName() {
    this.currentUser = document.getElementById('Input-Text').value
  }
} 
