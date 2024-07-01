import mongoose from 'mongoose';

// Define el esquema para la colección "users"
const productSchema = new mongoose.Schema({
      'title': {type: 'String', required: true},
      'description': {type: 'String', required: true},
      'price': {type: 'Number', required: true},
      'thumbnail': {type: 'String', required: false, default: 'image'},
      'code': {type: 'String', required: true},
      'stock': {type: 'Number', required: true},
      'category': {type: 'String', required: true},
      'status': {type: 'String', required: true, default: 'true'},
      'owner': { type: 'String', ref: 'User', required: true, default: 'admin' },
}, {timestamps: true});

export default mongoose.model('Product', productSchema);
