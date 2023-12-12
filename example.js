const add_params = {
  vs_currency: "eur",
  order: "market_cap_desc",
  per_page: 10,
};

const urlbasic = new URL("https://api.coingecko.com/api/v3/coins/markets?");
const urlParams = new URL(
  urlbasic + new URLSearchParams(add_params).toString()
);
const urlCoins = "https://api.coingecko.com/api/v3/coins/";

function fetchCoinsList(urlParams) {
  sendAPIRequest(urlParams).then((data) => {
    insertCoinList(data);
  });
}

fetchCoinsList(urlParams);

async function sendAPIRequest(urlParams) {
  const response = await fetch(urlParams);
  console.log(response);
  if (!response.ok) {
    throw Error("Error");
  }
  return await response.json();
}

function fetchCoinsById(idName) {
  const url = new URL(new URL(urlCoins + idName).toString());
  sendAPIRequest(url).then((data) => {
    insertCoinDetails(data, idName);
  });
}

function insertCoinDetails(data, idName) {
  const html = `<p>Name:  ${data.name}</p>
      <p>Symbol: ${data.symbol}</p>
      <p>Hashing algorithm: ${data.hashing_algorithm}</p>
      <p>Description: ${data.description.en}</p> 
      <p>Market cap in Euro: ${data.market_data.market_cap.eur}</p>  
      <p>Homepage: ${data.links.homepage[0]}</p>          
      <p>Genesis Date: ${data.genesis_date}</p>   
      `;

  const idLowerCase = idName[0].toUpperCase() + idName.slice(1);
  console.log(idLowerCase);
  document
    .querySelector("#" + idLowerCase)
    .insertAdjacentHTML("beforeend", html);
}

function insertCoinList(data) {
  console.log;
  const html = data
    .map((currency) => {
      return `<div id=${currency.name}  class="currency-list">
  <p><img src="${currency.image}" alt="" </p>
  <p>Name:  ${currency.name}</p>
  <p>Symbol: ${currency.symbol}</p>
  <p>Current price: ${currency.current_price}</p>
  <p>High 24 hour Price: ${currency.high_24h}</p>
  <p>Low 24 hour Price: ${currency.low_24h}</p>
  <button class="currency-button" onclick="fetchCoinsById('${currency.id}')">more details</button>        
  </div>`;
    })
    .join("");
  document
    .querySelector("#coin-container")
    .insertAdjacentHTML("afterbegin", html);
}

function fetchExample() {
  const user = fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  console.log(user);
  const printAddress = () => {
    user.then((a) => {
      console.log(a);
    });
  };

  printAddress();
}

//fetchExample();
