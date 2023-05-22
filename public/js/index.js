const socketCliente = io()

socketCliente.on('productsNew', (data) => {
    console.log(data)
})

function getProductForm() {
    const NewProduct = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      price: document.getElementById('price').value,
      code: document.getElementById('code').value,
      stock: document.getElementById('stock').value,
    }
    socketCliente.emit('new-product', NewProduct)


    console.log(NewProduct)
    return false

  }