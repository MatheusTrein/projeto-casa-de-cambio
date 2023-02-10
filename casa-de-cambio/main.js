import Swal from "sweetalert2"
import './style.css'

const inputMoedaEl = document.querySelector("input");
const buttonPesquisarEl = document.querySelector("button");
const divSectionHeader = document.getElementsByClassName("section-header");

const API_URL = (moeda) => `https://api.exchangerate.host/latest?base=${moeda}`;


const fillMoedas = (moedas) => {
  const ulMoedasEl = document.getElementById("moedas");
  
  const h2 = document.createElement("h2");
  ulMoedasEl.innerHTML = "";
  divSectionHeader[0].innerHTML = ""
  h2.innerText = `Valores referente a 1 ${inputMoedaEl.value.toUpperCase()}`
  
  divSectionHeader[0].appendChild(h2);

  moedas.forEach(moeda => {
    const li = document.createElement("li");
    li.className = "moeda";
    const img = document.createElement("img");
    img.src = "./public/moedas.png"
    const spanNomeMoeda = document.createElement("span");
    spanNomeMoeda.setAttribute("id", "nome-moeda");
    spanNomeMoeda.innerText = moeda[0];
    const spanValorMoeda = document.createElement("span");
    spanValorMoeda.setAttribute("id", "valor-moeda")
    spanValorMoeda.innerText = moeda[1].toFixed(3);
    li.appendChild(img);
    li.appendChild(spanNomeMoeda);
    li.appendChild(spanValorMoeda);
    ulMoedasEl.appendChild(li);
  })
}

buttonPesquisarEl.addEventListener("click", () => {
  const moeda = inputMoedaEl.value.toUpperCase();
  const url = API_URL(moeda);

  fetch(url).then(response => response.json()).then(data => {
    if(!moeda) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você precisa passar uma moeda'
      })
      return
    }

    if(moeda !== "EUR" && data.base === "EUR") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Moeda não existente!'
      })
    } else {
      fillMoedas(Object.entries(data.rates))
    }
  }) 
})