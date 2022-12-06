export default class logicHandler {
  constructor (state) {
    this.currentUser = undefined
    this.timeTaken = 0
    this.timeCurrent = 0
    this.state = state
    this.currentTimer = undefined

    this.logicLeaderboard()
  }

  logicLeaderboard () {
    if (localStorage.getItem('topList') === null) {
      localStorage.setItem('topList', JSON.stringify([
        { name: 'None', value: 999 },
        { name: 'None', value: 999 },
        { name: 'None', value: 999 },
        { name: 'None', value: 999 },
        { name: 'None', value: 999 }
      ]))
    }
  }

  updateLeaderboard () {
    const topList = JSON.parse(localStorage.getItem('topList'))
    let added = false
    for (let i = 0; i < 5; i++) {
      if (Math.floor(this.timeTaken / 1000) < topList[i].value && !added) {
        topList.splice(i, 0, { name: this.currentUser, value: Math.floor(this.timeTaken / 1000) })
        topList.pop()
        localStorage.setItem('topList', JSON.stringify(topList))
        added = true
      }
    }
  }

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

  questionAnswered () {
    this.timeTaken += this.timeCurrent
    clearInterval(this.currentTimer)
    // console.log(this.timeTaken)
  }

  setName () {
    this.currentUser = document.getElementById('Input-Text').value
  }

  reset () {
    this.currentUser = undefined
    this.timeTaken = 0
  }
}
