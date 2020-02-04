function setStep(steps, index, cy) {
    if (index >= steps.length) {
        index = steps.length - 1
    }
   matrixSize = (steps[0]).length;

    for (stepIndex = 0; stepIndex <= index; stepIndex++) {
        for (i = 0; i < matrixSize; i++) {
            for (j = 0; j < matrixSize; j++) {
                if (steps[stepIndex][i][j] == 1) {
                    if (cy.getElementById(i + '-' + j).length != 0 && stepIndex == index) {
                        cy.getElementById(i + '-' + j).addClass('oldTransitivity')
                    }

                    cy.add({
                        edges: [{
                            data: { id: (i + '-' + j), source: i, target: j }
                        }]
                    })

                    if (stepIndex == index) {
                        cy.getElementById(i + '-' + j).addClass('highlighted')
                    }
                }
            }
        }
    }
}

/**
 * 
 * @param {*} cy 
 * @param {*} matrix - matrix with Cytoscape format. 
 */
function drawInitialGraph(cy, matrix) {
    cy.elements = matrix
}

function drawMinimalGraph(steps, cy) {
    matrixSize = (steps[0]).length;

    for (stepIndex = 0; stepIndex < steps.length; stepIndex++) {
        for (i = 0; i < matrixSize; i++) {
            for (j = 0; j < matrixSize; j++) {
                if (steps[stepIndex][i][j] == 1) {
                    cy.remove(cy.getElementById(i + '-' + j))
                }
            }
        }
    }
}
