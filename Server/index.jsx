const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Siveth',
});

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD,
  },
});

// Función para enviar el correo electrónico y insertar el OTP en la base de datos
async function sendEmailAndInsertOTP({ recipient_email, OTP }, transporter) {
  // Insertar el OTP en la base de datos
  try {
    await db.query(
      'INSERT INTO OTPs (recipient_email, OTP) VALUES (?, ?)',
      [recipient_email, OTP]
    );
  } catch (error) {
    console.error('Error al insertar OTP en la base de datos:', error);
    throw new Error('Error interno del servidor al insertar OTP en la base de datos.');
  }

  // Configuración del correo electrónico
  const mail_configs = {
    from: process.env.MY_EMAIL,
    to: recipient_email,
    subject: "KODING 101 PASSWORD RECOVERY",
    html: `<!DOCTYPE html>
<html lang="en" >
<head>
<meta charset="UTF-8">
<title>CodePen - OTP Email Template</title>


</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
  </div>
  <p style="font-size:1.1em">Hi,</p>
  <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
  <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
  <hr style="border:none;border-top:1px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>Koding 101 Inc</p>
    <p>1600 Amphitheatre Parkway</p>
    <p>California</p>
  </div>
</div>
</div>
<!-- partial -->

</body>
</html>`,
  };

  // Envío del correo electrónico
  try {
    const info = await transporter.sendMail(mail_configs);
    console.log('Email sent successfully:', info.response);
    return { message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw new Error('Hubo un error al enviar el correo de recuperación.');
  }
}

// Ruta para enviar el correo electrónico y almacenar el OTP en la base de datos
app.post("/send_recovery_email", async (req, res) => {
  try {
    const { recipient_email, OTP } = req.body;
    await sendEmailAndInsertOTP({ recipient_email, OTP }, transporter);
    res.send("Email sent successfully");
  } catch (error) {
    console.error("Error sending recovery email:", error);
    res.status(500).send(`Hubo un error al enviar el correo de recuperación: ${error.message}`);
  }
});

app.post("/verify_otp", (req, res) => {
  const { recipient_email, OTP } = req.body;

  db.query(
    'SELECT * FROM OTPs WHERE recipient_email = ? AND OTP = ? AND TIMESTAMPDIFF(SECOND, created_at, NOW()) <= 120',
    [recipient_email, OTP],
    (error, results) => {
      if (error) {
        console.error('Error al verificar el OTP:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
      } else {
        if (results.length > 0) {
          // Eliminar el OTP de la base de datos después de ser verificado
          db.query('DELETE FROM OTPs WHERE recipient_email = ? AND OTP = ?', [recipient_email, OTP], (deleteError, deleteResults) => {
            if (deleteError) {
              console.error('Error al eliminar el OTP:', deleteError);
            }
          });

          res.json({ success: true, message: 'OTP verification successful' });
        } else {
          res.status(401).json({ success: false, message: 'Incorrect or expired OTP' });
        }
      }
    }
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
