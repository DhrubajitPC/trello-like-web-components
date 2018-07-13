(function () {
  const currentDocument = document.currentScript.ownerDocument;

  class Column extends HTMLElement {
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      const template = currentDocument.querySelector('#column-template');
      const instance = template.content.cloneNode(true);
      shadowRoot.appendChild(instance);
    }

    updateData(columnData) {
      this.render(columnData)
      const cards = axios.get(`http://localhost:3000/cards?columnId=${columnData.id}`)

      cards.then(res => {
        this.populateCards(res.data)
      })
    }

    populateCards(cards) {
      for(let i = 0; i<cards.length; i++){
        const root = this.shadowRoot.querySelector('#cards')
        const node = document.createElement('trello-card')
        root.appendChild(node);
        node.updateData(cards[i])
      }
    }

    render(columnData) {
      this.ondrop = function (event) {
        event.preventDefault();
        const cardId = event.dataTransfer.getData("text").split('-')[1];
        const columnId = columnData.id;
        this.shadowRoot.querySelector('#cards').appendChild(globalItem)
        axios.get(`http://localhost:3000/cards/${cardId}`)
          .then(res => {
            const cardData = res.data;
            cardData.columnId = columnId;
            axios.put(`http://localhost:3000/cards/${cardId}`, cardData)
          })
      }
      this.shadowRoot.querySelector('#column-container__header').innerHTML = columnData.title;
    }
  }

  customElements.define('trello-column', Column)
})()

function allowDrop(ev) {
  ev.preventDefault();
}
