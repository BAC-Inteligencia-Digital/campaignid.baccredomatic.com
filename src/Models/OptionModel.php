<?php

namespace App\Models;

use App\Config\ResponseHttp;
use App\Config\Security;
use App\DB\ConnectionDB;
use App\DB\Sql;

class OptionModel extends ConnectionDB {

     /**************************Consultar todos los paises***************************/
     final public static function getAllPais()
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT * FROM pais");
             $query->execute();
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("OptionModel::getAllPais -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar todos los paises***************************/
     final public static function getAllCategoria()
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT * FROM categoria");
             $query->execute();
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("OptionModel::getAllCategoria -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar todos los productos***************************/
     final public static function getAllProducto(string $categoria)
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT 0 as indice, null as codigo, 'Seleccione un producto' as nombre_producto, 0 as codigo_categoria union SELECT * FROM producto WHERE codigo_categoria = :codigo_categoria");
             $query->execute([
                ':codigo_categoria' => $categoria
            ]);        
            $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $rs;
         } catch (\PDOException $e) {
            error_log("OptionModel::getAllProducto -> ".$e);
            die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar todos los multiproducto***************************/
     final public static function getAllMultiproducto()
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT * FROM multiproducto");
             $query->execute();
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("OptionModel::getAllMultiproducto -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar todos los objetivos***************************/
     final public static function getAllObjetivo()
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT 0 as indice, null as codigo, 'Seleccione un objetivo' as nombre_objetivo union SELECT * FROM objetivos");
             $query->execute();
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("OptionModel::getAllObjetivo -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }
       
}