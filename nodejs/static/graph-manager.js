const steps = JSON.parse(graph.steps_matrix)
const nb_steps = steps.length

const paginationEl = document.querySelector('#pagination')
const graphsContainer = document.querySelector('#container-graph')

function paginationButtonClickHandler(e) {
    const el = e.target
    console.log('click on index ' + this.dataset.index)
}

function createAndAddPaginationButton(index) {
    const buttonEl = document.createElement('button')
    buttonEl.dataset.index = index
    buttonEl.innerText = `Step ${index}`
    buttonEl.addEventListener('click', paginationButtonClickHandler)
    paginationEl.appendChild(buttonEl)
}

function createCy(index) {
    const container = document.createElement('div')
    container.id = `cy_${index}`
    document.body.appendChild(container)
}

for (let i = 0; i < steps.length; i++) {
    createAndAddPaginationButton(i)
    createCy(i)
}
