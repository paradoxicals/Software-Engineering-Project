<?php

ini_set('display_errors','0'); error_reporting(0);
header("Content-Type:text/html; charset=utf8");
$loginUsername = isset($_POST["loginUsername"]) ? $_POST["loginUsername"] : "";
 

$coded_sifre=md5($_POST["loginPassword"]); 
$conn_string = "host=localhost port=5432 dbname=postgis20 user=postgres password=qaqaqa";
$dbconn = pg_connect($conn_string);
$kayitsayisi=0;

$ad="";
$soyad="";
$result = pg_query($dbconn, "SELECT
  id,ad,soyad
FROM
  public.uyetemelbilgileri where kullaniciadi='$loginUsername' AND sifre='$coded_sifre'");
 
$res = array();
while (($row =pg_fetch_assoc($result)) != null) {
    $res[] = $row;
	$ad=$row["ad"];
	$soyad=$row["soyad"];
	$kayitsayisi=1;
}
$succes;
if($kayitsayisi==1){
$succes = array("success" => "true");
}else{$succes = array("failure" => "true");}


$allRows = $res;

$ExtAllRows["roots"] = $allRows;
session_start();
$_SESSION['user']=$loginUsername;
$_SESSION['ad']=$ad;
$_SESSION['soyad']=$soyad;
$result = array_merge($succes, $ExtAllRows);
echo json_encode($succes);
//echo json_encode($result);

pg_close($dbconn);