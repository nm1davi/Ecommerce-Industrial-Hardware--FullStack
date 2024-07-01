var i = 0;
var txtContact = 'C O N T A C T A N O S'; /* The text */
var speed = 120;

function typeContact() {
      if (i < txtContact.length) {
        document.getElementById("demo").innerHTML += txtContact.charAt(i);
        i++;
        setTimeout(typeContact, speed);
      }
    }
    document.getElementById('formContact').addEventListener('submit', async function (event) {
      event.preventDefault();
    
      const formData = new FormData(this);
      const jsonData = {};

      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
      try {
        const response = await fetch('/api/notification/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        });
    
        const result = await response.json();
    
        if (response.ok) {
          console.log('Mensaje enviado con éxito');
          Swal.fire('Mensaje enviado correctamente').then(() => {
            setTimeout(() => {
              location.reload();
            }, 100);
          });
        } else {
          console.error('Error al enviar el Email', result );
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    });
    