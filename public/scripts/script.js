import handlers from "./handlers.js"
import api from "./api.js"

/**
 * setup() used to configure the website to interact with the user and 
 * properly integrate features such as Drag&Drop, Edit card details,
 * and Adding new Card.
 * 
 * DO NOT TAMPER WITH THIS FUNCTION !!
 */
function setup() {
  api.getCards()
    .then(cards => {
      cards.forEach(card => {
        const container = document.querySelector(`[data-category=${card.category}]`)
        handlers.addExistingCard(container, card)
      })
    }).catch(console.error)

  const cards = document.querySelectorAll(".card")
  cards.forEach(card => {
    card.setAttribute("draggable", "true")
    
    card.addEventListener("dragstart", () => handlers.cardDragStart(card))
    card.addEventListener("dragend", () => handlers.cardDragEnd(card))

    const editButton = card.querySelector("img[alt=edit]")
    editButton.addEventListener("click", () => handlers.editCard(card))
  })

  const containers = document.querySelectorAll(".container")
  containers.forEach(container => {
    container.addEventListener("dragover", e => handlers.containerDragOver(e, container))

    const addCard = container.querySelector(".add-card")
    addCard.addEventListener("click", () => handlers.addNewCard(container))
  })
}

/**
 * Execute the following statements after the HTML file has loaded successfully.
 * 
 * DO NOT TAMPER WITH THIS FUNCTION !!
 */
document.addEventListener("DOMContentLoaded", () => {
  setup()
})
