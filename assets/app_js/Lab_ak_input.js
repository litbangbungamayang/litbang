var $cbxTahunGiling;
var $cbxJenisAnalisa, cbxJenisAnalisa;
var $cbxKepemilikan, cbxKepemilikan;
var $cbxPetakKebun, cbxPetakKebun;
var $cbxRondeAnalisa, cbxRondeAnalisa;
var dtpAwal = $("#dtpAwal");
var txtDeskripsiBlok = $("#deskripsi_blok");
var txtLuasTanam = $("#luas_tanam");
var txtMasaTanam = $("#masa_tanam");
var txtVarietas = $("#varietas");
var txtKategori = $("#kategori");
var btnNextAnalisa = $("#btnNextAnalisa");
var $petak_pilihan;

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
      options: response
    })
    cbxJenisAnalisa = $cbxJenisAnalisa[0].selectize;
  }
})

$cbxTahunGiling = $("#tahun_giling").selectize({
  create: false,
  sortField: "text"
})

$cbxRondeAnalisa = $("#ronde_analisa").selectize({
  create: false,
  sortField: "text"
})

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
      $.ajax({
        url: js_base_url + "Lab_ak_input/getAllPetakKebunByKepemilikan",
        type: "GET",
        dataType: "json",
        data: "kepemilikan=" + $selected,
        success: function(response){
          cbxPetakKebun.enable();
          callback(response);
        }
      })
    })
  }
})

$cbxPetakKebun = $("#petak_kebun").selectize({
  create: false,
  valueField: "kode_blok",
  labelField: "deskripsi_blok",
  sortField: "kode_blok",
  searchField: "deskripsi_blok",
  placeholder: "Pilih petak kebun",
  onChange: function(value){
    $.map(this.items, function(value){
      $petak_pilihan = cbxPetakKebun.options[value];
    })
    txtDeskripsiBlok.html("<b>" + $petak_pilihan.deskripsi_blok + "</b>");
    txtLuasTanam.html(parseFloat($petak_pilihan.luas_tanam).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits: 2}));
    txtMasaTanam.html($petak_pilihan.periode);
    txtVarietas.html($petak_pilihan.nama_varietas);
    txtKategori.html($petak_pilihan.status_blok);
  }
})

btnNextAnalisa.on("click", function(){
  if (validasiForm()){
    var dataAwalAnalisa = {
      jenis_analisa: cbxJenisAnalisa.getValue(),
      nama_analisa: cbxJenisAnalisa.getItem(cbxJenisAnalisa.getValue()).text(),
      tahun_giling: cbxTahunGiling.getValue(),
      kepemilikan: cbxKepemilikan.getValue(),
      ronde_analisa: cbxRondeAnalisa.getValue(),
      tgl_analisa: formatTgl(dtpAwal.datepicker("getDate")),
      petak_kebun: $petak_pilihan
    };
    $.ajax({
      url: js_base_url + "Lab_ak_dataanalisa/setPetakPilihan",
      type: "POST",
      dataType: "text",
      data:"petak_pilihan=" + JSON.stringify(dataAwalAnalisa),
      success: function(data){
        //window.location.href = js_base_url + "Lab_ak_dataanalisa";
        //location.assign(js_base_url + "Lab_ak_dataanalisa");
        //window.location.assign(data);
        window.location.href = data;
      }
    })
  }
})

function validasiForm(){
  if(cbxTahunGiling.getValue() != "" && cbxJenisAnalisa.getValue() != "" &&
      cbxKepemilikan.getValue() != "" && cbxPetakKebun.getValue() != "" &&
      cbxRondeAnalisa.getValue() != "" && dtpAwal.val() != ""){
    $cbxJenisAnalisa.removeClass("is-invalid");
    $cbxKepemilikan.removeClass("is-invalid");
    $cbxPetakKebun.removeClass("is-invalid");
    $cbxRondeAnalisa.removeClass("is-invalid");
    dtpAwal.removeClass("is-invalid");
    return true;
  } else {
    (cbxJenisAnalisa.getValue() == "") ? $cbxJenisAnalisa.addClass("is-invalid") : $cbxJenisAnalisa.removeClass("is-invalid");
    (cbxKepemilikan.getValue() == "") ? $cbxKepemilikan.addClass("is-invalid") : $cbxKepemilikan.removeClass("is-invalid");
    (cbxPetakKebun.getValue() == "") ? $cbxPetakKebun.addClass("is-invalid") : $cbxPetakKebun.removeClass("is-invalid");
    (cbxRondeAnalisa.getValue() == "") ? $cbxRondeAnalisa.addClass("is-invalid") : $cbxRondeAnalisa.removeClass("is-invalid");
    (dtpAwal.val() == "") ? dtpAwal.addClass("is-invalid") : dtpAwal.removeClass("is-invalid");
  }
  return false;
}

cbxRondeAnalisa = $cbxRondeAnalisa[0].selectize;
cbxKepemilikan = $cbxKepemilikan[0].selectize;
cbxTahunGiling = $cbxTahunGiling[0].selectize;
cbxPetakKebun = $cbxPetakKebun[0].selectize;
cbxPetakKebun.disable();
