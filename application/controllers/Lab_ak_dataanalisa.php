<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Lab_ak_dataanalisa extends CI_Controller {

  private $petak_pilihan;

	public function __construct(){
		parent::__construct();
    if ($this->session->userdata('id_user') == false){
      redirect("login");
    }
    $this->load->model("ankem_model");
		$this->load->model("dashboard_model");
		$this->load->helper(array('url', 'html'));
		$this->load->library('session');
	}

	public function index()
	{
    if($this->session->userdata("petak_pilihan") == false){
      redirect("Lab_ak_input");
    }
    $this->petak_pilihan = $this->session->userdata("petak_pilihan");
    $this->session->unset_userdata("petak_pilihan");
    $data["pageTitle"] = "Lab. Analisa Kemasakan";
    $data['content'] = $this->loadContent();
    $data['script'] = $this->loadScript();
    $this->load->view('main_view', $data);
	}

	public function loadScript(){
    return '$.getScript("'.base_url("/assets/app_js/Lab_ak_dataanalisa.js").'");';
  }

  public function getPetakPilihan(){
    $this->petak_pilihan = $this->session->userdata("petak_pilihan");
    $this->session->unset_userdata("petak_pilihan");
    echo json_encode($this->petak_pilihan->petak_kebun);
  }

  public function setPetakPilihan(){
    $petak_pilihan = json_decode($this->input->post("petak_pilihan"));
    $this->session->set_userdata("petak_pilihan", $petak_pilihan);
    echo site_url("Lab_ak_dataanalisa");
  }

	public function loadData(){
		echo $this->dashboard_model->loadData();
	}

	public function loadContent(){
    $deskripsi_blok = $this->petak_pilihan->petak_kebun->deskripsi_blok;
    $masa_tanam = $this->petak_pilihan->petak_kebun->periode;
    $luas = number_format((float)$this->petak_pilihan->petak_kebun->luas_tanam,2,'.','');
    $kategori = $this->petak_pilihan->petak_kebun->status_blok;
    $nama_varietas = $this->petak_pilihan->petak_kebun->nama_varietas;
    $ronde_analisa = $this->petak_pilihan->ronde_analisa;
    $tgl_analisa = $this->petak_pilihan->tgl_analisa;
    $nama_analisa = $this->petak_pilihan->nama_analisa;
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
                <div class="card">
                  <div class="card-status bg-green"></div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-12 col-lg-12">
                        <div>'.$deskripsi_blok.' &nbsp;'.$masa_tanam.' &nbsp;'.$kategori.'</div>
                        <div>'.$luas.' Ha</div>
                        <div>'.$this->petak_pilihan->petak_kebun->nama_varietas.'</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-3">
                <div class="card">
                  <div class="card-status bg-blue"></div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-12 col-lg-12">
                        <div>'.$nama_analisa.'</div>
                        <div>Ronde ke-'.$ronde_analisa.'</div>
                        <div>'.$tgl_analisa.'</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-3">
                <div class="card">
                  <div class="card-status bg-red"></div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-12 col-lg-12">
                        <div>Rend. campur</div>
                        <div>FK</div>
                        <div>KP</div>
                      </div>
                    </div>
                  </div>
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
