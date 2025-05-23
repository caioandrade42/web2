import Film from '../module/film.js';


async function createFilm(req, res){
  const film = await Film.create({
    title: req.body.title,
    description: req.body.description,
    release_date: req.body.release_date,
  });
  res.json();
}

async function getAllFilms(req, res){
  const films = await Film.findAll();
  res.json(films);
}

export {createFilm, getAllFilms};