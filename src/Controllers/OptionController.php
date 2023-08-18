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
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $categoria  = $this->getParam()['valor'];
            echo json_encode(OptionModel::getAllProducto($categoria));
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

    /**********************Consultar todos los portafolios*********************/
    final public function getAllPortafolio(string $endPoint)
    {
      
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            echo json_encode(OptionModel::getAllPortafolio());
            exit;
        }    
    }

    /**********************Consultar todos los origenes de cliente*********************/
    final public function getAllOrigen(string $endPoint)
    {
      
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            echo json_encode(OptionModel::getAllOrigen());
            exit;
        }    
    }

    /**********************Consultar todos los canales*********************/
    final public function getAllCanal(string $endPoint)
    {
      
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            echo json_encode(OptionModel::getAllCanal());
            exit;
        }    
    }

    /**********************Consultar todos los canales digitales*********************/
    final public function getAllCanalDigital(string $endPoint)
    {
      
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            echo json_encode(OptionModel::getAllCanalDigital());
            exit;
        }    
    }

    /**********************Consultar todos los tipo de campaña*********************/
    final public function getAllTipoCampana(string $endPoint)
    {
      
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            echo json_encode(OptionModel::getAllTipoCampana());
            exit;
        }    
    }

    /**********************Consultar todos los grupos de anuncios*********************/
    final public function getAllGrupoAnuncio(string $endPoint)
    {
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $nombrecanal  = $this->getAttribute()[2];
            echo json_encode(OptionModel::getAllGrupoAnuncio($nombrecanal));
            exit;
        }    
    }

    /**********************Consultar todos los tipos de anuncios*********************/
    final public function getAllTipoAnuncio(string $endPoint)
    {
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $nombrecanal  = $this->getAttribute()[2];
            echo json_encode(OptionModel::getAllTipoAnuncio($nombrecanal));
            exit;
        }    
    }
}