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
                'usuario_red'        => 'required|regex:/^[a-zA-Z. ]+$/',
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
    
    /***************************************************Actualizar los datos de un usuario*********************************************/
    final public function updateSave(string $endPoint)
    {        
               
        if ($this->getMethod() == 'post' && $this->getRoute() == $endPoint){            
            //Security::validateTokenJwt(Security::secretKey());
                        
            $id_usuario   = $this->getParam()['id_usuario'];
            $usuario_red  = $this->getParam()['usuario_red'];
            $contrasena   = $this->getParam()['contrasena'];
            $correo       = $this->getParam()['correo'];
            $tipo_usuario = $this->getParam()['tipo_usuario'];
            $pais         = $this->getParam()['pais'];
            $nombre       = $this->getParam()['nombre'];
            $apellidos    = $this->getParam()['apellidos'];
            $estado       = $this->getParam()['estado'];

            if (empty($usuario_red) || empty($contrasena) || empty($correo) || empty($tipo_usuario) || empty($pais) || empty($nombre) || empty($apellidos) || empty($estado)) {
                echo json_encode(ResponseHttp::status400('Todos los campos son requeridos'));
            } else {

                $validator = new Validator;
            
                $validation = $validator->validate($this->getParam(), [
                    'usuario_red'        => 'required|regex:/^[a-zA-Z. ]+$/',
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
                    UserModel::setId($id_usuario);
                    UserModel::setUsuario($usuario_red);
                    UserModel::setPass($contrasena);
                    UserModel::setCorreo($correo);
                    UserModel::setRol($tipo_usuario);
                    UserModel::setPais($pais);
                    UserModel::setNombre($nombre);
                    UserModel::setApellidos($apellidos);
                    UserModel::setEstado($estado);
                    echo json_encode(UserModel::updateSave());
                }
            }
            exit;
        }        
    }
    
    /**********************Consultar un usuario por nombre de usuario*******************************/
    final public function getUser(string $endPoint)
    {
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            //Security::validateTokenJwt(Security::secretKey());
            $usuario_ingresado = $this->getAttribute()[1];
            if (!isset($usuario_ingresado)) {
                echo json_encode(ResponseHttp::status400('El campo usuario es requerido'));
            } else {
                UserModel::setUsuario($usuario_ingresado);
                echo json_encode(UserModel::getUser());
                exit;
            }  
            exit;
        }    
    }
}