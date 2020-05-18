Dette er Vidar Ramdal sin løsning på Oslo Origo sin kodeoppgave.

Løsningen er implementert som en ren frontend-app, så man trenger en eller annen slags server for å kjøre den på sin egen maskin.

Det enkleste er om man har enten `yarn` eller `npm` installert, da kan man installere `serve`, som er en enkel webserver. 

a) hvis du bruker `yarn`:
````
  yarn global add serve
````

b) hvis du bruker `npm`:
````
  npm install -g serve
````

Etter å ha klonet dette repositoriet og navigert til rot-katalogen for repositoriet, kjører du

````
  serve -s build
````

Åpne en nettleser og naviger til http://localhost:5000, og du skal kunne se appen.

Skulle det være problemer med denne framgangsmåten, så er appen også deployet til http://vvv.vidarramdal.com/origo-oppgave-1/ og kan sees der.


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
