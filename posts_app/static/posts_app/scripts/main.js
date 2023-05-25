console.log('It worked !!!')

const HelloBox = document.getElementById('hello')

$.ajax({
    type: 'GET',
    url: '/hello/',
    success: function(response){
        console.log('success', response.text)
        HelloBox.innerHTML = response.text
    },
    error: function(error){
        console.log('error', error)
    }
}

)