async function cambiarDeRol(userId) {
      try {
        const response = await fetch(`/api/users/admin/changeRol/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          Swal.fire('Rol cambiado con éxito');
          // Redirige según el nuevo rol 
          window.location.reload();
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

async function eliminarUsuario(userId) {
      try {
        const response = await fetch(`/api/users/deleteUser/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          Swal.fire('Usuario eliminado con éxito');
          // Redirige según el nuevo rol 
          window.location.reload();
        } 
      } catch (error) {
        console.error('Error de red:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de red',
          text: 'Ha ocurrido un error de red al elimina un usuario'
        });
      }
    }

