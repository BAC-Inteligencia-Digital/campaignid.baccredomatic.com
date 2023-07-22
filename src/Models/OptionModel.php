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

     /**************************Consultar todos los portafolios***************************/
     final public static function getAllPortafolio()
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT * FROM portafolio");
             $query->execute();
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("OptionModel::getAllPortafolio -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar todos los origenes de cliente***************************/
     final public static function getAllOrigen()
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT * FROM origen_clientes");
             $query->execute();
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("OptionModel::getAllOrigen -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar todos los canales***************************/
     final public static function getAllCanal()
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT * FROM canales");
             $query->execute();
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("OptionModel::getAllCanal -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

      /**************************Consultar todos los canales digitales***************************/
      final public static function getAllCanalDigital()
      {
          try {
              $con = self::getConnection();
              $query = $con->prepare("SELECT * FROM canal_digital WHERE nombre_canal_digital <> 'No aplica'");
              $query->execute();
              $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
              return $rs;
          } catch (\PDOException $e) {
              error_log("OptionModel::getAllCanalDigital -> ".$e);
              die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
          }
      }

      /**************************Consultar todos los tipo de campaña***************************/
      final public static function getAllTipoCampana()
      {
          try {
              $con = self::getConnection();
              $query = $con->prepare("SELECT * FROM tipo_campaña");
              $query->execute();
              $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
              return $rs;
          } catch (\PDOException $e) {
              error_log("OptionModel::getAllTipoCampana -> ".$e);
              die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
          }
      }

      /**************************Consultar todos los grupos de anuncios***************************/
      final public static function getAllGrupoAnuncio(string $nombrecanal)
      {
          try {
              $con = self::getConnection();
              $query = $con->prepare("SELECT 0 as indice, null as codigo_grupo, 'Seleccione un grupo' as nombre_categoria 
              union 
              select a.indice,a.codigo_grupo,a.nombre_categoria from grupos_anuncios as a 
              inner join canal_digital as b
              on a.numero_grupo = b.grupo_anuncios
              where nombre_canal_digital = :nombre_canal_digital");
              $query->execute([
                ':nombre_canal_digital' => $nombrecanal
              ]); 
              $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
              return $rs;
          } catch (\PDOException $e) {
              error_log("OptionModel::getAllGrupoAnuncio -> ".$e);
              die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
          }
      }

      /**************************Consultar todos los tipos de anuncio***************************/
      final public static function getAllTipoAnuncio(string $nombrecanal)
      {
          try {
              $con = self::getConnection();
              $query = $con->prepare("SELECT a.* from tipo_anuncio as a 
              inner join canal_digital as b
              on a.codigo_canal_digital = b.indice 
              where b.nombre_canal_digital = :nombre_canal_digital");
              $query->execute([
                ':nombre_canal_digital' => $nombrecanal
              ]); 
              $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
              return $rs;
          } catch (\PDOException $e) {
              error_log("OptionModel::getAllTipoAnuncio -> ".$e);
              die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
          }
      }
       
}