<h3> This project has been deployed <a href="https://survey-genie-frontend.herokuapp.com/">here</a>.  The backend code is accessible in a seperate repo <a href="https://github.com/elikantor/Survey-Genie-Backend">here</a> <h3>

<h2>Survey Genie</h2>

<p>A survey tool.  Create, respond to, favorite, and view the results of surveys.</p>

<h3>Usage and Features</h3>

<p>Survey Genie streamlines the survey creation process through a user-friendly UI enabling users to create customized surveys that can vary in length and topic.</p>
<li>Create a survey that can vary in length.  Surveys can only be deleted by the survey's creator.</li>
<li>Take any survey created on the platform and view the results in a variety of different formats</li>
<li>Favorite a survey to track specific surveys of interest</li>
<li>Filter through surveys by title or by those that the user has taken</li>

<h3>Prerequisites</h3>
<p>Backend</p>
<li>Rails 5</li>
<li>ActiveModelSerializers</li>
<li>ActionMailer</li>
<li>PostgreSQL</li>
<li>JWT</li>
<li>BCrypt</li>
<br></br>
<p>Frontend</p>
<li>React</li>
<li>Redux</li>
<li>React Router</li>
<li>Chart.js</li>
<li>Semantic UI React</li>

<h3>Installing</h3>
<h5>Backend</h5>
<h7>Clone the backend repo and run the rails server by:</h7>

```
$git clone git@github.com:elikantor/Survey-Genie-Backend.git
$cd Survey-Genie-Backend
$bundle install
$rails db:create
$rails db:migrate
$rails db:seed
$rails s
```

<h5>Frontend</h5>
<h7>Clone the frontend repo and start the frontend server</h7>

```
$git clone git@github.com:elikantor/Survey-Genie-Frontend.git
$cd Survey-Genie-Frontend
$npm install & npm start
Reply "y" when asked "Would you like to run the app on another port instead?"
```

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

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
