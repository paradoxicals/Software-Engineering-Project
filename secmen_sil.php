<?php     
$gelenID=$_GET['secmen_recid'];  
$db_handle =  "host=localhost port=5432 dbname=postgis user=postgres password=123"; 
$dbconn = pg_connect($db_handle);    
$sorgu= "delete from secmen where secmen_recid='$gelenID'";  
pg_query($dbconn, $sorgu); 
?>