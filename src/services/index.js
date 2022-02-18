import axios from "axios";

const api = axios.create({
  // baseURL: process.env.REACT_APP_ENDPOINT_BASE_URL,
  baseURL: "https://api.delta.exchange/v2/",
  headers: {
    "Content-Type": "application/json",
  },
});

const getHeaders = () => {
  // const jwt = getLocalStorageItem("jwt_token");
  // return { headers: { Authorization: `Bearer ${jwt}` } };
  return { headers: {} };
};

api.interceptors.request.use((request) => {
  // console.log("Starting Request :\n", JSON.stringify(request, null, 2));
  return request;
});

api.interceptors.response.use((response) => {
  // console.log("Response :\n", JSON.stringify(response, null, 2));
  return response;
});

// error
api.interceptors.response.use(null, (error) => {
  if (error) {
    // console.log("Error :\n", JSON.stringify(error, null, 2));
    console.error(error);
  }

  return Promise.reject(error);
});

const http = {
  get: (url, config) =>
    api.get(url, {
      ...getHeaders(),
      ...config,
    }),
  post: (url, body, config) =>
    api.post(url, body, {
      ...getHeaders(),
      ...config,
    }),
  put: (url, body, config) =>
    api.put(url, body, {
      ...getHeaders(),
      ...config,
    }),
  delete: (url, config) =>
    api.delete(url, {
      ...getHeaders(),
      ...config,
    }),
};

export default http;
