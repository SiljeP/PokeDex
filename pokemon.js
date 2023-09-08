
fetch(`https://pokeapi.co/api/v2/pokemon/${URL.get("name")}`)
    .then(function (response) {
        if (response.status === 200) {
            return response.json()
        } else {
            document.body.innerText += "Something went wrong try again"
        }
    })
    .then(function (data) {
        console.log(data);

        const POKEMON = document.querySelector(".pokemonDetail")

        POKEMON.innerHTML = `
		<h1 class="pokeList__title">${data.name}</h1>
        <img src="${data.sprites.other["official-artwork"].front_default}">
		<p class="pokeListItem" >Height: ${data.height}</p>
		<p class="pokeListItem">Abilities</p>
		<ul class="pokeListItem">${data.abilities.map(
			elem => `<li class="pokeListItem">${elem.ability.name}</li>`
		).join(" ")}</ul>`
    })