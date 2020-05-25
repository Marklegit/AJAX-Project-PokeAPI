const toggleBtn = document.querySelector(".lines-container");
let line1 = document.querySelector(".line1")
let line2 = document.querySelector(".line2")
let line3 = document.querySelector(".line3")
//On click adds class for the Hamburger Menu to display | animation for 3 lines
function toggleMenu(){
	const navbarToggle = document.getElementById("main-navbar");
	navbarToggle.classList.toggle("menu-active");
	line1.classList.toggle("active");
	line2.classList.toggle("active");
	line3.classList.toggle("active");
}
toggleBtn.addEventListener("click", toggleMenu);

function pokemonData () {
	const pokemonName = document.getElementById("pokemon-search").value.toLowerCase();
	const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
	const xhttps = new XMLHttpRequest();
	
	xhttps.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			console.log(this.responseText);
			console.log(JSON.parse(this.responseText));
			const data = JSON.parse(this.responseText);
			//Pokémon Object
			const pokemon = {};
			//Pokemon properties | variables attached to the pokemon object 
			pokemon['name'] = data.name;
			pokemon['spriteFront'] = data.sprites['front_default'];
			pokemon['spriteBack'] = data.sprites['back_default'];
			pokemon['shinySpriteFront'] = data.sprites['front_shiny'];
			pokemon['shinySpriteBack'] = data.sprites['back_shiny'];
			pokemon['pokedex'] = data.id;
			//Adds the official Artwork of a Pokémon
			const artWorkUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.pokedex}.png`;
			//Checks for the Pokédex number to label a pokemon's region | generation
			let pokemonRegion = document.getElementById("pokemon-region");
			if (pokemon.pokedex >= 1 && pokemon.pokedex <= 151){
				pokemonRegion.innerHTML = "Kanto | Generation I";
			} else if (pokemon.pokedex >= 152 && pokemon.pokedex <= 251){
				pokemonRegion.innerHTML = "Johto | Generation II";
			} else if (pokemon.pokedex >= 252 && pokemon.pokedex <= 386){
				pokemonRegion.innerHTML = "Hoenn | Generation III";
			} else if (pokemon.pokedex >= 387 && pokemon.pokedex <= 493){
				pokemonRegion.innerHTML = "Sinnoh | Generation IV";
			} else if (pokemon.pokedex >= 494 && pokemon.pokedex <= 649){
				pokemonRegion.innerHTML = "Unova | Generation V";
			} else if (pokemon.pokedex >= 650 && pokemon.pokedex <= 721){
				pokemonRegion.innerHTML = "Kalos | Generation VI";
			} else if (pokemon.pokedex >= 722 && pokemon.pokedex <= 808){
				pokemonRegion.innerHTML = "Alola | Generation VII";
			}
			pokemon['type'] = data.types.map(type => type.type.name).reverse().join(", ");
			pokemon['abilities'] = data.abilities.map(ability => ability.ability.name).reverse().join(", ");
			
			//Pokemon base stats
			pokemon["baseHp"] = data.stats[5].base_stat;
			pokemon["baseAttack"] = data.stats[4].base_stat;
			pokemon["baseDefense"] = data.stats[3].base_stat;
			pokemon["baseSpecialAttack"] = data.stats[2].base_stat;
			pokemon["baseSpecialDefense"] = data.stats[1].base_stat;
			pokemon["baseSpeed"] = data.stats[0].base_stat;
			
			//This adds all the base stats and returns a total base stat
			let sumOfBaseStats = pokemon.baseHp + pokemon.baseAttack + pokemon.baseDefense + pokemon.baseSpecialAttack + pokemon.baseSpecialDefense + pokemon.baseSpeed;
			let totalBaseStats = document.getElementById("total-base-stats");
			totalBaseStats.innerHTML = parseInt(sumOfBaseStats);
			
			//Checks for the total base stat and labels them Pseudo-Legendary or Legendary
			let pokemonBaseLabel = document.querySelector(".pokemon-base-label")
			if (sumOfBaseStats === 600){
				pokemonBaseLabel.innerHTML = "Pseudo-Legendary";
				pokemonBaseLabel.style.color = "black";
				pokemonBaseLabel.style.backgroundColor = "rgb(0, 0, 0, 0.1)";
				pokemonBaseLabel.style.border = "1px solid #aaa";
			} else if (sumOfBaseStats >= 601){
				pokemonBaseLabel.innerHTML = "Legendary";
				pokemonBaseLabel.style.color = "white";
				pokemonBaseLabel.style.backgroundColor = "rgb(0, 0, 0, 0.6)";
				pokemonBaseLabel.style.border = "1px solid #aaa";
			} else {
				pokemonBaseLabel.innerHTML = "";
				pokemonBaseLabel.style.color = "";
				pokemonBaseLabel.style.backgroundColor = "";
				pokemonBaseLabel.style.border = "";
			}
			//Variables used to check if a stat is low, average, high, or extreme
			const hpGauge = document.querySelector(".stat-hp-gauge");
			const attackGauge = document.querySelector(".stat-attack-gauge");
			const defenseGauge = document.querySelector(".stat-defense-gauge");
			const specialAttackGauge = document.querySelector(".stat-special-attack-gauge");
			const specialDefenseGauge = document.querySelector(".stat-special-defense-gauge");
			const speedGauge = document.querySelector(".stat-speed-gauge");
			//Checks each stat and labels them low, average, high, and extreme
			//HP label
			if (pokemon.baseHp <= "60"){
				hpGauge.style.backgroundColor = "#f52727";
				hpGauge.innerHTML = "Low";
			} else if (pokemon.baseHp >= "61" && pokemon.baseHp < "90" ){
				hpGauge.style.backgroundColor = "#edcd40"
				hpGauge.innerHTML = "Average";
			} else if (pokemon.baseHp >= "90" && pokemon.baseHp < "120"){
				hpGauge.style.backgroundColor = "#08c486";
				hpGauge.innerHTML = "High";
			} else if(pokemon.baseHp >= "120"){
				hpGauge.style.backgroundColor = "#74a1a3";
				hpGauge.innerHTML = "Extreme";
			} else{
				hpGauge.style.display = "none";
				hpGauge.innerHTML = "";
			}
			//Attack label
			if (pokemon.baseAttack <= "60"){
				attackGauge.style.backgroundColor = "#f52727";
				attackGauge.innerHTML = "Low";
			} else if (pokemon.baseAttack >= "61" && pokemon.baseAttack < "90" ){
				attackGauge.style.backgroundColor = "#edcd40"
				attackGauge.innerHTML = "Average";
			} else if (pokemon.baseAttack >= "90" && pokemon.baseAttack < "120"){
				attackGauge.style.backgroundColor = "#08c486";
				attackGauge.innerHTML = "High";
			} else if(pokemon.baseAttack >= "120"){
				attackGauge.style.backgroundColor = "#74a1a3";
				attackGauge.innerHTML = "Extreme";
			} else{
				attackGauge.style.display = "none";
				attackGauge.innerHTML = "";
			}
			//Defense label
			if (pokemon.baseDefense <= "60"){
				defenseGauge.style.backgroundColor = "#f52727";
				defenseGauge.innerHTML = "Low";
			} else if (pokemon.baseDefense >= "61" && pokemon.baseDefense < "90" ){
				defenseGauge.style.backgroundColor = "#edcd40"
				defenseGauge.innerHTML = "Average";
			} else if (pokemon.baseDefense >= "90" && pokemon.baseDefense < "120"){
				defenseGauge.style.backgroundColor = "#08c486";
				defenseGauge.innerHTML = "High";
			} else if(pokemon.baseDefense >= "120"){
				defenseGauge.style.backgroundColor = "#74a1a3";
				defenseGauge.innerHTML = "Extreme";
			} else{
				defenseGauge.style.display = "none";
				defenseGauge.innerHTML = "";
			}
			//Special attack label
			if (pokemon.baseSpecialAttack <= "60"){
				specialAttackGauge.style.backgroundColor = "#f52727";
				specialAttackGauge.innerHTML = "Low";
			} else if (pokemon.baseSpecialAttack >= "61" && pokemon.baseSpecialAttack < "90" ){
				specialAttackGauge.style.backgroundColor = "#edcd40"
				specialAttackGauge.innerHTML = "Average";
			} else if (pokemon.baseSpecialAttack >= "90" && pokemon.baseSpecialAttack < "120"){
				specialAttackGauge.style.backgroundColor = "#08c486";
				specialAttackGauge.innerHTML = "High";
			} else if(pokemon.baseSpecialAttack >= "120"){
				specialAttackGauge.style.backgroundColor = "#74a1a3";
				specialAttackGauge.innerHTML = "Extreme";
			} else{
				specialAttackGauge.style.display = "none";
				specialAttackGauge.innerHTML = "";
			}
			//Special defense label
			if (pokemon.baseSpecialDefense <= "60"){
				specialDefenseGauge.style.backgroundColor = "#f52727";
				specialDefenseGauge.innerHTML = "Low";
			} else if (pokemon.baseSpecialDefense >= "61" && pokemon.baseSpecialDefense < "90" ){
				specialDefenseGauge.style.backgroundColor = "#edcd40"
				specialDefenseGauge.innerHTML = "Average";
			} else if (pokemon.baseSpecialDefense >= "90" && pokemon.baseSpecialDefense < "120"){
				specialDefenseGauge.style.backgroundColor = "#08c486";
				specialDefenseGauge.innerHTML = "High";
			} else if(pokemon.baseSpecialDefense >= "120"){
				specialDefenseGauge.style.backgroundColor = "#74a1a3";
				specialDefenseGauge.innerHTML = "Extreme";
			} else{
				specialDefenseGauge.style.display = "none";
				specialDefenseGauge.innerHTML = "";
			}
			//Speed label
			if (pokemon.baseSpeed <= "60"){
				speedGauge.style.backgroundColor = "#f52727";
				speedGauge.innerHTML = "Low";
			} else if (pokemon.baseSpeed >= "61" && pokemon.baseSpeed < "90" ){
				speedGauge.style.backgroundColor = "#edcd40"
				speedGauge.innerHTML = "Average";
			} else if (pokemon.baseSpeed >= "90" && pokemon.baseSpeed < "120"){
				speedGauge.style.backgroundColor = "#08c486";
				speedGauge.innerHTML = "High";
			} else if(pokemon.baseSpeed >= "120"){
				speedGauge.style.backgroundColor = "#74a1a3";
				speedGauge.innerHTML = "Extreme";
			} else{
				speedGauge.style.display = "none";
				speedGauge.innerHTML = "";
			}
			//Table row 1: displays data of move names
			pokemon['moveList'] = data.moves.map(function(allmoves){
				return `<li><br>${allmoves.move.name}</li>`;
			}).join(" ");
			//Table row 2: displays data of the method of learning a move
			pokemon['learnMethod'] = data.moves.map(function(learnMethodMove){
				return `<li>${learnMethodMove.version_group_details.map(learnM => `<br>${learnM.move_learn_method.name}`).join("")}</li>`;
			}).join("");
			//Table row 3: displays the level required for a move in each game
			pokemon['levelingMove'] = data.moves.map(function(levelingmoves){
				return `<li>${levelingmoves.version_group_details.map(lvMoves => `<br>${lvMoves.level_learned_at}`).join("")}</li>`;
			}).join("");
			//Table row 4: displays the game version that the move belongs to
			pokemon['gameVersion'] = data.moves.map(function(gameVersionMove){
				return `<li>${gameVersionMove.version_group_details.map(versionGame => `<br>${versionGame.version_group.name}`).join("")}</li>`
			}).join("");
			
			//Adds the data to HTML using InnerHTML or src if it's an image
			document.getElementById("pokemon-name").innerHTML = pokemon.name;
			document.getElementById("pokemon-artwork").src = artWorkUrl;
			document.getElementById("pokemon-front-sprite").src = pokemon.spriteFront;
			document.getElementById("pokemon-back-sprite").src = pokemon.spriteBack;
			document.getElementById("pokemon-front-sprite-shiny").src = pokemon.shinySpriteFront;
			document.getElementById("pokemon-back-sprite-shiny").src = pokemon.shinySpriteBack;
			document.getElementById("pokedex-id").innerHTML = pokemon.pokedex;
			document.getElementById("pokemon-type").innerHTML = pokemon.type;
			document.getElementById("pokemon-abilities").innerHTML = pokemon.abilities;
			document.getElementById("pokemon-base-hp").innerHTML = pokemon.baseHp;
			document.getElementById("pokemon-base-attack").innerHTML = pokemon.baseAttack;
			document.getElementById("pokemon-base-defense").innerHTML = pokemon.baseDefense;
			document.getElementById("pokemon-base-special-attack").innerHTML = pokemon.baseSpecialAttack;
			document.getElementById("pokemon-base-special-defense").innerHTML = pokemon.baseSpecialDefense;
			document.getElementById("pokemon-base-speed").innerHTML = pokemon.baseSpeed;
			document.getElementById("pokemon-moves").innerHTML = pokemon.moveList;
			document.getElementById("pokemon-learning-method").innerHTML = pokemon.learnMethod;
			document.getElementById("pokemon-leveling-moves").innerHTML = pokemon.levelingMove;
			document.getElementById("pokemon-game-version").innerHTML = pokemon.gameVersion;
		}
	};
	xhttps.open("GET", url, true);
	xhttps.send();
}
//Gets the pokemon data when the user clicks the search button
const button = document.getElementById("btn");
button.addEventListener("click", () => {
	pokemonData();
});
//Gets the pokemon data when the user clicks enter
const keySearch = document.querySelector(".enter-search");
keySearch.addEventListener('keypress', function(e){
	if (e.key === "Enter"){
		pokemonData();
	}
});
