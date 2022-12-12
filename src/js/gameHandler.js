import LogicHandler from './logicHandler.js'
import RenderHandler from './renderHandler.js'
import PostHandler from './postHandler.js'
import StateHandler from './stateHandler.js'

/**
 *
 */
export default class gameHandler {
  /**
   * Creates a new gameHandler.
   */
  constructor () {
    this.startURL = 'https://courselab.lnu.se/quiz/question/1'
    this.nextURL = 'https://courselab.lnu.se/quiz/question/1'
    this.state = new StateHandler(this)
    this.logic = new LogicHandler(this.state)
    this.render = new RenderHandler(this.state)
    this.post = new PostHandler()
  }

  /**
   * Runs the game.
   *
   * @param {number} currentState The current state of the game.
   */
  async runGame (currentState = this.state.gameStates.Start) {
    let answer
    let data
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
          this.logic.initTimer()
        })
        break

      case this.state.gameStates.Answered:
        this.logic.questionAnswered()
        if (this.post.currentQuestion.alternatives === undefined) {
          answer = document.getElementById('input').value
        } else {
          document.getElementsByName('answer').forEach(x => {
            if (x.checked) {
              answer = x.value
            }
          })
        }
        if ((data = await this.post.postAnswer(this.nextURL, { answer })) === false) {
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
