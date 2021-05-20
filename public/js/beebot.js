var audio_click, audio_stop, audio_motor, audio_full;
var bot, grid, margin;

var botimg, dragimg = new Image();

var units = 150; //Verander dit nummer om de afstand die de bot aflegt te veranderen, dit heeft ook effect op de grootte van de matten! Zorg ervoor dat de afbeelding dus daarbij past
var angle = 0;
// starting cell if given via query parameter
var start = { x: 0, y: 0, angle: 0 }; //Deze word alleen gebruikt in de reset functie
var grid; //Variable voor de playground

function setup() {
    botimg = document.getElementById("botimg");
    dragDataType = 'text/plain';
    timerID = 0;

    // audio_click = new Audio();
    // audio_click.src = "/assets/audio/beebot-button.mp3";
    // audio_stop = new Audio();
    // audio_stop.src = "/assets/audio/beebot-stop.mp3";
    // audio_motor = new Audio();
    // audio_motor.src = "/assets/audio/beebot-motor.mp3";
    // audio_full = new Audio();
    // audio_full.src = "/assets/audio/beebot-full.mp3";

    bot = document.getElementById("bot"); //Dit is het canvas objects dat uiteindelijk de bot in het spel word
    grid = document.getElementById("playground");  // Maakt grid de huidige playground

    var style = getComputedStyle(document.getElementById("playground"));
    margin = parseInt(style.paddingTop);
    set_angle(angle); //Zorgt ervoor dat de Bot de juiste kant opkijkt bij het inladen.
    setDropHandlers() //Dit zorgt ervoor dat de playground drag en droppable word
    enable_buttons(true); //Zorgt ervoor dat de knoppen weer bruikbaar zijn.
    setTimeout(function(){home();}, 500) //Zorgt ervoor dat de bot sowieso opnieuw getekend word, dit ging fout op de webstite.
}

//Functie die de juiste mat inhaald, word uitgevoerd via de KIES MAT knop
document.getElementById('matbutton').onclick = function() {
    var mat = document.getElementById('mat'); //Dit is het dropdown menu dat de matten heeft gebaseerd op de huidige categorie
    var val = document.getElementById('mat').value; //Value is de URL in de huidige geselecteerde option
    src = 'uploads/images/' + val; //Maakt de juiste URL waar de mat is opgeslagen
    
    var horizontalboxes = mat.options[mat.selectedIndex].dataset.horizontal; //Omdat programmeren zo'n leuk vak is is dit de enige manier hoe ik de dropdown kan uitlezen
    var verticalboxes = mat.options[mat.selectedIndex].dataset.vertical; //Lees wat hier boven staat ;)
    // console.log("Horizontaale Vakken: " + horizontalboxes);
    // console.log("Verticaale Vakken: " + verticalboxes);

    var matwidth = 0; //Zorgt ervoor dat de volgende mat goed kan uitgerekend worden
    var matheight = 0; //Zorgt ervoor dat de volgende mat goed kan uitgerekend worden


    if (horizontalboxes < 1) { //Als de mat ongeldige parameters heeft in het mat beheer systeem word deze mat niet geladen.
        alert("Error! De grootte van deze mat klopt niet!")
        return;
    }
    else if (verticalboxes < 1) { //Als de mat ongeldige parameters heeft in het mat beheer systeem word deze mat niet geladen.
        alert("Error! De grootte van deze mat klopt niet!")
        return;
    }

    matwidth = horizontalboxes * units; //Zet de breedte van de mat aan de hand van horizontaale boxen EN de afstand die de bot aflegd
    matheight = verticalboxes * units; //Zet de hoogte van de mat aan de hand van horizontaale boxen EN de afstand die de bot aflegd
    currentmat.style.width = matwidth + "px"; //Zorgt dat de afbeelding(mat) de juiste grootte krijgt in pixels
    currentmat.style.height = matheight + "px"; //Zorgt dat de afbeelding(mat) de juiste grootte krijgt in pixels
    currentmat.src = src; //Voegt de afbeelding toe aan de div in de playground
}

