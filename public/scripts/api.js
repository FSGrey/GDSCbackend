export default {
  async createCard(cardObj) {
    // console.log('createCard() called with ', cardObj)
    // return Promise.resolve({ _id: '1', ...cardObj})

    try {
      const data = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardObj)
      })
      const card = await data.json()
      return Promise.resolve(card)
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async editCard(cardObj) {
    // console.log('editCard() called with ', cardObj)
    // return Promise.resolve(cardObj)
    
    const {_id, content, category} = cardObj
    try {
      const data = await fetch(`/api/cards/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({content, category})
      })
      const card = await data.json()
      return Promise.resolve(card)
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async getCards() {
    // console.log('getCards() called')
    // return Promise.resolve([{_id: '1', content: "something", category: "something"}])

    try {
      const data = await fetch('/api/cards')
      const cards = await data.json()
      return Promise.resolve(cards)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}