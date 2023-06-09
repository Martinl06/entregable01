

const socketCliente = io()


function getChatForm() {
    const NewChat = {
      user: document.getElementById('user').value,
      message: document.getElementById('message').value
    }
    socketCliente.emit('newMessage', NewChat)
    console.log(NewChat)
    return false

  }

  const chat = document.getElementById('chat');
  chat.addEventListener('submit', (e) => {
        e.preventDefault();
        chat.reset();
      }
      )
      
      socketCliente.on('allMessages', (data) => {
        console.log(data)
        renderMessage(data)
  })

    function renderMessage(data) {
        let html = data.map(elem => {
            return `
            <div class = "container">
            </div>
            <div class="container chat mx-4 my-2">
                <strong>${elem.user}</strong> dice <em>${elem.message}</em>
            </div>
            `;
        })
        .join(' ')
        document.getElementById('boxChat').innerHTML = html
    }



