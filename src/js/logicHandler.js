/**
 *
 */
export default class logicHandler {
  /**
   * Creates a new logicHandler.
   *
   * @param {number} state - The state of the game.
   */
  constructor (state) {
    this.currentUser = undefined
    this.timeTaken = 0
    this.timeCurrent = 0
    this.state = state
    this.currentTimer = undefined

    this.logicLeaderboard()
  }

  /**
   *  Creates a leaderboard in local storage if it doesn't exist.
   */
  logicLeaderboard () {
    if (localStorage.getItem('topList') === null) {
      // Create an empty array to hold the top scores
      const topScores = []

      // Add some initial scores to the array
      topScores.push({ name: 'undefined', score: Infinity })
      topScores.push({ name: 'undefined', score: Infinity })
      topScores.push({ name: 'undefined', score: Infinity })
      topScores.push({ name: 'undefined', score: Infinity })
      topScores.push({ name: 'undefined', score: Infinity })

      // Store the top scores array in local storage
      localStorage.setItem('topList', JSON.stringify(topScores))
    }
  }

  /**
   * Updates the leaderboard with the new score.
   */
  updateLeaderboard () {
    // Retrieve the current leaderboard data from local storage
    let topScores = JSON.parse(localStorage.getItem('topList'))
    console.log(topScores)
    // Add the new score to the array
    topScores.push({ name: this.currentUser, score: Math.floor(this.timeCurrent / 1000) })

    // Sort the array in descending order by score
    topScores.sort((a, b) => a.score - b.score)
    topScores = topScores.slice(0, 5)

    // Store the updated leaderboard data in local storage
    localStorage.setItem('topList', JSON.stringify(topScores))
  }

  /**
   * Creates a timer.
   */
  initTimer () {
    const initTime = Date.now()

    this.currentTimer = setInterval(() => {
      this.timeCurrent = (Date.now() - initTime) // milliseconds elapsed since start
      document.getElementById('timer').innerHTML = 'Time left: ' + Math.floor((10000 - this.timeCurrent) / 1000) // in seconds
      if ((10000 - this.timeCurrent) / 1000 < 0) {
        this.state.changeState(this.state.gameStates.GameLost)
        clearInterval(this.currentTimer)
      }
    }, 1000)
  }

  /**
   * Updates the timer.
   */
  questionAnswered () {
    this.timeTaken += this.timeCurrent
    clearInterval(this.currentTimer)
  }

  /**
   * Sets the name of the current user.
   */
  setName () {
    this.currentUser = document.getElementById('Input-Text').value
  }

  /**
   * Resets the game.
   */
  reset () {
    this.currentUser = undefined
    this.timeTaken = 0
  }
}
