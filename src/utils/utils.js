import path from "path";
import bcrypt from 'bcrypt'
import url from 'url';
import fs from 'fs'
import { faker } from '@faker-js/faker';
import multer from 'multer';
import { InvalidDataException } from './exception.js';

const __filename = url.fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

//Creamos un hash para encriptar la password
export const createHash = password =>  bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //tenemos nuestro password haseado

//Nos permite saber si el password que estamos obteniendo y compararlo con el hasado coincide
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

export const generateProduct = () =>{
    const descriptionWords = 15;
    const description = faker.lorem.words(descriptionWords);
    return {
        id: faker.database.mongodbObjectId(),
        description: description,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        image:faker.image.url(),
        code:faker.string.alphanumeric({ length: 10}),
        stock: faker.number.int({min: 10000, max: 99000}),
        category: faker.commerce.department(),
        status: faker.datatype.boolean() ? 'True' : 'False',
    }
};

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        const {params: {typeFile}} = req
        let folderPath = null;
        switch (typeFile) {
            case 'profilePicture':
                folderPath = path.resolve(__dirname, '..', '..', 'public', 'profiles');
                break;
            case 'productPicture':
                folderPath = path.resolve(__dirname, '..', '..', 'public', 'products');
                break;
            case 'document':
                folderPath = path.resolve(__dirname, '..', '..', 'public', 'document');
                break;
            default:
                return callback(new InvalidDataException('Ivalid type file 😱'));
        }
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath, {recusive: true});
        }
        callback(null, folderPath)
    },
    filename: (req, file, callback) =>{
        const { user: { id }} = req;
        callback(null, `${id}_${file.originalname}`)
    },
})

export const uploader = multer( { storage });
