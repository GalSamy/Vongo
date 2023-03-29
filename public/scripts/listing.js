function handleBid(listingId, bidBy){
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
}

socket.on('newListing',()=>{
    console.log('newListing sent!')
    refreshPage()
})

