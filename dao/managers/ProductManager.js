const fs = require('fs');
const uuid4 = require('uuid4');

class ProductManager {
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

module.exports = ProductManager;


const productManager = new ProductManager('products.json');

const product1 = {
  title: 'Producto 1',
  description: 'Campera',
  price: 10000,
  thumbnail: '/path/to/producto1/thumbnail',
  code: 'a123',
  stock: 15,
};

const product2 = {
  title: 'Producto 2',
  description: 'Pantalon',
  price: 2000,
  thumbnail: '/path/to/producto2/thumbnail',
  code: 'a124',
  stock: 10,
};


/*productManager.addProduct(product1);  // Agrega el producto 1*/

//const allProducts = productManager.getProducts(); // Obtiene todos los productos
//console.log(allProducts);

//const productById = productManager.getProductById(); //Obtiene el producto con id 1
//console.log(productById);


/*const actualizarProducto = {                   // Actualiza producto
  title: 'Producto Actualizado',
  description: 'Campera actualizada',
  price: 30000,
  thumbnail: '/path/to/updated/producto/thumbnail',
  code: 'a123',
  stock: 25,
};
/*productManager.updateProduct(1, actualizarProducto); // Actualiza el producto con id 1*/

//productManager.deleteProduct(); // Elimina el producto con id 2