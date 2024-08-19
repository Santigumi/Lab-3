
const countdownElement = document.getElementById('Countdown')
let timeleft = 10;
countdownElement.innerText = `Tiempo restante: ` + timeleft
const timerInterval = setInterval(()=>{
  timeleft--;
  countdownElement.innerHTML = `Tiempo restante: ` + timeleft

  if(timeleft <= 0){
    createUser()
    clearInterval(timerInterval)
    countdownElement.innerText = `Tiempo finalizado`
  }
}, 1000)

const Reload = document.getElementById('reload')
Reload.addEventListener('click', reiniciar)

function reiniciar (){
  location.reload();
}
const code = nombreAleatorio()
const randomAction = accionAleatoria()
const form = {
  'name': '' || 'Player' + code,
  'action': '' || randomAction,
}

function nombreAleatorio() {
  let nameAle = aleatorio(1,100)
  return nameAle
}

const username = document.getElementById("Name")
username.addEventListener('change', actualizarNombre)
function actualizarNombre(){
  form.name = username.value
  console.log(form.name)
  checkForm(form)
}


function aleatorio(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let botonPiedra = document.getElementById('Piedra')
botonPiedra.addEventListener('click', Piedra)

let botonPapel = document.getElementById('Papel')
botonPapel.addEventListener('click', Papel)

let botonTijeras = document.getElementById('Tijeras')
botonTijeras.addEventListener('click', Tijeras)

function Piedra() {
  form.action = 'Piedra'
  checkForm(form)
}

function Papel() {
  form.action = 'Papel'
  checkForm(form)
}

function Tijeras() {
  form.action = 'Tijeras'
  checkForm(form)
}

function accionAleatoria() {
  let number = aleatorio(1,3)
  console.log(number)
  let action = ''
  if (number === 1) {
    action = 'Piedra'
  } else if (number === 2){
    action = 'Papel'
  } else {
    action = 'Piedra'
  }
  return action
}

function checkForm(form) {
  let fetchButton = document.getElementById("fetch-button");
  fetchButton.addEventListener('click', addUser)
  const isFormFilled = Object.values(form).some(value => value.trim() !== '');
  if (isFormFilled){
    fetchButton.disabled = false;
  } else {
    fetchButton.disabled = true;
  }
}

function addUser() {
  let fetchButton = document.getElementById("fetch-button");
  fetchButton.disabled = true
  fetchButton.style.backgroundColor = 'gray'
  botonPiedra.disabled = true
    botonPiedra.style.backgroundColor = 'gray'
  botonPapel.disabled = true
    botonPapel.style.backgroundColor = 'gray'
  botonTijeras.disabled = true
    botonTijeras.style.backgroundColor = 'gray'
  renderData(form.name)
}

async function createUser() {
  let fetchButton = document.getElementById("fetch-button");
  fetchButton.disabled = true

  let imageProfile = aleatorio(1,70)

  username.value = ''
  console.log(form.action)
  renderLoadingState();
  try {
    const player = {
      name: form.name,
      profilePicture: "https://avatar.iran.liara.run/public/" + imageProfile, // if you want to generate random images for user profile go to this link: https://avatar-placeholder.iran.liara.run/
      action: form.action
    };
    const response = await fetch("http://localhost:5050/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(player), // Convert the data to a JSON string
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    addUser();
  } catch (error) {
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

function renderData(username) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = "Jugador creado: " + username;
  container.appendChild(div);
}


