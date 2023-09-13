<?php

namespace App\Models;

use App\Config\ResponseHttp;
use App\Config\Security;
use App\DB\ConnectionDB;
use App\DB\Sql;

class UserModel extends ConnectionDB {

    //Propiedades de la base de datos
    private static int $id;
    private static string $usuario_red;
    private static string $contraseña;
    private static string  $correo;    
    private static int     $tipo_usuario;
    private static string  $pais;
    private static string  $nombre;
    private static string  $apellidos;  
    private static int  $estado;    
    private static string  $IDToken;    

    public function __construct(array $data)
    {
        self::$usuario_red  = $data['usuario_red'];
        self::$contraseña   = $data['contrasena'];
        self::$correo       = $data['correo'];        
        self::$tipo_usuario = $data['tipo_usuario'];
        self::$pais         = $data['pais']; 
        self::$nombre       = $data['nombre']; 
        self::$apellidos    = $data['apellidos']; 
        self::$estado       = $data['estado'];   
    }

    /************************Metodos Getter**************************/
    final public static function getId(){      return self::$id;}
    final public static function getUsuario(){ return self::$usuario_red;}
    final public static function getPass(){    return self::$contraseña;}
    final public static function getRol(){     return self::$tipo_usuario;}     
    final public static function getCorreo(){  return self::$correo;}
    final public static function getPais(){    return self::$pais;}
    final public static function getNombre(){  return self::$nombre;}   
    final public static function getApellidos(){  return self::$apellidos;}
    final public static function getEstado(){    return self::$estado;}      
    final public static function getIDToken(){  return self::$IDToken;}       
    
    /**********************************Metodos Setter***********************************/
    final public static function setId(int $id) {       self::$id = $id;}
    final public static function setUsuario(string $usuario){  self::$usuario_red = $usuario;}
    final public static function setPass(string $pass){ self::$contraseña = $pass;}
    final public static function setRol(int $rol){   self::$tipo_usuario = $rol;}      
    final public static function setCorreo(string $correo){ self::$correo = $correo;}
    final public static function setPais(string $pais){ self::$pais = $pais;}
    final public static function setNombre(string $nombre){ self::$nombre = $nombre;}
    final public static function setApellidos(string $apellidos){ self::$apellidos = $apellidos;}
    final public static function setEstado(int $estado){ self::$estado = $estado;}
    final public static function setIDToken(string $IDToken){   self::$IDToken = $IDToken;}    
    
    /**********************Validar si la contaseña antigua es correcta**************************/
    final public static function validateUserPassword(string $IDToken,string $oldPassword)
    {
        try {
            $con = self::getConnection();
            $query = $con->prepare("SELECT contraseña FROM usuarios WHERE IDToken = :IDToken");
            $query->execute([
                ':IDToken' => $IDToken
            ]);

            if ($query->rowCount() == 0) {
                die(json_encode(ResponseHttp::status500()));
            } else {
                $res = $query->fetch(\PDO::FETCH_ASSOC);

                if (Security::validatePassword($oldPassword,$res['password'])){
                    return true;
                } else {
                    return false;
                }               
            }                     
        } catch (\PDOException $e) {
            error_log('UserModel::validateUserPassword -> ' . $e);            
            die(json_encode(ResponseHttp::status500()));
        }
    }

    /*********************************************Login******************************************/
    final public static function login()
    {
        try {
            $con = self::getConnection()->prepare("SELECT * FROM usuarios WHERE usuario_red = :usuario ");
            $con->execute([
                ':usuario' => self::getUsuario()
            ]);

            if ($con->rowCount() === 0) {
                return ResponseHttp::status400('El usuario o contraseña son incorrectos');
            } else {
                foreach ($con as $res) {
                    if (Security::validatePassword(self::getPass() , $res['contraseña'])) {
                            $payload = ['IDToken' => $res['IDToken']];
                            $token = Security::createTokenJwt(Security::secretKey(),$payload);

                            $data = [
                                'nombre'       => Security::decryptName($res['nombre']),
                                'apellidos'    => Security::decryptName($res['apellidos']),
                                'tipo_usuario' => $res['tipo_usuario'],
                                'id'           => $res['id'],
                                'pais'         => $res['pais'],
                                'estado'       => $res['estado'],
                                'token' => $token
                            ];
                            return ResponseHttp::status200($data);
                            //exit;
                    } else {
                        return ResponseHttp::status400('El usuario o contraseña son incorrectos');
                    }
                }
            }
        } catch (\PDOException $e) {
            error_log("UserModel::Login -> " .$e);
            die(json_encode(ResponseHttp::status500()));           
        }
    }

