<?

	if (!session.data.sd){
	    session.data.sd = new Date();
	}
	write(JSON.stringify(session.data.sd));
?>

<html>
    <body>
<?
    var helloWorld = 'Hello World!'; 
    write(helloWorld + '<br>');
?>
        <?= helloWorld ?>
    <br>
    <b>I can count to 10: </b>

<?
    for (var index= 1; index <= 10; index++) write(index + ' ');  ?>
    <br>

 <b>Or even this: </b>
<?  
    for (var index= 0; index <= 10; index++) { ?>

        <?= index ?> 
<? } ?>

    </body>
</html>
