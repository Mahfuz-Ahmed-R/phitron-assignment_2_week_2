let count = 0;
let globalPlayers = [];
let addTeamCount = new Array(25).fill(0);
const loadData = () => {
    fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=')
        .then(res => res.json())
        .then(data => {
            displayPlayer(data.player)
        });
}

const displayPlayer = (players) => {
    const mainBox = document.getElementById("allBoxes");
    for(let i = 0; i < players.length; i++) {
        const player = players[i];
        globalPlayers.push(player);
        const div = document.createElement("div");
        div.classList.add("box");

        div.innerHTML = `
        <img class="innerImg" src="${player.strThumb}" alt="">
        <h3>Name: ${player.strPlayer}</h3>
        <p>Sport: ${player.strSport}</p>
        <p>Nationality: ${player.strNationality}</p>
        <p>Team: ${player.strTeam}</p>
        <p>Description: ${player.strWage}</p>
        <p>${player.strDescriptionEN.slice(0,100)}</p>
        <p>
        <a href="${player.strTwitter}"><i class="fa-brands fa-x-twitter"></i></a>
        <a href="${player.strInstagram}"><i class="fa-brands fa-instagram"></i></a>
        </p>
        <button class="btn btn-success" id="addTeam${i}" onclick="addTeam('${player.strPlayer}', ${i})">Add to Team</button>
        <button class="btn btn-info mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal" id ="idDetails${i}" onclick="openModal(${i})">More Details</button>
        ` 
        mainBox.appendChild(div);
    }
}
const addTeam = (name, index)=>{
    if(addTeamCount[index] == 1){
        return;
    }
    else{
        if(count >= 11){
            alert("You can't add more than 11 players");
            return;
        }
        else{
            count++;
        }
        addTeamCount[index] = 1;
        document.getElementById(`addTeam${index}`).style.backgroundColor = "#bb2d3b";
        document.getElementById(`addTeam${index}`).innerHTML = "Added";

        const member = document.getElementById("members");
        const number = document.getElementById("offcanvas-header-id");
        number.innerHTML = `
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">My Team</h5>
        <h3>Total Players: ${count}</h3>
        <h3>Max Player: 11</h3>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        `;

        const div = document.createElement("div");
        div.id = `cart-player${index}`;
    
        div.innerHTML = `
        <span>Name: ${name}</span>
        <span>Count: ${1}</span>
        <a href="#" onclick="reset(${index})"><i class="fa-solid fa-x"></i></a>
        `
        member.appendChild(div);
    }
}
const reset = (index)=>{
    count--;
    document.getElementById(`addTeam${index}`).style.backgroundColor = "#157347";
    document.getElementById(`addTeam${index}`).innerHTML = "Add to Team";

    const member = document.getElementById("members");
    const div = document.getElementById(`cart-player${index}`);
    const number = document.getElementById("offcanvas-header-id");
    number.innerHTML = `
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">My Team</h5>
    <h3>Total Players: ${count}</h3>
    <h3>Max Player: 11</h3>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    `;

    member.removeChild(div);
    addTeamCount[index] = 0;
}
const openModal = (index)=>{
    const e = globalPlayers[index];
    const modal = document.getElementById("modal-body-id");

    modal.innerHTML = '';

    const div = document.createElement("div");
    div.classList.add("details")

    div.innerHTML = `
        <h3 id="playerId">ID: ${e.idPlayer}</h3>
        <p id="playerBorn">Birth Date: ${e.dateBorn}</p>
        <p id="playerBirthLocation">Birth Location: ${e.strBirthLocation}</p>
        <p id="playerEthnicity">Ethnicity: ${e.strEthnicity}</p>
        <p id="playerGender">Gender: ${e.strGender}</p>
        <p id="playerStatus">Status: ${e.strStatus}</p>
    `
    modal.appendChild(div);
}
const searchPlayer = () => {
    const searchInput = document.getElementById("search-box-input");
    const search = searchInput.value;
    const searchBox = document.getElementById("allBoxes");
    searchBox.innerHTML = '';

    const searchPlayers = globalPlayers.filter(player => player.strPlayer.toLowerCase().includes(search.toLowerCase()));
    displayPlayer(searchPlayers);

    searchInput.value = '';
}
loadData();