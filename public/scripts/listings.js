const socket = io();
window.addEventListener("load", (event) => {
    console.log("test")
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
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if(urlParams.get('new')==1){
    refreshPage()
}

socket.on('newListing',()=>{
    console.log('newListing sent!')
    refreshPage()
})

const NameCheck = $("#NameParameter")[0]
const ArtistCheck = $("#ArtistParameter")[0]
const MinimumCheck = $("#MinPriceParameter")[0]
const MaximumCheck = $("#MaxPriceParameter")[0]
const YearParameter = $("#YearParameter")[0]

const NameField = $("#NameField")[0]
const ArtistField = $("#ArtistField")[0]
const MinimumField = $("#MinPriceField")[0]
const MaximumField = $("#MaxPriceField")[0]
const YearField = $("#YearField")[0]

