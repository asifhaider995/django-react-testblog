# Django-React TestBlog

This repository is being maintained as part of the standalone project<br />
This project is created with integration of Django Rest framework and React.

## Just Django : DjReact App

### Back End

### Technologies
- Django
- Django Rest Framework
- Sqlite3 db
- PostgreSQL integration for Heroku

#### Available Scripts

In the project directory, you can run:

##### `python manage.py runserver`

Runs the Django server as well as React view in the front end.

### Features
- Register user
- Login as Authenticated user
- Create/Update/Delete article as Authenticated user

#### Authentication and Permissions
- Basic Authentication class
- AllowAny Permission class

### Front End

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

##### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.

##### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `npm run build`

Builds the app for production to the `build` folder.<br />
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

##### Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

##### Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

##### Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

##### Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

##### Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment <br />

###### Visit `package.json` for more details

**Warning! Changing in the front end JavaScript code will not change UI in the integrated app**

#### To integrate changes run `npm run build`



### TO REMOVE INTEGRATION

1. Navigate to the `urls.py` in *TestBlog* directory
2. Remove `re_path(...)` linked to the `index.html`
3. Navigate to the `settings.py` in the *TestBlog* directory
4. Remove value of `DIRS: [...]` from `TEMPLATES=[...]` section
5. Navigate to the terminal and run `python manage.py runserver` or `python3 manage.py runserver`
6. Open a different terminal and run *Available npm Scripts*

##### YouTube channel 'JustDjango' helped me create this.
Visit their channel in 'https://www.youtube.com/channel/UCRM1gWNTDx0SHIqUJygD-kQ'

##### _Procfile_ and _runtime.txt_ configured for heroku
