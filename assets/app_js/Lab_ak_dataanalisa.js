var btnTes = $("#btnTes");
var $cbxSampelAnalisa, cbxSampelAnalisa;
var btn_addFisik = $("#btn_addFisik");
var btn_hitungData = $("#btn_hitungData");
var btn_simpanData = $("#btn_simpanData");
var btn_sampelBaru = $("#btn_sampelBaru");
var btn_kembali = $("#btn_kembali");
var txtPanjang = $("#fisik_panjang");
var txtRuas = $("#fisik_ruas");
var txtDiameter = $("#fisik_dia");
var txtNoSampel = $("#no_sampel");
var dialogHasilAnalisa = $("#dialogHasilAnalisa");
var $petak_pilihan;

var tebu_atas = $("#tebu_atas");
var tebu_tengah = $("#tebu_tengah");
var tebu_bawah = $("#tebu_bawah");
var tebu_campur = $("#tebu_campur");
var nira_atas = $("#nira_atas");
var nira_tengah = $("#nira_tengah");
var nira_bawah = $("#nira_bawah");
var nira_campur = $("#nira_campur");
var penggerek_campur = $("#penggerek_campur");
var brix_atas = $("#brix_atas");
var brix_tengah = $("#brix_tengah");
var brix_bawah = $("#brix_bawah");
var brix_campur = $("#brix_campur");
var putaran_atas = $("#putaran_atas");
var putaran_tengah = $("#putaran_tengah");
var putaran_bawah = $("#putaran_bawah");
var putaran_campur = $("#putaran_campur");
var suhu_campur = $("#suhu_campur");
var korsuhu_campur = $("#korsuhu_campur");

var v_tebuAtas, v_tebuTengah, v_tebuBawah, v_tebuCampur;
var v_niraAtas, v_niraTengah, v_niraBawah, v_niraCampur;
var v_penggerekCampur;
var v_brixAtas, v_brixTengah, v_brixBawah, v_brixCampur;
var v_putaranAtas, v_putaranTengah, v_putaranBawah, v_putaranCampur;
var v_suhuCampur, v_korSuhuCampur;

var lbl_rataPanjang = $("#lbl_rataPanjang");
var lbl_rataRuas = $("#lbl_rataRuas");
var lbl_rataDiameter = $("#lbl_rataDiameter");
var lbl_kgm = $("#lbl_kgm");
var lbl_brixc = $("#lbl_brixc");
var lbl_polc = $("#lbl_polc");
var lbl_hkc = $("#lbl_hkc");
var lbl_faktor = $("#lbl_faktor");
var lbl_nnc = $("#lbl_nnc");
var lbl_rendc = $("#lbl_rendc");
var lbl_fk = $("#lbl_fk");
var lbl_kp = $("#lbl_kp");
var lbl_kdt = $("#lbl_kdt");

