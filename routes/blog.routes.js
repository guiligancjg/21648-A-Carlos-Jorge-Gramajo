const router = require('express').Router();
const posts = require('../models/Publicaciones');
const { crearPost, obtenerPosts, obtenerUnPost, actualizarUnPost, eliminarUnPost } = require('../controllers/blog.controllers');

/* ************************************************************************ */
// Ruta para obtener todas los posts
router.get('/todos_los_posts',obtenerPosts);

// Ruta para obtener un post
router.get('/post/:id',obtenerUnPost);


// Ruta para crear post
router.post('/crear_post',crearPost);

// Ruta para actualizar un post
router.put('/actualiza_post/:id',actualizarUnPost);


// Ruta para eliminar un post
router.delete('/eliminar_post/:id',eliminarUnPost);


/* Este un SELECT para mostrar todas las publicaciones o posts en DataTable  */
router.get('/obtener-publicacion', async(req, res) => {
  try {
      const post = await posts.findAll();
      return res.json(post);
      
  } catch (error) {
    return res.status(500).json({ 
      msg: "Error al mostrar las publicaciones"
    })
  }
  
})


/* paginas wiews */

router.get('/', (req, res) => {
    res.render('index');
})
router.get('/posts', (req, res) => {
    res.render('posts');
})

router.get('/contacto', (req, res) => {
    res.render('contacto');
})

router.get('/nosotros', (req, res) => {
    res.render('nosotros');
})

router.get('/crear_post', (req, res) => {
  res.render('crearpost');
})

router.get('/actualizar_post/:id', (req, res) => {
  const id = req.params.id;
  res.render('editarpost', { id });
})

router.get('/vermas/:id', (req, res) => {
  const id = req.params.id;
  res.render('vermas', { id });
})


module.exports = router;