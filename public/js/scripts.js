document.addEventListener('DOMContentLoaded', async() => {
    /* MOSTRAR POSTS*/
    const elementoHtml = document.querySelector('#lista-publicaciones');
    const publicaciones = await obtenerPublicaciones();
    mostrarPublicaciones(publicaciones, elementoHtml);

});




/* OBTENER TODAS LAS PUBLICACIONES */
const obtenerPublicaciones = async () => {
    try {
        const response = await fetch('/todos_los_posts');
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        return [];
    }
};



const mostrarPublicaciones = (publicaciones, elementoHtml) => {
    const publicacionesArray = Array.isArray(publicaciones) ? publicaciones : [publicaciones];
    const posts = publicacionesArray[0].post;
    const publicacionesInvertidas = posts.slice().reverse();
    let registros = '';
    let contador = 0;
    publicacionesInvertidas.forEach( pub => {
        if (contador < 7) {
                const contenido = pub.contenido || '';
                registros += `

                
                    <article class="entrada">
                        <div class='entrada__contenido'>

                            <h4 class='no-margin'>${pub.titulo}</h4>
                            <p><span class='fecha-color'>${ pub.fecha }</span><span>|</span>&nbsp;${contenido.substr(0,130)}<a href="/vermas/${ pub.id }" class="vermas">...Ver más</a></p>
                        </div>
                        <div class='entrada__imagen'>
                            <picture>
                                <img loading='lazy' src='${pub.url_imagen}' alt='imagen blog' />
                            </picture>
                        </div>
                    </article>
                
                
                `;
            contador++;}
    });

    elementoHtml.innerHTML = registros;
    
};




