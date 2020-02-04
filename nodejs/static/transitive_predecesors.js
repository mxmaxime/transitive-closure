function isCyclicUtil(matrix, vertex, visited, recStack) {
    if (visited[vertex] == false) {
        visited[vertex] = true
        recStack[vertex] = true

        // loop through the line
        for (let [successor, val] of matrix[vertex].entries()) {
            if (val != 0) {
                if (visited[successor] == false && isCyclicUtil(matrix, successor, visited, recStack)) {
                    return true
                } else if (recStack[successor]) {
                    return true
                }
            }
        }
    }

    recStack[vertex] = false
    return false
}

function isCyclic(matrix) {
    const visited = []
    const recStack = []

    for (let vertex = 0; vertex < matrix.length; vertex++) {
        visited.push(false)
        recStack.push(false)
    }

    for (let vertex = 0; vertex < matrix.length; vertex++) {
        if (isCyclicUtil(matrix, vertex, visited, recStack)) {
            return true
        }
    }

    return false
}

function getLastElement(matrix) {
    return matrix[matrix.length - 1]
}

function getDirectPredecesors(matrix, vertex) {
    const state = new Set()
    for (let j = 0; j < matrix.length; j++) {
        if (matrix[j][vertex] != 0) {
            state.add(j)
        }
    }
    return state
}

function transitivePredecesors(matrix) {
    // This algorithm can't be applied on cycle graphes
    if (isCyclic(original)) {
        return null
    }

    const state = []

    for (let vertex = 0; vertex < matrix.length; vertex++) {
        state[vertex] = ([new Set()])

        // initialize direct predecesors
        state[vertex][0] = getDirectPredecesors(matrix, vertex)
    }

    for (let vertex = 0; vertex < state.length; vertex++) {
        let lastLevel = getLastElement(state[vertex])
   
        while (lastLevel.size != 0) {
            const newLevel = new Set()
            state[vertex].push(newLevel)

            for (let lastLvlElements of lastLevel) {
                const lastLvlPredecesors = getDirectPredecesors(matrix, lastLvlElements)
                
                for (let newLvlElement of lastLvlPredecesors) {
                    newLevel.add(newLvlElement)
                    state[vertex][0].delete(newLvlElement)
                }
            }

            lastLevel = newLevel
        }
    }

    const minimalGraph = math.zeros(matrix.length, matrix.length)._data
    for (let vertex = 0; vertex < state.length; vertex++) {
        for (let predecesor of state[vertex][0]) {
            minimalGraph[predecesor][vertex] = 1
        }
    }

    return minimalGraph
}
