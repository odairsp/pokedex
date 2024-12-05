
const pokeApi = {}


function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot)=>typeSlot.type.name)
    const [type] = types 
    pokemon.types = types
    pokemon.type = type
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((responseBody) => responseBody.json())
        .then((jsonBoby) => jsonBoby.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)

        .catch((error) => console.log(error))
        .finally(() => console.log("Requisição concluída"));
}
