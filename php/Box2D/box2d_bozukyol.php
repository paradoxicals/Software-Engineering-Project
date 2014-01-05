<?php   
ini_set('display_errors','0'); error_reporting(0); 
header("content-type:application/json"); 
$gelenYolId=$_GET['yolid']; 
 
$db_handle =  "host=localhost port=5432 dbname=postgis20 user=postgres password=qaqaqa"; 
$dbconn = pg_connect($db_handle);  

$sorgu1="SELECT ST_AsText(foo) as xxx FROM
(
SELECT ST_LineMerge(geom) as foo from bozukyol_900913  WHERE  gid='$gelenYolId'  ) as xxx";
$linestring="";
$tranformedXY="";
$XY=""; 
   
  $result2 = pg_query($dbconn, $sorgu1); 
  
   while ($row = pg_fetch_array($result2)) { 
   
   //Multilinestring linestringe dönüştürülüyor. Böylece  ST_Line_Interpolate_Point fonksiyonu çalışabiliyor
   $linestring=  $row["xxx"];
   //echo $linestring;
    }
	
	 $result3 = pg_query($dbconn, "SELECT Box2D(ST_GeomFromText('$linestring')) as xy"); 
//echo "SELECT Box2D(ST_GeomFromText('$linestring')) as xy";
 	
	// $result3 = pg_query($dbconn, "SELECT ST_AsEWKT(ST_Line_Interpolate_Point(ST_GeomFromText('$linestring'),'$basla')) as xy"); 
	 //,GELEN KM değerine göre noktanın xysi hesaplanıyor
    while ($row = pg_fetch_array($result3)) { 
   $XY=$row["xy"]; 
  
   // echo $XY;
    }
	 echo  json_encode($XY)
	 
?>