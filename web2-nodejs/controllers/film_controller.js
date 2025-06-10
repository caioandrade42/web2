import {Film, Director }from "../module/director_film.js";

async function createFilm(req, res) {
    const film = await Film.create({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
    });
    res.json(film);
}

async function listFilm(req, res) {
    const list = await Film.findAll();
    res.json(list);
}

async function editFilm(req, res) {
    const film = await Film.findOne({where: {id: req.body.id}});
    film.title = req.body.title;
    film.description = req.body.description;
    film.year = req.body.year;
    if(await film.save()){
        res.json({mensage: 'Registro alterado.'});
    }else {
        res.json({mensage: 'Erro ao alterar.'});
    }
}

async function deletaFilm(req,res) {
    const film = await Film.findOne({where: {id: req.body.id}});
    await film.destroy();
    res.json({mesage: 'Deletado com sucesso.'})
}

export async function associarFilmeDiretor(req, res) {
    try {
        const { id } = req.params;
        const { directorId } = req.body;

        const film = await Film.findByPk(id);
        if (!film) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }

        const director = await Director.findByPk(directorId);
        if (!director) {
            return res.status(404).json({ message: 'Diretor não encontrado' });
        }

        await film.update({ directorId });

        const filmAtualizado = await Film.findByPk(id, {
            include: Director
        });

        return res.status(200).json(filmAtualizado);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export { createFilm, listFilm, editFilm, deletaFilm};