    /*******************************************Registrar usuario************************************************/
    final public static function postSave()
    {
        if (Sql::exists("SELECT usuario_red FROM usuarios WHERE usuario_red = :usuario",":usuario",self::getUsuario())) {  
            return ResponseHttp::status400('El Usuario ya esta registrado');
        } else if (Sql::exists("SELECT correo FROM usuarios WHERE correo = :correo",":correo",self::getCorreo())) {
            return ResponseHttp::status400('El Correo ya esta registrado');
        } else {
            self::setIDToken(hash('sha512',self::getUsuario().self::getCorreo()));            

            try {
                $con = self::getConnection();
                $query1 = "INSERT INTO usuarios (usuario_red,contraseña,correo,tipo_usuario,pais,nombre,apellidos,estado,IDToken) VALUES";
                $query2 = "(:usuario_red,:contrasena,:correo,:tipo_usuario,:pais,:nombre,:apellidos,:estado,:IDToken)";
                $query = $con->prepare($query1 . $query2);
                $query->execute([
                    ':usuario_red' => self::getUsuario(),
                    ':contrasena'  => Security::createPassword(self::getPass()),
                    ':correo'      => Security::cryptEmail(self::getCorreo()),
                    ':tipo_usuario'=> self::getRol(),                    
                    ':pais'        => self::getPais(),
                    ':nombre'      => Security::cryptName(self::getNombre()),
                    ':apellidos'   => Security::cryptName(self::getApellidos()),
                    ':estado'      => self::getEstado(),
                    ':IDToken'     => self::getIDToken()            
                ]);
                if ($query->rowCount() > 0) {
                    return ResponseHttp::status200('Usuario registrado exitosamente');
                } else {
                    return ResponseHttp::status500('No se puede registrar el usuario');
                }
            } catch (\PDOException $e) {
                error_log('UserModel::post -> ' . $e);
                die(json_encode(ResponseHttp::status500()));
            }
        }
    }

     /******************************Actualizar la información del usuario********************************/
     final public static function updateSave()
     {
         self::setIDToken(hash('sha512',self::getUsuario().self::getCorreo()));
         try {
             $con = self::getConnection();
             $query = $con->prepare("UPDATE usuarios set usuario_red = :usuario_red, contraseña = :contrasena, correo = :correo, 
             tipo_usuario = :tipo_usuario, pais = :pais, nombre = :nombre, apellidos= :apellidos, estado = :estado, IDToken = :IDToken 
             where id = :id");           
             $query->execute([
                ':id' => self::getId(),
                ':usuario_red' => self::getUsuario(),
                ':contrasena'  => Security::createPassword(self::getPass()),
                ':correo'      => Security::cryptEmail(self::getCorreo()),
                ':tipo_usuario'=> self::getRol(),                    
                ':pais'        => self::getPais(),
                ':nombre'      => Security::cryptName(self::getNombre()),
                ':apellidos'   => Security::cryptName(self::getApellidos()),
                ':estado'      => self::getEstado(),
                ':IDToken'     => self::getIDToken()
             ]);
             if ($query->rowCount() > 0) {
             return ResponseHttp::status200('El usuario se ha actualizado exitosamente');
             } else {
             return ResponseHttp::status500('Error al actualizar los datos del usuario');
             }
         } catch (\PDOException $e) {
             error_log("UserModel::updateSave -> " . $e);
             die(json_encode(ResponseHttp::status500()));
         }
     }

    /**************************Consultar usuario según nombre de usuario**************************************/
    final public static function getUser()
    {
        try {
            $con = self::getConnection();
            $query = $con->prepare("SELECT * FROM usuarios WHERE usuario_red = :usuario");
            $query->execute([
                ':usuario' => self::getUsuario()
            ]);

            if ($query->rowCount() == 0) {
                return ResponseHttp::status400('El usuario ingresado no esta registrado');
            } else {
                    $rs = $query->fetchAll(\PDO::FETCH_ASSOC);
                    $usuarioBuscado['id']                = $rs[0]['id'];
                    $usuarioBuscado['usuario_red']       = $rs[0]['usuario_red'];
                    $usuarioBuscado['contrasena']        = $rs[0]['contraseña'];
                    $usuarioBuscado['correo']            = Security::decryptEmail($rs[0]['correo']);
                    $usuarioBuscado['nombre_usuario']    = Security::decryptName($rs[0]['nombre']);
                    $usuarioBuscado['apellidos_usuario'] = Security::decryptName($rs[0]['apellidos']);
                    $usuarioBuscado['pais']              = $rs[0]['pais'];
                    $usuarioBuscado['tipo_usuario']      = $rs[0]['tipo_usuario'];
                    $usuarioBuscado['estado']            = $rs[0]['estado'];
                    return $usuarioBuscado;
            }          
        } catch (\PDOException $e) {
            error_log("UserModel::getUser -> ".$e);
            die(json_encode(ResponseHttp::status500('No se pueden obtener los datos del usuario')));
        }
    }

    /*********************************************Validar contraseña de usuario para funcionalidades especificas******************************************/
    final public static function validarPassFuncionalidad()
    {
        try {
            $con = self::getConnection()->prepare("SELECT * FROM usuarios WHERE id = :id ");
            $con->execute([
                ':id' => self::getId()
            ]);

            if ($con->rowCount() === 0) {
                return ResponseHttp::status400('El usuario o contraseña son incorrectos');
            } else {
                foreach ($con as $res) {
                    if (Security::validatePassword(self::getPass() , $res['contraseña'])) {
                            $payload = ['IDToken' => $res['IDToken']];
                            $token = Security::createTokenJwt(Security::secretKey(),$payload);

                            $data = [
                                'nombre'       => Security::decryptName($res['nombre']),
                                'apellidos'    => Security::decryptName($res['apellidos']),
                                'tipo_usuario' => $res['tipo_usuario'],
                                'id'           => $res['id'],
                                'pais'         => $res['pais'],
                                'estado'       => $res['estado'],
                                'token' => $token
                            ];
                            return ResponseHttp::status200($data);
                            //exit;
                    } else {
                        return ResponseHttp::status400('El usuario o contraseña son incorrectos');
                    }
                }
            }
        } catch (\PDOException $e) {
            error_log("UserModel::validarPassFuncionalidad -> " .$e);
            die(json_encode(ResponseHttp::status500()));           
        }
    }
        
}