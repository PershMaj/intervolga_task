<?php

require_once 'db_config.php';
/**
 * @var string $dsn Contains db connection settings
 */

/**
 * @param $link
 * @param $country
 * @return string
 */
function AddCountry($link, $country){
    $stmt = $link->prepare("insert into country (name) values (:name)");
    if($stmt->execute(array('name' => $country))){
        $lastId = $link->lastInsertId();
        return $link->query("select name from country where id=$lastId")
            ->fetch()['name'];
    } else {
        return 'error';
    }
}

/**
 * @param $link
 * @return string
 */
function GetCountryList($link){
    $arCountry = array();
    if($result = $link->query('select name from country')){
        while($temp = $result->fetch()){
            array_push($arCountry, array($temp['name']));
        }
        $countryJson = new stdClass();
        $countryJson->data = $arCountry;
        return json_encode($countryJson);
    } else {
        return 'error';
    }
}

if($_GET['country']){
    $country = htmlspecialchars(trim($_GET['country']));
} else {
    $country = '';
}
if($_GET['getCountries']){
    $getCountries = $_GET['getCountries'];
} else {
    $getCountries = '';
}

try {
    if($link = new PDO($dsn)){
        if($country){
            echo AddCountry($link, $country);
        } elseif ($getCountries) {
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
