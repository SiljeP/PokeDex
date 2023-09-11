fetch(`https://pokeapi.co/api/v2/pokemon/${URL.get("pokeSearch")}`)
    .then(function (response) {
        if (response.status === 200) {
            return response.json()
        } else {
            document.body.innerText += "Something went wrong try again"
        }
    })
    .then(function (data) {
        const POKEMON = document.querySelector(".pokemonDetail")
        console.log(data);
        fetch(baseURL + 'characteristic/' + data.id).then(res => res.json()).then(characteristic => {
            POKEMON.innerHTML = `
        <h1 class="pokeList__title">${data.name}</h1>
        <img class="pokeList__img" src="${data.sprites.other["official-artwork"].front_default}">
        <h3 class="pokeListCharacteristics">${characteristic.descriptions[7].description}</h3>
        <p class="pokeListItem__subHeading"> Type:</p>
        <ul class="pokeListDetail">${data.types.map(
                elem => `<li class="pokeListDetail">${elem.type.name}</li>`
            ).join(" ")}</ul>
		<p class="pokeListItem__subHeading">Height:<span class= "pokeListDetail">${data.height}</span></p>
        <p class="pokeListItem__subHeading">Weight: <span class= "pokeListDetail">${data.weight}</span></p>
		<p class="pokeListItem__subHeading">Abilities:</p>
		<ul class="pokeListDetail">${data.abilities.map(
                elem => `<li class="pokeListDetail">${elem.ability.name}</li>`
            ).join(" ")}</ul>`
    
            
        })

        console.log(data.types.map(el => {
            return el.type.name
        }))

    })