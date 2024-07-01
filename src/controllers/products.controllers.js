import ProductsService from "../services/product.service.js";
import EmailService from "../services/email.service.js";
import { NotFoundException} from "../utils/exception.js";
import { generateProduct } from '../utils/utils.js';
import { generatorProductError } from '../utils/causeMessageError.js';
import {customError} from '../utils/customError.js';
import enumsError from '../utils/enumsError.js';
export default class ProductsController {
    static async getAll(filters = {}, opts = {}) {
        try {
            const products = await ProductsService.getAll(filters, opts);
            return products;
        } catch (error) {
            throw error;
        }
    }

    static async getById(productId) {
        try {
            const product = await ProductsService.getById(productId);
            if (!product) {
                throw new NotFoundException(`Product with ID ${productId} not found`);
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    static async create(body, file, user) {
        try {
            const { 
                title,
                description,
                price,
                code,
                stock,
                category,
                status 
            } = body;

            if (!title || !description || !price || !code || !stock || !category || status === undefined) {
                const errorMessage = generatorProductError(body);
                customError.create({
                    name : 'Invalid data Product',
                    cause: errorMessage,
                    message: 'Ocurrio un error mientras se intenta agregar un Producto ❌',
                    code: enumsError.INVALID_PARAMS_ERROR,
                });
            }

            const thumbnail = file ? `/uploads/${file.filename}` : '';
            const ownerId = user.email;
            const productData = { ...body, thumbnail, owner: ownerId };

            const product = await ProductsService.create(productData);
            return { message: 'Nuevo producto creado', productId: product._id };
        } catch (error) {
            throw error;
        }
    }
    static async mockingProducts() {
        const products = [];
        for (let index = 0; index < 50; index++) {
            products.push(generateProduct());
        }
        return {
            title: 'Mockingproducts ✅',
            products: products
        };
    }

    static async updateById(productId, body, file) {
        try {
            const thumbnail = file ? `/uploads/${file.filename}` : '';
            const productData = { ...body, thumbnail };
            await ProductsService.updateById(productId, productData);
            return { message: 'Product updated successfully' };
        } catch (error) {
            throw error;
        }
    }

    static async deleteById(pid) {
        try {
            const productOwner = await ProductsService.getById(pid);
            const owner = productOwner.owner;
            if (!productOwner) {
                throw new Error(`Producto con ID ${pid} no encontrado`);
            }
                const userEmail = owner;
                const subject = 'Producto eliminado';
                const message = `Estimado usuario premium, su producto '${productOwner.title}' ha sido eliminado.`;
                await EmailService.getInstance().sendEmail(userEmail, subject, message);

            await ProductsService.deleteById(pid);
            return { message: 'Product deleted successfully' };
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }

    static async updateStockById(pid, newStock) {
        try {
            const product = await ProductsService.getById(pid);

            if (!product) {
                throw new Error(`Producto con ID ${pid} no encontrado`);
            }

            product.stock = newStock;
            await ProductsService.updateById(pid, { stock: newStock });
            return product;
        } catch (error) {
            throw error;
        }
    }
}
