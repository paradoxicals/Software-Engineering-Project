<?php   

$db_handle =  "host=localhost port=5432 dbname=postgis20 user=postgres password=qaqaqa"; 
$dbconn = pg_connect($db_handle); 
 
   $gelenKayitID=$_POST['id'];
   $gelenBaslangicKm=$_POST['baslangic'];
   $gelenBitisKm=$_POST['bitis'];
   $gelenYolId=$_POST['yolid'];  
   $gelenyapimyili=$_POST['yil']; 
   
  
    $query = "UPDATE bozukyol_900913 SET anaobjeid = '$gelenYolId', kmbaslangic = '$gelenBaslangicKm', kmbitis = '$gelenBitisKm', yapimyili = '$gelenyapimyili'  WHERE gid=$gelenKayitID";
    $result = pg_query($dbconn,$query);
    echo '1';        // success 
 
?>