var arrayFisikTebu = [];
var arrayDataAnalisa = [];
var arrayPost = [];
var dataAnalisaTebu;
var dataHitungFisikTebu;
var dataJumlahFisikTebu;
var objFisikTebu = function(fisik_panjang, fisik_ruas, fisik_dia){
  var obj = {};
  obj.fisik_panjang = fisik_panjang;
  obj.fisik_ruas = fisik_ruas;
  obj.fisik_dia = fisik_dia;
  return obj;
}
var objAnalisaTebu =
function(
  kode_blok, jenis_analisa, ronde, no_sampel, tgl_analisa,
  berat_tebu_atas, berat_tebu_tengah, berat_tebu_bawah,
  berat_nira_atas, berat_nira_tengah, berat_nira_bawah,
  penggerek,
  brix_baca_atas, brix_baca_tengah, brix_baca_bawah, brix_baca_campur,
  pol_baca_atas, pol_baca_tengah, pol_baca_bawah, pol_baca_campur,
  suhu, koreksi_suhu,
  brix_atas, brix_tengah, brix_bawah, brix_campur,
  pol_atas, pol_tengah, pol_bawah, pol_campur,
  faktor,
  hk_atas, hk_tengah, hk_bawah, hk_campur,
  nn_atas, nn_tengah, nn_bawah, nn_campur,
  rend_atas, rend_tengah, rend_bawah, rend_campur,
  fk, kp, kdt,
  rata_panjang, rata_ruas, rata_diameter, kg_per_meter, data_fisik
){
  var obj = {};
  obj.kode_blok = kode_blok;
  obj.jenis_analisa = jenis_analisa;
  obj.ronde = ronde;
  obj.no_sampel = no_sampel;
  obj.tgl_analisa = tgl_analisa;
  obj.berat_tebu_atas = berat_tebu_atas;
  obj.berat_tebu_tengah = berat_tebu_tengah;
  obj.berat_tebu_bawah = berat_tebu_bawah;
  obj.berat_nira_atas = berat_nira_atas;
  obj.berat_nira_tengah = berat_nira_tengah;
  obj.berat_nira_bawah = berat_nira_bawah;
  obj.penggerek = penggerek;
  obj.brix_baca_atas = brix_baca_atas;
  obj.brix_baca_tengah = brix_baca_tengah;
  obj.brix_baca_bawah = brix_baca_bawah;
  obj.brix_baca_campur = brix_baca_campur;
  obj.pol_baca_atas = pol_baca_atas;
  obj.pol_baca_tengah = pol_baca_tengah;
  obj.pol_baca_bawah = pol_baca_bawah;
  obj.pol_baca_campur = pol_baca_campur;
  obj.suhu = suhu;
  obj.koreksi_suhu = koreksi_suhu;
  obj.brix_atas = brix_atas;
  obj.brix_tengah = brix_tengah;
  obj.brix_bawah = brix_bawah;
  obj.brix_campur = brix_campur;
  obj.pol_atas = pol_atas;
  obj.pol_tengah = pol_tengah;
  obj.pol_bawah = pol_bawah;
  obj.pol_campur = pol_campur;
  obj.faktor = faktor;
  obj.hk_atas = hk_atas;
  obj.hk_tengah = hk_tengah;
  obj.hk_bawah = hk_bawah;
  obj.hk_campur = hk_campur;
  obj.nn_atas = nn_atas;
  obj.nn_tengah = nn_tengah;
  obj.nn_bawah = nn_bawah;
  obj.nn_campur = nn_campur;
  obj.rend_atas = rend_atas;
  obj.rend_tengah = rend_tengah;
  obj.rend_bawah = rend_bawah;
  obj.rend_campur = rend_campur;
  obj.fk = fk;
  obj.kp = kp;
  obj.kdt = kdt;
  obj.rata_panjang = rata_panjang;
  obj.rata_ruas = rata_ruas;
  obj.rata_diameter = rata_diameter;
  obj.kg_per_meter = kg_per_meter;
  obj.data_fisik = data_fisik;
  return obj;
}

$.ajax({
  url: js_base_url + "Lab_ak_dataanalisa/getPetakPilihan",
  type: "GET",
  dataType: "json",
  async: true,
  success: returnPetakPilihan
})

txtPanjang.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/100).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}));
  }
})

txtRuas.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9 ]/g,""));
})

txtDiameter.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) > 10){
    $(this).val(parseFloat($(this).val()/10).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}));
  }
})

tebu_atas.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/100).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}));
  }
})

tebu_tengah.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/100).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}));
  }
})

tebu_bawah.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/100).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}));
  }
})

tebu_campur.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/100).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}));
  }
})

nira_atas.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/100).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}));
  }
})

nira_tengah.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/100).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}));
  }
})

nira_bawah.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/100).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}));
  }
})

nira_campur.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/100).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}));
  }
})

penggerek_campur.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/100).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}));
  }
})

brix_atas.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/10).toLocaleString("en-US", {maximumFractionDigits: 1, minimumFractionDigits: 1}));
  }
})

brix_tengah.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/10).toLocaleString("en-US", {maximumFractionDigits: 1, minimumFractionDigits: 1}));
  }
})

brix_bawah.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/10).toLocaleString("en-US", {maximumFractionDigits: 1, minimumFractionDigits: 1}));
  }
})

brix_campur.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/10).toLocaleString("en-US", {maximumFractionDigits: 1, minimumFractionDigits: 1}));
  }
})

putaran_atas.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/10).toLocaleString("en-US", {maximumFractionDigits: 1, minimumFractionDigits: 1}));
  }
})

putaran_tengah.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/10).toLocaleString("en-US", {maximumFractionDigits: 1, minimumFractionDigits: 1}));
  }
})

