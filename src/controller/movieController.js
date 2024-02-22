const pool = require('../db/db');

exports.createMovie = async (req, res) => {
  try {
    const { nome, img, genero, diretor } = req.body;
    if (!nome || !img || !genero || !diretor) {
      return res.status(400).send([{ status: false, message: 'Nome, imagem, gênero e/ou diretor vazios' }]);
    }

    const result =await pool.query(
      'INSERT INTO public.filmes(nome, img, genero, diretor) VALUES($1, $2, $3, $4) RETURNING *', [nome, img, genero, diretor]
    );

    res.status(201).send([{ result: result.rows[0] }]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.allMovies = async (req, res) => {
  try {
    const result =await pool.query('SELECT * FROM public.filmes');
    res.status(201).send(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
};