const BASE_URL = 'http://localhost:3000/api';

const cardContEl = document.getElementById('card-container');

function renderCards(arr) {
  arr.forEach((arrObj) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    const priceEl = document.createElement('h3');
    priceEl.textContent = `$${arrObj.price} ${arrObj.name}`;

    const descEl = document.createElement('p');
    descEl.textContent = arrObj.description;

    const hrEl = document.createElement('hr');
    const delBtnEl = document.createElement('button');
    delBtnEl.className = 'del-btn';
    const iEl = document.createElement('i');
    iEl.className = 'fa fa-trash';

    delBtnEl.append(iEl);
    cardEl.append(priceEl, descEl, hrEl, delBtnEl);
    cardContEl.append(cardEl);
  });
}

async function getServices() {
  try {
    const resp = await fetch(`${BASE_URL}/services`);
    // console.log('resp ===', resp);
    if (resp.ok === false) throw new Error('something is wrong');

    const servicesArr = await resp.json();
    console.log('servicesArr ===', servicesArr);
    renderCards(servicesArr);

    // console.log('piesiam korteles');
  } catch (error) {
    console.warn('error ===', error);
    // console.log('atvaizduojam klaida');
  }
}
getServices();
