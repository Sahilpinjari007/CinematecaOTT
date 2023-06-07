<?php
          

// get connection
require 'connection.php';

    $seriesImg = trim($_POST["contentImg"]);
    $seriesTitle = trim($_POST["contentTitle"]);
    $seriesDesc = trim($_POST["contentDesc"]);
    $seriesDur = trim($_POST["contentDur"]);
    $seriesDate = trim($_POST["contentDate"]);
    $seriesTableN = trim($_POST["contentTableN"]);
    $seriesEPUrl = trim($_POST["contentEpUrl"]);
    $seriesEPNo = trim($_POST["contentEpNo"]);


    $sql = "INSERT INTO `$seriesTableN`(`EPImg`, `EPTitle`, `EPDescri`, `EPDura`, `EPDate`, `EPUrl`, `EPNo`) VALUES 
    ('$seriesImg','$seriesTitle','$seriesDesc','$seriesDur','$seriesDate', '$seriesEPUrl', '$seriesEPNo')";
    
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