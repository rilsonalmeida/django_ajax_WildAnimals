const postsBox = document.getElementById('posts-box')
const spinnerBox = document.getElementById('spinner-box')
const loadBtn = document.getElementById('load-btn')
const endBox = document.getElementById('end-box')

let visible = 3

const getData= ()=>{
    $.ajax({
        type: 'GET',
        url: `/posts/${visible}/`,
        success: function(response){
            console.log(response)
            const data = response.data
            setTimeout(()=>{
                spinnerBox.classList.add('no-visible')
                console.log(data)
                data.forEach(el =>{
                    postsBox.innerHTML += `
                        <div class="card mb-2">
                            <div class="card-body">
                                <h5 class="card-title">${el.title}</h5>
                                <p class="card-text">${el.body}</p>
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col-1">
                                        <a href="#" class="btn btn-primary">Details</a>
                                    </div>
                                    <div class="col-1">
                                        <a href="#" class="btn btn-primary">Like</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                })
            }, 100)
            console.log(response.size)
            if (response.size === 0) {
                loadBtn.classList.add('no-visible')
                endBox.textContent = 'No posts added yet...'
            }
            else if (response.size <= visible) {
                loadBtn.classList.add('no-visible')
                endBox.textContent = 'No more posts to show...' 
            }
        },
        error: function(error){
            console.log(error)
        }
    });
}

loadBtn.addEventListener('click', ()=>{
    visible += 3
    getData()
})

getData()
