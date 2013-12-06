<?php     
$gelenID=$_GET['bolge_id'];  
$db_handle =  "host=localhost port=5432 dbname=postgis user=postgres password=123"; 
$dbconn = pg_connect($db_handle);    
$sorgu= "delete from bolge where bolge_id='$gelenID'";  
pg_query($dbconn, $sorgu); 
?>