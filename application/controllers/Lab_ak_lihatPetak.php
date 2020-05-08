<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Lab_ak_lihatPetak extends CI_Controller {
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
	}

  public function index(){
    $data["pageTitle"] = "Lab. Analisa Kemasakan";
    $data['content'] = $this->loadContent();
    $data['script'] = $this->loadScript();
    $this->load->view('main_view', $data);
	}

  public function loadScript(){
    return '$.getScript("'.base_url("/assets/app_js/Lab_ak_lihatPetak.js").'");';
  }

  public function loadContent(){
    $content =
    '
    <div class="page">
      <div class="row">
        <div class="card">
          <div class="card-header">
            <h4 class="modal-title">Lihat Data Petak</h4>
          </div>
          <div class="card-body">
          </div>
        </div>
      </div>
    </div>
    ';
    return $content;
  }

}

?>
