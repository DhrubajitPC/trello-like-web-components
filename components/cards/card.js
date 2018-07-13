(function(){
  const currentDocument = document.currentScript.ownerDocument;

  class Card extends HTMLElement {
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      const template = currentDocument.querySelector('#card-template');
      const instance = template.content.cloneNode(true);
      shadowRoot.appendChild(instance);
    }

    updateData(cardData) {
      this.render(cardData)
    }
    
    render(cardData) {
      this.shadowRoot.querySelector('.card-container__title').innerHTML = cardData.title;
      this.shadowRoot.querySelector('.card-container__description').innerHTML = cardData.description;
      this.shadowRoot.querySelector('.card-container').id = `card-${cardData.id}`;
      this.ondrag = function(event) {
        let myEvent = new CustomEvent("itemDragged", {
          detail: {
            item: this
          },
          bubbles: true
        });
        self.dispatchEvent(myEvent);
        event.dataTransfer.setData('text', event.target.id);
      }
    }
  }

  customElements.define('trello-card', Card)
})()

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
