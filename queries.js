const Pool = require('pg').Pool
const pool = new Pool({
  user: 'root',
  host: 'dpg-chekl467avj55m4lnlr0-a',
  database: 'libros_11',
  password: 'd8oA9sOivZUGP8bYES2hQmlBRNj1T9Wz',
  port: 5432,
})
const getGeneros = (request, response) => {
    pool.query('SELECT * FROM generos', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getLibros = (request, response) => {
    pool.query('SELECT * FROM libros', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createGenero =  (request, response) => {  
    const { generonombre } = request.body
     pool.query(
      'INSERT INTO generos (generonombre) VALUES ($1)', [generonombre], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`genero añadido `)
      })
    }

  const createLibro = (request, response) => {
    const { librotitulo, libroautor, genero } = request.body
  
    pool.query('INSERT INTO libros (librotitulo, libroautor, genero) VALUES ($1,$2,$3)', [librotitulo, libroautor, genero], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`libro añadido `)
    })
  }
  
  const updateGenero = (request, response) => {
    const { generoid, generonombre } = request.body
  
    pool.query(
      'UPDATE generos SET  generonombre = $1 WHERE generoid = $2',
      [generonombre, generoid],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`genero modificado`)
      }
    )
  }
  
  const updateLibro = (request, response) => {
    const { libroid, librotitulo , libroautor, genero } = request.body
  
    pool.query(
      'UPDATE libros SET  librotitulo = $2, libroautor=$3, genero=$4  WHERE libroid = $1',
      [ libroid, librotitulo , libroautor, genero],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`genero modificado`)
      }
    )
  }

  const deleteGenero = (request, response) => {
    const { generoid } = request.body
  
    pool.query('DELETE FROM generos WHERE generoid = $1', [generoid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`genero deleted `)
    })
  }
  const deleteLibro = (request, response) => {
    const { libroid } = request.body

    pool.query('DELETE FROM libros WHERE libroid = $1', [libroid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`libro deleted `)
    })
  }

  
  



  module.exports = {
    getGeneros,
    getLibros,
    createGenero,
    createLibro,
    updateGenero,
    updateLibro,
    deleteGenero,
    deleteLibro
  }

  
