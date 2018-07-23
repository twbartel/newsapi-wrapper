const newsapi = require('../lib/newsapi');

jest.setTimeout(2000);

test('Calling setApiKey() is enough to run send', () => {
    expect.assertions(1);
    return newsapi
        .setApiKey('abcd')
        .send()
        .then(response => {
            expect(response.totalResults).toEqual(20);
        });
});

test('Empty API key leads to exception', () => {
    expect(() => {
        newsapi.setApiKey(undefined);
    }).toThrow(Error);
});
