<?php

    use App\Config\ResponseHttp;
    use App\Controllers\SelectController;

    $params  = explode('/' ,$_GET['route']);

    $app = new SelectController();
    /***********************Rutas*********************/
    $app->getPais("select/pais/");
    $app->getCategoria("select/categoria/");
    $app->getProducto("select/producto/");
    $app->getMultiproducto("select/multiproducto/");
    $app->getObjetivo("select/objetivo/");
    $app->getPortafolio("select/portafolio/");
    $app->getOrigen("select/origen/");
    $app->getCanal("select/canal/");
    $app->getCanalDigital("select/canaldigital/");
    $app->getTipoCampana("select/tipocampana/");
    $app->getGrupoAnuncio("select/grupoanuncio/");
    $app->getTipoAnuncio("select/tipoanuncio/");

    /****************Error 404*****************/
    echo json_encode(ResponseHttp::status404());