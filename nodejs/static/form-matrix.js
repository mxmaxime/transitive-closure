const textareaForm = document.querySelector('#matrix-form')

textareaForm.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(textareaForm)
    const matrix = data.get('matrix')
    
    console.log(data)
})
