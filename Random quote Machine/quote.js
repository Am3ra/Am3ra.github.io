$(document).ready(function() {

	var htm1;

	var quotes2 = ["Programming is cool!", "I'm a smart person (nerd)", "FreeCodeCamp FTW!", "I'm soooo bored"];
	html1 = quotes2[Math.floor(Math.random() * quotes2.length)];

	$("#h21").html(html1);

	$("#button").click(function() {
		html1 = quotes2[Math.floor(Math.random() * quotes2.length)];
		$("#h21").html(html1);
	});

	$("#button2").click(function() {
		//html1.split(" ");
		console.log(html1);
		window.open("https://twitter.com/intent/tweet?text=" + html1);
	});
});
