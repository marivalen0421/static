document.getElementById("salir").addEventListener("click", (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
  
  // Eliminar la cookie JWT
  document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  
  // Redirigir al usuario al inicio ("/")
  document.location.href = "/";
});
