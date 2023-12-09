import multer from 'multer'; // on importe multer

const MIME_TYPES : any = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

const storage = multer.diskStorage({ // on enregistre sur le disque
  destination: (req, file, callback) => { // on indique ou on va enregistrer les fichiers
    callback(null, '../assets/updatePicture');
  },
  filename: (req, file, callback) => {
    const nom : string = file.originalname.split(' ').join('_');
      const name : string = nom.split('.').join('_');
      const extension : any = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  }
});


export const pictureMulter = multer({ storage: storage }).single('picture');