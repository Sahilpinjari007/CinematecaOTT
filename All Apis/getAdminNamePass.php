<?php
          

// get connection
require 'connection.php';



    $sql = "SELECT * FROM `adminpassusername`";
    
    $result = $con->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);

    if(empty($row)){
        $response['error'] = "000";
        $response['data'] = $row;
    }
    else{
        $response['error'] = "001";
        $response['data'] = $row;
    }

    
    echo json_encode($response);

    // Close the database connection
    mysqli_close($con);

?>