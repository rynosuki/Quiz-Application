/**
 *
 */
export default class postHandler {
  /**
   * Creates the post handler.
   */
  constructor () {
    this.currentQuestion = undefined
  }

  /**
   * Gets the question from the server.
   *
   * @param {string} link The link to the server.
   */
  async getQuestion (link) {
    this.currentQuestion = await fetch(link).then((response) => response.json())
    return this.currentQuestion
  }

  /**
   * Posts the answer to the server.
   *
   * @param {string} link The link to the server.
   * @param {object} data The data to send to the server.
   */
  async postAnswer (link, data = {}) {
    return await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        const data = response.json()
        return data
      }
      return false
    })
  }
}
