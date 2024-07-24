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

    // Función para copiar al portapapeles
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    // Manejar el clic del botón de copiar
    document.getElementById('copyButton').addEventListener('click', function() {
        const situacion = document.getElementById('situacion').value;
        const pensamientos = document.getElementById('pensamientos').value;
        const emociones = document.getElementById('emociones').value;
        const conducta = document.getElementById('conducta').value;
        const aprendizaje = document.getElementById('aprendizaje').value;

        const command = `node -e 'require("./addEntry")("${situacion}", "${pensamientos}", "${emociones}", "${conducta}", "${aprendizaje}")'`;
        copyToClipboard(command);
        alert('Comando copiado al portapapeles');
    });
});
