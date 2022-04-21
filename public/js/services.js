const BASE_URL = 'http://localhost:3000/api';

async function getServices(resource) {
  const resp = await fetch(`${BASE_URL}/${resource}`);
  const atsInJs = await resp.json();
  console.log('atsInJs ===', atsInJs);
}
getServices('services');
