<?php

namespace App\Models;

use App\Config\ResponseHttp;
use App\Config\Security;
use App\DB\ConnectionDB;
use App\DB\Sql;

class BacIDModel extends ConnectionDB {

    //Propiedades de la base de datos
    private static int $id;
    private static string $nombre_bac_id;
    private static int $id_usuario;
    private static string  $nombre_campana;    
    private static string  $fecha_creacion;
    private static string  $fecha_modificacion;
    private static string  $pais;

    public function __construct(array $data)
    {
        self::$id             = $data['id'];
        self::$nombre_bac_id  = $data['nombre_bac_id'];
        self::$id_usuario     = $data['id_usuario'];
        self::$nombre_campana = $data['nombre_campana'];        
        self::$fecha_creacion = $data['fecha_creacion'];
        self::$fecha_modificacion = $data['fecha_modificacion']; 
        self::$pais           = $data['pais'];    
    }

    /************************Metodos Getter**************************/
    final public static function getId(){      return self::$id;}
    final public static function getNombewBACID(){ return self::$nombre_bac_id;}
    final public static function getIDUsuario(){    return self::$id_usuario;}
    final public static function getNombreCampana(){  return self::$nombre_campana;}     
    final public static function getFechaCreacion(){  return self::$fecha_creacion;}
    final public static function getFechaModificacion(){  return self::$fecha_modificacion;}
    final public static function getPais(){  return self::$pais;}       
    
    /**********************************Metodos Setter***********************************/
    final public static function setId(int $id) {  self::$id = $id;}
    final public static function setNombreBACID(string $nombre_bac_id){  self::$nombre_bac_id = $nombre_bac_id;}
    final public static function setIDUsuario(int $id_usuario){ self::$id_usuario = $id_usuario;}
    final public static function setNombreCampana(string $nombre_campana){   self::$nombre_campana = $nombre_campana;}      
    final public static function setFechaCreacion(string $fecha_creacion){ self::$fecha_creacion = $fecha_creacion;}
    final public static function setFechaModificacion(string $fecha_modificacion){ self::$fecha_modificacion = $fecha_modificacion;}
    final public static function setPais(string $pais){ self::$pais = $pais;}
    
    /*******************************************Registrar BAC ID************************************************/
    final public static function postSave()
    {

        if (Sql::exists("SELECT nombre_campana FROM bac_id_generados WHERE nombre_campana = :nombre_campana",":nombre_campana",self::getNombreCampana())) {  
            return ResponseHttp::status400('El BACID ya está registrado');
        }
        else {
            try {
                $con = self::getConnection();
                $query1 = "INSERT INTO bac_id_generados (nombre_bac_id,id_usuario,nombre_campana,fecha_creacion,pais) VALUES";
                $query2 = "(:nombre_bac_id,:id_usuario,:nombre_campana,:fecha_creacion,:pais)";
                $query = $con->prepare($query1 . $query2);
                $query->execute([
                    ':nombre_bac_id'  => self::getNombewBACID(),
                    ':id_usuario'     => self::getIDUsuario(),
                    ':nombre_campana' => self::getNombreCampana(),
                    ':fecha_creacion' => self::getFechaCreacion(),                    
                    ':pais'           => self::getPais()          
                ]);
                if ($query->rowCount() > 0) {
                    return ResponseHttp::status200('Código de campañá registrado exitosamente');
                } else {
                    return ResponseHttp::status500('No se puede registrar el BACID');
                }
            } catch (\PDOException $e) {
                error_log('BacIDModel::post -> ' . $e);
                die(json_encode(ResponseHttp::status500()));
            }
        }    
    }       
}