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
			case 'go':	run(); break; //Rijden
			case 'stop': clear(); break; //Stop
		}
	});
	
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
	document.getElementById("bot").addEventListener("dragstart", function(DragEvent)
	{
		var offset = { x: DragEvent.offsetX, y: DragEvent.offsetY }; //Offset is dragevent + offsetx & Y
		var TransferedData = DragEvent.dataTransfer;
		if (TransferedData.setDragImage)
		TransferedData.setDragImage(dragimg, offset.x, offset.y);
		// click offset is the drag data
		TransferedData.setData("text", JSON.stringify(offset));
		TransferedData.effectAllowed = "move";
		TransferedData.dropEffect = "move";
		var bot = this;
		setTimeout(function() {
			bot.style.visibility = "hidden";
		}, 1);
		return false;
	});
	document.getElementById("bot").addEventListener("dragend", function(DragEvent)
	{
		DragEvent.preventDefault();
		setTimeout(function() {
			bot.style.visibility = "";
		}, 1);
	});


		document.addEventListener("dragover", function(DragEvent)
		{
			DragEvent.preventDefault(); //By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
		});
		
		document.addEventListener("drop", function(DragEvent)
		{
			DragEvent.preventDefault(); //By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
			var pos = JSON.parse(DragEvent.dataTransfer.getData("text"));
			bot.style.marginLeft = (DragEvent.layerX - pos.x) + "px";
			bot.style.marginTop = (DragEvent.layerY - pos.y) + "px";
		});
	
}