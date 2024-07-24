document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#registroTabla tbody');

    // Función para cargar registros desde el archivo JSON
    function loadRegistros() {
        fetch('entries.json')
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
            })
            .catch(error => {
                console.error('Error al cargar los registros:', error);
            });
    }

    // Cargar registros al inicio
    loadRegistros();
});
