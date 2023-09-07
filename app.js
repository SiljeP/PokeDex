var pokeList = document.querySelector(".pokeList")

fetch("https://pokeapi.co/api/v2/pokemon",{
    headers: {
         "accept": "application/json"  // optional. kan og"text/plain"
    },
    method: "GET" //optional fordi det er GET
}).then(function (response) {
    if (response.status === 200){
        return response.json()
    }
})
    .then(function (result) {
        const POKEARRAY = result.results

        POKEARRAY.forEach(element => {
            pokeList.innerHTML += `<li class="pokeListItem">${element.name}</li>`
        });
     
        console.log(POKEARRAY)
    })