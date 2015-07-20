# Huge Navigation Exercise - Front End Architecture

This document intends to explain how I designed and built the project.

##Table of Contents
1. Instalation
2. Tech Stack
3. Build Process
4. App Structure
5. Testing

-----------------------------------

## 1. Instalation

`npm i && npm start`

Navigate to: `http://localhost:3000`

There is a Styleguide available at: `http://localhost:3000/styleguide.html`

--------------------------------------

## 2. Tech Stack

- LESS
- npm
- Karma
- Jasmine
- WebDriverJS


-------------------------------------


## 3. Build Process

### Default task (deploys a nodejs server)
`npm start`

### Javascript minification
`npm run build-js`

### Watch Javascript files for changes
`npm run watch-css

### Generate CSS compiled file
`npm run build-css`

### Watch CSS files for changes
`npm run watch-css`

### Watch files for changes and reload
`npm run watch`

### Run tests

`npm test` (Run unit tests)

`npm run test-e2e` (only End2End tests)

### Building

`npm run build` (Builds the project and copy required files to the public environment)

---------------------------------------

## 4. App Structure

```
|- app/ (frontend application - development environment)
|	|- api/	(dummy API - mock services)
|	|- assets (static files)
|	|	|- fonts
|	|	|- images
|	|	|- scripts
|	|	|- styles
|	|	|	|- optimized javascript code
|	|- scripts
|	|	|- huge (HUGE namespace/package)
|   |	|	|- components (Reusable components)
|   |	|	|	|- drawer.js (Hamburger nav, shows/hides the backdrop)
|   |	|	|	|- navbar.js (Show/hide submenus)
|   |	|	|	|- navbarBuilder.js (Creates and appends to DOM the dynamic navigation items)
|   |	|	|- utils (Global utilities)
|   |	|	|	|- http.js (AJAX requests)
|   |	|	|	|- input.js
|   |	|	|- main.js (app initialization)
|	|- less (source LESS files)
|	|	|- base
|	|	|	|- base.less (base tags)
|	|	|	|- fonts.less (Web fonts)
|	|	|- components (shared UI components)
|	|	|	|- hero.less
|	|	|	|- navbar.less
|	|	|- config
|	|	|	| - vars.less
|   |   |- layout (master layout)
|   |   |   |- footer.less
|   |   |   |- header.less
|   |   |   |- layout.less
|	|	|- views (custom styles for each page)
|	|	main.less (main LESS file)
|	|- index.html
|	|- styleguide.html
|- public/	(frontend application - production env)
|	|- assets (compiled files here)
|	|	|- fonts
|	|	|- images
|	|	|- scripts
|	|	|	|- main.js
|	|	|- styles
|	|	|	|- main.css
|	|- index.html
|- test/	(Unit / E2E testing)
|- package.json
```

---------------------------------------

## 5. Testing (Unit Testing, e2e)


### Unit Testing

To run tests, you should run the following command in your terminal:

`npm test`

I'm using Jasmine to perform unit testing in the app.

After running it, you can see the results of the code coverage inside `/test/coverage/`.

### e2e (End to End) In Progress

I'm using WebDriverJS to perform e2e testing in the app:

`npm run test:e2e`

NOTE: To run this e2e tests, you must have installed selenium in your computer.

```

----------------------------------------

##License

MIT © [Juan David Andrade](http://jdandrade.com/)