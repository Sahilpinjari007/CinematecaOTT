<?php

// get connection
require 'connection.php';


    $sql = "SELECT * FROM `maincontent`;";
    $result = $con->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);

    if(empty($row)){

        $response = array("status"=>"0", "data"=>$row);
    }
    else{
        $response = array("status"=>"1", "data"=>$row);
    }



    echo json_encode($response);

    // Close the database connection
    mysqli_close($con);

?>