

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
// Check if the user is already subscribed to notifications
const isSubscribed = localStorage.getItem('isSubscribed');
console.log(socket.connected)
if (!isSubscribed && hasAuthToken()) {

    console.log("check+"+getCookie('authToken'))
  // Subscribe to notifications for the current user
  socket.emit('subscribe', getCookie('authToken'));
  // Set the flag to indicate that the user is subscribed
  localStorage.setItem('isSubscribed', 'true');
}
socket.emit('notify','check checl')
socket.on('notification',(message)=>{
    alert(message)
})
