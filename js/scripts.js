document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('post-form');
    const postTableBody = document.querySelector('#post-table tbody');

    postForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const image = document.getElementById('image').value;
        const date = new Date().toLocaleString();

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${postTableBody.children.length + 1}</td>
            <td>${title}</td>
            <td>${content}</td>
            <td class="img-cell"><img src="${image}" alt="Imagen del post"></td>
            <td class="date-cell">${date}</td>
        `;

        postTableBody.appendChild(newRow);

        // Limpiar los campos del formulario
        postForm.reset();
    });
});
