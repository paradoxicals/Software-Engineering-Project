<?php

ini_set('display_errors','0'); error_reporting(0);
header("Content-Type:text/html; charset=utf8");

   $secmen_yasi=$_GET['secmen_yasi'];
   $secmen_cinsiyeti=$_GET['secmen_cinsiyeti'];
   $yasadigi_bolge=$_GET['yasadigi_bolge'];  
   $yasadigi_il=$_GET['yasadigi_il']; 
   $kullanilan_oy=$_GET['kullanilan_oy'];  

$conn_string = "host=localhost port=5432 dbname=postgis user=postgres password=123";
$dbconn = pg_connect($conn_string); 
$sorgu= "insert into eczane(secmen_yasi,secmen_cinsiyeti,yasadigi_bolge,yasadigi_il,kullanılan_oy)
              values ('$secmen_yasi','$secmen_cinsiyeti','$yasadigi_bolge','$yasadigi_il','$kullanilan_oy')"; 

pg_query($dbconn, $sorgu); 
pg_close($dbconn);
?>