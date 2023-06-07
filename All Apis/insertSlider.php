<?php
          

// get connection
require 'connection.php';

    $sliderImg = trim($_POST["contentImg"]);
    $sliderTitle = trim($_POST["contentTitle"]);
    $sliderDis = trim($_POST["contentDes"]);
    $sliderRat = trim($_POST["contentRate"]);
    $sliderGen = trim($_POST["contentGen"]);
    $sliderDur = trim($_POST["contentDur"]);
    $movieId = trim($_POST["contentContId"]);


    $sql = "INSERT INTO `bigsliderimge`(`sliderImg`, `sliderDur`, `sliderRating`, `sliderGen`, `sliderTitle`, `sliderDiscription`, `movieId`) 
    VALUES ('$sliderImg','$sliderDur','$sliderRat','$sliderGen','$sliderTitle','$sliderDis','$movieId')";
    
    $result = mysqli_query($con, $sql);


    if ($result) {
        $response['error'] = "000";
        $response['massage'] = "Content Inserted Successfull!";
    }
    else{
        $response['error'] = "001";
        $response['massage'] = "Content Inserted failed! ". mysqli_error($con);       
    }
    echo json_encode($response);

    // Close the database connection
    mysqli_close($con);

?>