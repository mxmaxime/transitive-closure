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

function createAndAddPaginationButton(index, nbSteps) {
    if (index === 0) return;
    const buttonEl = document.createElement('button')
    buttonEl.classList.add('button')
    buttonEl.classList.add('animated')
    buttonEl.dataset.index = index
    if (index === 0) {
        buttonEl.innerText = `Graphe initial`
    } else if (index === nbSteps) {
        buttonEl.innerText = `Fermeture t.`
    } else if (index === nbSteps + 1) {
        buttonEl.innerText = `Graphe minimal`
    } else {
        buttonEl.innerText = `Step ${index}`
    }
    buttonEl.addEventListener('click', paginationButtonClickHandler)
    paginationEl.appendChild(buttonEl)
}

function createCyContainer(index, nbSteps) {
    const container = document.createElement('div')
    container.style = `transform: translateX($300%)`
    container.id = `cy_${index}`

    const description = document.createElement('p')
    if (index === 0) {
        description.innerText = `Graphe initial`
    } else if (index === nbSteps) {
        description.innerText = `Fermeture transitive`
    } else if (index === nbSteps + 1) {
        description.innerText = `Graphe minimal`
    } else {
        description.innerText = `Étape ${index}`
    }
    container.appendChild(description)
    graphsContainer.appendChild(container)
    return container
}

function drawAll(original_matrix, steps) {
    // +1 for the initial graph, +1 for min graph
    for (let i = 0; i < steps.length +2; i++) {
        createAndAddPaginationButton(i, steps.length)
        const cyContainer = createCyContainer(i, steps.length)
        // console.log(cyContainer)
        graphContainerEls[i] = cyContainer

        const cy = window.createGraph(cyContainer, original_matrix)
        if (i === 0) {
            console.log('initial graph')
            window.drawInitialGraph(cy, original_matrix)
            console.log({original_matrix})
            continue
        }

        if (i === steps.length+1) {
            console.log('min graph')
            window.drawMinimalGraph(steps, cy)
            continue
        }

        console.log('draw step', i-1)
        window.setStep(steps, i-1, cy)
    }
}

function calculateAndDrawAll(original) {
    const matrices = transitiveClosure(original)
    const steps = matrices.steps

    const stepsArr = []
    for (const step of steps) {
        stepsArr.push(step._data)
    }

    const m = window.matrixToCytoscape(matrices.matrix)
    drawAll(m, stepsArr)
}

function drawByPredecesors(original_matrix, minimal) {
    const cy_original_matrix = window.matrixToCytoscape(math.matrix(original_matrix))
    createAndAddPaginationButton(0, 0)
    var cyContainer = createCyContainer(0, 0)
    graphContainerEls[0] = cyContainer
    var cy = window.createGraph(cyContainer, cy_original_matrix)
    window.drawInitialGraph(cy, cy_original_matrix)

    const cy_minimal = window.matrixToCytoscape(math.matrix(minimal))
    createAndAddPaginationButton(1, 0)
    cyContainer = createCyContainer(1, 0)
    graphContainerEls[1] = cyContainer
    cy = window.createGraph(cyContainer, cy_minimal)
    window.drawInitialGraph(cy, cy_minimal)
}

const original = [
    [0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0]
]
calculateAndDrawAll(original)
