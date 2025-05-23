import { createFilm, getAllFilms } from '../controllers/film_controller';
import {Router} from 'express';

const film_router = Router();
film_router.post('/create', createFilm);
film_router.get('/all', getAllFilms);

export default film_router;