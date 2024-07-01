var i = 0;
var txtAddProduct = 'A G R E G A R - P R O D U C T O'; /* The text */
var txtDeleteProduct = 'E L I M I N A R - P R O D U C T O'; /* The text */
var txtUpdateProduct = 'A C T U A L I Z A R - P R O D U C T O'; /* The text */
var txtAdmin = 'A D M I N'; /* The text */
var speed = 120;

function typeAddProduct() {
  if (i < txtAddProduct.length) {
    document.getElementById("demo").innerHTML += txtAddProduct.charAt(i);
    i++;
    setTimeout(typeAddProduct, speed);
  }
}
function typeDeleteProduct() {
  if (i < txtDeleteProduct.length) {
    document.getElementById("demo").innerHTML += txtDeleteProduct.charAt(i);
    i++;
    setTimeout(typeDeleteProduct, speed);
  }
}
function typeUpdateProduct() {
  if (i < txtUpdateProduct.length) {
    document.getElementById("demo").innerHTML += txtUpdateProduct.charAt(i);
    i++;
    setTimeout(typeUpdateProduct, speed);
  }
}
function typeAdmin() {
  if (i < txtAdmin.length) {
    document.getElementById("demo").innerHTML += txtAdmin.charAt(i);
    i++;
    setTimeout(typeAdmin, speed);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const formAddProduct = document.getElementById('formAddProductPremium');

  formAddProduct.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formAddProduct);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch('/api/product/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Producto agregado con éxito');
        Swal.fire('Producto agregado correctamente').then(() => {
          setTimeout(() => {
            location.reload();
          }, 100);
        });
      } else {
        console.error('Error al agregar el producto');
      }
    } catch (error) {
      logger.error("Error: ", error.message);
    }
  })
});

async function eliminarProducto() {
  try {
    const productId = document.getElementById('productId').value;

    // Realizar una solicitud DELETE al servidor
    const response = await fetch(`/api/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      // Producto eliminado exitosamente
      Swal.fire({
        title: 'Éxito',
        text: 'Producto eliminado exitosamente',
        icon: 'success',
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 100);
      });
    } else if (response.headers.get('content-type').includes('application/json')) {
      // La respuesta contiene datos JSON, manejar el error
      const responseData = await response.json();
      Swal.fire({
        title: 'Error',
        text: responseData.error || 'Error al eliminar el producto',
        icon: 'error',
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 100);
      });
    } else {
      // La respuesta no contiene datos JSON, manejar el error
      Swal.fire({
        title: 'Error',
        text: 'Error al eliminar el producto',
        icon: 'error',
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 100);
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
    Swal.fire({
      title: 'Error',
      text: 'Error interno del servidor',
      icon: 'error',
    }).then(() => {
      setTimeout(() => {
        location.reload();
      }, 100);
    });
  }
}