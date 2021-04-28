var audio_click, audio_stop, audio_motor, audio_full;
var bot, select, link, grid, margin;

var botimg, dragimg = new Image();

var mats;
var currentMat = null;
var currentIndex = -1;
var units = 80;
var angle = 0;
// starting cell if given via query parameter
var start = { x: 0, y: 0, angle: -1 };

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

    bot = document.getElementById("bot"); //Canvas
    select = document.getElementById("mats"); 
    link = document.getElementById("link");
    grid = document.getElementById("playground");  // takes the current playground

    var style = getComputedStyle(document.getElementById("playground"));
    margin = parseInt(style.paddingTop);

    enable_buttons(true);
    // if (!mats)
    //     // loadMatsJson();
    //     load_mats();
    // else
    //     load_mats();
}

//TODO, zorgen dat afbeeldingen worden ingeladen in canvas of zoiets
document.getElementById('matbutton').onclick = function() {
    var val = document.getElementById('imagename').value,
        src = 'uploads/images/' + val +'.jpg',
        img = document.createElement('img');

    img.src = src;
    document.body.appendChild(img);
}




// function loadMatsJson() {
//     loadFile("mats/mats_list.json", function(text) {
//         if (text) {
//             mats = JSON.parse(text);
//             load_mats();
//         }
//         else
//             alert ("Cannot load the mats list!");
//     });
// }

// function loadInfo() {
//     if (!currentMat || location.protocol === "file:")
//         return;
//     var div = document.getElementById("right-info");
//     div.innerHTML = "";
//     if (currentMat.html)
//         div.innerHTML = currentMat.html;
//     else {
//         function getBody(text) {
//             let s = /<body.*?>([\s\S]*)<\/body>/m.exec(text);
//             return s ? s[1] : "";
//         }
//         var filename = currentMat.image.split(".");
//         filename[filename.length-1] = "html";
//         loadFile("mats/" + filename.join("."), function(text) {
//             if (text)
//                 div.innerHTML = currentMat.html = getBody(text);
//             else
//                 loadFile("info.html", function(text) {
//                     if (text)
//                         div.innerHTML = currentMat.html = getBody(text);
//                 }
//             );
//         });   
//     }
// }
//????
// function loadFile(url, cb) {
//     var xmlhttp = new XMLHttpRequest();
 
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState != 4)
//             return;
//         if (this.status == 200)
//             cb(this.responseText);
//         else
//             cb();
//     };
//     xmlhttp.open("GET", url, true);
//     xmlhttp.send();
//  }

// the variable "mats" has been loaded from mats/mats_list.json
// mats = {};