putaran_bawah.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/10).toLocaleString("en-US", {maximumFractionDigits: 1, minimumFractionDigits: 1}));
  }
})

putaran_campur.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
  if(parseFloat($(this).val()) >= 100){
    $(this).val(parseFloat($(this).val()/10).toLocaleString("en-US", {maximumFractionDigits: 1, minimumFractionDigits: 1}));
  }
})

suhu_campur.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g, '$1'));
})

korsuhu_campur.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9.-]/g,"").replace(/(\..*)\./g, '$1'));
})

$cbxSampelAnalisa = $("#sampel_analisa").selectize({
  create: false,
  placeholder: "Pilih sampel analisa"
})

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

btn_addFisik.on("click", function(){
  if (validasiFisik()){
    var fisik_tebu = objFisikTebu(
      txtPanjang.val(),
      txtRuas.val(),
      txtDiameter.val()
    );
    arrayFisikTebu.push(fisik_tebu);
    refreshTblFisik();
    resetFisik();
    if (arrayFisikTebu.length >0) {hitungDataFisik();}
  }
})

function returnPetakPilihan(data){
  if (JSON.parse(localStorage.getItem("no_sampel")) == null){
    txtNoSampel.html("1");
  } else {
    txtNoSampel.html(localStorage.getItem("no_sampel"));
  }
  $petak_pilihan = data;
}

btn_hitungData.on("click", function(){
  if (validasiAnalisa() && arrayFisikTebu.length > 0 && $petak_pilihan !== undefined){
    getInputAnalisa();
    dialogHasilAnalisa.modal("toggle");
  } else {
    if (arrayFisikTebu.length == 0){
      alert("Data fisik tebu belum diinput!");
    }
    if ($petak_pilihan === undefined){
      alert("Data petak terpilih belum ada!");
    }
  }
})

btn_simpanData.on("click", function(){
  //console.log(JSON.stringify(dataAnalisaTebu));
  arrayDataAnalisa.push(dataAnalisaTebu);
  console.log(JSON.stringify(arrayDataAnalisa));
  $.ajax({
    url: js_base_url + "Lab_ak_dataanalisa/simpanDataAnalisa",
    dataType: "json",
    type: "POST",
    data: "data_analisa=" + JSON.stringify(arrayDataAnalisa),
    success: function(data){
      /*
      if (data.status == "SUCCESS"){
        if (confirm("Apakah ada SAMPEL lain untuk PETAK INI ?")){
          resetAnalisa();
          var no_sampel = Number(data.no_sampel)+1;
          localStorage.setItem("no_sampel", no_sampel);
          txtNoSampel.html(localStorage.getItem("no_sampel"));
          dialogHasilAnalisa.modal("toggle");
        } else {
          $.ajax({
            url: js_base_url + "Lab_ak_dataanalisa/unsetPetakPilihan",
            type: "GET",
            dataType: "text",
            success: function(data){
              localStorage.removeItem("no_sampel");
              window.location.href = data;
            }
          })
        }
      }*/
      if (data.status == "SUCCESS"){
        alert("Data telah tersimpan!");
        resetAnalisa();
        dialogHasilAnalisa.modal("toggle");
        localStorage.removeItem("no_sampel");
        $.ajax({
          url: js_base_url + "Lab_ak_dataanalisa/unsetPetakPilihan",
          type: "GET",
          dataType: "text",
          success: function(data){
            window.location.href = data;
          }
        })
      } else {
        if (data.status == "FAILED"){
          alert("Pengiriman data mengalami KEGAGALAN!");
        }
      }
    }
  })
})

btn_sampelBaru.on("click", function(){
  if (confirm("Anda akan menambah sampel baru?")){
    arrayDataAnalisa.push(dataAnalisaTebu);
    resetAnalisa();
    var no_sampel = Number(arrayDataAnalisa.length)+1;
    localStorage.setItem("no_sampel", no_sampel);
    txtNoSampel.html(localStorage.getItem("no_sampel"));
    dialogHasilAnalisa.modal("toggle");
    console.log(arrayDataAnalisa);
  }
})

btn_kembali.on("click", function(){
  $.ajax({
    url: js_base_url + "Lab_ak_dataanalisa/unsetPetakPilihan",
    type: "GET",
    dataType: "text",
    success: function(data){
      localStorage.removeItem("no_sampel");
      window.location.href = data;
    }
  })
})

