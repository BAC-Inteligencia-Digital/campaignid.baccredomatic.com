<?php

namespace App\Controllers;

use App\Config\Security;
use App\Models\SelectModel;

class SelectController extends BaseController{  

    /**********************Consultar el pais seleccionado*********************/
    final public function getPais(string $endPoint) {
        
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $pais = $this->getParam()['valor'];
            echo json_encode(SelectModel::getPais($pais));
            exit;
        }    
    }

    /**********************Consultar la categoria seleccionada*********************/
    final public function getCategoria(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $categoria = $this->getParam()['valor'];
            echo json_encode(SelectModel::getCategoria($categoria));
            exit;
        }    
    }

    /**********************Consultar producto seleccionado*********************/
    final public function getProducto(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $producto  = $this->getParam()['valor'];
            echo json_encode(SelectModel::getProducto($producto));
            exit;
        }    
    }

    /**********************Consultar el multiproducto seleccionado*********************/
    final public function getMultiproducto(string $endPoint)
    {
      
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $producto1  = $this->getParam()['producto1'];
            $producto2  = $this->getParam()['producto2'];
            $producto3  = $this->getParam()['producto3'];
            echo json_encode(SelectModel::getMultiproducto($producto1,$producto2,$producto3));
            exit;
        }    
    }

    /**********************Consultar el objetio seleccionado*********************/
    final public function getObjetivo(string $endPoint)
    {
      
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $objetivo  = $this->getParam()['valor'];
            echo json_encode(SelectModel::getObjetivo($objetivo));
            exit;
        }    
    }

    /**********************Consultar el portafolio seleccionado*********************/
    final public function getPortafolio(string $endPoint)
    {
      
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $portafolio  = $this->getParam()['portafolio'];
            echo json_encode(SelectModel::getPortafolio($portafolio));
            exit;
        }    
    }

    /**********************Consultar el origen de clientes seleccionado*********************/
    final public function getOrigen(string $endPoint)
    {
      
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $origen  = $this->getParam()['valor'];
            echo json_encode(SelectModel::getOrigen($origen));
            exit;
        }    
    }

    /**********************Consultar el canal seleccionado*********************/
    final public function getCanal(string $endPoint)
    {
      
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $canal  = $this->getParam()['valor'];
            echo json_encode(SelectModel::getCanal($canal));
            exit;
        }    
    }

    /**********************Consultar el canal digital seleccionado*********************/
    final public function getCanalDigital(string $endPoint)
    {
      
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $canal  = $this->getParam()['valor'];
            echo json_encode(SelectModel::getCanalDigital($canal));
            exit;
        }    
    }

    /**********************Consultar tipo de campaña seleccionado*********************/
    final public function getTipoCampana(string $endPoint)
    {
      
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $tipo  = $this->getParam()['valor'];
            echo json_encode(SelectModel::getTipoCampana($tipo));
            exit;
        }    
    }

    /**********************Consultar el grupo de anuncio seleccionado*********************/
    final public function getGrupoAnuncio(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $nombregrupo  = $this->getParam()['valor'];
            echo json_encode(SelectModel::getGrupoAnuncio($nombregrupo));
            exit;
        }    
    }

    /**********************Consultar el tipo de anuncio seleccionado*********************/
    final public function getTipoAnuncio(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $tipo  = $this->getParam()['valor'];
            echo json_encode(SelectModel::getTipoAnuncio($tipo));
            exit;
        }    
    }
}