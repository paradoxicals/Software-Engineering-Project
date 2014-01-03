<?php   

$db_handle =  "host=localhost port=5432 dbname=postgis20 user=postgres password=qaqaqa"; 
$dbconn = pg_connect($db_handle); 
 
   $gelenKayitID=$_POST['id'];
   
   $gelenObjectID=$_POST['objectid'];
   $gelenAdi=$_POST['adi'];  
	
    $query = "UPDATE koy_yerlesim_nonzm SET objectid ='$gelenObjectID', adi ='$gelenAdi' WHERE gid='$gelenKayitID'";
    $result = pg_query($dbconn,$query);
    echo '1';        // success 
 
?>