Profe, agregue lo que se pide, si se ingresa con

usuario: adminCoder@coder.com;

contraseña: qwerty;

entra como Admin, y puede agregar, editar o eliminar productos.

Además si ingresa como usuario tiene la parte de contacto, donde va a poder enviar mensajes. Tambien puede agregar productos al carrito, si el producto no tiene stock no se agregará al ticket y queda en el carrito (si hace la petición por Postman,

se cumple esto => En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que no pudieron procesarse.) si tiene stock se crea un ticket que pude visualizarse en la base de datos con los datos solicitados.

por ultimo el archivo .env es este =>

PORT = "8080"
MONGODB_URI = "mongodb+srv://developer:gVv8zVirk3lZbGYq@cluster0.0ewcbcb.mongodb.net/ecommerce?retryWrites=true&w=majority"
PERSISTENCE = 'mongodb'
EMAIL_USER = "nm1.davi@gmail.com"
