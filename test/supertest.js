const supertest = require('supertest');
const chai = require('chai');
const { request } = require('express');
const expect = chai.expect
const requester = supertest('http://localhost:8080');

describe('test products de app', () => {

    describe('testing API products', () => {

        
        it("Crear un producto: El API POST /api/products/createProduct debe crear un producto correctamente", async () => {

            const response = {
                name: "TestNew14/10",
                price: 35000,
                description: "Test2 ",
                code:"Test111",
                thumbnail:"imagen",
                stock:444,
                genero:"Mujer"
            }
            

            const status = await requester.post('/api/products/createProduct').send({response})       
        
       
            expect(status.status).to.equal(201)
            expect(status.ok).to.equal(true)
            expect(status.clientError).to.equal(false)
            expect(status.header).is.ok.and.to.have.property('content-type').to.be.equal('application/json; charset=utf-8')
            
            
        })

    })


        it("Listar todos los productos: El API GET /api/products/ debe obtener todos los productos", async () => {
                
                const status = await requester.get('/api/products/')
        
                
                expect(status.status).to.equal(302)
                expect(status.statusMessage).toString('Found')
                expect(status.header).to.be.ok.and.to.have.property('location')

        })
            

            

        })

