<?php

namespace App\Controllers;

use App\Config\ResponseHttp;
use App\Config\Security;
use App\Models\BacIDModel;
use App\Models\UserModel;
use Rakit\Validation\Validator;

class BacIDController extends BaseController{   
    
    /************************************Registrar BAC ID***********************************************/
    final public function postSave(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
       
            $validator = new Validator;
            
            $validation = $validator->validate($this->getParam(), [
                'nombre_bac_id'   => 'required|regex:/^[a-zA-Z ]+$/',
                'id_usuario'      => 'required|min:8',
                'nombre_campana'  => 'required|email',
                'fecha_creacion'  => 'required|numeric|min:1|regex:/^[12]+$/',
                'pais'            => 'required|regex:/^[a-zA-Z ]+$/',

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
    
}