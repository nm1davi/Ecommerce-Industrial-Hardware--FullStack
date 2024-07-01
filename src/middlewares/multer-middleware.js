import multer from 'multer';
// Configuración de Multer para guardar archivos en carpetas diferentes
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const fileType = req.params.fileType; // Agregamos un parámetro en la ruta para identificar el tipo de archivo
        let uploadPath = '';
    
        switch (fileType) {
          case 'profile':
            uploadPath = 'uploads/profiles/';
            break;
          case 'product':
            uploadPath = 'uploads/products/';
            break;
          case 'document':
            uploadPath = 'uploads/documents/';
            break;
          default:
            uploadPath = 'uploads/';
            break;
        }
    
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
      },
    });
    
    export const upload = multer({ storage: storage });
    