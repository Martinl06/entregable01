const fs = require("fs");
const uuid4 = require("uuid4");

class CartManager {
  constructor(path) {
    this.path = path;
  }

  readCarts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      return JSON.parse(data, null, 2);
    } catch (err) {
      return [];
    }
  }

  CartId = async (id) => {
    const carts = await this.readCarts();
    const IdCart = carts.find((cart) => cart.id === id);
    return IdCart;
  };

  writeCarts = async (cart) => {
    await fs.writeFile(this.path, JSON.stringify(cart, null, 2), "utf-8");
  };

  addCart = async () => {
    const id = uuid4();
    const carts = await this.readCarts();
    const total = [{ id: id, products: [] }, ...carts];
    await this.writeCarts(total);
    return "Agregado";
  };

  getCarts = async () => {
    return await this.readCarts();
  };

  getCartID = async (id) => {
    const carts = await this.CartId(id);
    if (!carts) {
      return "No existe el carrito";
    } else {
      return carts;
    }
  };
}

module.exports = CartManager;

const cartManager = new CartManager("Carrito.json");
