<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class Lab_ak_browse extends CI_Controller {

  public function __construct(){
		parent::__construct();
    if ($this->session->userdata('id_user') == false){
      redirect("login");
    }
    $this->load->model("ankem_model");
    $this->load->model("ankemfisik_model");
		$this->load->model("dashboard_model");
		$this->load->helper(array('url', 'html'));
		$this->load->library('session');
	}

	public function index(){
    $data['pageTitle'] = "Penelusuran Data Analisa";
    $data['content'] = $this->loadContent();
    $data['script'] = $this->loadScript();
    $this->load->view('main_view', $data);
    //$this->tesxls();
	}

  public function loadScript(){
    return '$.getScript("'.base_url("/assets/app_js/Lab_ak_browse.js").'");';
  }

  public function tesxls(){
    // (2) CREATE A NEW SPREADSHEET
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();
    $obj_ankem = json_decode($this->ankem_model->getAllDataAnalisa());
    $data_ankem = (array)$obj_ankem;
    $data_kolom = (array)$obj_ankem[0];
    // (3) SET CELL VALUE
    // set header
    for($i = 0; $i < sizeof($data_kolom); $i++){
      $nama_kolom = array_keys($data_kolom);
      $sheet->setCellValueByColumnAndRow($i+1, 1, $nama_kolom[$i]);
    }
    //set isi
    for($baris = 0; $baris < sizeof($data_ankem); $baris++){
      for($kolom = 0; $kolom < sizeof($data_kolom); $kolom++){
        $nama_kolom = array_keys($data_kolom);
        $isi = ((array)$data_ankem[$baris]);
        $sheet->setCellValueByColumnAndRow($kolom+1,$baris+2,$isi[$nama_kolom[$kolom]]);
      }
    }
    // (4) SEND DOWNLOAD HEADERS
    // ob_clean();
    // ob_start();
    $writer = new Xlsx($spreadsheet);
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="demo.xlsx"');
    header('Cache-Control: max-age=0');
    header('Expires: Fri, 11 Nov 2011 11:11:11 GMT');
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
    header('Cache-Control: cache, must-revalidate');
    header('Pragma: public');
    $writer->save('php://output');
    die;
  }

  public function getAllData(){
    $tahun_giling = $this->input->get("tahun_giling");
    $tgl_awal = $this->input->get("tgl_awal");
    $tgl_akhir = $this->input->get("tgl_akhir");
    $request = array(
      "tahun_giling"=>$tahun_giling,
      "tgl_awal"=>$tgl_awal,
      "tgl_akhir"=>$tgl_akhir
    );
    echo ($this->ankem_model->getAllDataAnalisa($request));
  }

  public function downloadData(){
    $tahun_giling = $this->input->post("tahun_giling");
    $tgl_awal = $this->input->post("tgl_awal");
    $tgl_akhir = $this->input->post("tgl_akhir");
    $request = array(
      "tahun_giling"=>$tahun_giling,
      "tgl_awal"=>$tgl_awal,
      "tgl_akhir"=>$tgl_akhir
    );
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();
    $obj_ankem = json_decode($this->ankem_model->getAllDataAnalisa($request));
    //var_dump($obj_ankem);
    $data_ankem = (array)$obj_ankem;
    $data_kolom = (array)$obj_ankem[0];
    // (3) SET CELL VALUE
    // set header
    for($i = 0; $i < sizeof($data_kolom); $i++){
      $nama_kolom = array_keys($data_kolom);
      $sheet->setCellValueByColumnAndRow($i+1, 1, $nama_kolom[$i]);
    }
    //set isi
    for($baris = 0; $baris < sizeof($data_ankem); $baris++){
      for($kolom = 0; $kolom < sizeof($data_kolom); $kolom++){
        $nama_kolom = array_keys($data_kolom);
        $isi = ((array)$data_ankem[$baris]);
        $sheet->setCellValueByColumnAndRow($kolom+1,$baris+2,$isi[$nama_kolom[$kolom]]);
      }
    }
    // (4) SEND DOWNLOAD HEADERS
    // ob_clean();
    // ob_start();
    $writer = new Xlsx($spreadsheet);
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="demo.xlsx"');
    header('Cache-Control: max-age=0');
    header('Expires: Fri, 11 Nov 2011 11:11:11 GMT');
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
    header('Cache-Control: cache, must-revalidate');
    header('Pragma: public');
    ob_start();
    $writer->save('php://output');
    $xlsData = ob_get_contents();
    ob_end_clean();
    $response =  array(
        'op' => 'ok',
        'file' => "data:application/vnd.ms-excel;base64,".base64_encode($xlsData)
    );
    die(json_encode($response));
  }

  public function loadContent(){
    $container =
    '
    <div class="page">
      <div class="row">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="table-responsive col-12">
                <table id="tblListAnalisa" class="table table-card table-striped table-sm text-nowrap">
                  <thead>
                    <tr>
                      <th class="w-1">No.</th>
                      <th>Ronde</th>
                      <th>Deskripsi Blok</th>
                      <th>Luas (ha)</th>
                      <th>Varietas</th>
                      <th>Kategori</th>
                      <th>Tgl. Analisa</th>
                      <th>Rend. Campur</th>
                      <th>FK</th>
                      <th>KP</th>
                      <th>KDT</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ';
    return $container;
  }

}

?>
