(() => {
  const formCalculator = document.getElementById("form-calculator");
  const statusWebsocket = document.getElementById('status-websocket');
  const history = document.getElementById('history');
  const socket = new WebSocket("wss://websocketback.herokuapp.com");

  let display = document.getElementById('display');
  let displayHidden = document.getElementById('display-hidden');

  socket.onerror = (error) => {
    console.log('error onerror => ', error)
    console.log("WebSocket Error: ", error);
  };

  socket.onopen = (event) => {
    statusWebsocket.innerHTML = "Conectado ao servidor: " + event.currentTarget.url;
    statusWebsocket.className = "open";
  };

  socket.onmessage = (event) => {
    const operation = event.data;
    history.innerHTML += `${operation}\n`;
  };

  socket.onclose = (event) => {
    statusWebsocket.innerHTML = "Websocket desconectado.";
    statusWebsocket.className = "closed";
  };

  formCalculator.onsubmit = (e) => {
    e.preventDefault();

    const operation = displayHidden.value;

    socket.send(operation);

    formCalculator.buttonClear();

    return false;
  };

  formCalculator.buttonClick = (value) => {
    const displayTemp = displayHidden.value;
    display.value += value

    if (value === '.' || displayTemp === '') {
      displayHidden.value = displayTemp + value;
    } else {
      displayHidden.value = isNaN(value) ? displayTemp + ' ' + value + ' ' : displayTemp + value;
    }
  }

  formCalculator.buttonClear = () => {
    display.value = '';
    displayHidden.value = '';
  }

  formCalculator.closeWebSocket = () => {
    socket.close();
  };
})();