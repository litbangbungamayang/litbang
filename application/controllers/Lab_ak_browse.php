<?php
defined('BASEPATH') OR exit('No direct script access allowed');

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
	}

  public function loadScript(){
    return '$.getScript("'.base_url("/assets/app_js/Lab_ak_browse.js").'");';
  }

  public function getAllData(){
    echo $this->ankem_model->getAllDataAnalisa();
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
                      <th>Deskripsi Blok</th>
                      <th>Ronde</th>
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
