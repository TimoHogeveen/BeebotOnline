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

//Er was eerst een andere manier van slepen, die heb ik veranderd omdat hij niet goed was met offset. Dit is
//de nieuwe. Het zou kunnen dat er nog ongebruikte code staat in beebot.js
// https://css-tricks.com/forums/topic/cursor-position-on-draggable-element/
$('canvas').on('mousedown', function (e) {
    
    var $this = $(this);

    $this.addClass('active');
    
    var oTop = e.pageY - $('.active').offset().top;
    var oLeft = e.pageX - $('.active').offset().left;
    $(this).parents().on('mousemove', function (e) {
		$('.active').css("margin-top", e.pageY - oTop);
		$('.active').css("margin-left", e.pageX - oLeft - document.getElementById("sidemenu").offsetWidth);
    });
    
    $('body').on('mouseup', function () {

        $this.removeClass('active');
        $('body').unbind('mouseup');
		CheckBorder(); //Voert een functie uit waar gekeken word of de bot buiten het speelveld staat, zoja word hij teruggezet in het speelveld.
    });
    
    return false;    
});

