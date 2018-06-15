# newsapi-wrapper

**newsapi-wrapper** is a convenient wrapper to call the [News API](https://newsapi.org).
All you will need is an API key that you can get [here](https://newsapi.org/register).

## Usage

    const newsapi = require('newsapi-wrapper');
    newsapi.request()
       .setCountry('ca')
       .setCategory('sports')
       .setPageSize(25)
       .send()
       .then(response => {
           console.log(`Results: ${response.totalResults}`);
           response.articles.forEach(article => {
               console.log(article.title);
           });
       })
       .catch(err => {
           console.log(err);
       });

## Installation

### NPM

    npm install newsapi-wrapper

### yarn

    yarn add newsapi-wrapper

## API

### setDefault

Sets a single default value. Possible keys: country, category, apiKey, pageSize

    newsapi.setDefault('country', 'de');
    
### setDefaults

Sets multiple default values at once. Takes an object as a parameter. Possible keys: country, category, apiKey, pageSize.

    newsapi.setDefaults({
        country: 'de',
        pageSize: 10,
        category: 'sports'
    });
    
### getCategories

Returns an array containing all valid categories, which are: business, entertainment, general, health, science, sports, technology

### request

Returns an object you can use to build a request, send it, and process the result. Intended to used as a chain of method calls:

    newsapi.request()
           .setCategory('health')
           .setPageSize(15)
           .send();

The call to `send` returns a promise which resolves when the response from the News API is received as intended. Otherwise, it is rejected:

    newsapi.request()
           .setCategory('health')
           .setPageSize(15)
           .send()
           .then(response => {
               // Probably do something with response.articles
           })
           .catch(err => {
               console.log(err);
           });

