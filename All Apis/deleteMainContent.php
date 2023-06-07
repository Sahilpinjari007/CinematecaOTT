<?php

// get connection
    require 'connection.php';


    $contentId = trim($_POST["itemId"]);
    $sql = "DELETE FROM `maincontent` WHERE id = " .$contentId;
    $con->query($sql);
    


    if ($con->affected_rows > 0) {
        echo json_encode(['status'=>'000', 'massage'=>"Delete Content Successfull!"]);
    }
    else{
        echo json_encode(['status'=>'001', 'massage'=>"Delete Content failed!". mysqli_error($con)]);     
    }

    // Close the database connection
    mysqli_close($con);

?>