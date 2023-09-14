document.addEventListener("DOMContentLoaded", async () => {
  const elementoHtml = document.querySelector("#editar-publicacion");
  const url = window.location.href;
  const partesURL = url.split("/");
  const id = partesURL[partesURL.length - 1];
  //console.log(id);

  const post = await obtenerPost(id);
  //console.log(post);
  cargarPostEnForm(post, elementoHtml);
});




const obtenerPost = async (id) => {
  try {
    const response = await fetch(`/post/${id}`); 
    if (!response.ok) {
      throw new Error(`Error al obtener los datos: ${response.status}`);
    }
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener el post:", error);
    return [];
  }
};

const cargarPostEnForm = (publicaciones, elementoHtml) => {
  const publicacionesArray = Array.isArray(publicaciones) ? publicaciones : [publicaciones];
  const post = publicacionesArray[0].post;

  const a = "<img src='";
  const b = "' width='150px'>";
  elementoHtml.innerHTML = `
        <div class='mb-3'>
        <input type='text' class='form-control' id='titulo' placeholder='Titulo' value='${post.titulo}' required>
        </div>
    
        <div class='form-floating mb-3'>
        <textarea class='form-control' placeholder='Leave a comment here' id='detalle' style='height: 100px' required>${post.detalle}</textarea>
        <label for="detalle">Detalle</label>
        </div>

        <div class='form-floating mb-3'>
        <textarea class='form-control' placeholder='Leave a comment here' id='contenido' style='height: 100px' required>${post.contenido}</textarea>
        <label for="contenido">Contenido</label>
        </div>
    
        <div class="mb-3">
        
        <input type="text" class="form-control" id="url_imagen" placeholder="url imagen" value="${post.url_imagen}" required>
                
        </div>
    
        <div class="mb-3">
        <input type="date" class="form-control" name="" id="fecha" value="${post.fecha}" required>
        </div>

        <input type="hidden" name="id" id="id" value="${post.id}">
        
        <button type="submit" class="btn btn-primary btn-sm">
                    Guardar
        </button>
        `;

};




const formNuevo = document.querySelector('#editar-publicacion');

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

    const id = document.querySelector('#id').value;
    console.log(id)
    // Enviar datos al servidor
    try {
        const respuesta = await fetch(`/actualiza_post/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        console.log('Publicación editada con éxito:', resultado);
        location.href = '/posts'; // Ir la página de posts
    } catch (error) {
        console.error('Error al editar el post:', error);
       
    }
});