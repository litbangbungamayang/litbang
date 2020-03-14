<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Biayatma_model extends CI_Model{

  private $_table = "tbl_petakkebun";
  public $kode_plant;
  public $kode_blok;
  public $no_kontrak_efarming;
  public $nomor_petak;
  public $nama_kebun;
  public $afdeling;
  public $divisi;
  public $id_varietas;
  public $kepemilikan;
  public $tahun_giling;
  public $kategori;
  public $jenis_petak;
  public $luas_tanam;
  public $ton_takdes;
  public $ton_takmar;

  public function getPetakKebunByTahunGiling(){
    $tahun_giling = $this->input->get("tahun_giling");
  }

}
