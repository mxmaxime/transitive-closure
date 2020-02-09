function stringToArrayMatrix(str) {
    var finalArray = []
    str.split("\n").forEach(elt => {
        finalArray.push(elt.split(','))
    })

    return finalArray
}

const textareaForm = document.querySelector('#matrix-form')

textareaForm.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(textareaForm)
    const matrix = data.get('matrix')
    const matrixArray = stringToArrayMatrix(matrix)

    // Erase graphic elements
    graphsContainer.innerHTML = ''
    paginationEl.innerHTML = ''
    graphContainerEls.splice(0)

    calculateAndDrawAll(matrixArray)
})
