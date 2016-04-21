(function() {
	console.log("running flagExt.js");
	if(location.hostname == "localhost"){
		var d = document.createElement("div");

		d.id = "ExtensionCheck";
		d.dataset.name = "AppName";
		d.dataset.version = 0.01;
		document.body.appendChild(d);
		console.log("Extension Downloaded div flag added");
	}
})();