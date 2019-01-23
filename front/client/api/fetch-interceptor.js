import FetchInterceptor from 'fetch-interceptor'


const interceptor = FetchInterceptor.register({
    onBeforeRequest(request, controller) {
        var token = localStorage.getItem('user-token');
        var isEmpty = 
            token === 'undefined' 
            || token == null
            || token == '';
        if (!isEmpty) 
            request.headers.append("Authorization", "Bearer " + token);

    },
    onRequestSuccess(responce, request, controller) {
        if (responce.ok) {
            return;
        }
    
        switch (responce.status) {
            case 400: throw Error('INVALID_TOKEN');
            case 401: throw Error('UNAUTHORIZED');
            case 500: throw Error('INTERNAL_SERVER_ERROR');
            case 502: throw Error('BAD_GATEWAY');
            case 404: throw Error('NOT_FOUND');
            default:  throw Error('UNHANDLED_ERROR');
        }
    },
    onRequestFailure(responce, request, controller) {
    }
});