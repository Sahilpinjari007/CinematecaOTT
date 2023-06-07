<?php

    $hostName = 'localhost';
    $userName = 'root';
    $userPass = '';
    $dbName = 'cinemateca_movies';

    
    // Connect to the MySQL database
    $con = mysqli_connect($hostName, $userName, $userPass, $dbName);


    // Check connection
    if (!$con) {
        $response = array("response"=>"Failed to connect to MySQL: " . mysqli_connect_error());
        exit();
    }

?>