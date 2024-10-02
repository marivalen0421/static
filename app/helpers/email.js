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
    const from = {name : 'Grilla\'s group', address: 'felgart22@gmail.com'}

    // Enviar el email
    // sendMail with npm nodemailer
    await transport.sendMail({
        from,
        to: 'juan.gonzalez83@correo.tdea.edu.co',
        subject: `Contacto Portafolio - ${nombre}`,
        text: `Nombre: ${nombre}; Correo: ${correo}; Mensaje: ${mensaje}`,
        html:`
        <p>Nombre: ${nombre}</p>
        <p>Correo: ${correo}</p>
        <p>Mensaje: ${mensaje}</p>
        `
    }, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Correo enviado satisfactoriamente: ' + info.response);
      }
    })
}

export {
  emailRegistro,
} 
    