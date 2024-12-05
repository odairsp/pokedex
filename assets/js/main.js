
const pokemons = document.querySelector(".pokemons");
const loadMore = document.querySelector("#loadMore");
const maxRecords = 151;
const limit = 15;
let offset = 0;

function convertPokemonToLi(pokemon) {


    return `
    <li  class="pokemon ${pokemon.type} " onclick=clickPokemon(${pokemon.name}${pokemon.number})>
                    <span class="number">#${pokemon.number.toString().padStart(4, '0')}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                        </ol>
                        <img
                            src="${pokemon.photo}"
                            alt="${pokemon.name}" srcset>
                    </div>
                    <div id="${pokemon.name}${pokemon.number}" style="display:none">
                    <span class="height type">height: ${pokemon.height / 10} m</span>
                    <span class="weight type">weight: ${pokemon.weight / 10} kg</span>
                    </div>
    </li>        
    `

}


function clickPokemon(id) {



    id.style.display = "flex"
    id.classList.add("show")
    id.classList.add(id.parentElement.classList[1]);
    
    id.parentElement.addEventListener("mouseleave", () => {
        id.style.display = "none"
    })
    
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonsList = []) => {

        pokemons.innerHTML += pokemonsList.map(convertPokemonToLi).join("")

    })
        .catch((error) => console.log(error))
        .finally(() => console.log("Criação concluída"));

}



loadPokemonItens(offset, limit)

loadMore.addEventListener("click", () => {

    offset += limit
    const qtdNextPage = offset + limit
    if (qtdNextPage >= maxRecords) {
        debugger
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)

    } else {

        loadPokemonItens(offset, limit)
    }
})



