import http from ".";

const getProducts = () => http.get("/products");

const mainService = {
  getProducts,
};

export default mainService;
