const newsapi = require('newsapi-wrapper');

newsapi.setDefaults({
    pageSize: 20,
    category: 'business',
    country: 'it',
    apiKey: 'your_api_key'
});

const receiveResponse = response => {
    console.log("Results: " + response.totalResults);

    for (let i = 0; i < response.articles.length; i++) {
      console.log(i + 1 + ". " + response.articles[i].title);
      console.log("   " + response.articles[i].url);
    }
};

newsapi.request().send().then(receiveResponse).catch(err => { console.log(err); });

newsapi.request()
       .setCountry('ca')
       .setCategory('sports')
       .setPageSize(25)
       .send()
       .then(receiveResponse)
       .catch(err => {
           console.log(err);
       });

