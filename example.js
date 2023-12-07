const add_params = {
  vs_currency: "eur",
  order: "market_cap_desc",
  per_page: 10,
};

const url = new URL("https://api.coingecko.com/api/v3/coins/markets?");
const urlParams = new URL(url + new URLSearchParams(add_params).toString());
console.log(urlParams);

function fetchCoinsList() {
  fetch(urlParams)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
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
      console.log(html);
      document
        .querySelector("#coin-container")
        .insertAdjacentHTML("afterbegin", html);
    });
}

fetchCoinsList();

function fetchCoinsById(idName) {
  fetch(new URL("https://api.coingecko.com/api/v3/coins/" + idName).toString())
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      console.log("details: ");
      console.log(data);

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
    });
}
