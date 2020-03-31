<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Ankem_model extends CI_Model{

  private $_table = "tbl_ltb_dataankem";
  public $kode_petak;
  public $id_user;
  public $jenis_analisa;
  public $ronde;
  public $no_sampel;
  public $tgl_analisa;
  public $berat_tebu_atas;
  public $berat_tebu_tengah;
  public $berat_tebu_bawah;
  public $berat_nira_atas;
  public $berat_nira_tengah;
  public $berat_nira_bawah;
  public $penggerek;
  public $brix_baca_atas;
  public $brix_baca_tengah;
  public $brix_baca_bawah;
  public $brix_baca_campur;
  public $pol_baca_atas;
  public $pol_baca_tengah;
  public $pol_baca_bawah;
  public $pol_baca_campur;
  public $suhu;
  public $koreksi_suhu;
  public $brix_atas;
  public $brix_tengah;
  public $brix_bawah;
  public $brix_campur;
  public $pol_atas;
  public $pol_tengah;
  public $pol_bawah;
  public $pol_campur;
  public $faktor;
  public $hk_atas;
  public $hk_tengah;
  public $hk_bawah;
  public $hk_campur;
  public $nn_atas;
  public $nn_tengah;
  public $nn_bawah;
  public $nn_campur;
  public $rend_atas;
  public $rend_tengah;
  public $rend_bawah;
  public $rend_campur;
  public $fk;
  public $kp;
  public $kdt;
  public $rata_panjang;
  public $rata_ruas;
  public $rata_diameter;
  public $kg_per_meter;

  public function simpan($post = null){
    if(is_null($post))$post = $this->input->post();
    $post = (array)$post;
    $this->kode_petak = $post["kode_blok"];
    $this->id_user = $this->session->userdata("id_user");
    $this->jenis_analisa = $post["jenis_analisa"];
    $this->ronde = $post["ronde"];
    $this->no_sampel = $post["no_sampel"];
    $this->tgl_analisa = $post["tgl_analisa"];
    $this->berat_tebu_atas = $post["berat_tebu_atas"];
    $this->berat_tebu_tengah = $post["berat_tebu_tengah"];
    $this->berat_tebu_bawah = $post["berat_tebu_bawah"];
    $this->berat_nira_atas = $post["berat_nira_atas"];
    $this->berat_nira_tengah = $post["berat_nira_tengah"];
    $this->berat_nira_bawah = $post["berat_nira_bawah"];
    $this->penggerek = $post["penggerek"];
    $this->brix_baca_atas = $post["brix_baca_atas"];
    $this->brix_baca_tengah = $post["brix_baca_tengah"];
    $this->brix_baca_bawah = $post["brix_baca_bawah"];
    $this->brix_baca_campur = $post["brix_baca_campur"];
    $this->pol_baca_atas = $post["pol_baca_atas"];
    $this->pol_baca_tengah = $post["pol_baca_tengah"];
    $this->pol_baca_bawah = $post["pol_baca_bawah"];
    $this->pol_baca_campur = $post["pol_baca_campur"];
    $this->suhu = $post["suhu"];
    $this->koreksi_suhu = $post["koreksi_suhu"];
    $this->brix_atas = $post["brix_atas"];
    $this->brix_tengah = $post["brix_tengah"];
    $this->brix_bawah = $post["brix_bawah"];
    $this->brix_campur = $post["brix_campur"];
    $this->pol_atas = $post["pol_atas"];
    $this->pol_tengah = $post["pol_tengah"];
    $this->pol_bawah = $post["pol_bawah"];
    $this->pol_campur = $post["pol_campur"];
    $this->faktor = $post["faktor"];
    $this->hk_atas = $post["hk_atas"];
    $this->hk_tengah = $post["hk_tengah"];
    $this->hk_bawah = $post["hk_bawah"];
    $this->hk_campur = $post["hk_campur"];
    $this->nn_atas = $post["nn_atas"];
    $this->nn_tengah = $post["nn_tengah"];
    $this->nn_bawah = $post["nn_bawah"];
    $this->nn_campur = $post["nn_campur"];
    $this->rend_atas = $post["rend_atas"];
    $this->rend_tengah = $post["rend_tengah"];
    $this->rend_bawah = $post["rend_bawah"];
    $this->rend_campur = $post["rend_campur"];
    $this->fk = $post["fk"];
    $this->kp = $post["kp"];
    $this->kdt = $post["kdt"];
    $this->rata_panjang = $post["rata_panjang"];
    $this->rata_ruas = $post["rata_ruas"];
    $this->rata_diameter = $post["rata_diameter"];
    $this->kg_per_meter = $post["kg_per_meter"];
    $this->db->insert($this->_table, $this);
    return $this->db->insert_id();
  }

  public function getJenisAnalisa(){
    $query =
    "
    select
    	*
    from tbl_ltb_jenisanalisa
    ";
    return json_encode($this->db->query($query)->result());
  }

  public function getSampel($kode_blok, $ronde_analisa){
    $query =
    "
      select count(*) as no_sampel from tbl_ltb_dataankem where kode_petak = ? and ronde = ?
    ";
    return json_encode($this->db->query($query, array($kode_blok, $ronde_analisa))->row());
  }

  public function getDataAwal(){
    $kode_blok = $this->input->get("kode_blok");
    $jenis_analisa = $this->input->get("jenis_analisa");
    $query =
    "
    select
      ankem.ronde as ronde_terakhir, ankem.tgl_analisa,
      round(avg(ankem.rend_campur),2) as rataan_rendCampur,
      round(avg(ankem.hk_bawah),2) as rataan_hkBawah
    from tbl_ltb_dataankem ankem
    where ankem.kode_petak = ? and ankem.jenis_analisa = ?
    group by ankem.ronde
    ";
    return json_encode($this->db->query($query, array($kode_blok, $jenis_analisa))->result());
  }

}
