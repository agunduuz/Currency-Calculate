const api_key = '2fd3aed3d28864ffe612f4db';
const url = 'https://v6.exchangerate-api.com/v6/' + api_key;

// Elements
const currency_one = document.getElementById('currency_one');
const currency_two = document.getElementById('currency_two');

const list_one = document.getElementById('list_one');
const list_two = document.getElementById('list_two');

const amount = document.getElementById('amount');
const calculate = document.getElementById('calculate');
const result = document.getElementById('result');

// SEND QUERY
fetch(url + '/codes')
  .then((res) => res.json())
  .then((data) => {
    const items = data.supported_codes;

    let options;
    for (let item of items) {
      options += `<option value=${item[0]}>${item[1]}</option>`;
    }
    list_one.innerHTML = options;
    list_two.innerHTML = options;
  });

// CALCULATE AREA

calculate.addEventListener('click', function () {
  const currency1 = currency_one.value;
  const currency2 = currency_two.value;
  const price = amount.value;

  console.log(currency1, currency2, price);
  fetch(url + '/latest/' + currency1)
    .then((res) => res.json())
    .then((data) => {
      const total_result = (data.conversion_rates[currency2] * price).toFixed(
        2
      );
      result.innerHTML = `
      <div class="card border-primary">
              <div class="card-body text-center" style="font-size: 30px">
                ${price} ${currency1} = ${total_result} ${currency2}
              </div>
            </div> 
      `;
    });
});
