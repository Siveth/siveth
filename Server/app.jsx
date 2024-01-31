const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const crypto = require("crypto");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Siveth',
});

// Ruta para buscar un usuario por correo electrónico y enviar código de recuperación
app.post('/forgot-password', (req, res) => {
  const { correo } = req.body;

  // Buscar el usuario en la base de datos
  db.query('SELECT * FROM Usuarios WHERE Correo = ?', [correo], (error, results) => {
    if (error) {
      console.error('Error al buscar usuario en la base de datos:', error);
      return res.status(500).json({ status: 'error', message: 'Error interno del servidor', error: error.message });
    }

    if (results.length === 0) {
      // Usuario no encontrado
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }

    // Generar código de recuperación
    const recoveryCode = crypto.randomBytes(3).toString('hex').toUpperCase(); // Cambia el número según la longitud deseada

    // Enviar el código de recuperación al correo electrónico del usuario
    // Aquí deberías implementar la lógica para enviar un correo electrónico al usuario con el código.

    return res.status(200).json({ status: 'success', message: 'Código de recuperación enviado', recoveryCode });
  });
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