function set_angle(deg) {
    angle = deg;
    var canvas = document.getElementById("bot"); //De Canvas
    var w = Math.max(botimg.width, botimg.height); //Dit is dus het hoogste variable. Dus de hoogte of breedte van de bot afbeelding
    canvas.width = canvas.height = w; //Dit maakt de canvas grootte/breedte hetzelfde als de bot afbeelding
    var ctx = canvas.getContext("2d"); //Verteld het variable dat deze afbeelding(canvas) twee dimensies heeft
    ctx.clearRect(0, 0, w, w); //Deze code maakt de canvas schoon (leeg), is deze regel nodig???
    ctx.translate(w/2, w/2); //Dit zorgt ervoor dat de afbeelding wel netjes in de tag blijft
    ctx.rotate(angle * Math.PI / 180); //Dit zorgt er letterlijk voor dat de afbeelding omdraait.
    ctx.translate(-w/2, -w/2); //Dit zorgt ervoor dat de afbeelding wel netjes in de tag blijft
    ctx.drawImage(botimg, 0, 0); //De afbeelding word in de canvas geladen
    dragimg.src = canvas.toDataURL(); //Zorgt ervoor dat je tijdens het slepen de afbeelding kan zien, misschien nog mogelijk om deze te resizen bij een meer responsive design?
}
// Functie waar de instructies worden toegevoegd aan het commando scherm.
function addCmd(what) {
    var span = document.getElementById("commands");
    if (span.getElementsByTagName("img").length >= 40) {
        //audio_full.play();
        return;
    }
    var img = document.createElement("img");
    img.src = "/images/go-" + what + ".png"; //Laat de juiste pijlen in op het commando scherm
    span.appendChild(img);
}
//Functie om het commando scherm leeg te maken
function clear() {
    var span = document.getElementById("commands");
    span.innerHTML = ""; //Maakt ger commando scherm leeg
}

var curIndex = -1; //Word gebruikt om stap voor stap de commando's door te gaan, dit zou misschien ook bovenaan het document kunnen
var curElement = null;
var elements = null;

//Functie voor de GO knop, zorgt ervoor dat de knoppen ook niet meer te gebruiken zijn
function run() {
    curIndex = 0; //Zorgt dat het commando centrum op de goede plek begint
    var span = document.getElementById("commands"); //Plek waar de commando's staan
    elements = span.getElementsByTagName("img");
    enable_buttons(false); //Hier kan je niet meer instructies invoeren
    nextStep(); //Functie voor de volgende stappen
}

// Play the next element on the list of steps
function nextStep() {
    setCurrentElement(curIndex++); //Deze functie zorgt ervoor dat de border word g
    if (!curElement)
        stop(); //Einde, geen commando meer
    else {
        var file = curElement.attributes.src.value.split("/").pop(); //Zorgt dat de juiste actie word uitgevoard aan de hand van de volgende pijl(afbeelding)
          switch (file) {
            case 'go-pause.png': pause(); break; //Hij haalt letterlijk de afbeeldingen naam uit om te weten wat er nu gebeurt
            case 'go-fd.png': move(true); break;
            case 'go-bk.png': move(false); break;
            case 'go-lt.png': rotate(false); break;
            case 'go-rt.png': rotate(true); break;
        }
    }
}
//Functie voor de huidige commando in het commando menu
function setCurrentElement(index) {
    if (curElement)
        curElement.style.border = "none"; //Haalt de border weg
    curElement = (index >= 0 && elements && index < elements.length) ? elements[index] : null;
    if (curElement)
        curElement.style.border = "2px solid black"; //Geeft de commando een mooie border zodat je weet wie er aan de buurt is
}
// Sprite movement: use left and top margins to place the sprite
// Deze functie is verder voor het bewegen naar voren!
function move(fd) {

    var endVal = units; //Endvalue word afgeteld om te zorgen dat de BeeBot de afstand juist in korte stapjes aflegd
    var oldAngle = angle;
    if (!fd) { //Als niet rechtdoor(dus als speler de achteruit knop gebruikt).
        switch (angle) {
            case 0: angle = 180; break;
            case 90: angle = 270; break;
            case 180: angle = 0; break;
            case 270: angle = 90; break;
        }
    }
    //audio_motor.load();
    timerID = setInterval(function () {
        var x = bot.offsetLeft; //Waar de bot dus op begin staat
        var y = bot.style.marginTop.replace('px', ''); //Pakt de huidige marginTop, en haalt de pixels erbij weg. Replace niet nodig!!
        if (! y) y = 0; //Als de margintop leeg is, maak hem dan 0
        y = parseInt(y,10); //Zeker weten dat Y een cijfer is.
        var diff = 5; //Aantal pixels dat de bot per stap aflegt voordat hij zijn doel bereikt
        
        switch (angle) {
            case 0: y -= diff; break; //Naar boven
            case 90: x += diff; break; //Naar rechts
            case 180: y += diff; break; //Naar onder
            case 270: x -= diff; break; //Naar links
        }
        if (x < 0) x = 0; //Stopt dat de Beebot links uit het scherm gaat
        if (y < 0) y = 0; //Stopt dat de Beebot bovenaan het scherm uitgaat

        if (x > (grid.clientWidth + 3 * margin / 2 - bot.width)) { //Functie word uitgevoerd als beebot aan de rechterkant het speelveld uitrijd
            x = grid.clientWidth + 3 * margin / 2 - bot.width; //Stopt dat de Beebot rechts uit het scherm rijd
        }

        if (y > (grid.clientHeight + 3 * margin / 2 - bot.height)) { //Functie word uitgevoerd als beebot aan de onderkant het speelveld uitrijd
            y = grid.clientHeight + 3 * margin / 2 - bot.height; //Stopt dat de Beebot onder uit het scherm rijd
        }

        bot.style.marginLeft = x + "px";
        bot.style.marginTop = y + "px";
        console.log("Margin top", bot.style.marginTop);
        endVal -= diff; //Endval is gebaseerd op de Units, hier word steeds 5(diff) van afgehaald
        if (endVal <= 0) { //Hij telt af wanneer de bot mag stoppen
            clearInterval(timerID);
            timerID = 0;
            angle = oldAngle;
            //audio_motor.pause();
            //audio_click.play();
            nextStep();
        }
    }, 100);
    //audio_motor.play();  
}

