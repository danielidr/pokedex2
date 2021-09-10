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
                                let data = e.target.href;
                                $("#exampleModal").modal("show");
                                $('#exampleModalLabel').html(unicPokemon.name);
                                $('#abilities').html(getAbilities(unicPokemon));

                            })

                            let url_type = unicPokemon.types[0].type.url;

                            fetch (url_type)

                                .then(function(response){
                                    return response.json();
                                })

                                .then(function(response){
                                    console.log(response);
                                    let generation = response.generation.name
                                    $('#generation').html(generation)
                                })
                        })
                })
            })
    }


            //                     let abi = ''
            //                     response.abilities.forEach(function (abilities) {
            //                         abi = abi + ' ' + abilities.ability.name
            //                     })
            //                     let mov = ''
            //                     response.moves.forEach(function (moves, index) {
            //                         if (index < 5) {
            //                             mov = mov + ' ' + moves.move.name
            //                         }
            //                     })
            //                     $('#exampleModalLabel').html(name)
            //                     $('#type').html(`Type: ${type}`)
            //                     $('#abilities').html(`Abilities: ${abi}`)
            //                     $('#moves').html(`Moves: ${mov}`)
            //                 }
            //             })
            //         }
            //     )
            // }
            // function getPokemonData(data){

            //     fetch(data)
            //     .then(function(response){
            //         return response.json();
            //     })
    
            //     .then(function(response){    
            //         $('#abilities').html(getAbilities(response))
            //         $('#type').html(getTypes(response))
            //         $('#moves').html(getMoves(response))
            //         });
            // }

            function getAbilities(unicPokemon){
                let abi = 'Abilities:'
                unicPokemon.abilities.forEach(function (abilities) {
                    abi = abi + ' ' + abilities.ability.name
                })
                return abi
            }
            // function getTypes(unicPokemon){
            //     let typ = 'types:'
            //     pokemon.types.forEach(function (types) {
            //         typ = typ + ' ' + types.type.name
            //     })
            //     return typ
            // }
            // function getMoves(data){
            //     let mov = 'moves:'
            //     pokemon.moves.forEach(function (moves, index) {
            //         if (index < 5) {
            //             mov = mov + ' ' + moves.move.name
            //         }
            //     })
            //     return mov
            // }
})