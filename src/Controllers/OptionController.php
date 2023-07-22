<?php

namespace App\Controllers;

use App\Config\Security;
use App\Models\OptionModel;

class OptionController extends BaseController{  

    /**********************Consultar todos los paises*********************/
    final public function getAllPais(string $endPoint)
    {
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            echo json_encode(OptionModel::getAllPais());
            exit;
        }    
    }

    /**********************Consultar todos los categorias*********************/
    final public function getAllCategoria(string $endPoint)
    {
      
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            echo json_encode(OptionModel::getAllCategoria());
            exit;
        }    
    }

    /**********************Consultar todos los productos*********************/
    final public function getAllProducto(string $endPoint)
    {
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $codigo_categoria  = $this->getAttribute()[2];
            echo json_encode(OptionModel::getAllProducto($codigo_categoria));
            exit;
        }    
    }

    /**********************Consultar todos los multiproducto*********************/
    final public function getAllMultiproducto(string $endPoint)
    {
      
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            echo json_encode(OptionModel::getAllMultiproducto());
            exit;
        }    
    }

    /**********************Consultar todos los objetivos*********************/
    final public function getAllObjetivo(string $endPoint)
    {
      
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            echo json_encode(OptionModel::getAllObjetivo());
            exit;
        }    
    }

}