function duaDesimal(angka){
  return Number(parseFloat(angka).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits:2}));
}

function satuDesimal(angka){
  return Number(parseFloat(angka).toLocaleString("en-US", {minimumFractionDigits: 1, maximumFractionDigits:1}));
}

function hitungBeratJenis(brixHitung){
  if (brixHitung <= 5.5){
    return ((0.0215*brixHitung) + 5.4802)/5.5;
  } else {
    if (brixHitung <= 10.5){
      return ((0.01983*brixHitung) + 4.878622)/4.9;
    } else {
      if (brixHitung <= 15.5){
        return ((0.02052*brixHitung) + 4.871334)/4.9;
      } else {
        if (brixHitung > 15.5){
          return ((0.02207*brixHitung) + 4.843238)/4.9;
        }
      }
    }
  }
}

function hitungPol(polBaca, beratJenis){
  return (polBaca*0.286)/beratJenis;
}

function hitungNilaiNira(polHitung, brixHitung){
  return polHitung-0.4*(brixHitung-polHitung);
}

function hitungDataFisik(){
  if (arrayFisikTebu.length > 0){
    var jml_panjang = 0;
    var jml_ruas = 0;
    var jml_diameter = 0;
    for (i = 0; i < arrayFisikTebu.length; i++){
      jml_panjang += parseFloat(arrayFisikTebu[i].fisik_panjang);
      jml_ruas += parseInt(arrayFisikTebu[i].fisik_ruas);
      jml_diameter += parseFloat(arrayFisikTebu[i].fisik_dia);
    }
    dataHitungFisikTebu = objFisikTebu(
      duaDesimal(jml_panjang/arrayFisikTebu.length),
      parseInt(jml_ruas/arrayFisikTebu.length),
      duaDesimal(jml_diameter/arrayFisikTebu.length)
    );
    dataJumlahFisikTebu = objFisikTebu(
      duaDesimal(jml_panjang),
      parseInt(jml_ruas),
      duaDesimal(jml_diameter)
    );
  }
}

function validasiFisik(){
  if (txtPanjang.val() != "" && txtRuas.val() != "" && txtDiameter.val() != ""){
    txtPanjang.removeClass("state-invalid");
    txtRuas.removeClass("state-invalid");
    txtDiameter.removeClass("state-invalid");
    return true;
  } else {
    (txtPanjang.val() =="") ? txtPanjang.addClass("state-invalid") : txtPanjang.removeClass("state-invalid");
    (txtRuas.val() =="") ? txtRuas.addClass("state-invalid") : txtRuas.removeClass("state-invalid");
    (txtDiameter.val() =="") ? txtDiameter.addClass("state-invalid") : txtDiameter.removeClass("state-invalid");
  }
}

