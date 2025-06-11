import {createFilm, deletaFilm, editFilm, listFilm} from "../controllers/film_controller.js";
import { Router } from "express";

const film_router = Router();

film_router.get('/', listFilm);
film_router.post('/', createFilm);
film_router.put('/', editFilm);
film_router.delete('/', deletaFilm);
export default film_router;
