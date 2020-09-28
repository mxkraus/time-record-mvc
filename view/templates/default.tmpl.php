<?php 

// echo 'template-default';

// echo '<pre>';
// print_r($this->_);
// echo '</pre>';

$rows = count($this->_);

?>



<h3>Alle Nutzer</h3>

<section>
	<ul>
	<?php foreach( $this->_['entries'] as $user ): ?>

		<li>
			<a href="?view=single&id=<?php echo $user['userID']; ?>" class="btn btn-primary">
				<i class="glyphicon glyphicon-user"></i>
				<?php echo $user['name'] . ' ' . $user['vorname']; ?>
			</a>
		</li>

	<?php endforeach; ?>
	</ul>
</section>

