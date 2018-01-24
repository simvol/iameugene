import {getCookie, eraseCookie, createCookie} from '../services/cookie-provider';
import fetchIntercept from 'fetch-intercept';




export default function TokenInterceptor(){
    const unregister = fetchIntercept.register({
        request: function (url, config) {
            
            // Modify the url or config here
            var tk = getCookie("tk");
            if (tk) {
                if (url.indexOf("api") > 0 && url.indexOf("/auth") === -1) {
                    if (config) {
                        config.headers = {
                            ...config.headers,
                            Authorization : "iam " + tk
                        }
                    } else{
                        config = {
                            headers:{
                                Authorization: "iam " + tk
                            }
                        }
                    }
                }
                if (window.location.href.indexOf("/signin") !== -1) {
                    let redirectPath = getCookie("redirectPath");
                    window.location.href = redirectPath || "/";
                }
            }
            return [url, config];
        },
    
        response: function (response) {
            // Modify the reponse object
            if (response.status === 401 && response.statusText == "Auth token is either missing or is invalid.") {
                eraseCookie("tk");
                createCookie("redirectPath", window.location.href, 1);
                try {
                    window.stop();
                }
                catch (e) {
                    document.execCommand("Stop");
                }
                window.location.href = "/signin";    
            }
            return response;
        },
    });
}