

const socketCliente = io()


socketCliente.on('allMessages', (data) => {
  renderMessage(data)})

  


function getChatForm() {
    const NewChat = {
      user: document.getElementById('user').value,
      message: document.getElementById('message').value
    }
    socketCliente.emit('newMessage', NewChat)
    return false

  }

  const chat = document.getElementById('chat');

  chat.addEventListener('submit', (e) => {
        e.preventDefault();
        chat.reset();
      }
      )
  

    function renderMessage(data) {
        let html = data.map(elem => {
            return `
            <div class = "container">
              <div class="container chat mx-4 my-2">
                <strong>${elem.user}</strong> dice <em> ${elem.message}</em>
              </div>
            </div>
            `;
        })
        .join(' ')
        document.getElementById('boxChat').innerHTML = html
    }



