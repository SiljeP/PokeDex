const URL = new URLSearchParams(window.location.search)
const UL = document.querySelector(".pokeList")

const OFFSET = parseInt(URL.get("offset") || 0)

const NEXT_PAGE = document.querySelector(".nextPage")
const PREV_PAGE = document.querySelector(".prevPage")


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
    // Den her then bruger dataen fra tidligere then
    .then(function (data) {
   
        const LAST_OFFSET = data.count - (data.count % 20)
		// ternery operator i næste linie betyder:
		// hvis offset er større end eller lig med det størst mulige offset vi må have,
		// så skal vi brugas LAST_OFFSET - ellers skal vi bruge OFFSET + 20
		NEXT_PAGE.href = `/?offset=${OFFSET >= LAST_OFFSET ? LAST_OFFSET : OFFSET + 20}`

        PREV_PAGE.href = `/?offset=${OFFSET - 20 < 0 ? 0 : OFFSET - 20}`

        data.results.forEach(function (result) {
            const LI = document.createElement("li")
            LI.innerHTML = `<a class="pokeListItem" href="/pokemon.html?name=${result.name}">${result.name}</a>`
            UL.append(LI)
        });

    })

