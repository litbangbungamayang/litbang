<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Landing extends CI_Controller {
	public function __construct(){
			parent::__construct();
			$this->load->model("dashboard_model");
			$this->load->helper(array('url', 'html'));
			$this->load->library('session');
	}

	public function index()
	{
		if ($this->session->userdata('id_user') == false){
			redirect('login');
		} else {
			$data['content'] = $this->loadContent();
			$data['script'] = $this->loadScript();
			$this->load->view('main_view', $data);
		}
	}

	public function loadScript(){
    return '$.getScript("'.base_url("/assets/app_js/Landing.js").'");';
  }

	public function loadData(){
		echo $this->dashboard_model->loadData();
	}

	public function loadDataGudang(){
		echo $this->dashboard_model->loadDataGudang();
	}

	public function loadContent(){
		$content_header =
		'
		<div class="page">
			<div class="row">
				<div class="card">
					<div class="card-header">
						<h4 class="modal-title">Contoh Grafik</h4>
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-md-12 col-lg-12">
								<div class="chart-container" style="position: relative; height: 200px; width: 200px">
									<canvas id="myChart" width="400" height="400" style="height: 100px; width: 100px;"></canvas>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		';
		return "";
	}

	function logout(){
		$data = array('login'=>'','uname'=>'','uid'=>'');
		$this->session->unset_userdata($data);
		$this->session->sess_destroy();
		redirect('/');
	}

}
