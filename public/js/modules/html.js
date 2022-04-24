/* <article class="card">
            <h3>Price Title</h3>
            <p>Description</p>
            <div class="hr"></div>
            <button class="btn btn-delete">delete</button>
          </article> */
export function makeEl(tagName, text, dest, elClass = null) {
  const el = document.createElement(tagName);
  el.textContent = text;
  if (elClass) el.className = elClass;
  dest.appendChild(el);
  return el;
}
export function createCard(newCardObj) {
  const articleEl = document.createElement('article');
  articleEl.className = 'card';
  makeEl('h3', `${newCardObj.price}eur ${newCardObj.name}`, articleEl);
  makeEl('p', newCardObj.description, articleEl);
  makeEl('div', '', articleEl, 'hr');
  //   makeEl('button', 'delete', articleEl, 'btn btn-delete');
  const btn = makeEl('button', '', articleEl, 'btn btn-delete');
  makeEl('i', '', btn, 'fa fa-trash');
  return articleEl;
}

export function renderCards(cardArr, dest) {
  // isvalyti dest, kad neliktu pries tai buvusiu korteliu
  // sukti cikla ir irasyti visas gautas korteles
  // eslint-disable-next-line no-param-reassign
  dest.innerHTML = '';
  cardArr.forEach((cObj) => {
    const card = createCard(cObj);
    dest.append(card);
  });
}
