export default class postHandler {
  constructor() {
    this.currentQuestion = undefined
  }

  async getQuestion(link) {
    this.currentQuestion = await fetch(link).then((response) => response.json());
    return this.currentQuestion
  }

  async postAnswer(link, data = {}) {
    return await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if(response.ok) {
        let data = response.json()
        return data
      }
    })
  }
}
