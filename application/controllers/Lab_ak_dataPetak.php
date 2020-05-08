<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Lab_ak_dataPetak extends CI_Controller {
	public function __construct(){
			parent::__construct();
      if ($this->session->userdata('id_user') == false){
        redirect("login");
      }
      $this->load->model("ankem_model");
			$this->load->model("dashboard_model");
			$this->load->model("petakkebun_model");
			$this->load->helper(array('url', 'html'));
			$this->load->library('session');
			$this->simpg_address_local = "http://localhost/simpg/index.php";
			$this->simpg_address_live = "http://simpgbuma.ptpn7.com/index.php";
			$this->server_env = "LOCAL";
	}

	public function index()
	{
    $data["pageTitle"] = "Lab. Analisa Kemasakan";
    $data['content'] = $this->loadContent();
    $data['script'] = $this->loadScript();
    $this->load->view('main_view', $data);
	}

	public function loadScript(){
    return '$.getScript("'.base_url("/assets/app_js/Lab_ak_dataPetak.js").'");';
  }

	public function loadData(){
		echo $this->dashboard_model->loadData();
	}

	public function getDataAwal(){
		echo $this->ankem_model->getDataAwal();
	}

	public function getAllPetakKebunByKepemilikan(){
		$kepemilikan = $this->input->get("kepemilikan");
		$tahun_giling = $this->input->get("tahun_giling");
		$db_server = "";
		$kode_plant = $this->session->userdata("kode_plant");
		if($this->server_env == "LOCAL"){
			$db_server = $this->simpg_address_local;
			switch($kepemilikan){
        case "ts":
          $kepemilikan = "ts-hg";
          break;
        case "tr":
          $kepemilikan = "TR-KR";
          break;
        case "tsi":
          $kepemilikan = "ts-ip";
          break;
      }
			$request = array(
				"kepemilikan"=>$kepemilikan,
				"tahun_giling"=>$tahun_giling
			);
			echo $this->petakkebun_model->getAllPetakKebunByKepemilikan($request);
		} else {
			if ($kode_plant == "GK22"){$db_server = "http://simpgbuma.ptpn7.com/index.php";}
			if ($kode_plant == "GK23"){$db_server = "http://simpgcima.ptpn7.com/index.php";}
			$curl = curl_init();
	    curl_setopt_array($curl, array(
	      CURLOPT_URL => $db_server."/api_bcn/getAllPetakKebunByKepemilikan?kepemilikan=".$kepemilikan."&tahun_giling=".$tahun_giling,
	      CURLOPT_RETURNTRANSFER => true,
	      CURLOPT_TIMEOUT => 30,
	      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	      CURLOPT_CUSTOMREQUEST => "GET",
	      CURLOPT_HTTPHEADER => array(
	        "cache-control: no-cache"
	      )
	    ));
	    $response = curl_exec($curl);
	    $error = curl_error($curl);
	    curl_close($curl);
			echo $response;
		}
	}

	public function setPetakPilihan(){
		$petak_pilihan = json_decode($this->input->post("petak_pilihan"));
    $this->session->set_userdata("petak_pilihan", $petak_pilihan);
    echo site_url("Lab_ak_lihatPetak");
	}

	public function getPetakPilihan(){
			$petak_pilihan = json_decode($this->input->post("petak_pilihan"));
			var_dump($petak_pilihan);
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
            <h4 class="modal-title">Input Data Petak</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-lg-3">
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
              <div class="col-md-12 col-lg-3">
                <div class="form-group" id="grJenisAnalisa">
                  <label class="form-label">Kepemilikan</label>
                  <select name="kepemilikan" id="kepemilikan" class="custom-control custom-select" placeholder="Pilih kepemilikan">
                    <option value=""></option>
                    <option value="ts">TS</option>
                    <option value="tr">TR</option>
                    <option value="tsi">TSI</option>
                  </select>
                  <div class="invalid-feedback">Kepemilikan tebu belum dipilih!</div>
                </div>
                <div class="form-group" id="grJenisAnalisa">
                  <label class="form-label">Petak Kebun<i id="iconLoading" style="margin-left: 10px" class="fa fa-spinner fa-spin"></i></label>
                  <select name="petak_kebun" id="petak_kebun" class="custom-control custom-select" placeholder="Pilih petak kebun">
                  </select>
                  <div class="invalid-feedback">Petak kebun belum dipilih!</div>
                </div>
								<div class="text-right">
                  <button id="btnNextAnalisa" type="button" style="margin-right: 30px; width: 200px;" class="btn btn-outline-primary">Lihat Data Petak</button>
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
