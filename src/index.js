
// let url = 'http://localhost:3000/pups/'

document.addEventListener("DOMContentLoaded", () => {
    let url = 'http://localhost:3000/pups/'

   
        fetch(url)
        .then(response => response.json())
        .then(dogs => renderDogs(dogs))
    
    
    function renderDogs(dogs){
        dogs.forEach(dog => {
            renderDog(dog)
        })
    }
    
    function renderDog(dog) {
        let dogDiv = document.querySelector('#dog-bar')
        let span = document.createElement('span')
        span.innerText = dog.name
        dogDiv.appendChild(span)
        span.addEventListener('click', (e) => {
            dogInfo(dog)
        })
    }
    
    function dogInfo(dog){
        let infoDiv = document.querySelector('#dog-info')
        infoDiv.innerHTML = `
        <img src=${dog.image}>
        <h2>${dog.name}</h2>`
        let button = document.createElement('button')
        button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
        infoDiv.appendChild(button)
        button.dataset.id = dog.id 
        button.addEventListener('click', (e) => {
            buttonToggle(dog, button)   
        })    
    }
    
    function buttonToggle(dog, button){
        fetch(url + dog.id,{
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify({
                isGoodDog: !dog.isGoodDog 
            })
        })
        .then(response => response.json())
        .then(dog => {
            dogInfo(dog)
            console.log(dog)
        })
    }


    let dogFilter = document.querySelector('#good-dog-filter')
    dogFilter.addEventListener('click', (e) => {
    if (dogFilter.innerText === "Filter good dogs: OFF"){
        dogFilter.innerText = "Filter good dogs: ON"
        fetch(url)
        .then(response => response.json())
        .then(dogs => renderDogs(dogs.filter(dog => dog.isGoodDog === true)))
        // mdn notes const result = words.filter(word => word.length > 6)
    }
    else if (dogFilter.innerText === "Filter good dogs: ON"){
        dogFilter.innerText = "Filter good dogs: OFF"
    }

        console.log(e)
    })

    // fetchDogs()    
})

// function fetchDogs(){
//     fetch(url)
//     .then(response => response.json())
//     .then(dogs => renderDogs(dogs))
// }

// function renderDogs(dogs){
//     dogs.forEach(dog => {
//         renderDog(dog)
//     })
// }

// function renderDog(dog) {
//     let dogDiv = document.querySelector('#dog-bar')
//     let span = document.createElement('span')
//     span.innerText = dog.name
//     dogDiv.appendChild(span)
//     span.addEventListener('click', (e) => {
//         dogInfo(dog)
//     })
// }

// function dogInfo(dog){
//     let infoDiv = document.querySelector('#dog-info')
//     infoDiv.innerHTML = `
//     <img src=${dog.image}>
//     <h2>${dog.name}</h2>`
//     let button = document.createElement('button')
//     button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
//     infoDiv.appendChild(button)
//     button.dataset.id = dog.id 
//     button.addEventListener('click', (e) => {
//         buttonToggle(dog, button)   
//     })

//     // let dogFilter = document.querySelector('#good-dog-filter')
//     dogFilter.addEventListener('click', (e) => {
//     if (dogFilter.innerText === "Filter good dogs: OFF"){
//         dogFilter.innerText = "Filter good dogs: ON"
//         fetch(url)
//         .then(response => response.json())
//         .then(dogs => renderDog(dog.filter(dog.isGoodDog === true)))
//     }
//     else if (dogFilter.innerText === "Filter good dogs: ON"){
//         dogFilter.innerText = "Filter good dogs: OFF"
//     }

//         console.log(e)
//     })

// }

// function buttonToggle(dog, button){
//     fetch(url + dog.id,{
//         method: 'PATCH',
//         headers: {
//             'content-type': 'application/json',
//             accepts: 'application/json'
//         },
//         body: JSON.stringify({
//             isGoodDog: !dog.isGoodDog 
//         })
//     })
//     .then(response => response.json())
//     .then(dog => {
//         dogInfo(dog)
//         console.log(dog)
//     })
// }

// filter dog: first find the filter button, then add an event listener to it.
// change button innerHTML based to 'on' 'off'


