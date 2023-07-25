<?php

namespace App\Controllers;

use App\Config\ResponseHttp;
use App\Config\Security;
use App\Models\UserModel;
use Rakit\Validation\Validator;

class UserController extends BaseController{   
    
    /************************************Login***********************************************/
    final public function getLogin(string $endPoint)
    { 
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            $usuario  = $this->getAttribute()[1];
            $password = $this->getAttribute()[2];

            if(empty($usuario) || empty($password)){  
                echo json_encode(ResponseHttp::status400('Todos los campos son necesarios'));
            }else{
                UserModel::setUsuario($usuario);
                UserModel::setPass($password);
                echo json_encode(UserModel::login());           
            }  
        exit;
        }
    }


    /************************************Función para crear un usuario nuevo***********************************************/
    final public function postSave(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
       
            $validator = new Validator;
            
            $validation = $validator->validate($this->getParam(), [
                'usuario_red'        => 'required|regex:/^[a-zA-Z ]+$/',
                'contrasena'         => 'required|min:8',
                'correo'             => 'required|email',
                'tipo_usuario'       => 'required|numeric|min:1|regex:/^[12]+$/',
                'pais'               => 'required|regex:/^[a-zA-Z ]+$/',
                'nombre'             => 'required|regex:/^[a-zA-Z ]+$/',
                'apellidos'          => 'required|regex:/^[a-zA-Z ]+$/',
                'estado'             => 'required|numeric|min:0|regex:/^[12]+$/'

            ]);      

        if ($validation->fails()) {            
            $errors = $validation->errors();            	
            echo json_encode(ResponseHttp::status400($errors->all()[0]));
        } else {          
            new UserModel($this->getParam());
            echo json_encode(UserModel::postSave());
        }              
                          
        exit;
       }
    } 
    
}