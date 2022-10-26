

window.addEventListener("load" , () => {

    setInterval(() => {
        refreshMsgs();
      }, 2000);
    

    let chatForm = document.getElementById("chatForm");

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let chatName = document.getElementById("chat-name").value;
        let chatMsg = document.getElementById("chat-msg").value;

        let msgObj = {
            "name" : chatName,
            "msg" : chatMsg,
            "updateAt" : new Date()
          };

        let msgObjJSON = JSON.stringify(msgObj);
        console.log(msgObjJSON);

        fetch('/message', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: msgObjJSON
          })

          .then(res => res.json())

          .then(data => {
            console.log(data);
            
          })
  });

});

function refreshMsgs() {
   
    fetch('/messages')
    .then(res => res.json())
    .then(data => {
  
      document.getElementById("chat-msgs").innerHTML = "";
      let allChats = data.msgs;

      allChats.forEach((chat) => {

        let chatContainer = document.createElement('li');
        let name = document.createElement('p');
        let msg = document.createElement('p');
        name.innerHTML= chat.name;
        msg.innerHTML = chat.msg;
        chatContainer.classList.add("chat__list-item");
        name.classList.add("chat__list-item-name");
        msg.classList.add("chat__list-item-msg");
  
        
        chatContainer.appendChild(name);
        chatContainer.appendChild(msg);
        document.getElementById("chat-msgs").appendChild(chatContainer);
  
      })
  
    })
  }
  