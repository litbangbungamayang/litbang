<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Lab_ak_input extends CI_Controller {
	public function __construct(){
			parent::__construct();
      if ($this->session->userdata('id_user') == false){
        redirect("login");
      }
      $this->load->model("ankem_model");
			$this->load->model("dashboard_model");
			$this->load->helper(array('url', 'html'));
			$this->load->library('session');
			$this->simtr_address_local = "http://localhost/SIMTR/index.php/Rdkk_list/test";
			$this->server_env = "LOCAL";
	}

	public function index()
	{
    $data["pageTitle"] = "Lab. Analisa Kemasakan";
    $data['content'] = $this->loadContent();
    $data['script'] = $this->loadScript();
    $this->load->view('main_view', $data);
		$this->test();
	}

	public function loadScript(){
    return '$.getScript("'.base_url("/assets/app_js/Lab_ak_input.js").'");';
  }

	public function loadData(){
		echo $this->dashboard_model->loadData();
	}

	public function getPetakKebun(){

	}

	public function test(){
		$cookie_file = 
		$db_server = "";
		if($this->server_env == "LOCAL"){
			$db_server = $this->simtr_address_local;
		};
		$curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_URL => $db_server,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache"
      ),
			CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
			CURLOPT_USERPWD => "andes:terong"
    ));
    $response = curl_exec($curl);
    $error = curl_error($curl);
    curl_close($curl);
		echo $response;
	}

  public function getJenisAnalisa(){
    echo $this->ankem_model->getJenisAnalisa();
  }

	public function loadContent(){
    $currYear = strval(date("Y"));
    $optionText = "";
    for ($x = $currYear; $x <= $currYear + 4; $x++){
      $optionText .= '<option value="'.$x.'">'.$x.'</option>';
    }
		$content_header =
		'
    <div class="page">
      <div class="row">
        <div class="card">
          <div class="card-header">
            <h4 class="modal-title">Input Data Analisa</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-lg-4">
                <div class="form-group" id="grTahunGiling">
                  <label class="form-label">Tahun Giling</label>
                  <select name="tahun_giling" id="tahun_giling" class="custom-control custom-select" placeholder="Pilih tahun giling">
                  '.$optionText.'
                  </select>
                  <div class="invalid-feedback">Tahun giling belum dipilih!</div>
                </div>
                <div class="form-group" id="grJenisAnalisa">
                  <label class="form-label">Jenis Analisa</label>
                  <select name="jenis_analisa" id="jenis_analisa" class="custom-control custom-select" placeholder="Pilih jenis analisa"></select>
                  <div class="invalid-feedback">Jenis analisa belum dipilih!</div>
                </div>
              </div>
              <div class="col-md-12 col-lg-4">
                <div class="form-group" id="grJenisAnalisa">
                  <label class="form-label">Kepemilikan</label>
                  <select name="kepemilikan" id="kepemilikan" class="custom-control custom-select" placeholder="Pilih kepemilikan">
                    <option value="ts">TS</option>
                    <option value="tr">TR</option>
                    <option value="tsi">TSI</option>
                  </select>
                  <div class="invalid-feedback">Kepemilikan tebu belum dipilih!</div>
                </div>
                <div class="form-group" id="grJenisAnalisa">
                  <label class="form-label">Petak Kebun</label>
                  <select name="petak_kebun" id="petak_kebun" class="custom-control custom-select" placeholder="Pilih kepemilikan">
                    <option value="ts">TS</option>
                    <option value="tr">TR</option>
                    <option value="tsi">TSI</option>
                  </select>
                  <div class="invalid-feedback">Kepemilikan tebu belum dipilih!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ';
		return $content_header;
	}

}
