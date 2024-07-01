
async function agregarAlCarrito(cartId, productId, productTitle) {
  const cartIdString = cartId.toString();
  try {
    const response = await fetch(`/api/cart/${cartIdString}/product/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: 1 }) // Puedes ajustar la cantidad aquí si es dinámica
    });

    if (response.ok) {
      // Manejar la respuesta exitosa, por ejemplo, mostrar un mensaje al usuario
      console.log('Producto agregado al carrito con éxito');
      Swal.fire(`${productTitle} agregado correctamente`).then(()=>{
        setTimeout(() => {
          location.reload();
        }, 100);
      });
    } else {
      // Manejar errores en la respuesta
      console.error('Error al agregar el producto al carrito');
    }
  } catch (error) {
    // Manejar errores en la solicitud
    console.error('Error de red:', error);
  }
  
}

//Eliminar un producto del carrito
async function eliminarProductoDelCarrito(cartId, productId, productTitle) {
  const cartIdString = cartId.toString();
  try {
    const response = await fetch(`/api/cart/${cartIdString}/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      // Manejar la respuesta exitosa, por ejemplo, mostrar un mensaje al usuario
      console.log('Producto eliminado del carrito con éxito');
      Swal.fire(`${productTitle} eliminado con éxito`).then(()=>{
        setTimeout(() => {
          location.reload();
        }, 100);
      });
    } else {
      // Manejar errores en la respuesta
      console.error('Error al elimniar el producto del carrito');
    }
  } catch (error) {
    console.error(error);
  }
}

//Vaciar el carrito
function vaciarCarrito(cartId, user) {
  fetch(`/api/cart/${cartId}`, {
    method: 'DELETE',
  })
  .then((response) => {
    if (response.ok) {
      console.log('Carrito vaciado exitosamente');
      Swal.fire({
        html: `<span style="color: #084D68; font-weight: bold;">${user}</span> el carrito <span style="color: #084D68; font-weight: bold;">${cartId}</span> fue vaciado con éxito`,
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 100);
      });      
    } else {
      throw new Error('Error al vaciar el carrito');
    }
  })
  .catch((error) => {
    console.error(error);
  });
}


// Obtén todos los elementos que tienen la clase 'total'
const totalesProductos = document.querySelectorAll('.total');

let totalGeneral = 0;

// Itera sobre todos los elementos que contienen los totales de los productos
totalesProductos.forEach(celdaTotal => {
  // Convierte el contenido de cada celda a un número y súmalo al total general
  totalGeneral += parseFloat(celdaTotal.textContent.replace('$', ''));
});


// Actualiza el elemento HTML donde quieres mostrar el total general
const totalDeTotales = document.querySelector('.totalDeTotales');
totalDeTotales.innerHTML = `<h1>TOTAL: $${totalGeneral}</h1>`;


window.onload = function () {
  const products = document.querySelectorAll('.cantidades'); // Obtener todas las celdas de cantidad

  if (products.length === 0) {
    // Si no hay productos, mostrar el mensaje de carrito vacío
    const contenedorDescripcion = document.querySelector('.contenedorDescripcion');
    contenedorDescripcion.innerHTML = `
    <div class="carritoVacio">
      <h1>Carrito Vacío</h1>
      <ul class="menu">
      <li>
      <h2>Vuelva a la tienda</h2>
      </li>
    </ul>
    </div>
  `;
  
  const volverLink = document.getElementById('volverLink');
  volverLink.addEventListener('click', function(event) {
    event.preventDefault();
    const userRole = volverLink.dataset.rol;
    if(userRole === 'premium'){
      window.location.href = '/api/users/premium';
    } else if (userRole === 'user'){
      window.location.href = '/profile';
    }
  });

  } else {
    // Si hay productos, asegurarse de que no se muestre el mensaje de carrito vacío
    const contenedorDescripcion = document.querySelector('.carritoVacio');
    contenedorDescripcion.innerHTML = ''; // Limpiar el contenido para ocultar el mensaje
  }
};

document.getElementById('pagarBtn').addEventListener('click', async (event) => {
  try {
    const cartId = event.currentTarget.dataset.cartId;
    const response = await fetch(`/api/cart/${cartId}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Su pago ha sido exitoso');
      Swal.fire('Su pago ha sido exitoso').then(() => {
        setTimeout(() => {
          location.reload();
        }, 100);
      });
      const data = await response.json();
      console.log(data);
      // redirigir a una página de confirmación o realizar otras acciones
    } else {
      const errorData = await response.json();
      console.error('Error al realizar el pago:', errorData);
      Swal.fire('Error al realizar el pago').then(() => {
        setTimeout(() => {
          location.reload();
        }, 100);
      });
    }
  } catch (error) {
    console.error('Error de red:', error);
    Swal.fire('Su pago ha sido exitoso').then(() => {
      setTimeout(() => {
        location.reload();
      }, 100);
    });
  }
});

//Funcion par redireccionar dependiendo del Rol
document.addEventListener('DOMContentLoaded', ()=>{
  const volverLink = document.getElementById('volverLink');
  volverLink.addEventListener('click', (event) =>{
    event.preventDefault();
    const userRole = volverLink.dataset.rol;
    if(userRole === 'premium'){
      window.location.href = '/api/users/premium';
    } else if (userRole === 'user'){
      window.location.href = '/profile';
    }
  })
})