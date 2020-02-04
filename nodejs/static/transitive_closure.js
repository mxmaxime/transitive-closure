function transitiveClosure(original_matrix) {
    const n = original_matrix.length

    const matrix = math.matrix(original_matrix)
    const zeroMatrix = math.zeros(n, n)
    console.log(zeroMatrix)
    
    const steps = [matrix]
    
    function last_step() {
        return steps[steps.length-1]
    }
    
    let i = 0;
    while(!math.deepEqual(last_step(), zeroMatrix)) {
        const newStep = math.multiply(last_step(), last_step())
        steps.push(newStep)
    
        i++
    }
    
    return {
        steps,
        number_of_steps: i
    }
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

const data = transitiveClosure(original)
console.log(data)