<?php

$localhost = 'localhost';      
$user = 'root';
$pass = '';
$database = 'crud';


$connection = mysqli_connect($localhost, $user, $pass, $database);

if ($connection) {
    echo 'Connection stablished';
}

else{
    die('Error');
}

?>