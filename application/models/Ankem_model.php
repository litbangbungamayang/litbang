<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Ankem_model extends CI_Model{

  private $_table = "tbl_ltb_dataankem";
  public $kode_plant;
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
    $this->kode_plant = $this->session->userdata("kode_plant");
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

  public function getAllData(){
    $tahun_giling = $this->input->get("tahun_giling");
    $kode_plant = $this->input->get("kode_plant");
    $tgl_awal = $this->input->get("tgl_awal");
    $tgl_akhir = $this->input->get("tgl_akhir");
    $query =
    "
    select
      ptk.kode_blok, ptk.deskripsi_blok, ptk.periode,
      ptk.status_blok, ptk.luas_tanam, ptk.kepemilikan,
      dta.tgl_analisa,
      avg(dta.brix_atas) as brix_atas,
      avg(dta.brix_tengah) as brix_tengah,
      avg(dta.brix_bawah) as brix_bawah,
      avg(dta.brix_campur) as brix_campur,
      avg(dta.pol_atas) as pol_atas,
      avg(dta.pol_tengah) as pol_tengah,
      avg(dta.pol_bawah) as pol_bawah,
      avg(dta.pol_campur) as pol_campur,
      avg(dta.faktor) as faktor,
      avg(dta.hk_atas) as hk_atas,
      avg(dta.hk_tengah) as hk_tengah,
      avg(dta.hk_bawah) as hk_bawah,
      avg(dta.hk_campur) as hk_campur,
      avg(dta.nn_atas) as nn_atas,
      avg(dta.nn_tengah) as nn_tengah,
      avg(dta.nn_bawah) as nn_bawah,
      avg(dta.nn_campur) as nn_campur,
      avg(dta.rend_atas) as rend_atas,
      avg(dta.rend_tengah) as rend_tengah,
      avg(dta.rend_bawah) as rend_bawah,
      avg(dta.rend_campur) as rend_campur,
      avg(dta.fk) as fk,
      avg(dta.kp) as kp,
      avg(dta.kdt) as kdt,
      avg(dta.rata_panjang) as rata_panjang,
      avg(dta.rata_ruas) as rata_ruas,
      avg(dta.rata_diameter) as rata_diameter,
      avg(dta.kg_per_meter) as rata_kgm
      from tbl_ltb_dataankem dta
    join tbl_petak ptk on dta.kode_petak = ptk.kode_blok
    join tbl_varietas vts on vts.id_varietas = ptk.kode_varietas
    where dta.kode_plant = ? and dta.tgl_analisa >= ? and dta.tgl_analisa <= ?
    group by dta.kode_petak
    ";
    return json_encode($this->db->query($query, array($kode_plant, $tgl_awal, $tgl_akhir))->result());
  }

}
