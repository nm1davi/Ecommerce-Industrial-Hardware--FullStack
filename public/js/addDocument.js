var i1 = 0; 
var i2 = 0; 
var i3 = 0; 
var txtDocument1 = 'C A R G A R - D O C U M E N T O S';
var txtDocument2 = 'C A R G A R - I M A G E N - D E - P E R F I L';
var txtDocument3 = 'C A R G A R - I M A G E N - D E - P R O D U C T O';
var speed = 120;

function typeAddDocument1() {
      if (i1 < txtDocument1.length) {
        document.getElementById("demo1").innerHTML += txtDocument1.charAt(i1);
        i1++;
        setTimeout(typeAddDocument1, speed);
      }
}

function typeAddDocument2() {
      if (i2 < txtDocument2.length) {
        document.getElementById("demo2").innerHTML += txtDocument2.charAt(i2);
        i2++;
        setTimeout(typeAddDocument2, speed);
      }
}

function typeAddDocument3() {
      if (i3 < txtDocument3.length) {
        document.getElementById("demo3").innerHTML += txtDocument3.charAt(i3);
        i3++;
        setTimeout(typeAddDocument3, speed);
      }
}


// addDocument.js
const formAddDocument = document.getElementById('formAddDocument');
const userId = formAddDocument.dataset.userId;

document.getElementById('formAddDocument').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  fetch(`/api/users/${userId}/document`, {
      method: 'POST',
      body: formData
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al cargar el archivo');
      }
      return response.json();
  })
  .then(data => {
      console.log('Archivo cargado exitosamente', data);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Archivo cargado exitosamente'
      }).then(() => {
        location.reload(); 
      });
  })
  .catch(error => {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al cargar el archivo'
      }).then(() => {
        location.reload(); 
      });
  });
});



document.getElementById('formAddProfilePicture').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  fetch(`/api/users/${userId}/profilePicture`, {
      method: 'POST',
      body: formData
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Error al cargar el archivo');
    }
    return response.json();
})
.then(data => {
    console.log('Archivo cargado exitosamente', data);
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Archivo cargado exitosamente'
    }).then(() => {
      location.reload(); 
    });
})
.catch(error => {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ha ocurrido un error al cargar el archivo'
    }).then(() => {
      location.reload(); 
    });
});
});


document.getElementById('formAddProductPicture').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  fetch(`/api/users/${userId}/productPicture`, {
      method: 'POST',
      body: formData
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Error al cargar el archivo');
    }
    return response.json();
})
.then(data => {
    console.log('Archivo cargado exitosamente', data);
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Archivo cargado exitosamente'
    }).then(() => {
      location.reload(); 
    });
})
.catch(error => {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ha ocurrido un error al cargar el archivo'
    }).then(() => {
      location.reload(); 
    });
});
});

