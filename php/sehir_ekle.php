<?php
ini_set('display_errors','0'); error_reporting(0);
header("Content-Type:text/html; charset=utf8");

   $sehir_adi=$_GET['sehir_adi'];
   $bulundugu_bolge=$_GET['bulundugu_bolge'];
   $sahip_oldugu_ilceler=$_GET['sahip_oldugu_ilceler'];  
    
$conn_string = "host=localhost port=5432 dbname=postgis user=postgres password=123";
$dbconn = pg_connect($conn_string); 
$sorgu= "insert into sehir(sehir_adi,bulundugu_bolge,sahip_oldugu_ilceler)
              values ('$sehir_adi','$bulundugu_bolge','$sahip_oldugu_ilceler')"; 
pg_query($dbconn, $sorgu); 
pg_close($dbconn);
?>