<?php 

// echo 'template-single';

// echo '<pre>';
// print_r($this->_);
// echo '</pre>';

$sumh = 0;
foreach ( $this->_['times'] as $hours) {
	$sumh += $hours['ut_hours'];	
}


?>

<div class="template-single">
	<main class="main-content">

		<script id="page-template-1" type="text/template">
			<section id="addNewPage" class="add-new page-1">
				<header>
					<a href="?view=default" class="pull-left menu-toggle" ><i class="fui-user"></i></a>
					<h3>
						<?php echo $this->_['name'] . ' ' . $this->_['vorname']; ?>
						<span class="summary-badge"><?php echo $sumh; ?> h</span>	
					</h3>
					<a href="#page-2" class="pull-right menu-toggle" ><i class="fui-list-numbered"></i></a>
				</header>
				<form id="addNewTimeForm" action="" method="post">

					<span class="newhours-background">
						<div id="absoluteHours">0 Stunden</div>
						<input type="text" class="form-control" name="newhours" id="newHours" aria-describedby="end-addon" value="0" readonly />
						<div id="absoluteMinutes">0 Minuten</div>
					</span>

					<div id="testBlock"></div>

					<div class="input-group">
						<label class="input-group-addon"><i class="fui-calendar"></i></label>
						<input type="date" class="form-control" name="newdate" id="newDate" placeholder="Datum" value="<?php echo date("Y-m-d"); ?>" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
						<label for="newdate" class="input-group-addon" id="date-addon">Heute</label>
					</div>
					<div class="input-group">
						<label class="input-group-addon"><i class="fui-time"></i> Von</label>
						<input type="time" class="form-control" name="minfrom" id="minFrom" aria-describedby="start-addon"/>
						<label for="minfrom" class="input-group-addon" id="start-addon">Jetzt</label>
					</div>
					<div class="input-group">
						<label class="input-group-addon"><i class="fui-time"></i> Bis</label>
						<input type="time" class="form-control" name="minto" id="minTo" aria-describedby="end-addon"/>
						<label for="minfrom" class="input-group-addon" id="end-addon">Jetzt</label>
					</div>
					<div class="input-group">
						<textarea name="descr" id="projectDescription">Hier eine Beschreibung eingeben</textarea>
					</div>

					<footer id="newPageFooter">
						<input type="submit" name="saveRequest" value="+" class="btn btn-primary add-btn" />
					</footer>
					
				</form>


				<script rel="text/javascript" src="view/assets/js/time-calc.js" charset="utf-8" ></script>
				<script rel="text/javascript" src="view/assets/js/classes/zrm-storage.class.js" charset="utf-8" ></script>
				<script rel="text/javascript" src="view/assets/js/main.js" charset="utf-8" ></script>

			</section>
		</script>

		<script id="page-template-2" type="text/template">
		    <section class="show-list page-2">
		    	<header>
		            <h3>Stunden</h3>
					<a href="#" class="pull-right menu-toggle back" ><i class="fui-cross"></i></a>
		        </header>
				<form action="" method="post">
					<ul class="list-group">
						<?php foreach( $this->_['times'] as $time ): ?>

							<li class="list-group-item">
								<?php echo $time['ut_date'] . ' - ' . $time['ut_hours'] . ' Stunden '; ?>

								<input type="checkbox" name="deleteByID[]" value="<?php echo $time['usertimeID']; ?>" class="pull-right">
								
							</li>

						<?php endforeach; ?>
						<li class="list-group-item">Stunden gesamt: <span class="badge"><?php echo $sumh; ?></span></li>
					</ul>
					<footer>
						<input type="submit" name="deleteRequest" value="Löschen" class="btn btn-danger">
					</footer>
				</form>
			</section>
		</script>

	</main>
</div>




