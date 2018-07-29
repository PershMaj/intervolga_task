<?php

// погрешность при одинаковых элементах

function LinearSearch($array, $value){
    foreach($array as $key => $arItem){
        if($arItem == $value){
            return "key = $key";
        }
    }
    return "not found";
}

function BinarySearch($array, $value){
    $subArray = array();
    $keys = array_keys($array);
    if(count($array) === 1){
        if($array[$keys[0]] == $value){
            return "key = $keys[0]";
        } else {
            return "No such element";
        }
    }
    $middleKey = ceil(($keys[count($keys)-1] + $keys[0])/2);
    $numElem = ceil(count($array)/2);
    $subArray = array_chunk($array, $numElem, TRUE);
    if($array[$middleKey] > $value){
        return BinarySearch($subArray[0], $value);
    } else if($array[$middleKey] < $value){
        return BinarySearch($subArray[1], $value);
    } else {
        return "key = $middleKey";
    }
}

$array = array();
for($i=0;$i<1000;$i++){
    $array[$i] = rand(0, 1000);
}
sort($array);
echo "Binary ".BinarySearch($array, 700);
echo "\nLinear ".LinearSearch($array, 700) ."\n";

