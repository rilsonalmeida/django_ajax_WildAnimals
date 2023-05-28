const backBtn = document.getElementById('back-btn')
const updateBtn = document.getElementById('update-btn')
const deleteBtn = document.getElementById('delete-btn')

const postBox = document.getElementById('post-box')

updateBtn.classList.add('no-visible')
deleteBtn.classList.add('no-visible')

const url = window.location.href + 'data/'

const spinnerBox = document.getElementById('spinner-box')


backBtn.addEventListener('click',()=>{
    history.back()
})


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

        const titleEl = document.createElement('h3')
        titleEl.setAttribute('class', 'mt-3')

        const bodyEl = document.createElement('p')
        bodyEl.setAttribute('class', 'mt-1')
        
        titleEl.textContent = data.title
        bodyEl.textContent = data.body
        
        postBox.appendChild(titleEl)
        postBox.appendChild(bodyEl)

    },
    error: function(error){
        console.log(error)
    }
})