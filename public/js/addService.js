const formEl = document.querySelector('form');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('desc').value;

  fetch('http://localhost:3000/api/services', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, price, description }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.acknowledged === true) {
        window.location.replace('http://127.0.0.1:5500/public/index.html');
      } else throw new Error('something is wrong');
    })
    .catch((error) => console.log(error));
});
// formEl.addEventListener('submit', (e) => {
//   e.preventDefault();

//   postService();
// });

// async function postService() {
//   const name = document.getElementById('name').value;
//   const price = document.getElementById('price').value;
//   const description = document.getElementById('desc').value;
//   try {
//     const resp = await fetch('http://localhost:3000/api/services', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, price, description }),
//     });
//     // console.log('resp ===', resp);
//     if (resp.acknowledged === true) {
//       const servicesArr = await resp.json();
//       console.log('servicesArr ===', servicesArr);
//       window.location.replace('http://127.0.0.1:5500/public/index.html');
//       return servicesArr;
//     }
//     return Error('ffs');

//     // console.log('piesiam korteles');
//   } catch (error) {
//     console.warn('error ===', error);
//     // console.log('atvaizduojam klaida');
//   }
// }
