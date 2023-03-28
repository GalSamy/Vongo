const socket = io();
window.addEventListener("load", (event) => {
    
    socket.emit("joinListing")
    console.log(socket.connected)
  });
  function refreshPage() {
    $.ajax({
      url: '/listings',
      type: 'GET',
      success: function(response) {
        var $response = $('<div></div>').html(response);
        var $listingsShowcase = $response.find('#listingsShowcase');
        $('#listingsShowcase').html($listingsShowcase.html());

      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
}
socket.on('newListing',()=>{
    console.log('newListing sent!')
    refreshPage()
})