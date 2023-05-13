const Pool = require('pg').Pool
const pool = new Pool({
  user: 'root',
  host: 'dpg-chekl467avj55m4lnlr0-a',
  database: 'libros_11',
  password: 'd8oA9sOivZUGP8bYES2hQmlBRNj1T9Wz',
  port: 5432,
  // user: 'postgres',
  // host: 'localhost',
  // database: '11_libros',
  // password: 'root',
  // port: 5432,
})
const getGeneros = (request, response) => {
  let query='SELECT * FROM generos';
    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getLibros = (request, response) => {
    let query='SELECT * FROM libros';
    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createGenero =  (req, res) => {  
   
    const {generonombre} = req.body
    const query= 'INSERT INTO generos (generonombre) VALUES ($1)'
     pool.query(query, [generonombre], (error, results) => {
        if (error) {
          throw error
        }
        //res.json({requestBody: req.body})
        res.status(201).send(`genero añadido `)
      })
    }

  const createLibro = (request, response) => {
    const { librotitulo, libroautor, genero } = request.body
  
    pool.query(
      'INSERT INTO libros (librotitulo, libroautor, genero) VALUES ($1,$2,$3)'
      , [librotitulo, libroautor, genero], 
      (error, results) => {
      if (error) {
        throw error
      }
      //res.json({requestBody: req.body})
      response.status(201).send(`libro añadido `)
    })
  }
  
  const updateGenero = (request, response) => {
    const { generoid, generonombre } = request.body
  
    pool.query(
      'UPDATE generos SET  generonombre = $2 WHERE generoid = $1',
      [ generoid, generonombre],
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
      'UPDATE libros SET  librotitulo = $2, libroautor=$3, genero=$4 WHERE libroid = $1',
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

  
