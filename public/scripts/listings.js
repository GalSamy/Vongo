const socket = io();
window.addEventListener("load", (event) => {
    console.log("test")
    socket.emit("joinListing")
    console.log(socket.connected)
  });
/*function handleBid(listingId, bidBy){
    let bidAmount = $("#bidAmount")[0].value
    console.log(bidBy)
    if (!bidAmount)
        return alert("put a bid")
    $.ajax(
        {
        url: "http://localhost:8080/utils/newBid/",
        type: 'Post',
        data:{
        bid:bidAmount,
        listing: listingId,
        bidBy: bidBy
        },
        contentType:"application/x-www-form-urlencoded",
        dataType:"json",
        success:async  function(response) {
            console.log("response:" + response.lastBid)
            $("#lastbid")[0].textContent ="Last Bid : " + response.lastBid + "$"
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText); // Handle error response
        }
        })
}*/
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
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if(urlParams.get('new')==1){
    refreshPage()
}

socket.on('newListing',()=>{
    console.log('newListing sent!')
    refreshPage()
})