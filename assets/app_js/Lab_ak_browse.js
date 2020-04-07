$("#tblListAnalisa").DataTable({
  bFilter: false,
  bPaginate: false,
  bSort: false,
  bInfo: false,
  autoWidth: false,
  ajax: {
    url: js_base_url + "Lab_ak_browse/getAllData?tahun_giling=" + tahun_giling + "&kode_plant=" + kode_plant + "&tgl_awal=" + tgl_awal + "$tgl_akhir=" + tgl_akhir,
    dataSrc: ""
  },
  dom: '<"row"<"labelTahunGiling"><"cbxTahunGiling">f>tpl',
  columns : [
    {
      data: "no",
      render: function(data, type, row, meta){
        return meta.row + 1;
      }
    },
    {
      data: "deskripsi_blok"
    },
    {
      data: "ronde",
      className: "text-center"
    },
    {
      data: "tgl_analisa",
      className: "text-center"
    },
    {
      data: "rend_campur",
      render: function(data, type, row, meta){
        return Number(parseFloat(data).toLocaleString("en-US",{maximumFractionDigits:2, minimumFractionDigits:2}))
      },
      className: "text-right"
    },
    {
      data: "fk",
      render: function(data, type, row, meta){
        return Number(parseFloat(data).toLocaleString("en-US",{maximumFractionDigits:2, minimumFractionDigits:2}))
      },
      className: "text-right"
    },
    {
      data: "kp",
      render: function(data, type, row, meta){
        return Number(parseFloat(data).toLocaleString("en-US",{maximumFractionDigits:2, minimumFractionDigits:2}))
      },
      className: "text-right"
    },
    {
      data: "kdt",
      render: function(data, type, row, meta){
        return Number(parseFloat(data).toLocaleString("en-US",{maximumFractionDigits:2, minimumFractionDigits:2}))
      },
      className: "text-right"
    }
  ],
  initComplete: function(){
    $(".dataTables_filter input[type=\"search\"]").css({
      "width": "1px",
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
    $('#tahun_giling').selectize({create: false, sortField: 'value'});
    $("#tahun_giling").on("change", function(){
      tahun_giling = parseInt($("#tahun_giling").val()) || 0;
      $("#tblListPerawatan").DataTable().ajax.url(js_base_url + "List_biaya_perawatan/getAllPbp?tahun_giling=" + tahun_giling).load();
    })
  },
  footerCallback: function (row, data, start, end, display){
    var api = this.api(), data;
    var intRupiah = function ( i ) {
      return typeof i === 'string' ? i.replace(/[\Rp,]/g, '')*1 : typeof i === 'number' ? i : 0;
    };
    totalBiaya = api.column(3).data().reduce( function (a, b) {
        return intRupiah(a) + intRupiah(b);
    },0);
    $(api.column(3).footer()).html('<font color="white" size="3">' + 'Rp ' + totalBiaya.toLocaleString({maximumFractionDigits: 0}) + '</font>');
  },
  language: {
    "search": ""
  }
});
