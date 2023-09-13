<?php

    use App\Config\ResponseHttp;
    use App\Controllers\BacIDController;

    /*************Parametros enviados por la URL*******************/
    $params  = explode('/' , $_SERVER['REQUEST_URI']);

    /*************Instancia del controlador de usuario**************/
    $app = new BacIDController();

    /*************Rutas***************/
    $app->postSave('bacid/');
    $app->postSaveSub('bacid/sub/');
    $app->getBACID('bacid/detail/');
    $app->getSUBBACID('bacid/detailsub/');
    $app->getBacIDFilters('bacid/filters/');
    $app->getBacIDHistPais('bacid/filterpais/');
    $app->getBacIDDetalle("bacid/detail/{$params[3]}/");
    $app->getSubBacIDDetalle("bacid/detailsub/{$params[3]}/");
    $app->deleteBACID("bacid/delete/{$params[3]}/");

    /****************Error 404*****************/
    echo json_encode(ResponseHttp::status404());