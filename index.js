const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 49146
const db = require('./queries')
const cors = require('cors');

app.use(cors()); 


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

//   getGeneros,
//   getLibros,
//   createGenero,
//   createLibro,
//   updateGenero,
//   updateLibro,
//   deleteGenero,
//   deleteLibro


app.get('/api/generos', db.getGeneros)
app.get('/api/Libros', db.getLibros)

app.post('/api/generos', db.createGenero)
app.post('/api/Libros', db.createLibro)

app.put('/api/generos', db.updateGenero)
app.put('/api/Libros', db.updateLibro)

app.delete('/api/generos', db.deleteGenero)
app.delete('/api/Libros', db.deleteLibro)

var fileUpload = require('express-fileupload');
var fs = require('fs');
// ahora creamos un metodo que guarde imágenes de las portadas
// hay que crear una carpeta Photos en la carpeta de la api
// copiar el png y de modo que podamos cargar imágenes hay que instalar un módulo
// express-fileupload
// >>> npm install express-fileupload

app.use(
  fileUpload({
  createParentPath:true,
  limits:{fileSize: 1024*1024},
  abortOnLimit: true,
  responseOnLimit:"archivo demasiado grande",
  })
);
app.post('/api/libros/savefile', function(req, res) {
 // console.log(req.files.file); // the uploaded file object
 if (!req.files || Object.keys(req.files).length === 0) {
  return res.status(400).send('No files were uploaded.');
}
let file=req.files.file;
let path=`${__dirname}/Photos/${file.name}`;
file.mv(path, function(err) {
  if (err)
    return res.status(500).send(err);

  res.send('File uploaded!');
});
});

//app.use('/Photos',express.static(__dirname+'/Photos'));
//app.post('/api/libro/savefile',  (req, res)=>{



    // fs.writeFile("./Photos/"+request.files.file.name,
    // request.files.file.data,function(err){
    //     if(err){
    //         return
    //         console.log(err);
    //     }
    //     response.json(request.files.file.name);
    // })
// });
// por verificarlo, vamos a POSTMAN, método post en body la url debe ser
// http://localhost:49146/api/libros/savefile
// el formato será form-data, hay que escribir file en el key en gris (abajo del en negro)
// hay que hacer check en file (a su izq) 
// a la derecha en vez de la opción por defecto text, cambiar a file y escoger la imagen
// escogemos una imagen y pulsamos en send y vemos que la imagen está en la carpeta
