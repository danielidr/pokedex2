document.addEventListener('DOMContentLoaded', function() {
    let endpoint = 'https://pokeapi.co/api/v2/pokemon/';

    document.querySelector('#nextTo').addEventListener("click",function(e) {
        e.preventDefault();
        document.getElementsByClassName('card-pokemon')[0].innerText = " ";
        fetchPokemon();
    })

    fetchPokemon();

    function fetchPokemon() {
        fetch (endpoint)
            .then(function(response){
                return response.json();
            })

            .then(function(response){
                console.log(response);
                endpoint = response.next;
                response.results.forEach(function (pokemon) {

                    fetch(pokemon.url)
                        .then(function(response){
                            return response.json();
                        })

                        .then((unicPokemon)=> {
                            let list = `<div class='card col-3'>
                            <div class='card-body'> 
                            <img src="${unicPokemon.sprites.front_default}" class="card-img-top" alt="...">
                            <h5 class='card-title'>${unicPokemon.name}</h5>
                            <a href='#' url='${unicPokemon.url}' id ="${unicPokemon.name}" class='btn btn-light btn-sm'>¡Quiero saber más de este pokémon!</a> 
                            </div>
                            </div>`
                            document.querySelector(".card-pokemon").insertAdjacentHTML('beforeend', list);

                            document.querySelector(`#${unicPokemon.name}`).addEventListener("click",function(e){
                                e.preventDefault();
                                $("#exampleModal").modal("show");
                                document.getElementById('exampleModalLabel').innerText = unicPokemon.name;
                                document.getElementById('abilities').innerText = getAbilities(unicPokemon);
                                document.getElementById('type').innerText = getTypes(unicPokemon);
                                document.getElementById('moves').innerText = getMoves(unicPokemon);

                                let url_type = unicPokemon.types[0].type.url;

                                    fetch(url_type)

                                        .then(function(response){
                                            return response.json();
                                        })

                                        .then(function(response){
                                            console.log(response);
                                            let generation = response.generation.name
                                            document.getElementById('generation').innerText = generation;
                                            document.querySelector('#relation').addEventListener("click",function(e) {
                                                e.preventDefault();
                                                $("#damage").modal("show");
                                                document.getElementById('ddFrom').innerText = getDDFrom(response);
                                                document.getElementById('ddTo').innerText = getDDTo(response);
                                                document.getElementById('hdFrom').innerText = getHDFrom(response);
                                                document.getElementById('hdTo').innerText = getHDTo(response);
                                                document.getElementById('ndFrom').innerText = getNDFrom(response);
                                                document.getElementById('ndTo').innerText = getNDTo(response);
                                            })
                                        })
                            })
                        })
                })
            })
    }

    function getAbilities(unicPokemon){
        let abi = 'Abilities:';
        unicPokemon.abilities.forEach(function (abilities) {
            abi = abi + ' ' + abilities.ability.name;
        })
        return abi;
    }
    
    function getTypes(unicPokemon){
        let typ = 'types:';
        unicPokemon.types.forEach(function (types) {
            typ = typ + ' ' + types.type.name;
        })
        return typ;
    }

    function getMoves(unicPokemon){
        let mov = 'moves:';
        unicPokemon.moves.forEach(function (moves, index) {
            if (index < 5) {
                mov = mov + ' ' + moves.move.name;
            }
        })
    return mov;
    }

    function getDDFrom(url_type){
        let ddFrom = 'Double damage from:';
        url_type.damage_relations.double_damage_from.forEach(function(damage) {
            ddFrom = ddFrom + ' ' + damage.name;
        });
        return ddFrom;
    }

    function getDDTo(url_type){
        let ddTo = 'Double damage to:';
        url_type.damage_relations.double_damage_to.forEach(function(damage) {
            ddTo = ddTo + ' ' + damage.name;
        });
        return ddTo;
    }

    function getHDFrom(url_type){
        let hdFrom = 'Half damage from:';
        url_type.damage_relations.half_damage_from.forEach(function(damage) {
            hdFrom = hdFrom + ' ' + damage.name;
        });
        return hdFrom;
    }

    function getHDTo(url_type){
        let hdTo = 'Half damage to:';
        url_type.damage_relations.half_damage_to.forEach(function(damage) {
            hdTo = hdTo + ' ' + damage.name;
        });
        return hdTo;
    }

    function getNDFrom(url_type){
        let ndFrom = 'No damage from:';
        url_type.damage_relations.no_damage_from.forEach(function(damage) {
            ndFrom = ndFrom + ' ' + damage.name;
        });
        return ndFrom;
    }

    function getNDTo(url_type){
        let ndTo = 'No damage to:';
        url_type.damage_relations.no_damage_to.forEach(function(damage) {
            ndTo = ndTo + ' ' + damage.name;
        });
        return ndTo;
    }
})