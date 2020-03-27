var btnTes = $("#btnTes");
var $cbxSampelAnalisa, cbxSampelAnalisa;
var btn_addFisik = $("#btn_addFisik");
var txtPanjang = $("#fisik_panjang");
var txtRuas = $("#fisik_ruas");
var txtDiameter = $("#fisik_dia");

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

var arrayFisikTebu = [];
var objFisikTebu = function(fisik_panjang, fisik_ruas, fisik_dia){
  var obj = {};
  obj.fisik_panjang = fisik_panjang;
  obj.fisik_ruas = fisik_ruas;
  obj.fisik_dia = fisik_dia;
  return obj;
}

txtPanjang.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9. ]/g,"").replace(/(\..*)\./g, '$1'));
})

txtRuas.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9 ]/g,""));
})

txtDiameter.on("keyup blur", function(){
  $(this).val($(this).val().replace(/[^0-9. ]/g,"").replace(/(\..*)\./g, '$1'));
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
    console.log(arrayFisikTebu);
    refreshTblFisik();
    resetFisik();
  }
})

function validasiFisik(){
  if (txtPanjang.val() != "" && txtRuas.val() != "" && txtDiameter.val() != ""){
    txtPanjang.removeClass("is-invalid");
    txtRuas.removeClass("is-invalid");
    txtDiameter.removeClass("is-invalid");
    return true;
  } else {
    (txtPanjang.val() =="") ? txtPanjang.addClass("is-invalid") : txtPanjang.removeClass("is-invalid");
    (txtRuas.val() =="") ? txtRuas.addClass("is-invalid") : txtRuas.removeClass("is-invalid");
    (txtDiameter.val() =="") ? txtDiameter.addClass("is-invalid") : txtDiameter.removeClass("is-invalid");
  }
}

function resetFisik(){
  txtPanjang.val("");
  txtRuas.val("");
  txtDiameter.val("");
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
      className: "text-right"
    },
    {
      data: "fisik_ruas",
      className: "text-right"
    },
    {
      data: "fisik_dia",
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
