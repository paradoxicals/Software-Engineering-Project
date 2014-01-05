<?php   
ini_set('display_errors','0'); error_reporting(0); 
header("content-type:application/json"); 
$gelenYolId=$_GET['yolid']; 
 
$db_handle =  "host=localhost port=5432 dbname=postgis20 user=postgres password=qaqaqa"; 
$dbconn = pg_connect($db_handle);  
 
	
	 $result3 = pg_query($dbconn, "SELECT ST_Extent(geom) as xy FROM koy_yerlesim_nonzm where gid='$gelenYolId'"); 
 
 while ($row = pg_fetch_array($result3)) { 
    $XY=$row["xy"];  
    }
	 echo  json_encode($XY)
	 
?>