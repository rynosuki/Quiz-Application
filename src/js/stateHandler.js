export default class stateHandler {
  constructor(game) {
    this.game = game

    this.gameStates = {
      Start: 0,
      Question: 1,
      Answered: 2,
      GameLost: 3,
      GameWon: 4,
      NameChoice: 5
    }

    this.prevState = undefined
    this.currentGameState = this.gameStates.Start
  }

  changeState(state) {
    this.prevState = this.currentGameState
    this.currentGameState = state
    this.game.runGame(this.currentGameState)
  }
}
