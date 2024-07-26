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

test('User agent is always set', () => {
    const { headers } = newsapi.getRequestOptions();
    expect(typeof headers['User-Agent']).toEqual('string');
    expect(headers['User-Agent'] === '').toBeFalsy();
});
