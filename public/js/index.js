const socketCliente = io()



function getProductForm() {
    const NewProduct = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      price: document.getElementById('price').value,
      code: document.getElementById('code').value,
      stock: document.getElementById('stock').value,
      genero: document.getElementById('genero').value,
    }
    socketCliente.emit('NewProduct', NewProduct)
    console.log(NewProduct)

  }

  socketCliente.on('NewProduct', products => {
    console.log(products)
    render(products)
  
    
  })

  function render(products) {
    let html = products.map((elem) => {
        return `<div>
            <div class = "fluid row">
              <div class = "col-6 cards">
                <div class="card cards container mt-3" style="width: 18rem;">
                  <img src="" class="card-img-top" alt="...">
            <div class="card-body container mx-4">
              <h5 class="card-title">${elem.name}</h5>
              <p class="card-text">${elem.description}</p>
              <p class="card-text">PRECIO: ${elem.price}</p>
              <p class="card-text">CODIGO: ${elem.code}</p>
              <p class="card-text">STOCK: ${elem.stock}</p>
              <p class="card-text">GENERO: ${elem.genero}</p>
              <a href="#" class="btn btn-primary">Ver</a>
            </div>
                </div>
  </div>
  </div>
  </div>`;
      })
      .join(" ");
    document.getElementById("productN").innerHTML = html
  }
  

  const FormDelete = document.getElementById('FormDelete');
  const id = document.getElementById('id');
  const ButtonDelete = document.getElementById('ButtonDelete');
  
  FormDelete.addEventListener('submit', (e) => {
      e.preventDefault();
  
      socketCliente.emit('ProductDelete', id.value);
      
      FormDelete.reset();
    });
    


    