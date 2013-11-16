<?php   

$db_handle =  "host=localhost port=5432 dbname=postgis user=postgres password=123"; 
$dbconn = pg_connect($db_handle); 
 
   $sehir_id=$_POST['sehir_id'];
   $sehir_adi=$_POST['sehir_adi'];
   $bulundugu_bolge=$_POST['bulundugu_bolge'];
   $sahip_oldugu_ilceler=$_POST['sahip_oldugu_ilceler'];  
   
   
  
    $query = "UPDATE sehir SET  
	sehir_id = '$sehir_id',
	sehir_adi = '$sehir_adi', 
	bulundugu_bolge = '$bulundugu_bolge' , 
	sahip_oldugu_ilceler = '$sahip_oldugu_ilceler' 
	  
	
	WHERE sehir_id=$sehir_id";
    $result = pg_query($dbconn,$query);
    echo '1';        // success 
 
?>