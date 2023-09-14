$(document).ready(function () {
  const htmlFragment = `<a href='/editar-post' class='btn btn-outline-info'>Editar&nbsp;</a> <a href='/eliminar-post' class='btn btn-outline-info'>Borrar</a>`;
  const encodedHtmlFragment = encodeURIComponent(htmlFragment);
  const url = `/obtener-publicacion?html=${encodedHtmlFragment}`;

  $("#tablaArticulos").DataTable({
    responsive: true,
    language: {
      info: "Mostrando la página _PAGE_ de _PAGES_",
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ entradas",
      loadingRecords: "Cargando...",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    ajax: {
      url: url,
      dataSrc: "",
    },

    columns: [
      { data: "id" },
      { data: "titulo" },
      {
        data: "detalle",
        render: function (data, type, row) {
          const postId = row.id;
          if (type === "display" && data.length > 100) {
            
            return (
              data.substr(0, 100) +
              `... <a href="/vermas/${postId}" class="ver-mas">Ver más</a>`
            );
          } else {
            return data;
          }
        },
      },
      { data: "imagen" },
      { data: "fecha" },
      {
        data: null, // Crea una columna vacía 
        render: function (data, type, row) {
          return '<a href="/actualizar_post" class="btn btn-outline-info btn-editar">Editar</a> <a href="/eliminar-post" class="btn btn-outline-info btn-eliminar">Borrar</a>';
        },
      },
    ],
    columnDefs: [
      {
        //"targets":[2],
        render(v) {
          return Number(v).toFixed(2);
        },
      },
    ],
  });
});


// Escuchar el clic en el enlace de Editar
$("#tablaArticulos").on("click", ".btn-editar", function (event) {
  event.preventDefault(); 
  const id = $(this).closest("tr").find(".sorting_1").text();
  console.log("entroooo");
  location.href = `/actualizar_post/${id}`;

});

// Escuchar el clic en el enlace de Borrar
$("#tablaArticulos").on("click", ".btn-eliminar", function (event) {
  event.preventDefault(); 
  const id = $(this).closest("tr").find(".sorting_1").text();
  eliminarUnPost(`/eliminar_post/${id}`);

});

eliminarUnPost = async (post) => {
  const respuesta = window.confirm("¿Desea eliminar el registro? Una vez eliminado no podra recuperarlo...");
  if (respuesta) {
  await fetch(post, {
    method: 'DELETE', 
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      console.log('Eliminado con éxito.');
      
      
      alert("Registro eliminado!");
      
      location.reload();
    })
    .catch(error => {
      console.error('No se pude eliminar el registro:', error);
    });
  } else {
    alert("Acción cancelada.");
  }
}






