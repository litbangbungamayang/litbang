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
      //redirect("Lab_ak_input");
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
              <div class="col-md-12 col-lg-5">
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
            <div class="row">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 col-lg-5">
                      <div class="card">
                        <div class="card-header">
                          <h5 class="modal-title">Data Fisik Tebu</h5>
                        </div>
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-12 col-lg-12">
                              <table id="tbl_fisik" class="table card-table table-vcenter text-nowrap datatable table-sm" style="width: 100%;font-size: 95%">
                                <thead>
                                  <tr>
                                    <th class="w-1">No.</th>
                                    <th class="text-center">Panjang</th>
                                    <th class="text-center">Jml Ruas</th>
                                    <th class="text-center">Dia. Batang</th>
                                    <th class="text-center"></th>
                                  </tr>
                                </thead>
                                <tbody>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="row" style="margin-top: 20px;">
                            <div class="col-md-12 col-lg-4 text-center">
                              Panjang Batang
                            </div>
                            <div class="col-md-12 col-lg-4 text-center">
                              Jumlah Ruas
                            </div>
                            <div class="col-md-12 col-lg-4 text-center">
                              Diameter Batang
                            </div>
                          </div>
                          <div class="row" style="margin-top: 5px;">
                            <div class="col-md-12 col-lg-4">
                              <input type="text" style="text-transform: uppercase; height: 100%" class="form-control text-right" id="fisik_panjang" placeholder="(meter)">
                              <div class="invalid-feedback">Panjang batang belum diisi!</div>
                            </div>
                            <div class="col-md-12 col-lg-4">
                              <input type="text" style="text-transform: uppercase; height: 100%" class="form-control text-right" id="fisik_ruas" placeholder="(ruas)">
                              <div class="invalid-feedback">Jumlah ruas belum diisi!</div>
                            </div>
                            <div class="col-md-12 col-lg-4">
                              <input type="text" style="text-transform: uppercase; height: 100%" class="form-control text-right" id="fisik_dia" placeholder="(cm)">
                              <div class="invalid-feedback">Diameter batang belum diisi!</div>
                            </div>
                          </div>
                          <div class="row" style="margin-top: 10px;">
                              <button id="btn_addFisik" type="button" class="btn btn-outline-primary btn-block">Input Data Fisik Tebu</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 col-lg-7">
                      <div class="card">
                        <div class="card-header">
                          <h5 class="modal-title">Data Analisa Tebu</h5>
                        </div>
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-12 col-lg-4">Parameter</div>
                            <div class="col-md-12 col-lg-2 text-center">Atas</div>
                            <div class="col-md-12 col-lg-2 text-center">Tengah</div>
                            <div class="col-md-12 col-lg-2 text-center">Bawah</div>
                            <div class="col-md-12 col-lg-2 text-center">Campur</div>
                          </div>
                          <div class="row" style="margin-top: 10px">
                            <div class="col-md-12 col-lg-4" style="padding-top: 5px;">Berat tebu (kg)</div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="tebu_atas"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="tebu_tengah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="tebu_bawah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="tebu_campur"></div>
                          </div>
                          <div class="row" style="margin-top: 10px">
                            <div class="col-md-12 col-lg-4" style="padding-top: 5px;">Berat nira (kg)</div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="nira_atas"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="nira_tengah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="nira_bawah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="nira_campur"></div>
                          </div>
                          <div class="row" style="margin-top: 10px">
                            <div class="col-md-12 col-lg-4" style="padding-top: 5px;">Penggerek</div>
                            <div class="col-md-12 col-lg-2"><input type="text" disabled="disabled" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="penggerek_atas"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" disabled="disabled"style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="penggerek_tengah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" disabled="disabled"style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="penggerek_bawah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="penggerek_campur"></div>
                          </div>
                          <div class="row" style="margin-top: 10px">
                            <div class="col-md-12 col-lg-4" style="padding-top: 5px;">Brix baca</div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="brix_atas"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="brix_tengah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="brix_bawah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="brix_campur"></div>
                          </div>
                          <div class="row" style="margin-top: 10px">
                            <div class="col-md-12 col-lg-4" style="padding-top: 5px;">Putaran</div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="putaran_atas"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="putaran_tengah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="putaran_bawah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="putaran_campur"></div>
                          </div>
                          <div class="row" style="margin-top: 10px">
                            <div class="col-md-12 col-lg-4" style="padding-top: 5px;">Suhu</div>
                            <div class="col-md-12 col-lg-2"><input type="text" disabled="disabled" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="suhu_atas"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" disabled="disabled"style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="suhu_tengah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" disabled="disabled"style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="suhu_bawah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="suhu_campur"></div>
                          </div>
                          <div class="row" style="margin-top: 10px">
                            <div class="col-md-12 col-lg-4" style="padding-top: 5px;">Koreksi suhu</div>
                            <div class="col-md-12 col-lg-2"><input type="text" disabled="disabled" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="korsuhu_atas"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" disabled="disabled"style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="korsuhu_tengah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" disabled="disabled"style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="korsuhu_bawah"></div>
                            <div class="col-md-12 col-lg-2"><input type="text" style="text-transform: uppercase; height: 80%;" class="form-control text-right" id="korsuhu_campur"></div>
                          </div>
                          <div class="row" style="margin-top: 20px">
                            <div class="col-md-12 col-lg-12">
                              <div class="btn-list text-center">
                                <button type="button" class="btn btn-green"><i class="fe fe-percent"></i> Hitung Data</button>
                                <button type="button" class="btn btn-primary"><i class="fe fe-save"></i> Simpan Data</button>
                                <button type="button" class="btn btn-red"><i class="fe fe-arrow-left-circle"></i> Batal & Kembali</button>
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
          </div>
        </div>
      </div>
    </div>
    ';
		return $content_header;
	}
}

/*
<div class="row">
  <div class="col-md-12 col-lg-4">
    <div class="form-group" id="grRondeAnalisa">
      <label class="form-label">Sampel analisa ke- &nbsp;
      <select name="sampel_analisa" id="sampel_analisa" style="width: 200px" class="custom-control custom-select" placeholder="Input sampel analisa">
        <option value=""></option>
        <option value = 1>1</option>
        <option value = 2>2</option>
        <option value = 3>3</option>
        <option value = 4>4</option>
        <option value = 5>5</option>
        <option value = 6>6</option>
        <option value = 7>7</option>
        <option value = 8>8</option>
        <option value = 9>9</option>
        <option value = 10>10</option>
      </select></label>
      <div class="invalid-feedback">Sampel analisa belum dipilih!</div>
    </div>
  </div>
  <div class="col-md-12 col-lg-3">
    <div class="text-center">
      <button id="btnNextAnalisa" type="button" style="margin-right: 30px; width: 200px;" class="btn btn-outline-primary">Selanjutnya</button>
    </div>
  </div>
</div>
*/