function rotate(right) {
    var stopbutton = document.getElementById("stop_run");
    stopbutton.disabled = true; //Disable de stop knop, als je de bot stopt tijdens het draaien word de bot zowat onspeelbaar.
    var endVal = angle + (right ? 90 : -90); //Als rotate true is dan draait hij rechtsom, anders linksom. EndVal is de huidige draaien plus de uiteindelijke graad van de draai
    if (endVal < 0)
        endVal += 360;
    if (endVal >= 360)
        endVal -= 360;
    //audio_motor.load();
    timerID = setInterval(function () { //Zorgt ervoor dat het draaien rustig gebeurt om de 0.1 seconde
        var deg = angle; //Degree is huidige draai positie van de Beebot
        if (right) //Als rotate true is (Rechtdraait knop)
            deg += 10;
        else //De andere kant opdraaien ;)  (Linkerdraai knop)
            deg -= 10;
        if (deg < 0) 
            deg += 360;
        if (deg >= 360)
            deg -= 360;
        if (Math.abs(endVal - deg) < 1)
            deg = endVal;
        set_angle(deg);
        if (deg == endVal) {
            clearInterval(timerID);
            timerID = 0;
            //audio_motor.pause();
            //audio_click.play();
            stopbutton.disabled = false; //Zorgt ervoor dat je de Beebot weer kan laten stoppen
            nextStep();
        }
    }, 100);
    //audio_motor.play();
}

//Functie voor de pause knop, zorgt dat de Beebot dus even stopt
function pause() {
    timerID = setTimeout(function () {
        clearTimeout(timerID);
        timerID = 0;
        //audio_click.play();
        nextStep();
    }, 2000); //Voert deze code uit nadat twee seconden gepasseerd zijn
}

//Stop knop, hiermee stopt de BeeBot gelijk. Deze word ook gebruikt als er geen commando's meer zijn
function stop() {
    if (timerID)
    clearInterval(timerID); //Reset the timer.
    timerID = 0;
    //audio_motor.pause();
    //audio_stop.play();
    enable_buttons(true); //Knoppen zijn weer te gebruiken
    setCurrentElement(-1); //Zorgt dat commando centrum reset
}

//Zorgt ervoor dat de knoppen weer te gebruiken zijn, gaat elke knop dus bijlangs
function enable_buttons(enabled) {
    for (var i in buttons) { //Deze for loop gaat elke button langs.
        var b = document.getElementById(buttons[i]); //Maakt huidige knop variable
        b.disabled = !enabled; //Enabled huidige knop
        b = document.getElementById("stop_run");
        b.disabled = enabled;
    }
}

//Functie om de Beebot te resetten en weer naar zijn startpositie te laten gaan.
function home() {
    bot.style.display = "block";
    var x = start.x; //Zet de Bot weer op start positie
    var y = start.y; //Zet de Bot weer op start positie
    var angle = start.angle; //Zet de angle value weer op de eerste positie
    bot.style.marginLeft = (0) + "px"; //Update de locatie voor de bot
    bot.style.marginTop = (0) + "px"; //Update de locatie voor de bot
    set_angle(angle); //Update de bot angle in het spel naar de start positie
}