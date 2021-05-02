buttons = ["fd", "bk", "lt", "rt", "go", "stop", "pause", "home"];
timerID = 0;



// Als document word geladen
document.addEventListener('DOMContentLoaded', function() 
{
	// Globale setup
	setup();
	// button_click() handles the button clicks
	for (var i in buttons)
		document.getElementById(buttons[i]).addEventListener("click", function(evt)
	{
		//audio_click.play();
		switch (this.id) {
			case 'pause': 
			case 'fd': //Rechtdoor
			case 'bk': //Achteruit
			case 'lt': //Links draai
			case 'rt':	addCmd(this.id); break;
			case 'go':	run(); break; //Rechtsdraai
			case 'stop': clear(); break; //Stop
		}
	});
	
	// When the bot is clicked, its angle resets
	// document.getElementById("bot").addEventListener("click", function()
	// {
	// 	set_angle(currentMat ? currentMat.angle : 0);
	// });

	// The Home handler
	document.getElementById("home").addEventListener("click", function()
	{
		home();
	});
	
	// The Stop Run handler
	document.getElementById("stop_run").addEventListener("click", function()
	{
		stop();
	});
	
});

function setDropHandlers() {
	// drag and drop handlers
	document.getElementById("bot").addEventListener("dragstart", function(evt)
	{
		var offset = { x: evt.offsetX, y: evt.offsetY };
		var dt = evt.dataTransfer;
		if (dt.setDragImage)
			dt.setDragImage(dragimg, offset.x, offset.y);
		// click offset is the drag data
		dt.setData("text", JSON.stringify(offset));
		dt.effectAllowed = "move";
		dt.dropEffect = "move";
		var bot = this;
		setTimeout(function() {
			bot.style.visibility = "hidden";
			console.log("Ik ben onzichtbaar");
		}, 1);
		return false;
	});
	document.getElementById("bot").addEventListener("dragend", function(evt)
	{
		evt.preventDefault();
		setTimeout(function() {
			bot.style.visibility = "";
			console.log("Ik ben zichtbaar");
		}, 1);
	});


		grid.addEventListener("dragover", function(evt)
		{
			evt.preventDefault(); //By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
			console.log("Je sleept boven de playground!")
		});
		
		grid.addEventListener("drop", function(evt)
		{
			evt.preventDefault(); //By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
			var pos = JSON.parse(evt.dataTransfer.getData("text"));
			bot.style.marginLeft = (evt.layerX - pos.x) + "px";
			bot.style.marginTop = (evt.layerY - pos.y) + "px";
		});
	
}