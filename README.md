This project is a basic fullstack test blog created with integration of djangorestframework and react. 

# Only works in local server

# To run this project, go to terminal and run 'python manage.py runserver'

Minimal Security, Basic Authentication applied. AllowAny Permission classes applied.

### YouTube channel 'JustDjango' helped me create this. 
### Visit their channel in 'https://www.youtube.com/channel/UCRM1gWNTDx0SHIqUJygD-kQ'

# Front End Build pack includes

react, react-router-dom, react-redux, redux, @material-ui/core (check requirements.txt)

# Procfile and runtime.txt configured for heroku


### TO REMOVE INTEGRATION

Navigate to the urls.py in TestBlog directory
Remove 're_path' linked to the 'index.html'
Navigate to the settings.py in the TestBlog directory
Remove value of 'DIRS' from 'TEMPLATES' section
Navigate to the terminal and run 'python manage.py runserver' 
Open a different terminal and run regular [Create React App] commands

The project frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
