import { emailRegistro } from "../helpers/email.js"
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const enviarCorreo = async (req, res) => {

  console.log('req.body', req.body)

  const {nombre, correo, mensaje} = req.body;

  if(nombre != '' && correo != '' && mensaje != '') {
    emailRegistro({
      nombre, 
      correo, 
      mensaje
    })
  } 

  res.redirect("/")
}

export {
  enviarCorreo
}