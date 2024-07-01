//Función para agregar productos al carrito
async function agregarAlCarrito(cartId, productId, productTitle, userEmail, producOwner) {
  const cartIdString = cartId.toString();
  try {
    const response = await fetch(`/api/cart/${cartIdString}/product/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: 1 }) // Puedes ajustar la cantidad aquí si es dinámica
    });
    if(userEmail === producOwner){
      console.log('No puedes agregar un producto propio a tu carrito ❌');
      Swal.fire(`No puedes agregar un producto propio a tu carrito ❌`);
    }

    if (response.ok) {
      // Manejar la respuesta exitosa, por ejemplo, mostrar un mensaje al usuario
      console.log('Producto agregado al carrito con éxito');
      Swal.fire(`${productTitle} agregado correctamente`);
    } else {
      // Manejar errores en la respuesta
      Swal.fire(`No puedes agregar un producto propio a tu carrito ❌`);
      console.error('Error al agregar el producto al carrito');
    }
  } catch (error) {
    // Manejar errores en la solicitud
    console.error('Error de red:', error);
  }
}

//Función para cambiar Rol
async function cambiarDeRol(userId) {
  try {
    const response = await fetch(`/api/users/premium/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      const data = await response.json();
      Swal.fire('Rol cambiado con éxito');
      // Redirige según el nuevo rol 
      if (data.role === 'user') {
        window.location.href = '/profile';
      } else if (data.role === 'premium') {
        window.location.href = '/api/users/premium';
      } else {
        window.location.href = '/defaultProfile';
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: '<h2>Para ser premium hay que cargar los siguientes archivos:</h2>' +
              '<ul>' +
              '<li>🔴 Identificación</li>' +
              '<li>🔴 Comprobante de domicilio</li>' +
              '<li>🔴 Comprobante de estado de cuenta</li>' +
              '</ul>'
      });
      
    }
  } catch (error) {
    console.error('Error de red:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error de red',
      text: 'Ha ocurrido un error de red al intentar cambiar el rol'
    });
  }
}




