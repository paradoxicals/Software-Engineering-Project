<?php   

$db_handle =  "host=localhost port=5432 dbname=postgis user=postgres password=123"; 
$dbconn = pg_connect($db_handle); 
 
   $recid=$_POST['secmen_recid'];
   $yasi=$_POST['secmen_yasi'];
   $cinsiyeti=$_POST['secmen_cinsiyeti'];
   $yasadigi_bolge=$_POST['yasadigi_bolge'];
   $yasadigi_il=$_POST['yasadigi_il'];  
   $kullanilan_oy=$_POST['kullanilan_oy']; 
   
    $query = "UPDATE eczane SET  
	secmen_recid = '$recid',
	secmen_yasi = '$yasi', 
	secmen_cinsiyeti = '$cinsiyeti' , 
	yasadigi_bolge = '$yasadigi_bolge' , 
	yasadigi_il = '$yasadigi_il', 
	kullanilan_oy = '$kullanilan_oy' 
	
	
	WHERE secmen_recid=$recid";
    $result = pg_query($dbconn,$query);
    echo '1';        // success 
 
?>