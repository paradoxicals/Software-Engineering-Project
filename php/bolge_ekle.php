<?php
ini_set('display_errors','0'); error_reporting(0);
header("Content-Type:text/html; charset=utf8");

   $bolge_adi=$_GET['bolge_adi'];
   $bolgedeki_ilceler=$_GET['bolgedeki_ilceler'];
    
$conn_string = "host=localhost port=5432 dbname=postgis user=postgres password=123";
$dbconn = pg_connect($conn_string); 
$sorgu= "insert into bolge(bolge_adi,bolgedeki_ilceler)
              values ('$bolge_adi','$bolgedeki_ilceler')"; 
pg_query($dbconn, $sorgu); 
pg_close($dbconn);
?>