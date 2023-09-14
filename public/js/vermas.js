document.addEventListener("DOMContentLoaded", async () => {
    const elementoHtml = document.querySelector("#mostrar-publicacion");
    const url = window.location.href;
    const partesURL = url.split("/");
    const id = partesURL[partesURL.length - 1];
    console.log(id);
  
    const post = await obtenerPost(id);
    console.log(post);
    mostrar(post, elementoHtml);
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
  
  const mostrar = (publicaciones, elementoHtml) => {
    const publicacionesArray = Array.isArray(publicaciones) ? publicaciones : [publicaciones];
    const post = publicacionesArray[0].post;
  
    const a = "<img src='";
    const b = "' width='150px'>";
    elementoHtml.innerHTML = `
    <div>
      <div>
        <div>
            <h1>${post.titulo}</h1>
            <p><span class='fecha-color'>${ post.fecha }</span><span>|</span>&nbsp;${post.detalle}</p>
            <img src="${post.url_imagen}" alt="Imagen de la Noticia">
            <div style="padding-top: 3rem;">
                ${post.contenido}
            </div>
        </div>
    </div>
</div>

          `;
  
  };