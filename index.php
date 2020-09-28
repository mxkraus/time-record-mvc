<!DOCTYPE html>
<html>

	<head>

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="mobile-web-app-capable" content="yes">
		<!-- Chrome, Firefox OS and Opera -->
		<meta name="theme-color" content="#F1C40F">
		<!-- Windows Phone -->
		<meta name="msapplication-navbutton-color" content="#F1C40F">
		<!-- iOS Safari -->
		<meta name="apple-mobile-web-app-status-bar-style" content="#F1C40F">

		<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">

		<!-- merge these sources into one file when project is finished -->
		<link rel="stylesheet" href="view/assets/bootstrap/css/bootstrap-theme.min.css">
		<link rel="stylesheet" href="view/assets/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="view/assets/flat_ui/css/flat-ui.min.css">
		<link rel="stylesheet" href="view/assets/css/styles.css">

		<!-- jQuery für alle! -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		
	</head>

	<body>


		<?php 

			include 'includes/classes/database.php';
			include 'includes/classes/user-view.class.php';
			include 'includes/classes/times-model.class.php';
			include 'includes/classes/user-model.class.php';
			include 'includes/classes/user-controller.class.php';



			$request = array_merge($_GET, $_POST);
			// var_dump($request);

			$controller = new Controller( $request );
			
			if( isset($request['saveRequest'] )){
				$controller->saveTime();

			}elseif( isset($request['deleteRequest'] )){
				$controller->deleteTime();

			}

			echo $controller->display();

		?>


	</body>

	<footer>
		<!-- js für Seitenfunktionen -->
		<script rel="text/javascript" src="view/assets/js/page-slider.js" charset="utf-8" ></script>
		<script rel="text/javascript" src="view/assets/js/script.js" charset="utf-8" ></script>
	</footer>

</html>






