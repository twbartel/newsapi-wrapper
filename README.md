# newsapi-wrapper

**newsapi-wrapper** is a convenient wrapper to call the [News API](https://newsapi.org).
All you will need is an API key that you can get [here](https://newsapi.org/register).

## Usage

    const newsapi = require('newsapi-wrapper');
    newsapi
        .setApiKey('xxxxyyyzzz')
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

### setCategory

Sets the news category _for the next request_ (not for _all_ subsequent requests). Returns a Request object that can be used to chain other method calls, 
or to send the request.

    const request = newsapi.setCategory('health');
    request.setCountry('uk').send();

### setCountry

Sets the country _for the next request_ (not for _all_ subsequent requests). Returns a Request object that can be used to chain other method calls, 
or to send the request.

### setPageSize

Sets the page size _for the next request_ (not for _all_ subsequent requests). Returns a Request object that can be used to chain other method calls, 
or to send the request.

### setApiKey

Sets the NewsAPI key _for the next request_ (not for _all_ subsequent requests). Returns a Request object that can be used to chain other method calls, 
or to send the request.

### send

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

### request (deprecated)

Returns an object you can use to build a request, send it, and process the result. Intended to used as a chain of method calls:

    newsapi.request()
           .setCategory('health')
           .setPageSize(15)
           .send();

request() is now optional and considered deprecated, because you can call all the request methods on newsapi directly. The above example would then look like this:

    newsapi.setCategory('health')
           .setPageSize(15)
           .send();