function validasiAnalisa(){
  if (tebu_atas.val() != "" && tebu_tengah.val() != "" && tebu_bawah.val() != "" &&
      nira_atas.val() != "" && nira_tengah.val() != "" && nira_bawah.val() != "" &&
      brix_atas.val() != "" && brix_tengah.val() != "" && brix_bawah.val() != "" && brix_campur.val() != "" &&
      putaran_atas.val() != "" && putaran_tengah.val() != "" && putaran_bawah.val() != "" && putaran_campur.val() != "" &&
      suhu_campur.val() != "" && korsuhu_campur.val() != ""){
    tebu_atas.removeClass("state-invalid");
    tebu_tengah.removeClass("state-invalid");
    tebu_bawah.removeClass("state-invalid");
    tebu_campur.removeClass("state-invalid");
    nira_atas.removeClass("state-invalid");
    nira_tengah.removeClass("state-invalid");
    nira_bawah.removeClass("state-invalid");
    nira_campur.removeClass("state-invalid");
    brix_atas.removeClass("state-invalid");
    brix_tengah.removeClass("state-invalid");
    brix_bawah.removeClass("state-invalid");
    brix_campur.removeClass("state-invalid");
    putaran_atas.removeClass("state-invalid");
    putaran_tengah.removeClass("state-invalid");
    putaran_bawah.removeClass("state-invalid");
    putaran_campur.removeClass("state-invalid");
    suhu_campur.removeClass("state-invalid");
    korsuhu_campur.removeClass("state-invalid");
    return true;
  } else {
    (tebu_atas.val() == "") ? tebu_atas.addClass("state-invalid") : tebu_atas.removeClass("state-invalid");
    (tebu_tengah.val() == "") ? tebu_tengah.addClass("state-invalid") : tebu_tengah.removeClass("state-invalid");
    (tebu_bawah.val() == "") ? tebu_bawah.addClass("state-invalid") : tebu_bawah.removeClass("state-invalid");
    //(tebu_campur.val() == "") ? tebu_campur.addClass("state-invalid") : tebu_campur.removeClass("state-invalid");
    (nira_atas.val() == "") ? nira_atas.addClass("state-invalid") : nira_atas.removeClass("state-invalid");
    (nira_tengah.val() == "") ? nira_tengah.addClass("state-invalid") : nira_tengah.removeClass("state-invalid");
    (nira_bawah.val() == "") ? nira_bawah.addClass("state-invalid") : nira_bawah.removeClass("state-invalid");
    //(nira_campur.val() == "") ? nira_campur.addClass("state-invalid") : nira_campur.removeClass("state-invalid");
    (brix_atas.val() == "") ? brix_atas.addClass("state-invalid") : brix_atas.removeClass("state-invalid");
    (brix_tengah.val() == "") ? brix_tengah.addClass("state-invalid") : brix_tengah.removeClass("state-invalid");
    (brix_bawah.val() == "") ? brix_bawah.addClass("state-invalid") : brix_bawah.removeClass("state-invalid");
    (brix_campur.val() == "") ? brix_campur.addClass("state-invalid") : brix_campur.removeClass("state-invalid");
    (putaran_atas.val() == "") ? putaran_atas.addClass("state-invalid") : putaran_atas.removeClass("state-invalid");
    (putaran_tengah.val() == "") ? putaran_tengah.addClass("state-invalid") : putaran_tengah.removeClass("state-invalid");
    (putaran_bawah.val() == "") ? putaran_bawah.addClass("state-invalid") : putaran_bawah.removeClass("state-invalid");
    (putaran_campur.val() == "") ? putaran_campur.addClass("state-invalid") : putaran_campur.removeClass("state-invalid");
    (suhu_campur.val() == "") ? suhu_campur.addClass("state-invalid") : suhu_campur.removeClass("state-invalid");
    (korsuhu_campur.val() == "") ? korsuhu_campur.addClass("state-invalid") : korsuhu_campur.removeClass("state-invalid");
  }
  return false;
}

