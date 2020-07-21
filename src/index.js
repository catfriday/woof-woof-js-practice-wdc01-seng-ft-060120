const url = 'http://localhost:3000/pups/'

document.addEventListener("DOMContentLoaded", () => {

getDogs()
})

function getDogs(){
    fetch(url)
    .then(response => response.json())
    .then(dogs => {
        renderDogs(dogs)
    })
   } 

function renderDogs(dogs) {
    dogs.forEach(dog => {
       renderDog(dog)
    })
}

function renderDog(dog) {
    const dogBar = document.querySelector('#dog-bar')
    const span = document.createElement('span')
    span.id = dog.id
    span.addEventListener('click', (e) => {
        dogInfo(dog)
       
    })
    
    span.innerText = dog.name
    dogBar.append(span)
    
}

function dogInfo(dog){
    const dogInfo = document.querySelector('#dog-info')
    dogInfo.innerHTML = ""
    const image = document.createElement('img')
    image.src = dog.image
    dogInfo.append(image)
    const h2 = document.createElement('h2')
    h2.innerText = dog.name
    dogInfo.append(h2)
    const button = document.createElement('button')
    button.innerText = (dog.isGoodDog) ? "Bad Dog!" : "Good Dog!" 
    button.id = "dog-button"
    button.addEventListener('click', (e) => changeBehavior(e, dog))
    dogInfo.append(button)
    
}

function changeBehavior(e, dog) {
    fetch(url + dog.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
             "Accept": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: !dog.isGoodDog
        })
    })
    .then(function(response) {
        return response.json();
      })
      .then(function(dog) {
          let dogButton = document.querySelectorAll('#dog-button')
        if (dogButton.innerText === "Good Dog!")
        {dogButton.innerText = "Bad Dog!"}
        else if (dogButton.innerText === "Bad Dog!")
        {dogButton.innerText = "Good Dog!"}
        console.log(dog);
      })
    
}
    

