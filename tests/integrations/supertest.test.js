import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";

const requester = supertest("http://localhost:8080");

describe("Ecommerce Testing", function () {
    before(async function () {
        // Conéctate a la base de datos antes de que comiencen las pruebas
        await mongoose.connect('mongodb+srv://developer:gVv8zVirk3lZbGYq@cluster0.0ewcbcb.mongodb.net/ecommerce-test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    describe("Cart Testing", function () {
        let cartId
        it("Debería crear un carrito vacío de forma exitosa", async function () {
            try {
                const { statusCode, ok, body } = await requester
                .post('/api/cart')
                .expect(201);

                expect(statusCode).to.equal(201);
                expect(ok).to.be.true;
                expect(body).to.have.property('message', 'Nuevo carrito creado');

                cartId = body.cartId;
                expect(cartId).to.exist;
                expect(isValidObjectId(cartId)).to.be.true;
                expect(Array.isArray(body.payload)).to.be.equal(false);
            } catch (error) {
                throw error;
            }
        });

        it("Debería obtener la información del carrito de forma exitosa", async function () {
            try {
                const { statusCode, ok, body } = await requester
                    .get(`/api/cart/cartinfo/${cartId}`)
                    .expect(200);
                expect(statusCode).to.equal(200);
                expect(ok).to.be.true;

                expect(body).to.have.property('_id', cartId);
                expect(body).to.have.property('products');
                expect(body.products).to.be.an('array');
            } catch (error) {
                console.error(error);
                throw error;
            }
        });
    });

    describe("Product Testing", function () {

        let productId
        it("Debería crear un producto de forma exitosa", async function () {
            try {
                const productMock = {
                    title: "Rotomartillo Dowen Pagio",
                    description: "Rotomartillo 750N impacto",
                    price: 250830,
                    thumbnail: "/img/RotoMartillo750N.jpg",
                    code: "RMDP",
                    stock: 6,
                    category: "Rotomartillos",
                    status: true,
                }
                const { statusCode, ok, body } = await requester
                    .post("/api/product/")
                    .send(productMock);

                expect(statusCode).to.be.equal(201);
                expect(ok).to.be.ok;

                expect(body).to.have.property('message', 'Nuevo producto creado');

                productId = body.productId;
                expect(productId).to.exist;
                expect(isValidObjectId(productId)).to.be.true;

            } catch (error) {
                console.error(error);
                throw error;
            }
        });
        it("Debería fallar si no se ingresan los datos completos.", async function () {
            const productMock = {
                title: "Rotomartillo Dowen Pagio",
                description: "Rotomartillo 750N impacto",
                price: 250830,
                thumbnail: "/img/RotoMartillo750N.jpg",
            };
            const { statusCode, ok, body } = await requester
                .post("/api/product/")
                .send(productMock);
            expect(statusCode).to.be.equal(400);
            expect(ok).to.be.not.ok;
            expect(body).to.be.has.property("status", "error");
            expect(body).to.be.has.property("message", "Ocurrio un error mientras se intenta agregar un Producto ❌");
        });

        it("Debería actualizar un producto de forma exitosa.", async function () {
            try {
                const productMock = {
                    title: "Rotomartillo Dowen Pagio",
                    description: "Rotomartillo 750N impacto",
                    price: 250830,
                    thumbnail: "/img/RotoMartillo750N.jpg",
                    code: "RMDP",
                    stock: 6,
                    category: "Rotomartillos",
                    status: true,
                }
                const { body: { productId } } = await requester
                    .post('/api/product/')
                    .send(productMock);
                const { statusCode, ok, body } = await requester
                    .put(`/api/product/${productId}`)
                    .send({ stock: 9 });

                expect(statusCode).to.equal(200);
                expect(ok).to.be.true;
                expect(body).to.be.has.property("message", "Product updated successfully");
            } catch (error) {
                console.error(error);
                throw error;
            }
        });

        it("Debería eliminar un producto de forma exitosa.", async function () {
            try {
                const productMock = {
                    title: "Rotomartillo Dowen Pagio",
                    description: "Rotomartillo 750N impacto",
                    price: 250830,
                    thumbnail: "/img/RotoMartillo750N.jpg",
                    code: "RMDP",
                    stock: 6,
                    category: "Rotomartillos",
                    status: true,
                }
                const { body: { productId } } = await requester
                    .post('/api/product/')
                    .send(productMock);
                const { statusCode, ok, body } = await requester
                    .delete(`/api/product/${productId}`)

                expect(statusCode).to.equal(200);
                expect(ok).to.be.true;
                expect(body).to.be.has.property("message", "Product deleted successfully");

            } catch (error) {
                console.error(error);
                throw error;
            }
        });
    });
    describe("Auth Testing", function () {
            beforeEach(function () {
                this.cookie = {};
                this.email = '';
            });
            it('Debería registrarse el usuario de forma exitosa', async function () {
                try {
                    this.email = `nm${Date.now() / 1000}@gmail.com`;
                    const userMock = {
                        first_name: 'Nicolas',
                        last_name: 'Davi',
                        email: this.email,
                        password: 'qwerty',
                    };
                    const { statusCode, ok, headers } = await requester.post('/api/sessions/register').send(userMock);
                    expect(statusCode).to.be.equal(302);
                
                    const redirectLocation = headers.location;
                
                    const { statusCode: redirectStatusCode, ok: redirectOk, body: redirectBody } = await requester.get(redirectLocation);
                
                    expect(redirectStatusCode).to.be.equal(200);
                    expect(redirectOk).to.be.ok;
                
                    console.log(`statusCode: ${statusCode}`);
                    console.log(`ok: ${ok}`);
                    console.log(`redirectLocation: ${redirectLocation}`);
                    console.log(`redirectStatusCode: ${redirectStatusCode}`);
                    console.log(`redirectOk: ${redirectOk}`);
                    console.log(`redirectBody: ${redirectBody}`);
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            });            

        it('Debería loguearse el usuario de forma exitosa', async function () {
            try {
                const userMock ={
                    email: this.email,
                    password: 'qwerty',
                  };
                  const {
                    headers,
                    statusCode,
                    ok,
                  } = await requester.post('/api/sessions/login').send(userMock);
                  expect(statusCode).to.be.equal(302);

                  const [key, value] = headers['set-cookie'][0].split('=');
                  this.cookie.key = key;
                  this.cookie.value = value;
            } catch (error) {
                console.error(error);
                throw error;
            }
          });
    });
});
