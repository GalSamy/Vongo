const dataList = $("#albums")[0]
const searchBar = $("#albumSearch")[0]
function removeAll(element){
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}
const search = val => {
    if (val === "")
        return;
    $.ajax({
        url: "http://localhost:8080/album_api/album_search/" + val ,
        type: 'GET',
        contentType:"application/x-www-form-urlencoded",
        dataType:"json",
        success:  function(response) {
            removeAll(dataList)
            response.forEach(a => {
                let p = document.createElement("p")
                p.textContent = a.title
                dataList.append(p)
            })
            console.log(response); // Handle success response
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText); // Handle error response
        }
    });

}
searchBar.addEventListener("input", async content =>{
    let input = searchBar.value
    console.log(input)
     search(input)
})
