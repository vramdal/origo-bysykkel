Dette er Vidar Ramdal sin løsning på Oslo Origo sin kodeoppgave.

Løsningen er implementert som en ren frontend-app.

Jeg har sjekka at den fungerer i Chrome, Safari, Firefox og Edge. Jeg har dessverre ikke noen maskin med IE for øyeblikket.

# For å kjøre koden
går du til https://vramdal.github.io/origo-bysykkel/ , siste versjon deployes automatisk dit.

# eller, hvis du vil installere og kjøre koden på egen maskin

så trenger du `yarn` eller `npm` installert.

Etter å ha klonet dette repositoriet og navigert til rot-katalogen for repositoriet, kjører du

a) hvis du bruker `yarn`:
````
  yarn install
  yarn global add serve
````

b) hvis du bruker `npm`:
````
  npm install
  npm install -g serve
````


````
  serve -s build
````


Åpne en nettleser og naviger til http://localhost:5000, og du skal kunne se appen.


-----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![website](https://github.com/vramdal/origo-bysykkel/workflows/website/badge.svg)

