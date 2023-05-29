const postBox = document.getElementById('post-box')
const alertBox = document.getElementById('alert-box')

const backBtn = document.getElementById('back-btn')
const updateBtn = document.getElementById('update-btn')
const deleteBtn = document.getElementById('delete-btn')

const csrf = document.getElementsByName('csrfmiddlewaretoken')

updateBtn.classList.add('no-visible')
deleteBtn.classList.add('no-visible')

const url = window.location.href + 'data/'
const updateUrl = window.location.href + 'update/'
const deleteUrl = window.location.href + 'delete/'

const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')

const spinnerBox = document.getElementById('spinner-box')

const titleInput = document.getElementById('id_title')
const bodyInput = document.getElementById('id_body')


// backBtn.addEventListener('click',()=>{
//     history.back()
// })


$.ajax({
    type: 'GET',
    url: url,
    success: function(response){
        console.log(response)
        spinnerBox.classList.add('no-visible')
        const data = response.data
        if (data.logged_in !== data.author) {
            console.log('different') 
        }
        else {
            updateBtn.classList.remove('no-visible')
            deleteBtn.classList.remove('no-visible')
        }

        titleInput.value = data.title
        bodyInput.value = data.body

        const titleEl = document.createElement('h3')
        titleEl.setAttribute('class', 'mt-3')
        titleEl.setAttribute('id', 'title')

        const bodyEl = document.createElement('p')
        bodyEl.setAttribute('class', 'mt-1')
        bodyEl.setAttribute('id', 'body')
        
        titleEl.textContent = data.title
        bodyEl.textContent = data.body
        
        postBox.appendChild(titleEl)
        postBox.appendChild(bodyEl)

    },
    error: function(error){
        console.log(error)
    }
})

updateForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const title = document.getElementById('title')
    const body = document.getElementById('body')

    $.ajax({
        type: 'POST',
        url: updateUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'title': titleInput.value,
            'body': bodyInput.value,
        },
        success: function(response){
            console.log(response)
            title.textContent = response.title
            body.textContent = response.body
            handleAlerts('success', 'Post has been updated!')
        },
        error: function(error){
            console.log(error)
        }
    })
})

deleteForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: deleteUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
        },
        success: function(response){
            window.location.href = window.location.origin
            localStorage.setItem('title', titleInput.value)
            handleAlerts('success', 'Post has been deleted!')
        },
        error: function(error){
            console.log(error)
        }

    })

})