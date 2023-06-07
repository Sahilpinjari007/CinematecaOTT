<?php

// get connection
require 'connection.php';


    $contentImg = trim($_POST["contentImg"]);
    $contentPosterImg = trim($_POST["contentPosterImg"]);
    $contentTitle = trim($_POST["contentTitle"]);
    $contentDes = trim($_POST["contentDes"]);
    $contentgen1 = trim($_POST["contentgen1"]);
    $contentgen2 = trim($_POST["contentgen2"]);
    $contentgen3 = trim($_POST["contentgen3"]);
    $contentgen4 = trim($_POST["contentgen4"]);
    $contentgen5 = trim($_POST["contentgen5"]);
    $contentgen6 = trim($_POST["contentgen6"]);
    $contentgen7 = trim($_POST["contentgen7"]);
    $contentgen8 = trim($_POST["contentgen8"]);
    $contentgen9 = trim($_POST["contentgen9"]);
    $contentgen10 = trim($_POST["contentgen10"]);
    $contentgen11 = trim($_POST["contentgen11"]);
    $contentgen12 = trim($_POST["contentgen12"]);
    $contentgen13 = trim($_POST["contentgen13"]);
    $contentgen14 = trim($_POST["contentgen14"]);
    $contentgen15 = trim($_POST["contentgen15"]);
    $contentyear = trim($_POST["contentyear"]);
    $contentrate = trim($_POST["contentrate"]);
    $contenturl = trim($_POST["contenturl"]);
    $contenttype = trim($_POST["contenttype"]);
    $contentEpTableN = trim($_POST["contentEpTableN"]);
    $contentDonloaWebUrl = trim($_POST["contentDonloaWebUrl"]);
    $contentDonloaUrl = trim($_POST["contentDonloaUrl"]);
    $contentAgeReg = trim($_POST["contentAgeReg"]);
    $contentDurati = trim($_POST["contentDurati"]);
    $contentContType = trim($_POST["contentContType"]);


    $sql = "INSERT INTO `maincontent`(`img`, `down_img`, `title`, `description`, `genre1`, `genre2`, `genre3`, `genre4`, `genre5`, `genre6`, 
    `genre7`, `genre8`, `genre9`, `genre10`, `genre11`, `genre12`, `genre13`, `genre14`, `genre15`, `year`, `rate`, `url`, `type`, `episodesTable`, 
    `downloadWebsiteUrl`, `downloadurl`, `movieAgeRestriction`, `movieDuration`, `contentType`) VALUES 
    
    ('$contentImg','$contentPosterImg','$contentTitle', '$contentDes','$contentgen1','$contentgen2','$contentgen3','$contentgen4','$contentgen5',
    '$contentgen6','$contentgen7',
    '$contentgen8','$contentgen9','$contentgen10','$contentgen11','$contentgen12','$contentgen13','$contentgen14','$contentgen15','$contentyear',
    '$contentrate','$contenturl',
    '$contenttype','$contentEpTableN','$contentDonloaWebUrl','$contentDonloaUrl','$contentAgeReg','$contentDurati','$contentContType')";

 
    $result = mysqli_query($con, $sql);


    if ($result) {
        $sql = "SELECT id FROM maincontent WHERE url = '$contenturl';";
        $result2 = mysqli_query($con, $sql);
        $row = mysqli_fetch_row($result2);

        $response['error'] = "000";
        $response['massage'] = "Content Inserted Successfull!";
        $response['YourContentId'] = $row;
    }
    else{
        $response['error'] = "001";
        $response['massage'] = "Content Inserted failed! ". mysqli_error($con);       
    }

    echo json_encode($response);

    // Close the database connection
    mysqli_close($con);

?>