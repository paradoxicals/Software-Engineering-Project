<?php
	session_start();
	if (md5($_POST['norobot']) == $_SESSION['randomnr2'])	{ 
		// here you  place code to be executed if the captcha test passes
			echo "Hey great , it appears you are not a robot";
	}	else {  
		// here you  place code to be executed if the captcha test fails
			echo "You're a very naughty robot!";
	}
?>