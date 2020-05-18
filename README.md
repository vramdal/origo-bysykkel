Dette er Vidar Ramdal sin løsning på Oslo Origo sin kodeoppgave.

Løsningen er implementert som en ren frontend-app.
# Den deployes ved push 
til https://vramdal.github.io/origo-bysykkel/ og kan sees der.

![website](https://github.com/vramdal/origo-bysykkel/workflows/website/badge.svg)

------

# Hvis du vil installere og kjøre den på egen maskin
 trenger du `yarn` eller `npm` installert.

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

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
