let noteSubmit = document.getElementById('note-submit')
let loginToggle = document.getElementById('login-toggle')
let loginForm = document.querySelector('.login')
let nav = document.querySelector('.nav')
let label = document.querySelector('label[for="login-toggle"]')






   let preventDefault = function () { noteSubmit.addEventListener('click', (event) => {
        event.preventDefault()
    })};



    loginToggle.addEventListener('click', (e) => {
        if (loginToggle.checked) {
            loginForm.style.display = 'block'
        } else {
            loginForm.style.display = 'none'
        }
    })



