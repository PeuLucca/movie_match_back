const pool = require('../db/db');

exports.createMovie = async (req, res) => {
  try {
    const { nome, img, genero, diretor } = req.body;
    if (!nome || !img || !genero || !diretor) {
      return res.status(400).send([{ status: false, message: 'Nome, imagem, gênero e/ou diretor vazios' }]);
    }

    const result = await pool.query(
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
    const result = await pool.query('SELECT * FROM public.filmes');
    res.status(201).send(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.firstVoting = async (req, res) => {
  try {
    const query = `
      WITH FilmesComClassificacaoAleatoria AS (
          SELECT
              id,
              nome,
              img,
              genero,
              diretor,
              ROW_NUMBER() OVER (PARTITION BY genero ORDER BY random()) AS rn
          FROM
              public.filmes
      )
      SELECT
          id,
          nome,
          img,
          genero,
          diretor
      FROM
          FilmesComClassificacaoAleatoria
      WHERE
          rn <= 2;
    `;
    
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.movieVote = async (req, res) => {
  try{
    const { id_user, id_filme, rate } = req.body;

    if(!id_user || !id_filme || !rate){
      return res.status(400).send([
        { status: false, message: 'Id do usuario/filme ou avaliação estão vazios' }
      ]);
    }

    const result = await pool.query(
      'INSERT INTO public.rating(id_user, id_filme, rate) VALUES($1, $2, $3) RETURNING *', [id_user, id_filme, rate]
    );

    res.status(201).send([{ result: result.rows[0] }]);
 
  }catch(error){
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
};