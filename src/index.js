// write your code here
const spiceUrl = 'http://localhost:3000/spiceblends'
const ingredientUrl = 'http://localhost:3000/ingredients'
const spiceDetail = document.querySelector("div#spice-blend-detail")
const spiceTitle = spiceDetail.querySelector("h2.title")
const list = spiceDetail.querySelector("ul.ingredients-list")

const updateForm = document.querySelector("form#update-form")
const ingredientForm = document.querySelector("form#ingredient-form")

//Show details of spice object on webpage
function showSingleSpice(spice){

    const img = spiceDetail.querySelector("img.detail-image")
    img.src = spice.image
    img.alt = spice.title

    spiceTitle.textContent = spice.title

    
    spice.ingredients.forEach(ingredient => {
        const li = document.createElement('li')
        li.textContent = ingredient.name
        list.append(li)
    })

    //Set data-ids on forms for updating DB
    updateForm.dataset.id = spice.id
    ingredientForm.dataset.id = spice.id
}

//Fetch details for first spice
fetch(`${spiceUrl}/1`)
    .then(response => response.json())
    .then(spice => showSingleSpice(spice))
    .catch(error => console.log(error))

//Listen for submission on update form, update spice detail after response
updateForm.addEventListener('submit', event => { 
    event.preventDefault()

    const title = event.target.title.value

    fetch(`${spiceUrl}/${updateForm.dataset.id}`, {
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

//Listen for submission on new ingredients form, display on page
ingredientForm.addEventListener('submit', event => {
    event.preventDefault()
    const name = event.target.name.value
    const li = document.createElement('li')
    li.textContent = name
    list.append(li)

    // const spiceBlendId = ingredientForm.dataset.id
    // fetch(`${ingredientUrl}/${spiceBlendId}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type':'application/json',
    //         'Accept':'application/json'
    //     },
    //     body: JSON.stringify({ingredients:[name, spiceBlendId]})
    // })
    // .then(response => response.json())
    // .then(spice => console.log(spice))
    // .catch(error => console.log(error))
    ingredientForm.reset()
})