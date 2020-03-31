<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Ankemfisik_model extends CI_Model{

  private $_table = "tbl_ltb_fisikankem";
  public $id_analisa;
  public $no_urut;
  public $panjang_batang;
  public $jml_ruas;
  public $diameter_batang;

  public function simpan($post = null){
    if (is_null($post))$post = $this->input->post();
    $this->id_analisa = $post["id_analisa"];
    $this->no_urut = $post["no_urut"];
    $this->panjang_batang = $post["panjang_batang"];
    $this->jml_ruas = $post["jml_ruas"];
    $this->diameter_batang = $post["diameter_batang"];
    $this->db->insert($this->_table, $this);
    return $this->db->insert_id();
  }

}
