const countdownElement = document.getElementById('counter')
let timeleft = 10;
countdownElement.innerText = `Próxima partida: ` + timeleft + `s`
const timerInterval = setInterval(()=>{
  timeleft--;
  countdownElement.innerHTML = `Próxima partida: ` + timeleft + `s`

  if(timeleft <= 0){
    timeleft = 10;
    fetchData()
  }
}, 1000)

async function fetchData() {
  renderLoadingState();
  try {
    const response = await fetch("http://localhost:5050/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    renderData(data);
  } catch (error) {
    console.error(error);
    renderErrorState();
  }
}

function renderErrorState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data

  if (data.players.length > 0) {
    data.players.forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";

      const img = document.createElement("img")
      img.src = item.profilePicture
      div.appendChild(img)

      const name = document.createElement("p")
      name.innerText = item.name
      div.appendChild(name)

      container.appendChild(div);
    });
    combate(data)
  }
}

function combate(data) {
  const container = document.getElementById("data-container");
  const lastTwoPlayers = data.players.slice(-2);
  const player1Name = lastTwoPlayers[0].name
  const player1 = lastTwoPlayers[0].action;
  const player2Name = lastTwoPlayers[1].name
  const player2 = lastTwoPlayers[1].action;

  
  const resultado = document.getElementById('results')
  if (player1 == player2 ) {
    resultado.innerText = " Empate"
} else if (player1 == 'Piedra' && player2 == 'Tijeras') {
    resultado.innerText = player1Name + " gana"
    
} else if (player1 == 'Papel' && player2 == 'Piedra') {
    resultado.innerText = player1Name + " gana"
    
} else if (player1 == 'Tijera' && ataqueEnemigo == 'Papel'){
    resultado.innerText = player1Name + " gana"
   
} else {
  resultado.innerText = player2Name + " gana"
}
}



