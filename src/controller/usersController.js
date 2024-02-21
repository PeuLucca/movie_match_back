const pool = require('../db/db');

exports.validateUser = async (req, res) => {
  try {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
      return res.status(400).send([{ status: false, message: 'Nome e/ou senha vazios' }]);
    }

    const result = await pool.query('SELECT * FROM public.user WHERE nome = $1 AND senha = $2', [nome, senha]);

    if (result.rows.length > 0) {
      res.send([{ validation: true, user: nome }]);
    } else {
      res.status(401).send([{ validation: false, user: null }]);
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.createUser = async (req, res) => {
  try {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
      return res.status(400).send([{ status: false, message: 'Nome e/ou senha vazios' }]);
    }

    const result = await pool.query('INSERT INTO public.user(nome, senha) VALUES($1, $2) RETURNING *', [nome, senha]);

    res.status(201).send([{ result: result.rows[0] }]);
  }catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
};