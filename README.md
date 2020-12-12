# LTV Test
## Local Configuration

To run this project, it's just needed to run the following commands:
```
npm install
npm start
```

## Build
The built project will be generated in the dist folder.

```
npm run build
```

## Technology Stack
- JQuery 3.5
- Bootstrap 4
- Webpack
- Sass

## Architecture
#### Create a new page
To add a new page, it's necessary to create a new html file in `src/pages/`. When running it locally, a new route will be created automatically with the html filename. For example, if you create an html file called `contact.html`, this page will be accessible under `/contact`.

Then, to add a main JavaScript file for the html page, create a new file in `src/app/[html filename]/[html filename.js]`.

#### Styling
The styles are written in BEM naming convention to avoid possible collisions in class names between elements.
In order to add the css into the HTML, it's just needed to import it within a JavaScript file similar to a React application. Webpack will do this job automatically.

#### Common folder
The idea of this architecture is to add the possibility to create generic html components. For the shared components between pages, a folder called `common` was created to add a component formed by an html template, its JavaScript file and its own css file.

To able to use the HTML template, it needs to be imported in the JavaScript file (`import template from './my-template.html'`) and inject it somewhere in the main page using JQuery or plain JavaScript.

#### Element Classes for binding in JavaScript
For selecting an element in a JavaScript file, it's preferrable to use a `js-` prefix to know that the element will be used in JavaScript. For example,
```
<input class="js-component-name__input"/>
```
Then, just go ahead and select it with JQuery `$(.js-component-name__input)`.

---
**Important**
Do not use ids, instead use only classes for selecting elements. The main reason is that ids must be unique, and if a component is injected multiple times in an HTML page, it might cause a collision between the different instances.
---

#### Injecting a component
In your component JS file, send in the constructor a parameter which is the parent element where the component will be injected. 
```
export default class EmailFormLookupTemplate {
  constructor($parentElement) {}
}
```

Then, to select an element in the JS file, make sure to use JQuery Find function using the parent element as base. The reason is that this way you will be sure that it won't collide with the other instances of the same component. For example:
```
this.$form = $parentElement.find('.js-form__input').eq(0);
```

#### Specific components
Similar to a component based application, there are components specific for a module and should not go in `common` folder. Instead, create a new folder in the related module folder. For example, if you need a Contact Form component in your Contact page, you can have this file structure:
* src
  * pages
    * contact.html
  * app
    * contact
      * contact.js
      * contact-form
        * index.js
        * contact-form.scss
        * contact-form.html 

## Next improvements
* Create a base class to force passing the parentElement in a component.
* Create a RequestService to encapsulate the axios implementation in a single place (SOLID principles).
* Improve webpack local routing for nesting routes.
* Add lintin.
* Add the global styles in the base class to not import it in every module.
