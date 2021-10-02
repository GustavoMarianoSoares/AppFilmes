import axios from "axios";

//https://api.themoviedb.org/3/movie/now_playing?api_key=97200540fabbef3ad014215930ac7bf3&language=pt-BR&page=1

export const key = "97200540fabbef3ad014215930ac7bf3";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default api;
