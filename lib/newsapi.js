const request = require('request');

const STATUS_OK = 'ok';

const URLS = {
    topHeadlines: 'https://newsapi.org/v2/top-headlines'
};

const categories = {
    business: true,
    entertainment: true,
    general: true,
    health: true,
    science: true,
    sports: true,
    technology: true
};

const isAllowedCategory = cat => {
    return categories[cat] === true;
};

const settings = {
    apiKey: true,
    country: true,
    pageSize: true,
    category: true
};

const defaults = {
    country: 'de',
    category: 'business',
    pageSize: 20,
    userAgent: 'newsapi-wrapper',
};

const setDefault = (settingName, value) => {
    if (settings.hasOwnProperty(settingName)) {
        defaults[settingName] = value;
    } else {
        throw new Error(
            `Unknown setting "${settingName}". Known setting names: ${Object.keys(
                settings
            )}`
        );
    }
};

const setDefaults = obj => {
    for (let p of Object.keys(obj)) {
        setDefault(p, obj[p]);
    }
};

const getCategories = () => {
    return Object.keys(categories);
};

class Request {
    constructor(opts = {}) {
        this.options = {};
        Object.assign(this.options, defaults, opts);
        return this;
    }

    setApiKey(value) {
        if (typeof value !== 'string') {
            throw new Error('NewsApi Key must be a string');
        }
        this.options.apiKey = value;
        return this;
    }

    setCountry(value) {
        this.options.country = value;
        return this;
    }

    setCategory(value) {
        if (isAllowedCategory(value)) {
            this.options.category = value;
            return this;
        } else {
            throw new Error(`Illegal category "${value}".`);
        }
    }

    setPageSize(num) {
        if (Number.isInteger(num)) {
            this.options.pageSize = num;
        }
        return this;
    }

    setUserAgent(agent) {
        if (typeof agent === 'string' && agent != '') {
            this.options.userAgent = agent;
        }
        return this;
    }

    getRequestOptions() {
        return {
            url: URLS.topHeadlines,
            qs: {
                country: this.options.country,
                apiKey: this.options.apiKey,
                category: this.options.category,
                pageSize: this.options.pageSize
            },
            headers: {
                'User-Agent': this.options.userAgent
            }
        };
    }

    send(cb) {
        if (!this.options.apiKey) {
            throw new Error(
                "Request should be sent but no API key given for News API. Please use setApiKey(key) or setDefault('apiKey', key) to provide it."
            );
        }

        let requestOptions = this.getRequestOptions();

        return new Promise((resolve, reject) => {
            request(requestOptions, (error, response, body) => {
                if (cb && cb.call) {
                    cb(error, response, body);
                }

                let obj;
                try {
                    obj = JSON.parse(body);
                } catch (e) {
                    reject(new Error('Could not parse News API response'));
                    return;
                }

                if (response.statusCode === 200) {
                    if (obj.status === STATUS_OK) {
                        resolve(obj);
                    } else {
                        reject(
                            new Error(
                                'News API request failed. Reason: ' +
                                obj.message
                            )
                        );
                    }
                } else {
                    let msg =
                        'News API request failed. HTTP code: ' +
                        response.statusCode +
                        ', message: ';
                    msg +=
                        obj && obj.message
                            ? obj.message
                            : response.statusMessage;
                    reject(new Error(msg));
                }
            });
        });
    }
}

const createRequest = options => {
    return new Request(options);
};

const getRequestOptions = () => createRequest().getRequestOptions();
const setApiKey = apiKey => createRequest().setApiKey(apiKey);
const setCategory = category => createRequest().setCategory(category);
const setPageSize = pageSize => createRequest().setPageSize(pageSize);
const setCountry = country => createRequest().setCountry(country);
const send = options => createRequest(options).send();

module.exports = {
    setDefault,
    setDefaults,
    getCategories,
    getRequestOptions,
    request: createRequest,
    setApiKey,
    setCategory,
    setPageSize,
    setCountry,
    send
};
