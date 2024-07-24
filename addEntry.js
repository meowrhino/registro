
const fs = require('fs');
const path = require('path');

function addEntry(situacion, pensamientos, emociones, conducta, aprendizaje) {
    const entry = { situacion, pensamientos, emociones, conducta, aprendizaje };

    // Ruta al archivo JSON
    const filePath = path.join(__dirname, 'public', 'entries.json');

    // Leer el archivo JSON existente
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo:", err);
            return;
        }

        // Parsear el JSON y añadir la nueva entrada
        const entries = JSON.parse(data);
        entries.push(entry);

        // Guardar el archivo JSON actualizado
        fs.writeFile(filePath, JSON.stringify(entries, null, 2), 'utf8', (err) => {
            if (err) {
                console.error("Error escribiendo el archivo:", err);
                return;
            }

            console.log("Entrada añadida exitosamente.");
        });
    });
}

// Exportar la función para que pueda ser utilizada en otros archivos
module.exports = addEntry;
