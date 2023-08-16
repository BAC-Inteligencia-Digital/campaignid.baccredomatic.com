<?php

    use App\Config\ResponseHttp;
    use App\Controllers\BacIDController;

    /*************Parametros enviados por la URL*******************/
    $params  = explode('/' ,$_GET['route']);

    /*************Instancia del controlador de usuario**************/
    $app = new BacIDController();

    /*************Rutas***************/
    $app->postSave('bacid/');
    $app->postSaveSub('bacid/sub/');
    $app->getBACID('bacid/detail/');
    $app->getSUBBACID('bacid/detailsub/');
    $app->getBacIDFilters('bacid/filters/');
    $app->getBacIDHistPais('bacid/filterpais/');
    $app->getBacIDDetalle("bacid/detail/{$params[2]}/");
    $app->getSubBacIDDetalle("bacid/detailsub/{$params[2]}/");
    $app->deleteBACID("bacid/delete/{$params[2]}/");

    /****************Error 404*****************/
    echo json_encode(ResponseHttp::status404());