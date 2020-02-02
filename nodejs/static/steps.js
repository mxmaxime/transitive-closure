function setStep(steps, index, cy) {
    if (index >= steps.length) {
        index = steps.length - 1
    }
    for (stepIndex = 0; stepIndex <= index; stepIndex++) {
        for (i = 0; i <= index; i++) {
            for (j = 0; j <= index; j++) {
                if (steps[stepIndex][i][j] == 1) {
                    console.log("New step " + stepIndex + " " + i + " " + j);
                    cy.add({
                        edges: [
                        {
                            data: { id: (i + '-' + j), source: i, target: j }
                        }
                        ]
                    })
                    cy.getElementById(i + '-' + j).addClass('highlighted')
                }
            }
        }
    }
}

function setMinimal(steps, cy) {
    for (stepIndex = 0; stepIndex <= steps.size(); stepIndex++) {
        for (i = 0; i <= index; i++) {
            for (j = 0; j <= index; j++) {
                if (steps[stepIndex][i][j] == 1) {
                    cy.remove(cy.getElementById(i + '-' + j))
                }
            }
        }
    }
}
        