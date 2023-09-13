<?php

    use App\Config\ResponseHttp;
    use App\Controllers\OptionController;

    /*************Parametros enviados por la URL*******************/
    $params  = explode('/' , $_SERVER['REQUEST_URI']);
  
    $app = new OptionController();
    /***********************Rutas*********************/
    $app->getAllPais("option/pais/");
    $app->getAllCategoria("option/categoria/");
    $app->getAllProducto("option/producto/");
    $app->getAllMultiproducto("option/multiproducto/");
    $app->getAllObjetivo("option/objetivo/");
    $app->getAllPortafolio("option/portafolio/");
    $app->getAllOrigen("option/origen/");
    $app->getAllCanal("option/canal/");
    $app->getAllCanalDigital("option/canaldigital/");
    $app->getAllTipoCampana("option/tipocampana/");
    $app->getAllGrupoAnuncio("option/grupoanuncio/{$params[3]}/");
    $app->getAllTipoAnuncio("option/tipoanuncio/{$params[3]}/");

    /****************Error 404*****************/
    echo json_encode(ResponseHttp::status404());