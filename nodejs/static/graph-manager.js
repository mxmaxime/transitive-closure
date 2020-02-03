const steps = JSON.parse(graph.steps_matrix)
const nb_steps = steps.length

const paginationEl = document.querySelector('#pagination')
const graphsContainer = document.querySelector('#container-graph')

const graphContainerEls = []

const visibleClass = 'container-graph--visible'

function paginationButtonClickHandler(e) {
    const el = e.target
    const index = el.dataset.index

    console.log('click on index ' + index)

    const graphContainer = graphContainerEls[index]
    const prevGraphContainer = index-1 >= 0 ? graphContainerEls[index -1] : null

    if (prevGraphContainer) {
        //go to the left panel
        prevGraphContainer.style = `transform: translateX(0%)`
    }

    // go to the right panel
    graphContainer.style = `transform: translateX(100%)`
    const toShow = [graphContainer, prevGraphContainer]

    const elsToHide = graphContainerEls.filter(el => !toShow.includes(el))
    elsToHide.forEach(el => el.classList.remove(visibleClass))
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
    container.style = `transform: translateX(${index}00%)`
    container.id = `cy_${index}`
    graphsContainer.appendChild(container)
    return container
}

for (let i = 0; i < steps.length; i++) {
    createAndAddPaginationButton(i)
    const cyContainer = createCy(i)
    // console.log(cyContainer)
    graphContainerEls[i] = cyContainer
    if (i === 0) {
        cyContainer.classList.add(visibleClass)
    }
    const cy = window.createGraph(cyContainer)
    window.setStep(steps, i, cy)
}

// const cy = createGraph(document.querySelector('#cy'))

