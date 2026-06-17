import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
    baseURL: API_BASE_URL,
    
});

api.interceptors.request.use(
    (config)=>{

        const token = localStorage.getItem("access");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
)




api.interceptors.response.use(
    (res)=>{
        return res ;
    },
    async (error)=>{
        const orginalRequest = error.config;

        if(error.response.status ===401 && !orginalRequest._retry ){
            orginalRequest._retry  = true;
            const refresh = localStorage.getItem('refresh')
            const response = await axios.post(`${API_BASE_URL}/token/refresh/`,{
                "refresh" : refresh,
            });

            const newAccess = response.data.access;
            localStorage.setItem("access" , newAccess)

            orginalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return api (orginalRequest)


        }
        console.log(error.response.data);
        return Promise.reject(error);
    }
)
export default api;