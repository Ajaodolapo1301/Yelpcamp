$(document).ready(function() {
    $(".btn").on("click", deleteCamp)
})

function deleteCamp (){
  
}

$ajax({
    type: "DELETE",
    url: "/cam"

})