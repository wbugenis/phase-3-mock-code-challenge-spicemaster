// write your code here
const url = 'http://localhost:3000/spiceblends/1'
const spiceDetail = document.querySelector("div#spice-blend-detail")

function showSingleSpice(spice){
    const img = spiceDetail.querySelector("img.detail-image")
    img.src = spice.image
    img.alt = spice.title
    spiceDetail.querySelector("h2.title").textContent = spice.title
    const list = spiceDetail.querySelector("ul.ingredients-list")
    spice.ingredients.forEach(ingredient => {
        console.log(ingredient)
        const li = document.createElement('li')
        li.textContent = ingredient.name
        list.append(li)
    })
}

fetch(url)
    .then(response => response.json())
    .then(spice => showSingleSpice(spice))