import { BASE_URL } from './modules/config.js';
import { renderCards } from './modules/html.js';

const cardContainerEl = document.querySelector('.cards-container');
const addBtnEl = document.querySelector('.btn-add');

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

export async function deleteService(idToDelete) {
  try {
    const resp = await fetch(`${BASE_URL}/services/${idToDelete}`, {
      method: 'DELETE',
    });
    if (resp.ok === false) throw new Error('error is deleting');
    getServices();
  } catch (error) {
    console.warn('error ===', error);
  }
}

addBtnEl.addEventListener('click', () => {
  window.location.href = 'add-service.html';
});
getServices();
