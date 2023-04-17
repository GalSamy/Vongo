
function element_clicked(id){
    ids = ["#sells","#orders","#listings","#profile"]
    ids.forEach(element => {
        if(element!=id){
            $(element).removeClass('active');
        }
    });
    $(id).addClass('active');
}

function selected_init(id){
    
}
const sells_li = $("#sells")
const orders_li = $("#orders")

sells_li[0].addEventListener("click", ()=>{
    console.log("sells")
})

orders_li[0].addEventListener("click", ()=>{
    console.log("orders")

})



