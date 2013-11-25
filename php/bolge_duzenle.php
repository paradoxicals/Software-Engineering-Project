<?php   

$db_handle =  "host=localhost port=5432 dbname=postgis user=postgres password=123"; 
$dbconn = pg_connect($db_handle); 
 
   $bolge_id=$_POST['bolge_id'];
   $bolge_adi=$_POST['bolge_adi'];
   $bolgedeki_ilceler=$_POST['bolgedeki_ilceler'];
   
   
  
    $query = "UPDATE bolge SET  
	bolge_id = '$bolge_id',
	bolge_adi = '$bolge_adi', 
	bolgedeki_ilceler = '$bolgedeki_ilceler' 
	 
	
	WHERE bolge_id=$bolge_id";
    $result = pg_query($dbconn,$query);
    echo '1';        // success 
 
?>