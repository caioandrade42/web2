import { createFilm } from "../controllers/film_controller.js";
import { listFilm } from "../controllers/film_controller.js";
import { Router } from "express";

const film_router = Router();

film_router.get('/', listFilm);
film_router.post('/', createFilm);

export default film_router;