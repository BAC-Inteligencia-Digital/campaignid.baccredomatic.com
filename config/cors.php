<?php

    $dominioPermitido = "https://campaignid.baccredomatic.com";
    header("Access-Control-Allow-Origin: $dominioPermitido");
    header("Access-Control-Allow-Headers: content-type");
    header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

?>