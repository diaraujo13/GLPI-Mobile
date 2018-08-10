export default () => {
    /** 
     * 
     * Para ser possível monitorar as requisições
     * HTTP pela aba network do Google Chrome!
     * 
     */
    XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

    // fetch logger
    global._fetch = fetch;
    global.fetch = function (uri, options, ...args) {
    return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
    });
    };
}