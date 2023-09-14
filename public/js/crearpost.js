const formNuevo = document.querySelector('#nueva-publicacion');

formNuevo.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        titulo: document.querySelector('#titulo').value,
        detalle: document.querySelector('#detalle').value,
        contenido: document.querySelector('#contenido').value,
        imagen: "<img src='"+ document.querySelector('#url_imagen').value+"' width='150px'>",
        url_imagen: document.querySelector('#url_imagen').value,
        fecha: document.querySelector('#fecha').value,
        visitas: 0,
        post_eliminados: 0,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
    };

    // Enviar datos al servidor
    try {
        const respuesta = await fetch('/crear_post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        console.log('Publicación creada con éxito:', resultado);
        location.href = '/'; // ir a la pagina principal main
    } catch (error) {
        console.error('Error al crear la publicación:', error);
    }
});