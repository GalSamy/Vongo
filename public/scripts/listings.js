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

function changeState(field){
    if (field.className === "form-control w-50"){
        field.className = "form-control w-50 d-none"
        field.value = ""
    }else{
        field.className = "form-control w-50"
    }
}

function ListingsSearch(){
    let parameters = []
    let data = new FormData();
    if (NameField.value !== ""){
        parameters.add(name)
        data.append("name",NameField.value)
    }
    if (ArtistField.value !== ""){
        parameters.add("artist")
        data.append("artist",NameField.value)
    }
    if (MinimumField.value !== ""){
        parameters.add("minimum")
        data.append("minimum",NameField.value)
    }
    if (MaximumField.value !== ""){
        parameters.add("maximum")
        data.append("maximum",NameField.value)
    }
    if (YearField.value !== ""){
        parameters.add("release")
        data.append("release",NameField.value)
    }
    $.ajax({
        url: "/listings/",
        type: "get",
        data:{
            pars: parameters,
            data: data
        },
        contentType:"application/x-www-form-urlencoded",
        dataType:"json",
        success:async  function(response) {
                var $response = $('<div></div>').html(response);
                var $listingsShowcase = $response.find('#listingsShowcase');
                $('#listingsShowcase').html($listingsShowcase.html());

        },
        error: function(xhr, status, error) {
            console.log(error.msg)
            alert(xhr.responseText); // Handle error response
        }
    })

}
