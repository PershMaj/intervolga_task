<?php
require_once 'db_config.php';

$country = htmlspecialchars(trim($_GET['country']));
$getCountries = $_GET['getCountries'];
$message = '';
try {
    if($link = new PDO("mysql:host=$SERVER;dbname=$DB_NAME", $USER, $PASSWORD)){
        if($country){
            $stmt = $link->prepare("insert into countries (name) values (:name)");
            if($stmt->execute(array('name' => $country))){
                echo 'ok';
            } else {
                echo 'error';
            }   
        } elseif ($getCountries) {
            if($result = $link->query('select name from countries')){
                while($temp = $result->fetch()){
                    $message .= $temp['name'].'$';
                }
                echo substr($message, 0, -1);
            } else {
                echo 'error';
            }
        }
        $pdo = null;
    } else {
        echo 'error';
    }
} catch (PDOException $e) {
    echo 'error';
    die();
}
