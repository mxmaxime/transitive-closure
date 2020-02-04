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
    elsToHide.forEach(el => el.style = `transform: translateX(300%)`)
}

function createAndAddPaginationButton(index) {
    if (index === 0) return;
    const buttonEl = document.createElement('button')
    buttonEl.dataset.index = index
    if (index === 0) {
        buttonEl.innerText = `Graphe initial`
    } else {
        buttonEl.innerText = `Step ${index}`
    }
    buttonEl.addEventListener('click', paginationButtonClickHandler)
    paginationEl.appendChild(buttonEl)
}

function createCyContainer(index) {
    const container = document.createElement('div')
    container.style = `transform: translateX(${index}00%)`
    container.id = `cy_${index}`

    const description = document.createElement('p')
    if (index === 0) {
        description.innerText = `Graphe initial`
    } else {
        description.innerText = `Étape ${index}`
    }
    container.appendChild(description)
    graphsContainer.appendChild(container)
    return container
}

function drawAll(original_matrix, steps) {
    console.log(original_matrix)
    // +1 for the initial graph, +1 for min graph
    for (let i = 0; i < steps.length +2; i++) {
        createAndAddPaginationButton(i)
        const cyContainer = createCyContainer(i)
        // console.log(cyContainer)
        graphContainerEls[i] = cyContainer

        const cy = window.createGraph(cyContainer, original_matrix)
        if (i === 0) {
            console.log('initial graph')
            window.drawInitialGraph(cy, original_matrix)
            continue
        }

        if (i === steps.length+1) {
            console.log('min graph')
            window.drawMinimalGraph(steps, cy)
            continue
        }

        window.setStep(steps, i-1, cy)
    }
}

// const steps = JSON.parse(graph.steps_matrix)
const original = [
    [0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0]
]
const matrices = transitiveClosure(original)
const steps = matrices.steps

const m = window.matrixToCytoscape(matrices.matrix)
console.log(m)

drawAll(m, steps)

// const cy = createGraph(document.querySelector('#cy'))

