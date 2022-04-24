import { renderCards } from './modules/html.js';

const BASE_URL = 'http://localhost:3000/api';

const cardContainerEl = document.querySelector('.cards-container');

async function getServices() {
  try {
    const resp = await fetch(`${BASE_URL}/services`);
    if (resp.ok === false) throw new Error('something is wrong');
    const servicesArr = await resp.json();
    console.log(servicesArr);
    renderCards(servicesArr, cardContainerEl);
    // createCard(servicesArr[0]);
  } catch (error) {
    console.warn('error ===', error);
  }
}

getServices();
