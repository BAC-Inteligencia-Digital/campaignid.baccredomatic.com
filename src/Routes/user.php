<?php

    use App\Config\ResponseHttp;
    use App\Controllers\UserController;

    /*************Parametros enviados por la URL*******************/
    $params  = explode('/' ,$_GET['route']);

    /*************Instancia del controlador de usuario**************/
    $app = new UserController();

    /*************Rutas***************/
    $app->postSave('user/');
    $app->getUser("user/{$params[1]}/");
    $app->updateSave('user/update/');
    $app->validatePass('user/passvalidate/');

    /****************Error 404*****************/
    echo json_encode(ResponseHttp::status404());