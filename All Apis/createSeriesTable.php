<?php

// get connection
    require 'connection.php';

    $tableName = trim($_POST["tableName"]);


    $sql = "CREATE TABLE $tableName (
        EPid int PRIMARY KEY AUTO_INCREMENT,
        EPImg varchar (500),
        EPTitle varchar (100),
        EPDescri varchar (250),
        EPDura varchar (100),
        EPDate varchar (100),
        EPUrl varchar (500),
        EPNo varchar (50)
    )";

    if ($con->query($sql) === TRUE) {
        $response['error'] = "000";
        $response['massage'] = "table creating Successfull!";
    } 

    else {
        $response['error'] = "001";
        $response['massage'] = "Error creating table: " . $conn->error;
    }

    echo json_encode($response);
    $con->close();
?>
