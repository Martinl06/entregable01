const socketCliente = io()


socketCliente.on('productsNew', products => {
  console.log(products)
  


})

function render(products){
  const html = products.map((elem, index) => {
      return(`<div>
      <p><strong>Nombre: </strong>${elem.title}</p>
      <p><strong>Descripcion: </strong>${elem.description}</p>
      <p><strong>Precio: </strong>${elem.price}</p>
      <p><strong>Codigo: </strong>${elem.code}</p>
      <p><strong>Stock: </strong>${elem.stock}</p>
      </div>`)
  }).join(" ")
  document.getElementById('productN').innerHTML = html
}

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