//BeeBot start hier
function load_mats() {
	// var first = -1;
    // var mat = "", single = false;
    // let search = new URLSearchParams(location.search);
    // if (search.has("start")) {
    //     let arr = search.get("start").split(",");
    //     if (arr.length > 0) {
    //         start.x = +arr[0].trim() || 0;
    //         if (start.x < 1)
    //             start.x = 0;
    //     }
    //     if (arr.length > 1) {
    //         start.y = +arr[1].trim() || 0;
    //         if (start.y < 1)
    //             start.y = 0;
    //     }
    //     if (arr.length > 2) {
    //         start.angle = arr[2].trim() || -1;
    //         if (start.angle >= 0)
    //             start.angle = Math.round(start.angle / 90) * 90;
    //     }
    // }

    // for(let pair of search.entries()) {
    //     let [key, value] = pair;
    //     if (!value) {
    //         // assume a mat
    //         mat = decodeURIComponent(key);
    //         single = mat.endsWith("1");
    //         if (single)
    //             mat = mat.slice(0, -1);
    //         first = mats.findIndex(function(obj) { return obj.sku === mat });
    //         if (first < 0) {
    //             document.getElementById("pagename").innerText = mat;
    //             document.getElementById("container").style.display = "none";
    //             document.getElementById("help").style.display = "none";
    //             document.getElementById("notfound").style.display = "block";
    //             return;
    //         }
    //         if (single) {
    //             mats = [ mats[first] ];
    //             first = -1;
    //             select = null;
    //         }
    //         else
    //             start = { x: 0, y: 0, angle: -1 };     // start coords only valid in single mat mode
    //         break;
    //     }
    // }
    //var playground = document.getElementById("playground");
    //var index = 0;
    // if (mats.length === 1)
    //     document.getElementById("mat_selector").innerHTML = mats[0].name;

    // for (var i = 0; i < mats.length; i++) {
    //     var obj = mats[i];
    //     obj.index = i;
    //     // Find first mat w/o password
    //     if (first < 0 && !obj.password)
    //         first = i;
    //     var html = document.createElement("img");
    //     html.classList.add("box");
    //     html.id = "mat" + index;
    //     html.src = "mats/" + obj.image;
    //     html.style.display = "none";
    //     obj.img = html;
    //     playground.appendChild(html);
    //     if (select) {
    //         html = document.createElement("option");
    //         html.value = obj.sku;
    //         html.innerHTML = obj.name;
    //         select.appendChild(html);
    //         index++;
    //     }
    // }
    // if (first < 0)
    //     first = 0;
    // if (select)
    //     select.value = first;
    // setTimeout(function () {
    //     // wait a split second so rendering is finished
    //     if (select)
    //         select.selectedIndex = first;
    //     select_mat(first);
    //     setDropHandlers(mats);
    //     var style = getComputedStyle(document.getElementById("mat0"));
    //     margin += parseInt(style.paddingTop || "0") + parseInt(style.borderTop || "0");
    // }, 200);
}

function set_angle(deg) {
    angle = deg;
    var c = document.getElementById("bot"); //De Canvas
    var w = Math.max(botimg.width, botimg.height); //Dit is dus het hoogste variable. Dus de hoogte of breedte van de bot afbeelding
    c.width = c.height = w; //Dit maakt de canvas grootte/breedte hetzelfde als de bot afbeelding
    var ctx = c.getContext("2d"); //Verteld het variable dat deze afbeelding(canvas) twee dimensies heeft
    ctx.clearRect(0, 0, w, w); //Deze code maakt de canvas schoon (leeg)
    ctx.translate(w/2, w/2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-w/2, -w/2);
    ctx.drawImage(botimg, 0, 0); //De afbeelding word in de canvas geladen
    dragimg.src = c.toDataURL(); //???
}
// Functie waar de instructies worden toegevoegd aan het commando scherm.
function addCmd(what) {
    var span = document.getElementById("commands");
    if (span.getElementsByTagName("img").length >= 40) {
        //audio_full.play();
        return;
    }
    var img = document.createElement("img");
    img.src = "/temp/go-" + what + ".png";
    span.appendChild(img);
}
//Functie om het commando scherm leeg te maken
function clear() {
    var span = document.getElementById("commands");
    span.innerHTML = "";
}

var curIndex = -1;
var curElement = null;
var elements = null;

//Functie voor de GO knop, zorgt ervoor dat de knoppen ook niet meer te gebruiken zijn
function run() {
    curIndex = 0;
    var span = document.getElementById("commands");
    elements = span.getElementsByTagName("img");
    enable_buttons(false); //Hier kan je niet meer instructies invoeren
    nextStep(); //Functie voor de volgende stappen
}

