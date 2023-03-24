const dataList = $("#Albums")[0]
const searchBar = $("#albumSearch")[0]
const search = val => {
    $.ajax({
        url: "https://api.deezer.com/search/album/?q=" + val ,
        type: 'GET',
        data:{
        },
        contentType:"application/x-www-form-urlencoded",
        dataType:"json",
        headers: {  'Access-Control-Allow-Origin': 'https://api.deezer.com/' },
        success: function(response) {
            console.log(response); // Handle success response
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText); // Handle error response
        }
    });
}
searchBar.addEventListener("input", content =>{
    let input = searchBar.value
    search(input)
})
