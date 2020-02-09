function transitiveClosure(original_matrix) {
    const n = original_matrix.length

    const matrix = math.matrix(original_matrix)
    const zeroMatrix = math.zeros(n, n)
    
    const steps = [matrix]
    
    function last_step() {
        return steps[steps.length-1]
    }
    
    let i = 0;
    while(!math.deepEqual(last_step(), zeroMatrix) && i < n) {
        const newStep = math.multiply(last_step(), last_step())
        steps.push(newStep)
    
        i++
    }

    // remove original matrix
    steps.shift()
    
    return {
        original_matrix,
        matrix,
        steps,
        number_of_steps: i
    }
}

function matrixToCytoscape(matrix) {
    const ob = {
        nodes: [],
        edges: []
    }

    const arrMatrix = matrix._data
    for (let i = 0; i < arrMatrix.length; i++) {
        ob.nodes.push({
            data: {
                id: i
            }
        })
    }
    
    matrix.forEach(function (value, index, matrix) {
        const source = index[0]
        const target = index[1]

        const id = `${source}-${target}`
    
        if (value != 0) {
            ob.edges.push({
                data: {
                    id, source, target
                }
            })
        }
    })

    return ob
}
