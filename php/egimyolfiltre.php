<?php
ini_set('display_errors','0'); error_reporting(0);
header("Content-Type:text/html; charset=utf8");
$fk_yolid = $_POST['anaobjeid'];

$conn_string = "host=localhost port=5432 dbname=postgis20 user=postgres password=qaqaqa";
$dbconn = pg_connect($conn_string);



$result="";

if($fk_yolid =="")
{

$result = pg_query($dbconn, "SELECT
 gid, anaobjeid,kmbaslangic,kmbitis, yapimyili,egim 
FROM
  egimyol_900913");
  
  } 
else{

$result = pg_query($dbconn, "SELECT
 gid, anaobjeid,kmbaslangic,kmbitis, yapimyili,egim  
FROM
  egimyol_900913 where anaobjeid='$fk_yolid'"); 
  
  }
   
   
 
$res = array();
while (($row =pg_fetch_assoc($result)) != null) {
    $res[] = $row;
}

$succes = array("success" => "true");

$allRows = $res;

$ExtAllRows["roots"] = $allRows;

$result = array_merge($succes, $ExtAllRows);

echo json_encode($result);

pg_close($dbconn);