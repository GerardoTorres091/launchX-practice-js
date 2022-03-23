const PokeData = {
    pokeName   : '',
    pokeType   : '',
    pokeImage  : '',
    pokeStats  : {
        hp: '',
        attack: '',
        defense: '',
        eAttack: '',
        eDefense: ''
    },
    movement : {}
};

var screen = 1;

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    if(pokeName.trim() === ''){
        alert('name is required');
        return;
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.gif")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            //Mapear datos
            console.log(data);
            //mapeo datos generales
            PokeData.pokeImage = data.sprites.front_default;
            PokeData.pokeType  = data.types[0].type.name;
            PokeData.pokeName  = data.name;

            //mapeo stats
            PokeData.pokeStats.hp       = data.stats[0].base_stat;
            PokeData.pokeStats.attack   = data.stats[1].base_stat;
            PokeData.pokeStats.defense  = data.stats[2].base_stat;
            PokeData.pokeStats.eAttack  = data.stats[3].base_stat;
            PokeData.pokeStats.eDefense = data.stats[4].base_stat;

            //mapeo movements
            PokeData.movement.move1  = data.moves[0].move.name;
            PokeData.movement.move2  = data.moves[1].move.name;
            PokeData.movement.move3  = data.moves[2].move.name;
            PokeData.movement.move4  = data.moves[3].move.name;
            PokeData.movement.move5  = data.moves[4].move.name;

            //mostrar info
            setData(PokeData);
        }
    });
}

const setData = (PokeData) => {
    //first screen
    document.getElementById("pokeImg").src = PokeData.pokeImage;
    document.getElementById('valueName').innerHTML = PokeData.pokeName; 
    document.getElementById('valueType').innerHTML = PokeData.pokeType; 

    //second screen
    document.getElementById('valueHp').innerHTML = PokeData.pokeStats.hp; 
    document.getElementById('valueAttack').innerHTML = PokeData.pokeStats.attack; 
    document.getElementById('valueDefense').innerHTML = PokeData.pokeStats.defense; 
    document.getElementById('valueEAttack').innerHTML = PokeData.pokeStats.eAttack; 
    document.getElementById('valueEDefense').innerHTML = PokeData.pokeStats.eDefense;
    
    //third screen
    document.getElementById('valueM1').innerHTML = PokeData.movement.move1;
    document.getElementById('valueM2').innerHTML = PokeData.movement.move2;
    document.getElementById('valueM3').innerHTML = PokeData.movement.move3;
    document.getElementById('valueM4').innerHTML = PokeData.movement.move4;
    document.getElementById('valueM5').innerHTML = PokeData.movement.move5;
}

const nextScreen = () => {
    screen++;
    if(screen == 4){
        screen = 1;
    }

    if(screen == 1){
        showScreen(screen);
    }else if(screen == 2){
        showScreen(screen);
    }else if(screen == 3){
        showScreen(screen);
    }
}

const showScreen = (screen) => {
    if(screen == 1){
        document.getElementById('titulo').innerHTML = 'General Information'; 
        document.getElementById('screen2').style.display = "none";
        document.getElementById('screen3').style.display = "none";
        document.getElementById('screen1').style.removeProperty('display'); 
    }else if(screen == 2){
        document.getElementById('titulo').innerHTML = 'Stats';
        document.getElementById('screen1').style.display = "none";
        document.getElementById('screen3').style.display = "none";
        document.getElementById('screen2').style.removeProperty('display'); 
    }else if(screen == 3){
        document.getElementById('titulo').innerHTML = 'Main movements';
        document.getElementById('screen1').style.display = "none";
        document.getElementById('screen2').style.display = "none";
        document.getElementById('screen3').style.removeProperty('display');
    }
}