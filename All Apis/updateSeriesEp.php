<?php
          

// get connection
require 'connection.php';

    $EPid = trim($_POST["contentid"]);
    $seriesImg = trim($_POST["contentImg"]);
    $seriesTitle = trim($_POST["contentTitle"]);
    $seriesDesc = trim($_POST["contentDesc"]);
    $seriesDur = trim($_POST["contentDur"]);
    $seriesDate = trim($_POST["contentDate"]);
    $seriesTableN = trim($_POST["contentTableN"]);
    $seriesEPUrl = trim($_POST["contentEpUrl"]);
    $seriesEPNo = trim($_POST["contentEpNo"]);


    $sql = "UPDATE `$seriesTableN` SET `EPImg`='$seriesImg',
    `EPTitle`='$seriesTitle',`EPDura`='$seriesDur',`EPDate`='$seriesDate', `EPUrl`='$seriesEPUrl',
    `EPNo`='$seriesEPNo', `EPDescri`='$seriesDesc' WHERE EPid = " .$EPid;

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