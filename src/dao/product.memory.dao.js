import productModel from "./models/product.model.js";

const productsInMemory = [{
  "title": "Rotomartillo Dowen Pagio",
  "description": "Rotomartillo 750N impacto",
  "price": 250830,
  "thumbnail": "/img/RotoMartillo750N.jpg",
  "code": "RMDP",
  "stock": 2,
  "category": "Rotomartillos",
  "status": true
},
{
  "title": "Bordeadora Petri",
  "description": "Bordeadora Petri 45P ",
  "price": 70800,
  "thumbnail": "/img/BordeadoraPetri.jpg",
  "code": "BP450",
  "stock": 6,
  "category": "Bordeadoras",
  "status": true
},
{
  "title": "Bordeadora B&D Plus",
  "description": "Bordeadora B&D 900W",
  "price": 90350,
  "thumbnail": "/img/BordeadoraByDPlus.png",
  "code": "BBD900",
  "stock": 6,
  "category": "Bordeadoras",
  "status": true
},
{
  "title": "Amoladora Bosch",
  "description": "Amoladora 7'' ",
  "price": 80693,
  "thumbnail": "/img/AmoladoraBosch7.jpg",
  "code": "ABS7",
  "stock": 6,
  "category": "Amoladoras",
  "status": true
},
{
  "title": "Amoladora Bosch",
  "description": "Amoladora 4 1/2'' ",
  "price": 63750,
  "thumbnail": "/img/AmoladoraBosch7.jpg",
  "code": "ABS4",
  "stock": 9,
  "category": "Amoladoras",
  "status": true
},
{
  "title": "Medidor Laser Skill",
  "description": "Medidor distancia 1km",
  "price": 80000,
  "thumbnail": "/img/MedidorLaserSkill.png",
  "code": "MLSK",
  "stock": 3,
  "category": "Medidor Laser",
  "status": true
},
{
  "title": "Amoladora Skill",
  "description": "Amoladora 4 1/2'' ",
  "price": 38500,
  "thumbnail": "/img/AmoladoraSkill.jpg",
  "code": "AS4",
  "stock": 13,
  "category": "Amoladoras",
  "status": true
},
{
  "title": "Bordeadora Petri",
  "description": "Bordeadora Petri 50P ",
  "price": 76800,
  "thumbnail": "/img/BordeadoraPetri.jpg",
  "code": "BP500",
  "stock": 6,
  "category": "Bordeadoras",
  "status": true
},
{
  "title": "Bordeadora B&D",
  "description": "Bordeadora B&D 600W",
  "price": 70900,
  "thumbnail": "/img/BordeadoraByD.png",
  "code": "BBD600",
  "stock": 6,
  "category": "Bordeadoras",
  "status": true
},
{
  "title": "Amoladora BD",
  "description": "Amoladora 7'' ",
  "price": 50800,
  "thumbnail": "/img/AmoladoraByD7.jpg",
  "code": "ABD7",
  "stock": 10,
  "category": "Amoladoras",
  "status": true
},
{
  "title": "Compresor Daewoo",
  "description": "Compresor Neumatico 500W'' ",
  "price": 63750,
  "thumbnail": "/img/CompresorDaewoo.webp",
  "code": "CD500",
  "stock": 6,
  "category": "Compresores",
  "status": true
},
{
  "title": "Taladro Skill",
  "description": "Taladro de 16mm",
  "price": 70650,
  "thumbnail": "/img/TaladroSkill.webp",
  "code": "TS16MM",
  "stock": 4,
  "category": "Taladros",
  "status": true
},
{
  "title": "Taladro BD",
  "description": "Taladro de 13mm",
  "price": 45000,
  "thumbnail": "img/TaladroByD.webp",
  "code": "BD13MM",
  "stock": 25,
  "category": "Taladros",
  "status": true
},
{
  "title": "Taladro BD",
  "description": "Taladro de 16mm",
  "price": 48000,
  "thumbnail": "img/TaladroByD.webp",
  "code": "BD16MM",
  "stock": 20,
  "category": "Taladros",
  "status": true
},
{
  "title": "Rotomartillo Bosch",
  "description": "Rotomartillo 750N impacto ",
  "price": 256000,
  "thumbnail": "/img/RotomartilloBosch.png",
  "code": "RMBS",
  "stock": 3,
  "category": "Rotomartillos",
  "status": true
},
{
  "title": "Rotomartillo Makita",
  "description": "Rotomartillo 600N impacto",
  "price": 200000,
  "thumbnail": "/img/RotomartilloMakita.png",
  "code": "RMMK",
  "stock": 2,
  "category": "Rotomartillos",
  "status": true
},
{
  "title": "Taladro Skill",
  "description": "Taladro13mm",
  "price": 69800,
  "thumbnail": "/img/TaladroSkill.webp",
  "code": "TS13MM",
  "stock": 7,
  "category": "Taladros",
  "status": true
},
{
  "title": "Sopladora Makita",
  "description": "Sopladora Electrica 18V",
  "price": 70890,
  "thumbnail": "/img/SopladoraMakita.jpg",
  "code": "SE800",
  "stock": 14,
  "category": "Sopladoras",
  "status": true
},
{
  "title": "Engrampadora Neumatica",
  "description": "Engrampadora Duca 11L",
  "price": 16980,
  "thumbnail": "/img/EngrampadoraNeumaticaDuca.png",
  "code": "ED11",
  "stock": 10,
  "category": "Engrampadoras",
  "status": true
},
{
  "title": "Engletadora Makita",
  "description": "Engletadora Makita 9'' ",
  "price": 109860,
  "thumbnail": "/img/EngletadoraMakita.jpg",
  "code": "EM18PR",
  "stock": 4,
  "category": "Engletadoras",
  "status": true
}]

const sortedProducts = productsInMemory.sort((a, b) => {
  const titleA = a.title.toUpperCase(); // Convertir a mayúsculas para ordenar sin distinción entre mayúsculas y minúsculas
  const titleB = b.title.toUpperCase();

  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
});
export default class ProductDao {
  get() {
    // Ajusta cómo creas instancias de ProductModel
    return sortedProducts.map((product) => {
      const instance = new productModel(product);
      return instance.toObject(); // Convierte el objeto mongoose a un objeto plano
    });
  }

  getProductById(productId) {
    const product = sortedProducts.find((p) => p.code === productId);
    return product ? new productModel(product) : null;
  }
}
