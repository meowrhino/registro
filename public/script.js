document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const tableBody = document.querySelector('#registroTabla tbody');

    // Función para cargar registros desde la base de datos
    function loadRegistros() {
        fetch('/api/registros')
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = '';
                data.forEach(row => {
                    const newRow = tableBody.insertRow();
                    newRow.insertCell(0).textContent = row.situacion;
                    newRow.insertCell(1).textContent = row.pensamientos;
                    newRow.insertCell(2).textContent = row.emociones;
                    newRow.insertCell(3).textContent = row.conducta;
                    newRow.insertCell(4).textContent = row.aprendizaje;
                });
            });
    }

    // Cargar registros al inicio
    loadRegistros();

    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        fetch('/api/registros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.id) {
                loadRegistros();
                form.reset();
            }
        });
    });
});
