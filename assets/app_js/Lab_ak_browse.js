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

var btn_export = $("#btn_export");

btn_export.on("click", function(){
  $.ajax({
    url: js_base_url + "Lab_ak_browse/tesxls",
    dataType: "json",
    type: "GET",
    success: function(data){
      console.log(data);
    }
  })
})

$("#tblListAnalisa").DataTable({
  bFilter: true,
  bPaginate: true,
  bSort: false,
  bInfo: true,
  buttons: true,
  autoWidth: false,
  ajax: {
    url: js_base_url + "Lab_ak_browse/getAllData?tahun_giling=0&kode_plant=0&tgl_awal=2030-01-01&tgl_akhir=2031-01-01",
    dataSrc: ""
  },
  dom: 'B<"row"<"labelTahunGiling"><"cbxTahunGiling"><"dtpTglAwal"><"dtpTglAkhir">f<"btnExport">>tpl',
  columns : [
    {
      data: "no",
      render: function(data, type, row, meta){
        return meta.row + 1;
      }
    },
    {
      data: "ronde",
      className: "text-center"
    },
    {
      data: "deskripsi_blok"
    },
    {
      data: "luas_tanam",
      render: function(data, type, row, meta){
        return Number(parseFloat(data)).toLocaleString("en-US",{maximumFractionDigits:2, minimumFractionDigits:2})
      },
      className: "text-right"
    },
    {
      data: "nama_varietas",
      className: "text-center"
    },
    {
      data: "status_blok",
      className: "text-center"
    },
    {
      data: "tgl_analisa",
      className: "text-center"
    },
    {
      data: "rend_campur",
      render: function(data, type, row, meta){
        return Number(parseFloat(data)).toLocaleString("en-US",{maximumFractionDigits:2, minimumFractionDigits:2})
      },
      className: "text-right"
    },
    {
      data: "fk",
      render: function(data, type, row, meta){
        return Number(parseFloat(data)).toLocaleString("en-US",{maximumFractionDigits:2, minimumFractionDigits:2})
      },
      className: "text-right"
    },
    {
      data: "kp",
      render: function(data, type, row, meta){
        return Number(parseFloat(data)).toLocaleString("en-US",{maximumFractionDigits:2, minimumFractionDigits:2})
      },
      className: "text-right"
    },
    {
      data: "kdt",
      render: function(data, type, row, meta){
        return Number(parseFloat(data)).toLocaleString("en-US",{maximumFractionDigits:2, minimumFractionDigits:2})
      },
      className: "text-right"
    }
  ],
  initComplete: function(){
    $(".dataTables_filter input[type=\"search\"]").css({
      "width": "250px",
      "display": "",
      "margin-left": "10px"
    }).attr("placeholder", "Cari");
    $(".dataTables_filter").css({
      "margin": "0px"
    });
    var currYear = parseInt(new Date().getFullYear());
    var i;
    var optionTahun = '<option value="0">Pilih tahun giling</option>';
    for (i=0; i < 4; i++){
      optionTahun += '<option value="' + parseInt(currYear + i) + '">' + parseInt(currYear + i) + '</option>';
    }
    $("div.cbxTahunGiling").html('<select style="width: 150px; margin-bottom: 10px; margin-left: 10px" name="tahun_giling" id="tahun_giling" class="custom-control custom-select" placeholder="Pilih tahun giling">' + optionTahun + '</select>');
    $("div.labelTahunGiling").html('<label style="margin-left: 10px; height: 37px; margin-bottom: 10px; display: block; background: red"></label>');
    $("div.btnExport").html('<button style="margin-left: 10px" type="button" class="btn btn-outline-primary" id="btn_export"><i class="fe fe-book"></i> Export Data</button>');
    $('#tahun_giling').selectize({create: false, sortField: 'value'});
    function refreshTable(){
      var tgl_awal = $("#dtpAwal").datepicker("getDate");
      var tgl_akhir = $("#dtpAkhir").datepicker("getDate");
      if(tgl_awal != null && tgl_akhir != null){
        tgl_awal = formatTgl(tgl_awal);
        tgl_akhir = formatTgl(tgl_akhir);
        tahun_giling = parseInt($("#tahun_giling").val()) || 0;
        $("#tblListAnalisa").DataTable().ajax.url(js_base_url + "Lab_ak_browse/getAllData?tahun_giling=" + tahun_giling +
        "&tgl_awal=" + tgl_awal + "&tgl_akhir=" + tgl_akhir).load();
        console.log(tahun_giling + ";" + tgl_awal + ";" + tgl_akhir);
      }
    }
    $("#btn_export").on("click", function(){
      var tgl_awal = $("#dtpAwal").datepicker("getDate");
      var tgl_akhir = $("#dtpAkhir").datepicker("getDate");
      if(tgl_awal != null && tgl_akhir != null){
        tgl_awal = formatTgl(tgl_awal);
        tgl_akhir = formatTgl(tgl_akhir);
        tahun_giling = parseInt($("#tahun_giling").val()) || 0;
        $.ajax({
          url: js_base_url + "Lab_ak_browse/downloadData",
          type: "POST",
          dataType: "json",
          data: "tahun_giling=" + tahun_giling +"&tgl_awal=" + tgl_awal + "&tgl_akhir=" + tgl_akhir,
        }).done(function(data){
            var $a = $("<a>");
            $a.attr("href",data.file);
            $("body").append($a);
            $a.attr("download","file.xls");
            $a[0].click();
            $a.remove();
        });
      }
    })
    $("#tahun_giling").on("change", function(){
      refreshTable();
    });
    $("div.dtpTglAwal").html("<input autocomplete='off' type='text' class='form-control text-center' placeholder='Tanggal Awal' id='dtpAwal' style='width: 120px; margin-left: 10px;'>");
    $("#dtpAwal").datepicker({
      format: "dd-mm-yyyy"
    });
    $("div.dtpTglAkhir").html("<input autocomplete='off' type='text' class='form-control text-center' placeholder='Tanggal Akhir' id='dtpAkhir' style='width: 120px; margin-left: 10px; margin-bottom: 10px'>");
    $("#dtpAkhir").datepicker({
      format: "dd-mm-yyyy"
    });
    $("#dtpAwal").on("change", function(){
      refreshTable();
    });
    $("#dtpAkhir").on("change", function(){
      refreshTable();
    })
  },
  language: {
    "search": ""
  }
});