// Play the next element on the list of steps
function nextStep() {
    setCurrentElement(curIndex++);
    if (!curElement)
        stop(); //Einde, geen commando meer
    else {
        var file = curElement.attributes.src.value.split("/").pop();
          switch (file) {
            case 'go-pause.png': pause(); break;
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
        curElement.style.border = "none";
    curElement = (index >= 0 && elements && index < elements.length) ? elements[index] : null;
    if (curElement)
        curElement.style.border = "2px solid black"; //Geeft de commando een mooie border zodat je weet wie er aan de buurt is
}
// Sprite movement: use left and top margins to place the sprite
function move(fd) {

    var endVal = units;
    var oldAngle = angle;
    if (!fd) { //Als niet rechtdoor
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
        var diff = 5;
        
        switch (angle) {
            case 0: y -= diff; break; //Naar boven
            case 90: x += diff; break; //Naar rechts
            case 180: y += diff; break; //Naar onder
            case 270: x -= diff; break; //Naar links
        }
        console.log((new Date()).getMilliseconds(), "hoek:",angle, "y:", y);
        //console.log(x,y);
        if (x < 0) x = 0;
        if (y < 0) y = 0; //Als hij boven het scherm is...
        if (x > (grid.clientWidth + 3 * margin / 2)) //Niet buiten het speelveeld
            x = grid.clientWidth + 3 * margin / 2;
        if (y > (grid.clientHeight + 3 * margin / 2)) //Niet buiten de playground aan onderkant
            y = grid.clientHeight + 3 * margin / 2;
        bot.style.marginLeft = x + "px";
        bot.style.marginTop = y + "px";
        console.log("Margin top", bot.style.marginTop);
        endVal -= diff;
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
    var endVal = angle + (right ? 90 : -90);
    if (endVal < 0)
        endVal += 360;
    if (endVal >= 360)
        endVal -= 360;
    //audio_motor.load();
    timerID = setInterval(function () {
        var deg = angle;
        if (right)
            deg += 10;
        else
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
    }, 2000);
}
//Stop knop, hiermee stopt de BeeBot gelijk
function stop() {
    if (timerID)
        clearInterval(timerID);
    timerID = 0;
    //audio_motor.pause();
    //audio_stop.play();
    enable_buttons(true); //Knoppen zijn weer te gebruiken
    setCurrentElement(-1);
}
//Zorgt ervoor dat de knoppen weer te gebruiken zijn, gaat elke knop dus bijlangs
function enable_buttons(enabled) {
    for (var i in buttons) {
        var b = document.getElementById(buttons[i]);
        b.disabled = !enabled;
        b = document.getElementById("stop_run");
        b.disabled = enabled;
    }
}

function select_mat(index) {
    // currentMat = mats[index];
    // if (grid)
    //     grid.style.display = "none";
    // if (currentMat.password) {
    //     var pass = prompt("Please enter the secret password for this mat:");
    //     if (pass !== currentMat.password) {
    //         alert("Sorry, you are not allowed to access this mat!");
    //         if (select)
    //             select.selectedIndex = currentIndex;
    //         bot.style.display = "none";
    //         if (currentIndex < 0)
    //             return;
    //     }
    // }
    // need only to enter the password once
    // currentMat.password = "";
    // grid = document.getElementById("mat" + index);
    // grid.style.display = "block";
    // // Show or hide the link to the product page
    // if (currentMat.url) {
    //     document.getElementById("link-container").style.display = "block";
    //     link.setAttribute('href', "https://www.terrapinlogo.com" + currentMat.url);
    // }
    // else
    //     document.getElementById("link-container").style.display = "none";

    // currentIndex = index;
    clear();
    // loadInfo();
    setTimeout(home, 100);
    var c = document.getElementById("container");
    if (typeof chrome != "undefined") {
        if ("window" in chrome.app) {
            var curWindow = chrome.app.window.current();
            curWindow.innerBounds.width = c.clientWidth + 2 + c.offsetLeft;
            curWindow.innerBounds.height = c.clientHeight + 2 * c.offsetTop;
        }
    }
}
//Functie om de Beebot te resetten en weer naar zijn startpositie te laten gaan.
function home() {
    bot.style.display = "block";
    var w = bot.clientWidth + units;
    var h = bot.clientHeight + units;
    var cx = Math.round(playground.width / units); //Grootte van playground
    var cy = Math.round(playground.height / units);
    var x = start.x;
    var y = start.y;
    var angle = start.angle;
    if (x && y) {
        if (x > cx) x = cx;
        if (y > cy) y = cy;
        x *= units;
        y *= units;
    }
    // else {
    //     x = currentMat.start[0];
    //     y = currentMat.start[1];
    // }
    // if (angle < 0)
    //     angle = currentMat.angle || 0;
    bot.style.marginLeft = (x - w / 2 + margin) + "px";
    bot.style.marginTop = (y - h / 2 + margin) + "px";

    set_angle(angle);
}