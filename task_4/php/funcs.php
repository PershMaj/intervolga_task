<?php
/**
 * Created by PhpStorm.
 * User: dmitry
 * Date: 03.08.18
 * Time: 12:51
 */

/**
 * add country to db
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
 * get all countries from db
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
