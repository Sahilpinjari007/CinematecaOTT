<?php
          

// get connection
require 'connection.php';

    $adminName = trim($_POST["adminName"]);
    $adminPass = trim($_POST["adminPass"]);


    $sql = "UPDATE `adminpassusername` SET `userName`='$adminName',`userPass`='$adminPass'";

    $result = mysqli_query($con, $sql);


    if ($result) {
        $response['error'] = "000";
        $response['massage'] = "Update SuccessFull UserName and Password!";
    }
    else{
        $response['error'] = "001";
        $response['massage'] = "Update failed! ". mysqli_error($con);       
    }

    echo json_encode($response);

    // Close the database connection
    mysqli_close($con);

?>