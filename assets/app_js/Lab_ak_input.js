var $cbxTahunGiling;
var $cbxJenisAnalisa;
var $kepemilikan;
var $cbxPetakKebun, cbxPetakKebun;



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
  }
})

$cbxTahunGiling = $("#tahun_giling").selectize({
  create: false,
  sortField: "text"
})

$kepemilikan = $("#kepemilikan").selectize({
  create: false,
  sortField: "text",
  maxItems: 1,
  placeholder: "Pilih kepemilikan tebu"
})

$cbxPetakKebun = $("#petak_kebun").selectize({
  create: false,
  sortField: "text"
})

cbxPetakKebun = $cbxPetakKebun[0].selectize;
cbxPetakKebun.disable();