function getInputAnalisa(){
  v_tebuAtas = duaDesimal(tebu_atas.val());
  v_tebuTengah = duaDesimal(tebu_tengah.val());
  v_tebuBawah = duaDesimal(tebu_bawah.val());
  v_tebuCampur = duaDesimal(tebu_campur.val());
  v_niraAtas = duaDesimal(nira_atas.val());
  v_niraTengah = duaDesimal(nira_tengah.val());
  v_niraBawah = duaDesimal(nira_bawah.val());
  v_niraCampur = duaDesimal(nira_campur.val());
  v_penggerekCampur = duaDesimal(penggerek_campur.val());
  v_brixAtas = duaDesimal(brix_atas.val());
  v_brixTengah = duaDesimal(brix_tengah.val());
  v_brixBawah = duaDesimal(brix_bawah.val());
  v_brixCampur = duaDesimal(brix_campur.val());
  v_putaranAtas = satuDesimal(putaran_atas.val());
  v_putaranTengah = satuDesimal(putaran_tengah.val());
  v_putaranBawah = satuDesimal(putaran_bawah.val());
  v_putaranCampur = satuDesimal(putaran_campur.val());
  v_suhuCampur = satuDesimal(suhu_campur.val());
  v_korSuhuCampur = duaDesimal(korsuhu_campur.val());
  var v_brixHitungAtas = v_brixAtas + v_korSuhuCampur;
  var v_brixHitungTengah = v_brixTengah + v_korSuhuCampur;
  var v_brixHitungBawah = v_brixBawah + v_korSuhuCampur;
  var v_brixHitungCampur = v_brixCampur + v_korSuhuCampur;
  var v_totalBeratNira = v_niraAtas + v_niraTengah + v_niraBawah;
  var v_totalBeratTebu = v_tebuAtas + v_tebuTengah + v_tebuBawah;
  var v_penggerekRata = duaDesimal(v_penggerekCampur/dataJumlahFisikTebu.fisik_ruas*100);
  var v_faktorPerah = duaDesimal(v_totalBeratNira/v_totalBeratTebu);
  var v_polAtas = duaDesimal(hitungPol(v_putaranAtas, hitungBeratJenis(v_brixHitungAtas)));
  var v_polTengah = duaDesimal(hitungPol(v_putaranTengah, hitungBeratJenis(v_brixHitungTengah)));
  var v_polBawah = duaDesimal(hitungPol(v_putaranBawah, hitungBeratJenis(v_brixHitungBawah)));
  var v_polCampur = duaDesimal(hitungPol(v_putaranCampur, hitungBeratJenis(v_brixHitungCampur)));
  var v_hkAtas = satuDesimal(v_polAtas/v_brixHitungAtas*100);
  var v_hkTengah = satuDesimal(v_polTengah/v_brixHitungTengah*100);
  var v_hkBawah = satuDesimal(v_polBawah/v_brixHitungBawah*100);
  var v_hkCampur = satuDesimal(v_polCampur/v_brixHitungCampur*100);
  var v_nnAtas = duaDesimal(hitungNilaiNira(v_polAtas, v_brixHitungAtas));
  var v_nnTengah = duaDesimal(hitungNilaiNira(v_polTengah, v_brixHitungTengah));
  var v_nnBawah = duaDesimal(hitungNilaiNira(v_polBawah, v_brixHitungBawah));
  var v_nnCampur = duaDesimal(hitungNilaiNira(v_polCampur, v_brixHitungCampur));
  var v_rendAtas = duaDesimal(v_nnAtas*v_faktorPerah);
  var v_rendTengah = duaDesimal(v_nnTengah*v_faktorPerah);
  var v_rendBawah = duaDesimal(v_nnBawah*v_faktorPerah);
  var v_rendCampur = duaDesimal(v_nnCampur*v_faktorPerah);
  var v_faktorKemasakan = duaDesimal((v_rendBawah-v_rendAtas)/v_rendBawah*100);
  var v_kgPerMeter = duaDesimal(v_totalBeratTebu/dataJumlahFisikTebu.fisik_panjang);
  var v_kp = 0.00;
  var v_kdt = 0.00;
  if ($petak_pilihan.data_awal.length >= 2){
    var rondeMin2 = $petak_pilihan.data_awal.length-2;
    var v_rendLalu = duaDesimal($petak_pilihan.data_awal[rondeMin2].rataan_rendCampur);
    var v_hkBawahLalu = duaDesimal($petak_pilihan.data_awal[rondeMin2].rataan_hkBawah);
    v_kp = duaDesimal(v_rendCampur/v_rendLalu*100);
    v_kdt = duaDesimal(v_hkBawah/v_hkBawahLalu*100);
  }
  lbl_rataPanjang.html(dataHitungFisikTebu.fisik_panjang);
  lbl_rataRuas.html(dataHitungFisikTebu.fisik_ruas);
  lbl_rataDiameter.html(dataHitungFisikTebu.fisik_dia);
  lbl_kgm.html(v_kgPerMeter);
  lbl_brixc.html(v_brixHitungCampur);
  lbl_polc.html(v_polCampur);
  lbl_hkc.html(v_hkCampur);
  lbl_faktor.html(v_faktorPerah);
  lbl_nnc.html(v_nnCampur);
  lbl_rendc.html(v_rendCampur);
  lbl_fk.html(v_faktorKemasakan);
  lbl_kp.html(v_kp);
  lbl_kdt.html(v_kdt);

  /*
  kode_blok, jenis_analisa, ronde, no_sampel, tgl_analisa,
  berat_tebu_atas, berat_tebu_tengah, berat_tebu_bawah,
  berat_nira_atas, berat_nira_tengah, berat_nira_bawah,
  penggerek,
  brix_baca_atas, brix_baca_tengah, brix_baca_bawah, brix_baca_campur,
  pol_baca_atas, pol_baca_tengah, pol_baca_bawah, pol_baca_campur,
  suhu, koreksi_suhu,
  brix_atas, brix_tengah, brix_bawah, brix_campur,
  pol_atas, pol_tengah, pol_bawah, pol_campur,
  faktor,
  hk_atas, hk_tengah, hk_bawah, hk_campur,
  nn_atas, nn_tengah, nn_bawah, nn_campur,
  rend_atas, rend_tengah, rend_bawah, rend_campur,
  fk, kp, kdt,
  rata_panjang, rata_ruas, rata_diameter, kg_per_meter
  */
  dataAnalisaTebu = objAnalisaTebu(
    $petak_pilihan.petak_kebun.kode_blok,
    $petak_pilihan.jenis_analisa,
    $petak_pilihan.ronde_analisa,
    1, //NO SAMPEL diinput pada trigger MySQL
    $petak_pilihan.tgl_analisa,
    v_tebuAtas, v_tebuTengah, v_tebuBawah,
    v_niraAtas, v_niraTengah, v_niraBawah,
    v_penggerekRata,
    v_brixAtas, v_brixTengah, v_brixBawah, v_brixCampur,
    v_putaranAtas, v_putaranTengah, v_putaranBawah, v_putaranCampur,
    v_suhuCampur,
    v_korSuhuCampur,
    v_brixHitungAtas, v_brixHitungTengah, v_brixHitungBawah, v_brixHitungCampur,
    v_polAtas, v_polTengah, v_polBawah, v_polCampur,
    v_faktorPerah,
    v_hkAtas, v_hkTengah, v_hkBawah, v_hkCampur,
    v_nnAtas, v_nnTengah, v_nnBawah, v_nnCampur,
    v_rendAtas, v_rendTengah, v_rendBawah, v_rendCampur,
    v_faktorKemasakan, v_kp, v_kdt,
    dataHitungFisikTebu.fisik_panjang, dataHitungFisikTebu.fisik_ruas, dataHitungFisikTebu.fisik_dia,
    v_kgPerMeter, arrayFisikTebu
  );
  //console.log(dataAnalisaTebu);
}

