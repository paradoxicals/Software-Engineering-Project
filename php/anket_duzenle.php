<?php   

$db_handle =  "host=localhost port=5432 dbname=postgis user=postgres password=123"; 
$dbconn = pg_connect($db_handle); 
 
   $anket_id=$_POST['anket_id'];
   $anket_tarihi=$_POST['anket_tarihi'];
   $anket_cesidi=$_POST['anket_cesidi'];
   $anket_yapilanbolge=$_POST['anket_yapilanbolge'];  
   $anket_yapilanil=$_POST['anket_yapilanil']; 
   $anket_sonuclari=$_POST['anket_sonuclari'];
   
  
    $query = "UPDATE anket SET  
	anket_id = '$anket_id',
	anket_tarihi = '$anket_tarihi', 
	anket_cesidi = '$anket_cesidi' , 
	anket_yapilanbolge = '$anket_yapilanbolge', 
	anket_yapilanil = '$anket_yapilanil' , 
	anket_sonuclari = '$anket_sonuclari'  
	
	WHERE anket_id=$anket_id";
    $result = pg_query($dbconn,$query);
    echo '1';        // success 
 
?>