

<?php 

$prevTemplate =	$_GET['prevt'] == '' ? 'single' : 'single';
$prevUser = $_GET['prevu'] == '' ? 1 : 1;


?>

<form action="" method="post">
	<label for="newhours">Datum:
		<input type="text" name="newdate" id="newDate" placeholder="YYYY-MM-TT" />
	</label><br/>
	<label for="newhours">Stunden:
		<input type="text" name="newhours" id="newDate" />
	</label><br/>
	<input type="submit" name="saveRequest" value="Speichern" class="btn btn-primary" />
</form>

<a href="?view=<?php echo $prevTemplate; ?>&id=<?php echo $prevUser; ?>" class="btn btn-primary"><i class="glyphicon glyphicon-arrow-left"></i> Übersicht anzeigen</a>