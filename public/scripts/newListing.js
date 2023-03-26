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
    removeAll(dataList)
    if (val === "") {
        return;
    }
    $.ajax({
        url: "http://localhost:8080/album_api/album_search/" + val ,
        type: 'GET',
        contentType:"application/x-www-form-urlencoded",
        dataType:"json",
        success:  function(response) {
            removeAll(dataList)
            response.forEach(a => {
                let card = document.createElement("div")
                card.className = "card col-4 me-3 mb-3 p-0"
                card.style.width = "15rem"
                let img = document.createElement("img")
                img.className = "card-img-top w-100 h-50"
                img.src = a.cover
                card.append(img)
                let cbody = document.createElement("div")
                cbody.className = "card-body p-3"
                let title = document.createElement("p")
                title.textContent = a.title
                title.className = "h3"
                let btn = document.createElement("a")
                btn.textContent = "Pick Album"
                btn.className = "btn btn-primary fw-bold m-1"
                cbody.append(title)
                card.append(cbody)
                card.append(btn)
                dataList.append(card)
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
     await search(input)
})
