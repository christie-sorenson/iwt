var checkChange = (function() {
	var checkExist = document.getElementById('ExtensionCheck');

	if(!checkExist) {
		document.getElementById('descriptor').innerText = 'Extension not found, click to install.';
		document.getElementById('descriptor').href ='./install';
	} else {
		document.getElementById('descriptor').innerHTML = 'Extension found, <br><br>Name: ' + checkExist.dataset.name + '<br>Version: ' + checkExist.dataset.version;
		document.getElementById('descriptor').removeAttribute("href");
		descriptionAdded = true;
	}
});

window.onload = function() {
	var descriptionAdded = false;
	checkChange();

	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if(descriptionAdded === false) {
			  	checkChange();
			}	
		})
	});
	var config = {childList: true, attributes: true};

	observer.observe(document.body, config);
}

