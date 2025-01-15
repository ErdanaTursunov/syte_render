import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const $host = axios.create({
  baseURL: baseURL
})

const $authHost = axios.create({
  baseURL: baseURL
})




const authInterceptor = config => {
  config.headers.authorization = 'Bearer ' + localStorage.getItem('token')
 
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
  $host,
  $authHost
}
