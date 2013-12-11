<?php     
$gelenID=$_GET['id']; 
$db_handle =  "host=localhost port=5432 dbname=postgis20 user=postgres password=qaqaqa"; 
$dbconn = pg_connect($db_handle);   
$sorgu= "delete from uyetemelbilgileri where id='$gelenID'";  
pg_query($dbconn, $sorgu);   
?>