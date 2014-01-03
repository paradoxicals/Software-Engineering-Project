<?php     
$gelenGID=$_GET['gid'];  
$db_handle =  "host=localhost port=5432 dbname=postgis20 user=postgres password=qaqaqa"; 
$dbconn = pg_connect($db_handle);    
$sorgu= "delete from bozukyol_900913 where gid='$gelenGID'";  
pg_query($dbconn, $sorgu); 
?>