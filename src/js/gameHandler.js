import logicHandler from "./logicHandler.js";
import renderHandler from "./renderHandler.js";
import postHandler from "./postHandler.js";
import stateHandler from "./stateHandler.js";

export default class gameHandler {
  constructor() {
    this.startURL = "https://courselab.lnu.se/quiz/question/1"
    this.nextURL = "https://courselab.lnu.se/quiz/question/1"
    this.state = new stateHandler(this)
    this.logic = new logicHandler(this.state)
    this.render = new renderHandler(this.state)
    this.post = new postHandler()
  }

  async runGame(currentState = this.state.gameStates.Start) {
    console.log(this.state.currentGameState)
    switch (currentState) {
      case this.state.gameStates.Start:
        this.nextURL = this.startURL
        this.logic.reset()
        this.render.renderStart()
        break

      case this.state.gameStates.Question:
        if (this.state.prevState === this.state.gameStates.NameChoice) {
          this.logic.setName()
        }
        this.post.getQuestion(this.nextURL).then((data) => {
          this.nextURL = data.nextURL
          this.render.renderQuestion(data.question, data.alternatives)
          this.logic.initTimer() == true
        })
        break

      case this.state.gameStates.Answered:
        this.logic.questionAnswered()
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
        let data = undefined
        if ((data = await this.post.postAnswer(this.nextURL, { 'answer': answer })) == false) {
          this.state.changeState(this.state.gameStates.GameLost)
        } else if (data.nextURL === undefined) {
          console.log(data)
          this.state.changeState(this.state.gameStates.GameWon)
        } else {
          this.nextURL = data.nextURL
          this.render.renderAnswered()
        }
        break

      case this.state.gameStates.GameLost:
        this.render.renderGameLost()
        break

      case this.state.gameStates.GameWon:
        this.render.renderGameWon(Math.floor(this.logic.timeTaken / 1000))
        this.logic.updateLeaderboard()
        break

      case this.state.gameStates.NameChoice:
        this.render.renderNameRequest()
        break
    }
  }
}
