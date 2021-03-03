//DB URLS
const spiceUrl = 'http://localhost:3000/spiceblends'
const ingredientUrl = 'http://localhost:3000/ingredients'

//Elements to Update
const spiceImgs = document.querySelector("div#spice-images")
const spiceDetail = document.querySelector("div#spice-blend-detail")
const spiceTitle = spiceDetail.querySelector("h2.title")
const list = spiceDetail.querySelector("ul.ingredients-list")

//Forms to listen on
const updateForm = document.querySelector("form#update-form")
const ingredientForm = document.querySelector("form#ingredient-form")

//Show details of spice object on webpage
function showSingleSpice(spice){
    
    const img = spiceDetail.querySelector("img.detail-image")
    img.src = spice.image
    img.alt = spice.title

    spiceTitle.innerText = spice.title
    list.innerHTML = ''
    
    spice.ingredients.forEach(ingredient => {
        const li = document.createElement('li')
        li.textContent = ingredient.name
        list.append(li)
    })

    //Set data-ids on forms for updating DB
    updateForm.dataset.id = spice.id
    ingredientForm.dataset.id = spice.id
}

//Fetch details for spice based on id argument and show in detail view
function fetchSpice(id){
    
    fetch(`${spiceUrl}/${id}`)
        .then(response => response.json())
        .then(spice => showSingleSpice(spice))
        .catch(error => console.log(error))
}

//Make images from spice object and append to spice-imgs div
function makeSpiceImg(spice) {
    const img = document.createElement('img')
    img.dataset.id = spice.id
    img.src = spice.image
    img.alt = spice.title
    spiceImgs.append(img)
}

//Get all spices and send to img creation helper function
function fetchAllSpices(){
    fetch(spiceUrl)
        .then(response => response.json())
        .then(spices => spices.forEach(makeSpiceImg))
        .catch(error => console.log(error))
}

//Handle spice title update
function updateSpiceTitle(event){
    event.preventDefault()

    const title = event.target.title.value
    const id = updateForm.dataset.id
    
    fetch(`${spiceUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({title})
    })
        .then(response => response.json())
        .then(() => fetchSpice(id))
        .catch(error => console.log(error))
    updateForm.reset()
}

//Handle ingredient form submission
function addIngredient(event){ 
    event.preventDefault()
    const name = event.target.name.value

    const spiceblendId = parseInt(ingredientForm.dataset.id)
    fetch(ingredientUrl, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({name, spiceblendId})
    })
        .then(response => response.json())
        .then(() => fetchSpice(spiceblendId))
        .catch(error => console.log(error))
    ingredientForm.reset()
}

//Listen for submission on update form, send to helper method to update
updateForm.addEventListener('submit', updateSpiceTitle)

//Listen for submission on new ingredients form, display on page
ingredientForm.addEventListener('submit', addIngredient)

//Listen for clicks on spiceImgs div, if image clicked, send img's spice ID to helper method to fetch and show
spiceImgs.addEventListener('click', event => {
    if(event.target.matches('img')){
        fetchSpice(event.target.dataset.id)
    }
})

// populate spiceImgs
fetchAllSpices()

//Show first spice in detail view
fetchSpice(1)