function resetFisik(){
  txtPanjang.val("");
  txtRuas.val("");
  txtDiameter.val("");
  txtPanjang.focus();
}

function resetAnalisa(){
  tebu_atas.val("");
  tebu_tengah.val("");
  tebu_bawah.val("");
  nira_atas.val("");
  nira_tengah.val("");
  nira_bawah.val("");
  penggerek_campur.val("");
  brix_atas.val("");
  brix_tengah.val("");
  brix_bawah.val("");
  brix_campur.val("");
  putaran_atas.val("");
  putaran_tengah.val("");
  putaran_bawah.val("");
  putaran_campur.val("");
  suhu_campur.val("");
  korsuhu_campur.val("");
  arrayFisikTebu = [];
  refreshTblFisik();
}

function refreshTblFisik(){
  tblFisik = $("#tbl_fisik").DataTable();
  tblFisik.clear();
  tblFisik.rows.add(arrayFisikTebu);
  tblFisik.draw();
}

function hapusFisik(index){
  arrayFisikTebu.splice(index,1);
  refreshTblFisik();
  if (arrayFisikTebu.length >0) {hitungDataFisik();}
}

$("#tbl_fisik").DataTable({
  bFilter: false,
  bPaginate: false,
  bSort: false,
  bInfo: false,
  data: arrayFisikTebu,
  columns : [
    {
      data: "no",
      render: function(data, type, row, meta){
        return meta.row + meta.settings._iDisplayStart + 1;
      }
    },
    {
      data: "fisik_panjang",
      render: function(data, type, row, meta){
        return parseFloat(data).toLocaleString("en-US",{minimumFractionDigits: 2, maximumFractionDigits: 2});
      },
      className: "text-right"
    },
    {
      data: "fisik_ruas",
      className: "text-right"
    },
    {
      data: "fisik_dia",
      render: function(data, type, row, meta){
        return parseFloat(data).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2});
      },
      className: "text-right"
    },
    {
      data: "button",
      className: "text-right",
      render: function(data, type, row, meta){
        return '<div class="btn btn-danger btn-sm" name="hapus" id="hapus_fisik" onclick="hapusFisik('+meta.row+')"><i class="fe fe-trash-2"></i></div>'
      }
    }
  ]
})
