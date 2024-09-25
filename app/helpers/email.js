import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {

    console.log('Enviando Correo...');

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const {nombre, correo, mensaje} = datos

    // Enviar el email
    // sendMail with npm nodemailer
    await transport.sendMail({
        from: 'Grilla\'s Group',
        to: 'maria.hernandez52@correo.tdea.edu.co',
        subject: 'Contacto Portafolio',
        text: `Nombre: ${nombre}; Correo: ${correo}; Mensaje: ${mensaje}`,
        html:`
        <p>Nombre: ${nombre}</p>
        <p>Correo: ${correo}</p>
        <p>Mensaje: ${mensaje}</p>
        `
    })
}

export {
  emailRegistro,
} 
    