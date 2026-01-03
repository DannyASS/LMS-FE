import axios from "axios"
import { getAuthorization, removeAuthFromStorage } from "./storage"
import { redirect } from "react-router-dom";
import { showToast } from "../utils/toast/toast";
const request = async (options, page = null, service = null) => {

    const token = getAuthorization();
    var baseUrl;

    const needCookies = [
        "/api/v1/user/logout",
        "/user/refreshtoken",
        "/api/v1/user/login",
    ];

    options.withCredentials = needCookies.includes(options.url);

    
    switch (service) {
        case "golang":
            baseUrl = import.meta.env.VITE_CONF_API_GOLANG
            console.log("cek base url:", baseUrl);
            break;
    
        default:
            baseUrl = import.meta.env.VITE_CONF_API;
            break;
    }

    const client = axios.create({
        baseURL: baseUrl
    })

    const isFormData = options.data instanceof FormData;



    options.headers = {
		Accept: "application/json",
		// "Access-Control-Allow-Origin": "*",
		...(token && { Authorization: `Bearer ${token}` }),
        ...(isFormData ? {} : { "Content-Type": "application/json" })
	};


    const onSuccess = async response => {
		// console.log("onSuccess options", options);
		// console.log("onSuccess response", response);
		return await response.data;
	};

    const onError = async (error) => {
        try {
            if ((error.response.status === 401) && page != "login") {
                try {
                    var baseUrl1 = import.meta.env.VITE_CONF_API;
                    const token = await axios.get(`${baseUrl1}user/refreshtoken`,{
                        withCredentials : true
                    })

                    const newToken = token?.data?.token

                    if (newToken) {
                        // simpan token baru
                        setAuthorization(newToken);

                        // ulang request awal dengan token baru
                        options.headers.Authorization = `Bearer ${newToken}`;
                        const retryResponse = await client(options);
                        return retryResponse.data;
                    }
                } catch (error) {
                    const returnError =  {
                        status : error.response.status,
                        message : error.response.data?.message? error.response.data?.message : "Internal Server Error"
                    }


                }
                const cleanStorage = removeAuthFromStorage();
                if (cleanStorage) {
                    redirect('/login');
                    // return window.location.reload()   
                }
            }

            console.log(error);
            const returnError =  {
                status : error.response.status,
                message : error.response.data?.message? error.response.data?.message : "Internal Server Error"
            }

            showToast({
                type: "error",
                title: "Error",
                description: returnError.message
            })

            return {
                type : "API_ERROR",
                error : returnError
            };
        } catch (error) {
            const dummyError =  {
                status : 500,
                message : "Internal Server Error"
            }
            console.log(error);
            return dummyError
        }
    }


    return client(options).then(onSuccess).catch(onError);
}

export default request;