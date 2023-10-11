const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect
const requester = supertest('http://localhost:8080');

describe('test products de app', () => {

    describe('testing API products', () => {
        
        it("Crear un producto: El API POST /api/products/createProduct debe crear un producto correctamente", async () => {
            
            const response = {
                name: "Producto de prueba",
                description: "Producto de prueba",
                price: 100,
                stock: 100,
                genero: "Producto de prueba"
            }
            

            const {statusCode} = await requester.post('/api/products/createProduct').send({response})
            

            expect(statusCode).to.be.equal(200)
       
            
            
        })

    })
})