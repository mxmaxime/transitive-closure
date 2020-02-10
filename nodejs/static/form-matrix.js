function stringToArrayMatrix(str) {
    var finalArray = []
    str.split("\n").forEach(elt => {
        finalArray.push(elt.split(','))
    })

    return finalArray
}


const textareaForm = document.querySelector('#matrix-form')

function submitMatrixForm(subType) {
    const data = new FormData(textareaForm)
    const matrix = data.get('matrix')
    const matrixArray = stringToArrayMatrix(matrix)

    // Erase graphic elements
    graphsContainer.innerHTML = ''
    paginationEl.innerHTML = ''
    graphContainerEls.splice(0)

    if (subType == 0) {
        calculateAndDrawAll(matrixArray)
    } else {
        const minimal = transitivePredecesors(matrixArray)
        drawByPredecesors(matrixArray, minimal)
    }
    
}