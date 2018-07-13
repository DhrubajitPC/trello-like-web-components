const columns = axios.get('http://localhost:3000/columns')

const root = document.querySelector('.row')

columns.then(cols => {
  const colData = cols.data;
  for(let i = 0; i<colData.length; i++){
    const node = document.createElement('trello-column')
    root.appendChild(node);
    node.updateData(colData[i])
  }
})
let globalItem = ''
this.addEventListener('itemDragged', (item) => {
  globalItem = item.detail.item;
});