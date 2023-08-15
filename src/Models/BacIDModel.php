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
    private static string  $fechaInicio;
    private static string  $fechaFin;

    public function __construct(array $data)
    {
        self::$nombre_bac_id  = $data['nombre_bac_id'];
        self::$id_usuario     = $data['id_usuario'];
        self::$nombre_campana = $data['nombre_campana'];        
        self::$fecha_creacion = $data['fecha_creacion'];
        self::$pais           = $data['pais'];    
    }

    /************************Metodos Getter**************************/
    final public static function getId(){      return self::$id;}
    final public static function getNombreBACID(){ return self::$nombre_bac_id;}
    final public static function getIDUsuario(){    return self::$id_usuario;}
    final public static function getNombreCampana(){  return self::$nombre_campana;}     
    final public static function getFechaCreacion(){  return self::$fecha_creacion;}
    final public static function getFechaModificacion(){  return self::$fecha_modificacion;}
    final public static function getPais(){  return self::$pais;}
    final public static function getFechaInicio(){  return self::$fechaInicio;}
    final public static function getFechaFin(){  return self::$fechaFin;}       
    
    /**********************************Metodos Setter***********************************/
    final public static function setId(int $id) {  self::$id = $id;}
    final public static function setNombreBACID(string $nombre_bac_id){  self::$nombre_bac_id = $nombre_bac_id;}
    final public static function setIDUsuario(int $id_usuario){ self::$id_usuario = $id_usuario;}
    final public static function setNombreCampana(string $nombre_campana){   self::$nombre_campana = $nombre_campana;}      
    final public static function setFechaCreacion(string $fecha_creacion){ self::$fecha_creacion = $fecha_creacion;}
    final public static function setFechaModificacion(string $fecha_modificacion){ self::$fecha_modificacion = $fecha_modificacion;}
    final public static function setPais(string $pais){ self::$pais = $pais;}
    final public static function setFechaInicio(string $fechaInicio){ self::$fechaInicio = $fechaInicio;}
    final public static function setFechaFin(string $fechaFin){ self::$fechaFin = $fechaFin;}
    
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
                    ':nombre_bac_id'  => self::getNombreBACID(),
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
    
    /*******************************************Consultar el BACID POST INSERCION************************************************/
    final public static function getBACID(string $nombreBACID )
    {
        
        $return_arr = array();

        try {
            $con = self::getConnection();
            
            //// OBTENEMOS PAIS
            $query = $con->prepare("SELECT nombre as nombre_pais FROM pais where abreviatura = :pais");
            $query->execute([
                ':pais' => substr($nombreBACID, 0, 3)
            ]);

            if ($query->rowCount() == 0) {

                die(json_encode(ResponseHttp::status500()));
            
            } else {
                $res = $query->fetch(\PDO::FETCH_ASSOC);               
                array_push($return_arr,$res);                     
            }
            
            /// OBTENEMOS EL ORIGEN
            $query2 = $con->prepare("SELECT nombre_origen FROM origen_clientes where codigo = :origen");
            $query2->execute([
                ':origen' => substr($nombreBACID, 3, 1)
            ]);

            if ($query2->rowCount() == 0) {

                die(json_encode(ResponseHttp::status500()));
            
            } else {
                $res = $query2->fetch(\PDO::FETCH_ASSOC); 
                array_push($return_arr,$res);            
            }

            /// OBTENEMOS LA CATEGORIA
            $query3 = $con->prepare("SELECT nombre_categoria FROM categoria where codigo = :categoria");
            $query3->execute([
                ':categoria' => substr($nombreBACID, 5, 4)
            ]);

            if ($query3->rowCount() == 0) {

                die(json_encode(ResponseHttp::status500()));
            
            } else {
                $res = $query3->fetch(\PDO::FETCH_ASSOC); 
                array_push($return_arr,$res);            
            }

            /// OBTENEMOS EL PRODUCTO
            if (substr($nombreBACID, 5, 4) != 'MULT'){
                $query4 = $con->prepare("SELECT nombre_producto FROM producto where codigo = :producto");
                $query4->execute([
                    ':producto' => substr($nombreBACID, 10, 3)
                ]);
            }
            else{
                $query4 = $con->prepare("SELECT GROUP_CONCAT('[',(select nombre_campana from multiproducto where codigo = :producto1),']-[',(select nombre_campana from multiproducto where codigo = :producto2),']-[',(select nombre_campana from multiproducto where codigo = :producto3),']')
                as nombre_producto");
                $query4->execute([
                    ':producto1' => substr($nombreBACID, 10, 1),
                    ':producto2' => substr($nombreBACID, 11, 1),
                    ':producto3' => substr($nombreBACID, 12, 1),
                ]);
            }       
            if ($query4->rowCount() == 0) {

                die(json_encode(ResponseHttp::status500()));
            
            } else {
                $res = $query4->fetch(\PDO::FETCH_ASSOC); 
                array_push($return_arr,$res);            
            }

            /// OBTENEMOS EL PORTAFOLIO
            $query5 = $con->prepare("SELECT nombre_portafolio FROM portafolio where codigo = :portafolio");
            $query5->execute([
                ':portafolio' => substr($nombreBACID, 21, 2)
            ]);

            if ($query5->rowCount() == 0) {

                die(json_encode(ResponseHttp::status500()));
            
            } else {
                $res = $query5->fetch(\PDO::FETCH_ASSOC); 
                array_push($return_arr,$res);            
            }

            /// OBTENEMOS EL TIPO DE CAMPAÑA
            $query6 = $con->prepare("SELECT nombre_campaña FROM tipo_campaña where codigo = :nombre_campana");
            $query6->execute([
                ':nombre_campana' => substr($nombreBACID, 24, 2)
            ]);

            if ($query6->rowCount() == 0) {

                die(json_encode(ResponseHttp::status500()));
            
            } else {
                $res = $query6->fetch(\PDO::FETCH_ASSOC); 
                array_push($return_arr,$res);            
            }

            /// OBTENEMOS EL OBJETIVO
            $query7 = $con->prepare("SELECT nombre_objetivo FROM objetivos where codigo = :nombre_objetivo");
            $query7->execute([
                ':nombre_objetivo' => substr($nombreBACID, 27, 2)
            ]);

            if ($query7->rowCount() == 0) {

                die(json_encode(ResponseHttp::status500()));
            
            } else {
                $res = $query7->fetch(\PDO::FETCH_ASSOC); 
                array_push($return_arr,$res);            
            }

            /// OBTENEMOS EL CANAL DIGITAL
            $query8 = $con->prepare("SELECT nombre_canal_digital FROM canal_digital where codigo = :nombre_canal");
            $query8->execute([
                ':nombre_canal' => substr($nombreBACID, 30, 2)
            ]);

            if ($query8->rowCount() == 0) {

                die(json_encode(ResponseHttp::status500()));
            
            } else {
                $res = $query8->fetch(\PDO::FETCH_ASSOC); 
                array_push($return_arr,$res);            
            }

            echo json_encode($return_arr);
        
        } catch (\PDOException $e) {
            error_log('BacIDModel::getBACID -> ' . $e);            
            die(json_encode(ResponseHttp::status500()));
        }        
    }       

    final public static function getIdentificador(string $nombreBACID )
    {
    
        try {
            $con = self::getConnection();
            
            $query = $con->prepare("SELECT id FROM bac_id_generados WHERE nombre_bac_id = :nombre");
            $query->execute([
                ':nombre' => $nombreBACID
            ]);

            if ($query->rowCount() == 0) {

                die(json_encode(ResponseHttp::status500()));
            
            } else {
                $res = $query->fetch(\PDO::FETCH_ASSOC);               
                return $res;                    
            }
        
        } catch (\PDOException $e) {
            error_log('BacIDModel::getBACID -> ' . $e);            
            die(json_encode(ResponseHttp::status500()));
        }        
    }

    /**************************Consultar los códigos de campañan según filtros del usuario***************************/
    final public static function getBacIDFilters()
    {
        try {
            $con = self::getConnection();
            $query = $con->prepare("SELECT  a.id, STR_TO_DATE(a.fecha_creacion, '%d/%m/%Y') as fecha_creacion,a.nombre_bac_id,a.nombre_campana, b.nombre as nombre_pais, 
            c.nombre_origen, d.nombre_categoria, e.nombre_producto FROM bac_id_generados as a
            join pais as b 
            on SUBSTRING(a.nombre_bac_id, 1, 3) = b.abreviatura
            join origen_clientes as c
            on SUBSTRING(a.nombre_bac_id, 4, 1) = c.codigo
            join categoria as d
            on SUBSTRING(a.nombre_bac_id, 6, 4) = d.codigo
            join producto as e
            on SUBSTRING(a.nombre_bac_id, 11, 3) = e.codigo
            where str_to_date(a.fecha_creacion, '%d/%m/%Y') between STR_TO_DATE(:fecha_desde, '%d/%m/%Y') and STR_TO_DATE(:fecha_hasta, '%d/%m/%Y')
            and a.nombre_campana like :nombre_campana
            and a.pais = (SELECT abreviatura FROM pais WHERE nombre = :nombre_pais)");
            $query->execute([
               ':fecha_desde'   => self::getFechaInicio(),
               ':fecha_hasta'   => self::getFechaFin(),
               ':nombre_pais'   => self::getPais(),
               ':nombre_campana' => "%".self::getNombreCampana()."%"
           ]);        
           $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
           return $rs;
        } catch (\PDOException $e) {
           error_log("BacIDModel::getBacIDFilters -> ".$e);
           die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
        }
    }
}

