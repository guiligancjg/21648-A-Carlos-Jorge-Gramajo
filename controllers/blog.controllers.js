const ctrl = {};
const Post = require('../models/Publicaciones');

// Controlador para crea un post
ctrl.crearPost = async (req, res) => {
    //const { titulo, contenido, imagen, fecha } = req.body;

        try {
            const post = await Post.create(req.body);
            await post.save();

            return res.json({
                msg: 'El post fue guardo con exito!', post
            })
        } catch (error) {
            return res.status(500).json({ 
                msg: "Error al crear el post"
            })
        }
    };

// Controlador para obtener todas los posts
ctrl.obtenerPosts = async (req, res) => {
    try {
        const post = await Post.findAll();
        return res.json({
            msg: 'Obtener todas los posts fue un exito!', post
        })
    } catch (error) {
        return res.status(500).json({ 
            msg: "Error al mostrar los posts!"
        })
        
    }
};

// Controlador para obtener un post
ctrl.obtenerUnPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        return res.json({
            msg: 'Obtener un post fue un exito!', post
        })
    } catch (error) {
        return res.status(500).json({ 
            msg: "Error al obtener un post!"
        })
    }    
};

// Controlador para actualizar un post
ctrl.actualizarUnPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id);
        post.set(req.body);
        await post.save();
        return res.json({
            msg: 'El post fue actulizado con exito!', post
        })
    } catch (error) {
        return res.status(500).json({ 
            msg: "Error al actualizar el post!"
        })
    }
};

// Controlador para eliminar un post
ctrl.eliminarUnPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.destroy({ where: {id : id}});
        return res.json({
            msg: 'El post fue eliminado con exito!'
        })
    } catch (error) {
        return res.status(500).json({ 
            msg: "Error al eliminar el post!"
        })
    }
};

module.exports = ctrl;