console.log("type "+(typeof socket))
if(typeof socket=== "undefined")
{
    var socket = io();
    console.log("type2 "+(typeof socket))
}

socket.on('connect', () => {
  console.log('Connected to server');

  const isSubscribed = localStorage.getItem('isSubscribed');
  if (isSubscribed && hasAuthToken()) {
    console.log("check+"+getCookie('authToken'))
    // Re-subscribe to notifications for the current user
    socket.emit('subscribe', getCookie('authToken'));
  }
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('notifications',(notification)=>{
  console.log('yesss')
  showNotification(notification)
})

function showNotification(notification){
  $('#modal_ul').append(`<li>${notification}</li>`)
}
function hasAuthToken() {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === 'authToken') {
      return true;
    }
  }
  return false;
}

function getCookie(name) {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // If the cookie starts with the requested name followed by an equals sign
    if (cookie.startsWith(`${name}=`)) {
      // Return the value of the cookie
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
}
