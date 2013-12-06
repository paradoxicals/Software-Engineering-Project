<?php
ini_set('display_errors','0'); error_reporting(0);
header("Content-Type:text/html; charset=utf8");
$kullaniciadi = $_GET['kullaniciadi'];
$sifre = $_GET['sifre'];
$coded_sifre=md5($_GET['sifre']); 
$ad = $_GET['ad'];
$soyad = $_GET['soyad'];
$yetki = $_GET['yetki']; 
$durum = $_GET['durum']; 
$tcno = $_GET['tcno']; 
$telefon = $_GET['telefon']; 
$adres = $_GET['adres']; 
 

$conn_string = "host=localhost port=5432 dbname=postgis20 user=postgres password=qaqaqa";
$dbconn = pg_connect($conn_string);

$sorgu= "insert into uyetemelbilgileri(kullaniciadi, sifre, ad, soyad, tcno,telefon,adres,yetki,durum)
              values ('$kullaniciadi','$coded_sifre', '$ad', '$soyad','$tcno','$telefon','$adres','$yetki','$durum')";

pg_query($dbconn, $sorgu);

pg_close($dbconn);