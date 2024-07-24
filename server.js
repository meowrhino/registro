const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar base de datos
const db = new sqlite3.Database('./database/registro.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos SQLite.');
});

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    situacion TEXT,
    pensamientos TEXT,
    emociones TEXT,
    conducta TEXT,
    aprendizaje TEXT
)`);

// Ruta para obtener todos los registros
app.get('/api/registros', (req, res) => {
    const sql = 'SELECT * FROM registros';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// Ruta para agregar un nuevo registro
app.post('/api/registros', (req, res) => {
    const { situacion, pensamientos, emociones, conducta, aprendizaje } = req.body;
    const sql = 'INSERT INTO registros (situacion, pensamientos, emociones, conducta, aprendizaje) VALUES (?, ?, ?, ?, ?)';
    const params = [situacion, pensamientos, emociones, conducta, aprendizaje];
    db.run(sql, params, function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.json({ id: this.lastID });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
