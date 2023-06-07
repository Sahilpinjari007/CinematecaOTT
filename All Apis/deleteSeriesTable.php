<?php

// get connection
    require 'connection.php';

    $tableName = trim($_POST["tableName"]);


    $sql = "DROP TABLE IF EXISTS $tableName";

    if ($con->query($sql) === TRUE) {
        $response['error'] = "000";
        $response['massage'] = "table dropped Successfull!";
    } 

    else {
        $response['error'] = "001";
        $response['massage'] = "Error dropped table: " . $conn->error;
    }

    echo json_encode($response);
    $con->close();
?>
