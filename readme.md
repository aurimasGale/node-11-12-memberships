# Membership system

## BE (back end)

### Services resource

1. api/servicesRoutes.js
2. isitraukti i server js
3. tuscias GET i api/services - grazina json "all services route"
4. sukurti rankiniu budu 2-3 services per compass/ web mongosh
5. gauti visus services, esancius kolekcijoje "services"

## FE Front end

1. susikuriam public/index.html
2. public/js/services.js
3. public/css/style.js

### Services.html Page

1. create navBar
2. create static parts of design
3. fetch services from BE and console log services
4. generate cards of services(memberships) (think about delete button)

### Add- Service.html Page

1. susikuriam public/add-service.html
2. public/js.addService.js
3. add-service.html sukuriam forma pagal dizaina
4. addService.js perimam formos valdyma ir surenkam visus ivesties elementus
5. addService.js siunciam sukure objekta su fetch, kad sukurti nauja service
6. jei sukurta sekmingai, naviguojam i index.html
7. jei ne, pranesam apie klaida
