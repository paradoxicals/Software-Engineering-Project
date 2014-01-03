<?php    
 $gelenBaslangicKm=$_GET['baslangic'];
 $gelenBitisKm=$_GET['bitis'];
 $gelenYolId=$_GET['yolid'];  
 $gelenyapimyili=$_GET['yil']; 
 $gelenegim=$_GET['egim']; 
  
$db_handle =  "host=localhost port=5432 dbname=postgis20 user=postgres password=qaqaqa"; 
$dbconn = pg_connect($db_handle); 
$query = "select ST_Length(geom) as yoluzunlugu from bilecikyollardb where objectid='$gelenYolId'";  
 echo $query;
 $result = pg_query($dbconn, $query); 
   if  (!$result) {
   echo "query did not execute";
  }
  if (pg_num_rows($result) == 0) {
   echo "0 records";
  }
  else {
   while ($row = pg_fetch_array($result)) {
   
   $basla=$gelenBaslangicKm/($row["yoluzunlugu"]);
   $bitir=$gelenBitisKm/($row["yoluzunlugu"]);
 
$sorgu="insert into egimyol_900913(anaobjeid,kmbaslangic,kmbitis, yapimyili,egim,geom) values ('$gelenYolId','$gelenBaslangicKm','$gelenBitisKm','$gelenyapimyili','$gelenegim',(select ST_Line_substring(geom,$basla,$bitir) from (select * from bilecikyollardb)  as foo where objectid='$gelenYolId'))";
 echo $sorgu;
 pg_query($dbconn, $sorgu);  
   }
  }
?>