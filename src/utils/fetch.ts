const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

type HTTPOptionsType = Record<string, string | number | undefined | Record<string, string>>;
type queryStringifyType = string | Record<string, string>;

function queryStringify(data: queryStringifyType): string {
    if (typeof data !== 'object') {
            throw new Error('Data must be object');
    }

    // Здесь достаточно и [object Object] для объекта
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}


class HTTPTransport {
    get = (url: string, options: HTTPOptionsType = {}) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout as number | undefined);
    };

    post = (url: string, options: HTTPOptionsType = {}) => {
            return this.request(url, {...options, method: METHODS.POST}, options.timeout as number | undefined);
    };

    put = (url: string, options: HTTPOptionsType = {}) => {
            return this.request(url, {...options, method: METHODS.PUT}, options.timeout as number | undefined);
    };

    delete = (url: string, options: HTTPOptionsType = {}) => { 
            return this.request(url, {...options, method: METHODS.DELETE}, options.timeout as number | undefined);
    };

    request = (url: string, options: HTTPOptionsType = {}, timeout = 5000) => {
        const {headers = {} , method, data}: Record<string, any> = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method, 
                isGet && !!data
                ? `${url}${queryStringify(data)}`
                : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
        
            xhr.onload = function() {
                resolve(xhr);
            };
        
            xhr.onabort = reject;
            xhr.onerror = reject;
        
            xhr.timeout = timeout;
            xhr.ontimeout = reject;
                
            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

function fetchWithRetry(url: string, options: HTTPOptionsType = {}): Promise<unknown> {
    const {tries = 1} = options

    function onError(err: string){
        const triesLeft: number = tries as number - 1;
        if (!triesLeft){
            throw err;
        }

        return fetchWithRetry(url, {...options, tries: triesLeft});
    }
  
    return new HTTPTransport().request(url, options).catch(onError);
}
