import logicHandler from "./logicHandler.js";
import renderHandler from "./renderHandler.js";
import postHandler from "./postHandler.js";
import stateHandler from "./stateHandler.js";

export default class gameHandler {
  constructor() {
    this.startURL = "https://courselab.lnu.se/quiz/question/1"
    this.nextURL = "https://courselab.lnu.se/quiz/question/1"
    this.logic = new logicHandler()
    this.state = new stateHandler(this)
    this.render = new renderHandler(this.state)
    this.post = new postHandler()
  }

  async runGame(currentState = this.state.gameStates.Start) {
    console.log(this.state.currentGameState)
    switch (currentState) {
      case this.state.gameStates.Start:
        this.nextURL = this.startURL
        this.logic.currentUser = undefined
        this.render.renderStart()
        break

      case this.state.gameStates.Question:
        if (this.state.prevState === this.state.gameStates.NameChoice) {
          this.logic.setName()
        }
        await this.post.getQuestion(this.nextURL).then((data) => {
          this.nextURL = data.nextURL
          this.render.renderQuestion(data.question, data.alternatives)
        })
        break

      case this.state.gameStates.Answered:
        let answer = null
        if (this.post.currentQuestion.alternatives == undefined) {
          answer = document.getElementById('input').value
        } else {
          document.getElementsByName('answer').forEach(x => {
            if (x.checked) {
              answer = x.value
            }
          })
        }
        let data = await this.post.postAnswer(this.nextURL, { 'answer': answer })
        if (data.nextURL === undefined) {
          this.state.changeState(this.state.gameStates.GameWon)
        } else if (data != undefined) {
          this.nextURL = data.nextURL
          this.render.renderAnswered()
        } else {
          this.state.changeState(this.state.gameStates.GameLost)
        }
        break

      case this.state.gameStates.GameLost:
        break

      case this.state.gameStates.GameWon:
        this.render.renderGameWon(100)
        break
        
      case this.state.gameStates.NameChoice:
        this.render.renderNameRequest()
        break
    }
  }
}
