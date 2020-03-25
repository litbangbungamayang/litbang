var btnTes = $("#btnTes");

btnTes.on("click", function(){
  $.ajax({
    url: js_base_url + "Lab_ak_dataanalisa/getPetakPilihan",
    type: "GET",
    dataType: "json",
    success: function(response){
      alert(response);
    }
  })
})
