<?php

    use App\Config\ResponseHttp;
    use App\Controllers\OptionController;

    /*************Parametros enviados por la URL*******************/
    $params  = explode('/' , $_GET['route']);
  
    $app = new OptionController();
    /***********************Rutas*********************/
    $app->getAllPais("option/pais/");
    $app->getAllCategoria("option/categoria/");
    $app->getAllProducto("option/producto/{$params[2]}/");
    $app->getAllMultiproducto("option/multiproducto/");
    $app->getAllObjetivo("option/objetivo/");

    /****************Error 404*****************/
    echo json_encode(ResponseHttp::status404());