<?php
ini_set('display_errors','0'); error_reporting(0);
header("Content-Type:text/html; charset=utf8"); 

$conn_string = "host=localhost port=5432 dbname=postgis user=postgres password=123";
$dbconn = pg_connect($conn_string); 
$result=""; 
$result = pg_query($dbconn, "SELECT
 secmen_recid,secmen_yasi,secmen_cinsiyeti,yasadigi_bolge,yasadigi_il,kullandıgı_oy
FROM
  secmen"); 
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