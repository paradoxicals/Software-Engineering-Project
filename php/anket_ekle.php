<?php
ini_set('display_errors','0'); error_reporting(0);
header("Content-Type:text/html; charset=utf8");

   $anket_tarihi=$_GET['anket_tarihi'];
   $anket_cesidi=$_GET['anket_cesidi'];
   $anket_yapilanbolge=$_GET['anket_yapilanbolge'];  
   $anket_yapilanil=$_GET['anket_yapilanil']; 
   $anket_sonuclari=$_GET['anket_sonuclari'];  
$conn_string = "host=localhost port=5432 dbname=postgis user=postgres password=123";
$dbconn = pg_connect($conn_string); 
$sorgu= "insert into anket(anket_tarihi,anket_cesidi,anket_yapilanbolge,anket_yapilanil,anket_sonuclari)
              values ('$anket_tarihi','$anket_cesidi','$anket_yapilanbolge','$anket_yapilanil','$anket_sonuclari')"; 
pg_query($dbconn, $sorgu); 
pg_close($dbconn);
?>