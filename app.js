const URL = new URLSearchParams(window.location.search)
const UL = document.querySelector(".pokeList")
const baseURL = "https://pokeapi.co/api/v2/"

const OFFSET = parseInt(URL.get("offset") || 0)

const NEXT_PAGE = document.querySelector(".nextPage")
const PREV_PAGE = document.querySelector(".prevPage")



//APP HAR FREM OG TILBAGE KNAPPER SAMT SØGEFUNKTION

//BACK AND NEXT KNAPPER

fetch(`https://pokeapi.co/api/v2/pokemon?offset=${OFFSET}`, {
    headers: {
        "accept": "application/json"  // optional. eller kan også være "text/plain"
    },
    method: "GET" //optional fordi det er GET
}).then(function (response) {
    if (response.status === 200) {
        return response.json()
    } else {
        document.body.innerText += "Something went wrong try again"
    }
})
    // Den her then bruger dataen fra tidligere .then()
    .then(function (data) {
        
        const LAST_OFFSET = data.count - (data.count % 20)
        // ternery operator i næste linie betyder:
        // hvis offset er større end eller lig med det størst mulige offset vi må have,
        // så skal vi brugas LAST_OFFSET - ellers skal vi bruge OFFSET + 20
        NEXT_PAGE.href = `/?offset=${OFFSET >= LAST_OFFSET ? LAST_OFFSET : OFFSET + 20}`

        PREV_PAGE.href = `/?offset=${OFFSET - 20 < 0 ? 0 : OFFSET - 20}`

        data.results.forEach(function (result) {
            const LI = document.createElement("li")
            LI.innerHTML = `<a class="pokeListItem" href="/pokemon.html?pokeSearch=${result.name}">${result.name}</a>`
            UL.append(LI)
            console.log(result.name)
        });

      

    })

//søgefunktion herunder

function submitHandler() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${URL.get("pokeSearch")}`)
    .then(function (response) {
        if (response.status === 200) {
            return response.json()
        } else {
            document.body.innerText += "Something went wrong try again"
        }
    })
    .then(function(searchResult){
        // console.log(searchResult)
        const POKEMON = document.querySelector(".pokemonDetail")

        fetch(baseURL + 'characteristic/' + searchResult.id).then(res => res.json()).then(characteristic => {
            POKEMON.innerHTML = `
		<h1 class="pokeList__title">${searchResult.name}</h1>
        <img class="pokeList__img" src="${searchResult.sprites.other["official-artwork"].front_default}">
        <h3 class="pokeListCharacteristics">${characteristic.descriptions[7].description}</h3>
        <p class="pokeListItem__subHeading"> Type:</p>
        <ul class="pokeListDetail">${searchResult.types.map(
            elem => `<li class="pokeListDetail">${elem.type.name}</li>`
        ).join(" ")}</ul>
		<p class="pokeListItem__subHeading">Height:<span class= "pokeListDetail">${searchResult.height}</span></p>
        <p class="pokeListItem__subHeading">Weight: <span class= "pokeListDetail">${searchResult.weight}</span></p>
		<p class="pokeListItem__subHeading">Abilities:</p>
		<ul class="pokeListDetail">${searchResult.abilities.map(
			elem => `<li class="pokeListDetail">${elem.ability.name}</li>`
		).join(" ")}</ul>`
    })
    })
}

if(URL.has("pokeSearch")){
    submitHandler()
}


