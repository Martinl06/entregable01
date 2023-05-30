const socketCliente = io()


function getProductForm() {
    const NewProduct = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      price: document.getElementById('price').value,
      code: document.getElementById('code').value,
      stock: document.getElementById('stock').value,
    }
    socketCliente.emit('NewProduct', NewProduct)
    console.log(NewProduct)

  }

  socketCliente.on('NewProduct', products => {
    console.log(products)
    render(products)
  
    
  })
  
  const formDelete = document.getElementById('formDelete')
  formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    
    formDelete.reset();
  });


  function deleteProductForm(){
    const ProductDelete = {
      id: document.getElementById('id').value,   
    }
    socketCliente.emit('ProductDelete', ProductDelete);
      console.log(ProductDelete)
  }

  //que se vea en el cliente todos los productos menos el que se borro
  socketCliente.on('ProductDelete', products => {
    console.log(products)
  })




  function render(products) {
    const html = products.map((elem) => {
        return `<div>
            <div class = "fluid row">
              <div class = "col-6 cards">
                <div class="card cards container mt-3" style="width: 18rem;">
                  <img src="" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${elem.title}</h5>
              <p class="card-text">${elem.description}</p>
              <p class="card-text">PRECIO: ${elem.price}</p>
              <p class="card-text">CODIGO: ${elem.code}</p>
              <p class="card-text">STOCK: ${elem.stock}</p>
              <p class="card-text">ID: ${elem.id}</p>
              <a href="#" class="btn btn-primary">Ver</a>
            </div>
                </div>
  </div>
  </div>
  </div>`;
      })
      .join(" ");
    document.getElementById("productN").innerHTML = html;
  }
  

  