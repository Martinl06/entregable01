const fs = require('fs');
const uuid4 = require('uuid4');

class Manager {
    constructor(path){
        this.path = path
    }


    addProduct(product) {
      const products = this.getProducts();
      const uuid4 = require('uuid4');
      const newProduct = { id: uuid4(), ...product };
      products.push(newProduct);
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8');
      return newProduct;
    }

    getProducts() {
         try {
          const data = fs.readFileSync(this.path, 'utf8');
          return JSON.parse(data);
        }catch (err) {
          return [];
        }
      }


      getProductById(id) {
        const products = this.getProducts();
        return products.find((product) => product.id === id);
      }

    updateProduct(id, actualizarProducto) {
        const products = this.getProducts()
        const newProduct = products.findIndex((product) => product.id === id)
        if (newProduct !== -1) {
            products[newProduct] = { id, ...actualizarProducto };
            fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
            return products[newProduct];
          }
            return null;
}

    deleteProduct (id) {
        const products = this.getProducts()
        const newProduct = products.findIndex((product) => product.id === id)
        if (newProduct !== -1) {
            const deletedProduct = products.splice(newProduct, 1)[0];
            fs.writeFileSync(this.path, JSON.stringify(products));
            return deletedProduct;
          }
          return null;
        }

}

module.exports =  Manager;

const manager = new Manager("products.json")



