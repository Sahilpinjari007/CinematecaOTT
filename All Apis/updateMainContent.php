<?php

// get connection
require 'connection.php';

    $contentId = trim($_POST["contentId"]);
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


    $sql = "UPDATE `maincontent` SET `img`='$contentImg',`down_img`='$contentPosterImg',`title`='$contentTitle',`description`='$contentDes',
    `genre1`='$contentgen1',`genre2`='$contentgen2',`genre3`='$contentgen3',`genre4`='$contentgen4',`genre5`='$contentgen5',`genre6`='$contentgen6',`genre7`='$contentgen7',
    `genre8`='$contentgen8',`genre9`='$contentgen9',`genre10`='$contentgen10',`genre11`='$contentgen11',`genre12`='$contentgen12',`genre13`='$contentgen13',`genre14`='$contentgen14',
    `genre15`='$contentgen15',`year`='$contentyear',`rate`='$contentrate',`url`='$contenturl',`type`='$contenttype',`episodesTable`='$contentEpTableN',
    `downloadWebsiteUrl`='$contentDonloaWebUrl',`downloadurl`='$contentDonloaWebUrl',`movieAgeRestriction`='$contentAgeReg',`movieDuration`='$contentDurati',
    `contentType`='$contentContType' WHERE id = '$contentId'";
    
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