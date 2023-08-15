<?php

namespace App\Controllers;

use App\Config\ResponseHttp;
use App\Config\Security;
use App\Models\BacIDModel;
use App\Models\SubBacIDModel;
use Rakit\Validation\Validator;

class BacIDController extends BaseController{   
    
    /************************************Registrar BAC ID***********************************************/
    final public function postSave(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
       
            $validator = new Validator;
            
            $validation = $validator->validate($this->getParam(), [
                'nombre_bac_id'   => 'required|regex:/^[0-9-A-Z-]+$/',
                'id_usuario'      => 'required|regex:/\d+/',
                'nombre_campana'  => 'required|regex:/^[0-9-A-Z-]+$/',
                'fecha_creacion'  => 'required|regex:/^[0-9]{1,2}\\/[0-9]{1,2}\\/[0-9]{4}$/',
                'pais'            => 'required|regex:/^[A-Z]+$/',

            ]);      

        if ($validation->fails()) {            
            $errors = $validation->errors();            	
            echo json_encode(ResponseHttp::status400($errors->all()[0]));
        } else {          
            new BacIDModel($this->getParam());
            echo json_encode(BacIDModel::postSave());
        }              
                          
        exit;
       }
    }
    
    /************************************Consultar el BACID POST INSERCION***********************************************/
    final public function getBACID(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
       
            $validator = new Validator;
            
            $validation = $validator->validate($this->getParam(), [
                'nombre_bac_id'   => 'required|regex:/^[0-9-A-Z-]+$/'
            ]);      

        if ($validation->fails()) {            
            $errors = $validation->errors();            	
            echo json_encode(ResponseHttp::status400($errors->all()[0]));
        } else {          
            BacIDModel::getBACID($this->getParam()['nombre_bac_id']);
        }              
                          
        exit;
       }
    }


    /************************************Registrar SUB BAC ID***********************************************/
    final public function postSaveSub(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
       
            $validator = new Validator;
            
            $validation = $validator->validate($this->getParam(), [
                'nombre_subbacid' => 'required|regex:/^(?!\s*$).+$/',
                'bacid_padre'  => 'required|regex:/^[0-9-A-Z-]+$/'
            ]);      

        if ($validation->fails()) {            
            $errors = $validation->errors();            	
            echo json_encode(ResponseHttp::status400($errors->all()[0]));
        } else {          
            new SubBacIDModel($this->getParam());
            echo json_encode(SubBacIDModel::postSave());
        }              
                          
        exit;
       }
    }

    /************************************Consultar el SUB BACID POST INSERCION***********************************************/
    final public function getSUBBACID(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
       
            $validator = new Validator;
            
            $validation = $validator->validate($this->getParam(), [
                'sub_bac_id'   => 'required|regex:/^(?!\s*$).+$/'
            ]);      

        if ($validation->fails()) {            
            $errors = $validation->errors();            	
            echo json_encode(ResponseHttp::status400($errors->all()[0]));
        } else {          
            SubBacIDModel::getSUBBACID($this->getParam()['sub_bac_id']);
        }              
                          
        exit;
       }
    }

     /************************************CONSULTA HISTORICO DE BAC IDS SEGÚN FILTROS***********************************************/
     final public function getBacIDFilters(string $endPoint)
     {
         if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
        
             $validator = new Validator;
             
             $validation = $validator->validate($this->getParam(), [
                 'fecha_desde'    => 'required|regex:/^[0-9]{1,2}\\/[0-9]{1,2}\\/[0-9]{4}$/',
                 'fecha_hasta'    => 'required|regex:/^[0-9]{1,2}\\/[0-9]{1,2}\\/[0-9]{4}$/'
             ]);      
 
         if ($validation->fails()) {            
             $errors = $validation->errors();            	
             echo json_encode(ResponseHttp::status400($errors->all()[0]));
         } else {
            BacIDModel::setFechaInicio($this->getParam()['fecha_desde']);
            BacIDModel::setFechaFin($this->getParam()['fecha_hasta']);
            BacIDModel::setPais($this->getParam()['nombre_pais']);
            BacIDModel::setNombreCampana($this->getParam()['nombre_campana']);
            echo json_encode(BacIDModel::getBacIDFilters());
         }              
                           
         exit;
        }
     }

    /************************************CONSULTA HISTORICO DE BAC IDS SEGÚN PAIS***********************************************/
    final public function getBacIDHistPais(string $endPoint)
    { 
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            
            $pais   = $this->getParam()['pais'];

            if(empty($pais)){  
                echo json_encode(ResponseHttp::status400('Todos los campos son necesarios'));
            }else{
                BacIDModel::setPais($pais);
                echo json_encode(BacIDModel::getBacIDHistPais());           
            }  
        exit;
        }
    }

    /************************************Consultar el detalle de un BAC ID***********************************************/
    final public function getBacIDDetalle(string $endPoint)
    { 
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            
            $id = $this->getAttribute()[2];

            if(empty($id)){  
                echo json_encode(ResponseHttp::status400('Todos los campos son necesarios'));
            }else{                
                BacIDModel::setId($id);
                echo json_encode(BacIDModel::getBacIDDetalle());           
            }  
        exit;
        }
    }

    /************************************Consultar el detalle de un SUB BAC ID***********************************************/
    final public function getSubBacIDDetalle(string $endPoint)
    { 
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            
            $id = $this->getAttribute()[2];

            if(empty($id)){  
                echo json_encode(ResponseHttp::status400('Todos los campos son necesarios'));
            }else{                
                SubBacIDModel::setBacIDPadre($id);
                echo json_encode(SubBacIDModel::getSubBacIDDetalle());           
            }  
        exit;
        }
    }
    
}