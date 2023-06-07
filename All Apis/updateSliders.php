<?php
          

// get connection
require 'connection.php';

    $sliderId = trim($_POST["contentId"]);
    $sliderImg = trim($_POST["contentImg"]);
    $sliderTitle = trim($_POST["contentTitle"]);
    $sliderDis = trim($_POST["contentDes"]);
    $sliderRat = trim($_POST["contentRate"]);
    $sliderGen = trim($_POST["contentGen"]);
    $sliderDur = trim($_POST["contentDur"]);
    $movieId = trim($_POST["contentContId"]);


    $sql = "UPDATE `bigsliderimge` SET `sliderImg`='$sliderImg',`sliderDur`='$sliderDur',`sliderRating`='$sliderRat',
    `sliderGen`='$sliderGen',`sliderTitle`='$sliderTitle',`sliderDiscription`='$sliderDis',`movieId`='$movieId' WHERE id = '$sliderId';";
    
    $result = mysqli_query($con, $sql);


    if ($result) {
        $response['error'] = "000";
        $response['massage'] = "Update content Successfull!";
    }
    else{
        $response['error'] = "001";
        $response['massage'] = "Update content failed! ". mysqli_error($con);       
    }

    echo json_encode($response);

    // Close the database connection
    mysqli_close($con);

?>