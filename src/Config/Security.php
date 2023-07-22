<?php

namespace App\Config;

use Dotenv\Dotenv;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Security {

    private static $jwt_data;//Propiedad para guardar los datos decodificados del JWT 

    /************Acceder a la secret key del JWT*************/
    final public static function secretKey()
    {
        $dotenv = Dotenv::createImmutable(dirname(__DIR__,2));
        $dotenv->load();
        return $_ENV['SECRET_KEY'];
    }

    
    /********Encriptar la contraseña del usuario***********/
    final public static function createPassword(string $pw)
    {
        $pass = password_hash($pw,PASSWORD_DEFAULT);
        return $pass;
    }

    /*****************Validar que las contraseñas coincidan****************/
    final public static function validatePassword(string $pw , string $pwh)
    {
        if (password_verify($pw,$pwh)) {
            return true;
        } else {
            error_log('La contraseña es incorrecta');
            return false;
        }       
    }

    /************************Crear JWT***********************************/
    final public static function createTokenJwt(string $key , array $data)
    {
        $payload =  [
            "iat" => time(),
            "exp" => time() + 60,
            "data" => $data
        ];

        $jwt = JWT::encode($payload,$key,'HS256');
        return $jwt;
    }

    /*********************Validar que el JWT sea correcto********************/
    final public static function validateTokenJwt(string $key)
    {
        if (!isset(getallheaders()['Authorization'])) {
            die(json_encode(ResponseHttp::status400('El token de acceso es  requerido')));            
        }
        try {
            $jwt = explode(" " ,getallheaders()['Authorization']);
            $data = JWT::decode($jwt[1], new Key($key, 'HS256'));;
            self::$jwt_data = $data;
            return $data;
    
        } catch (\Exception $e) {
            error_log('Token invalido o expiro'. $e);
            die(json_encode(ResponseHttp::status401('Token invalido o expirado')));
        }
    }

    /***************Devolver los datos del JWT decodificados****************/
    final public static function getDataJwt()
    {
        $jwt_decoded_array = json_decode(json_encode(self::$jwt_data),true);
        return $jwt_decoded_array['data'];
    }
} 