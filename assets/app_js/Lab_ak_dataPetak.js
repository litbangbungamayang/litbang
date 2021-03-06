var $cbxTahunGiling;
var $cbxJenisAnalisa, cbxJenisAnalisa;
var $cbxKepemilikan, cbxKepemilikan;
var $cbxPetakKebun, cbxPetakKebun;
var dtpAwal = $("#dtpAwal");
var txtDeskripsiBlok = $("#deskripsi_blok");
var txtLuasTanam = $("#luas_tanam");
var txtMasaTanam = $("#masa_tanam");
var txtVarietas = $("#varietas");
var txtKategori = $("#kategori");
var btnNextAnalisa = $("#btnNextAnalisa");
var $petak_pilihan;
var $data_analisaPetakPilihan;
var iconLoading = $("#iconLoading");

function formatTgl(dateObj){
  if(dateObj != null){
    return dateObj.getFullYear() + "-" + ("0" + (dateObj.getMonth()+1)) + "-" + ("0" + dateObj.getDate()).slice(-2);
  }
  return "";
}

function formatTglStr(dateObj){
  if(dateObj != null){
    return ("0" + dateObj.getDate()).slice(-2) + "-" + ("0" + (dateObj.getMonth()+1)) + "-" + dateObj.getFullYear();
  }
  return "";
}

$("#dtpAwal").datepicker({
  format: "dd-MM-yyyy"
});

iconLoading.hide();
$.ajax({
  url: js_base_url + "Lab_ak_input/getJenisAnalisa",
  type: "GET",
  dataType: "json",
  success: function(response){
    $cbxJenisAnalisa = $("#jenis_analisa").selectize({
      valueField: "id_jenisanalisa",
      labelField: "jenis_analisa",
      sortField: "jenis_analisa",
      searchField: "jenis_analisa",
      maxItems: 1,
      create: false,
      placeholder: "Pilih jenis analisa",
      options: response,
      onChange: function(value){
        cbxPetakKebun.disable();
        cbxPetakKebun.clearOptions();
        cbxKepemilikan.clear();
      }
    })
    cbxJenisAnalisa = $cbxJenisAnalisa[0].selectize;
  }
})

$cbxTahunGiling = $("#tahun_giling").selectize({
  create: false,
  sortField: "text",
  onChange: function(value){
    cbxJenisAnalisa.clear();
    cbxKepemilikan.clear();
  }
})

function setDataAwal(data){
  $data_analisaPetakPilihan = data;
}

$cbxKepemilikan = $("#kepemilikan").selectize({
  create: false,
  sortField: "text",
  maxItems: 1,
  placeholder: "Pilih kepemilikan tebu",
  onChange: function(value){
    cbxPetakKebun.disable();
    cbxPetakKebun.clearOptions();
    cbxPetakKebun.load(function(callback){
      var $selected = $cbxKepemilikan[0].selectize.getValue();
      txtDeskripsiBlok.html("");
      txtLuasTanam.html("");
      txtMasaTanam.html("");
      txtVarietas.html("");
      txtKategori.html("");
      iconLoading.show();
      console.log($selected);
      $.ajax({
        url: js_base_url + "Lab_ak_input/getAllPetakKebunByKepemilikan",
        type: "GET",
        dataType: "json",
        data: "kepemilikan=" + $selected + "&tahun_giling=" + cbxTahunGiling.getValue(),
        success: function(response){
          cbxPetakKebun.enable();
          iconLoading.hide();
          callback(response);
        }
      })
    })
  }
})

$cbxPetakKebun = $("#petak_kebun").selectize({
  create: false,
  valueField: "kode_blok",
  labelField: "deskripsi_detail",
  sortField: "kode_blok",
  searchField: "deskripsi_detail",
  placeholder: "Pilih petak kebun",
  onChange: function(value){
    $.ajax({
      url: js_base_url + "Lab_ak_input/getDataAwal",
      type: "GET",
      dataType: "json",
      async: false,
      data: "kode_blok=" + cbxPetakKebun.getValue() + "&jenis_analisa=" + cbxJenisAnalisa.getValue(),
      success: setDataAwal
    })
    $.map(this.items, function(value){
      $petak_pilihan = cbxPetakKebun.options[value];
    })
  }
})

btnNextAnalisa.on("click", function(){
  console.log($petak_pilihan);
  $.ajax({
    url: js_base_url + "Lab_ak_dataPetak/setPetakPilihan",
    type: "POST",
    dataType: "text",
    data:"petak_pilihan=" + JSON.stringify($petak_pilihan),
    success: function(data){
      //window.location.href = js_base_url + "Lab_ak_dataanalisa";
      //location.assign(js_base_url + "Lab_ak_dataanalisa");
      //window.location.assign(data);
      window.location.href = data;
    }
  })
})

cbxKepemilikan = $cbxKepemilikan[0].selectize;
cbxTahunGiling = $cbxTahunGiling[0].selectize;
cbxPetakKebun = $cbxPetakKebun[0].selectize;
cbxPetakKebun.disable();
