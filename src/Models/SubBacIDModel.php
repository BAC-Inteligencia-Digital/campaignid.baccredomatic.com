<?php

namespace App\Models;

use App\Config\ResponseHttp;
use App\Config\Security;
use App\DB\ConnectionDB;
use App\DB\Sql;

class SubBacIDModel extends ConnectionDB {

    //Propiedades de la base de datos
    private static int $id_sub_bacid;
    private static string $nombre_subbacid;
    private static int $id_bacid_padre;
    private static string  $fecha_modificacion;

    public function __construct(array $data)
    {
        self::$nombre_subbacid  = $data['nombre_subbacid'];
        self::$id_bacid_padre   = $data['id_bacid_padre'];        
  
    }

    /************************Metodos Getter**************************/
    final public static function getIdSubBacid(){  return self::$id_sub_bacid;}
    final public static function getNombreSubBacID(){ return self::$nombre_subbacid;}
    final public static function getIDBacIDPadre(){   return self::$id_bacid_padre;}
    final public static function getFechaModificacion(){  return self::$fecha_modificacion;} 
    
    /**********************************Metodos Setter***********************************/
    final public static function setIdSubBacid(int $id_sub_bacid) {  self::$id_sub_bacid = $id_sub_bacid;}
    final public static function setNombreSubBacID(string $nombre_subbacid){  self::$nombre_subbacid = $nombre_subbacid;}
    final public static function setIDBacIDPadre(int $id_bacid_padre){ self::$id_bacid_padre = $id_bacid_padre;}
    final public static function setFechaModificacion(string $fecha_modificacion){ self::$fecha_modificacion = $fecha_modificacion;}

    
    /*******************************************Registrar SUB BAC ID************************************************/

    final public static function postSave()
    {
        try {
            $con = self::getConnection();
            $query1 = "INSERT INTO sub_bacid_generados (nombre_subbacid,id_bacid_padre) VALUES";
            $query2 = "(:nombre_subbacid,:id_bacid_padre)";
            $query = $con->prepare($query1 . $query2);
            $query->execute([                
                ':nombre_subbacid' => self::getNombreSubBacID(),
                ':id_bacid_padre'  => self::getIDBacIDPadre()       
            ]);
            if ($query->rowCount() > 0) {
                return ResponseHttp::status200('Código de campañá registrado exitosamente');
            } else {
                return ResponseHttp::status500('No se puede registrar el SUB BACID');
            }
        } catch (\PDOException $e) {
            error_log('SubBacIDModel::post -> ' . $e);
            die(json_encode(ResponseHttp::status500()));
        }
            
    }

     /*******************************************Consultar el SUB BACID POST INSERCION************************************************/
     final public static function getSUBBACID(string $subbacid)
     {
        $nombre_grupo = substr($subbacid, 0, 2);
        $codigo_anuncio = substr($subbacid, 3, 2);

        $nombre_anuncio = explode("/",$subbacid)[0];
        $nombre_anuncio = substr($nombre_anuncio, 6, strlen($nombre_anuncio));     
       
        $sub_codigo = explode("/",$subbacid)[1];
	
        try {
            $con = self::getConnection();             
            $query = $con->prepare("SELECT distinct a.nombre_categoria, a.descripcion, b.nombre_tipo_anuncio, :nombre_anuncio as nombre_anuncio, :sub_codigo as sub_codigo from 
            grupos_anuncios as a
            join tipo_anuncio as b
            where a.codigo_grupo = :nombre_grupo
            and b.codigo = :codigo_anuncio");
            $query->execute([
                ':nombre_grupo'   => $nombre_grupo,
                ':codigo_anuncio' => $codigo_anuncio,
                ':nombre_anuncio' => $nombre_anuncio,
                ':sub_codigo'     => $sub_codigo 
            ]);
 
            if ($query->rowCount() == 0) {
 
                die(json_encode(ResponseHttp::status500()));
             
            } else {
                 $res = $query->fetch(\PDO::FETCH_ASSOC);               
                 echo json_encode($res);         
            }
         
         } catch (\PDOException $e) {
             error_log('SubBacIDModel::getSUBBACID -> ' . $e);            
             die(json_encode(ResponseHttp::status500()));
         }        
     }
     
         
}