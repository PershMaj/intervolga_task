<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/php/db_config.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/php/funcs.php';
/**
 * @var string $dsn Contains db connection settings
 */

try {
    if($link = new PDO($dsn)){
        if(isset($_GET['country'])){
            $country = htmlspecialchars(trim($_GET['country']));
            echo AddCountry($link, $country);
        } elseif(isset($_GET['getCountries'])){
            $getCountries = $_GET['getCountries'];
            print_r(GetCountryList($link));
        }
        $pdo = null;
    } else {
        echo 'error';
    }
} catch (PDOException $e) {
    echo 'error';
    die();
}
