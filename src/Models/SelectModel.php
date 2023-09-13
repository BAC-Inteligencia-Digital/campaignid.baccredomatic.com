<?php

namespace App\Models;

use App\Config\ResponseHttp;
use App\Config\Security;
use App\DB\ConnectionDB;
use App\DB\Sql;

class SelectModel extends ConnectionDB {

     /**************************Consultar pais seleccionado***************************/
     final public static function getPais(string $pais)
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT abreviatura from pais where nombre = :pais");
             $query->execute([
                ':pais' => $pais
             ]);
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("SelectModel::getPais -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar categoria seleccionada***************************/
     final public static function getCategoria(string $categoria)
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT codigo FROM categoria where nombre_categoria = :categoria");
             $query->execute([
                ':categoria' => $categoria
             ]);
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("SelectModel::getCategoria -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar producto seleccionado***************************/
     final public static function getProducto(string $producto)
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT codigo from producto where nombre_producto = :producto");
             $query->execute([
                ':producto' => $producto
            ]);        
            $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $rs;
         } catch (\PDOException $e) {
            error_log("SelectModel::getProducto -> ".$e);
            die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar los multiproductos seleccionados***************************/
     final public static function getMultiproducto(string $producto1,string $producto2,string $producto3)
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare('SELECT codigo from multiproducto where nombre_campana in (:producto1,:producto2,:producto3) order by codigo asc');
             $query->execute([
                ':producto1' => $producto1,
                ':producto2' => $producto2,
                ':producto3' => $producto3
             ]); 
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("SelectModel::getMultiproducto -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar objetivo seleccionado***************************/
     final public static function getObjetivo(string $objetivo)
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT codigo FROM objetivos where nombre_objetivo = :objetivo");
             $query->execute([
                ':objetivo' => $objetivo
             ]);
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("SelectModel::getObjetivo -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar portafolio seleccionado***************************/
     final public static function getPortafolio(string $portafolio)
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT codigo FROM portafolio where nombre_portafolio=:portafolio");
             $query->execute([
                ':portafolio' => $portafolio
             ]);
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("SelectModel::getPortafolio -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar origen de clientes seleccionado***************************/
     final public static function getOrigen(string $origen)
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT codigo FROM origen_clientes where nombre_origen = :origen");
             $query->execute([
                ':origen' => $origen
             ]);
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("SelectModel::getOrigen -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

     /**************************Consultar el canal seleccionado***************************/
     final public static function getCanal(string $canal)
     {
         try {
             $con = self::getConnection();
             $query = $con->prepare("SELECT codigo FROM canales where nombre_canal=:canal");
             $query->execute([
                ':canal' => $canal
             ]);
             $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $rs;
         } catch (\PDOException $e) {
             error_log("SelectModel::getCanal -> ".$e);
             die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
         }
     }

      /**************************Consultar el canal digital seleccionado***************************/
      final public static function getCanalDigital(string $canal)
      {
          try {
              $con = self::getConnection();
              $query = $con->prepare("SELECT codigo FROM canal_digital where nombre_canal_digital=:canal");
              $query->execute([
                ':canal' => $canal
              ]);
              $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
              return $rs;
          } catch (\PDOException $e) {
              error_log("SelectModel::getCanalDigital -> ".$e);
              die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
          }
      }

      /**************************Consultar el tipo de campaña seleccionado***************************/
      final public static function getTipoCampana(string $tipocampana)
      {
          try {
              $con = self::getConnection();
              $query = $con->prepare("SELECT codigo FROM tipo_campaña where nombre_campaña=:tipocampana");
              $query->execute([
                ':tipocampana' => $tipocampana
              ]);
              $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
              return $rs;
          } catch (\PDOException $e) {
              error_log("SelectModel::getTipoCampana -> ".$e);
              die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
          }
      }

      /**************************Consultar grupo de anuncio seleccionado***************************/
      final public static function getGrupoAnuncio(string $grupo)
      {
          try {
              $con = self::getConnection();
              $query = $con->prepare("SELECT codigo_grupo FROM grupos_anuncios where nombre_categoria = :grupo");
              $query->execute([
                ':grupo' => $grupo
              ]); 
              $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
              return $rs;
          } catch (\PDOException $e) {
              error_log("SelectModel::getGrupoAnuncio -> ".$e);
              die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
          }
      }

      /**************************Consultar el tipo de anuncio seleccionado***************************/
      final public static function getTipoAnuncio(string $tipo)
      {
          try {
              $con = self::getConnection();
              $query = $con->prepare("SELECT codigo FROM tipo_anuncio where nombre_tipo_anuncio = :tipo");
              $query->execute([
                ':tipo' => $tipo
              ]); 
              $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
              return $rs;
          } catch (\PDOException $e) {
              error_log("SelectModel::getTipoAnuncio -> ".$e);
              die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
          }
      }

      /**************************Consultar el canal general seleccionado***************************/
      final public static function getCanalGeneral(string $codigo)
      {
          try {
              $con = self::getConnection();
              $query = $con->prepare("SELECT nombre_canal FROM canales where codigo = :codigo");
              $query->execute([
                ':codigo' => $codigo
              ]);
              $rs['data'] = $query->fetchAll(\PDO::FETCH_ASSOC);
              return $rs;
          } catch (\PDOException $e) {
              error_log("SelectModel::getCanalGeneral -> ".$e);
              die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
          }
      }
       
}