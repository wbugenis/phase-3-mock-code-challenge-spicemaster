// write your code here
const url = 'http://localhost:3000/spiceblends'
const spiceDetail = document.querySelector("div#spice-blend-detail")
const updateForm = document.querySelector("form#update-form")
const spiceTitle = spiceDetail.querySelector("h2.title")

//Show details of spice object on webpage
function showSingleSpice(spice){

    const img = spiceDetail.querySelector("img.detail-image")
    img.src = spice.image
    img.alt = spice.title

    spiceTitle.textContent = spice.title

    const list = spiceDetail.querySelector("ul.ingredients-list")
    spice.ingredients.forEach(ingredient => {
        const li = document.createElement('li')
        li.textContent = ingredient.name
        list.append(li)
    })

    updateForm.dataset.id = spice.id
}

//Fetch details for first spice
fetch(`${url}/1`)
    .then(response => response.json())
    .then(spice => showSingleSpice(spice))
    .catch(error => console.log(error))

//Listen for submission on update form, update spice detail after response
updateForm.addEventListener('submit', event => { 
    event.preventDefault()
    
    const title = event.target.title.value

    fetch(`${url}/${updateForm.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({title})
    })
    .then(response => response.json())
    .then(updatedSpice => spiceTitle.textContent = updatedSpice.title)
    .catch(error => console.log(error))
    updateForm.reset()
})