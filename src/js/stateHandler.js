/**
 *
 */
export default class stateHandler {
  /**
   * Creates the state handler.
   *
   * @param {object} game The game handler.
   */
  constructor (game) {
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

  /**
   * Changes the state of the game.
   *
   * @param {number} state The new state of the game.
   */
  changeState (state) {
    this.prevState = this.currentGameState
    this.currentGameState = state
    this.game.runGame(this.currentGameState)
  }
}
