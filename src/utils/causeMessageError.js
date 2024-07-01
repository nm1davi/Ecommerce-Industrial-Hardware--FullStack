export const generatorProductError = (data) =>{
    return `Todos los campos son requeridos y deben ser validos.
    Lista de campos recibidos en la solicitud:
    - title: ${data.title}
    - description: ${data.description}
    - price: ${data.price}
    - code: ${data.code} 
    - stock: ${data.stock} 
    - category: ${data.category} 
    - status: ${data.status} 
    `;
};