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

// function setDropHandlers() {
// 	// drag and drop handlers
// 	document.getElementById("bot").addEventListener("dragstart", function(DragEvent)
// 	{
// 		var offset = { x: DragEvent.offsetX, y: DragEvent.offsetY }; //Offset is de afstand van de muis naar linksbovenin
// 		var TransferedData = DragEvent.dataTransfer;
// 		if (TransferedData.setDragImage)
// 		TransferedData.setDragImage(dragimg, offset.x, offset.y);
// 		// click offset is the drag data
// 		TransferedData.setData("text", JSON.stringify(offset));
// 		TransferedData.effectAllowed = "move";
// 		TransferedData.dropEffect = "move";
// 		var bot = this;
// 		setTimeout(function() {
// 			bot.style.visibility = "hidden";
// 		}, 1);
// 		return false;
// 	});
// 	document.getElementById("bot").addEventListener("dragend", function(DragEvent)
// 	{
// 		DragEvent.preventDefault();
// 		setTimeout(function() {
// 			bot.style.visibility = "";
// 		}, 1);
// 	});


// 		document.addEventListener("dragover", function(DragEvent)
// 		{
// 			DragEvent.preventDefault(); //By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
// 		});
		
// 		document.addEventListener("drop", function(DragEvent)
// 		{
// 			DragEvent.preventDefault(); //By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
// 			var pos = JSON.parse(DragEvent.dataTransfer.getData("text"));
// 			bot.style.marginLeft = (DragEvent.layerX - pos.x) + "px";
// 			bot.style.marginTop = (DragEvent.layerY - pos.y) + "px";
// 		});
	
// }

// https://css-tricks.com/forums/topic/cursor-position-on-draggable-element/

$('canvas').on('mousedown', function (e) {
    
    var $this = $(this);

    $this.addClass('active');
    
    var oTop = e.pageY - $('.active').offset().top;
    var oLeft = e.pageX - $('.active').offset().left;
    $(this).parents().on('mousemove', function (e) {
		$('.active').css("margin-top", e.pageY - oTop);
		$('.active').css("margin-left", e.pageX - oLeft - document.getElementById("sidemenu").clientWidth);
    });
    
    $('body').on('mouseup', function () {

        $this.removeClass('active');
        $('body').unbind('mouseup');

    });
    
    return false;    
});

