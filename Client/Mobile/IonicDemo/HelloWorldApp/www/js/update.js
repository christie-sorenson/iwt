function changeColors()
    {
        var colors =["aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon",
             "navy", "olive", "purple", "red", "silver", "teal", "white", "yellow"];

        var random = Math.floor(Math.random() * 16);
        var timeStamp = new Date();

        var color = colors[random];
        var textColor = color == "white" ? "black" : "white";

        document.getElementById("msg").style.color = textColor;
        document.body.style.backgroundColor = color;

    } 

/* Workaround to put the margin header in since it
 * doesn't seem to be working as it should.
 */
function onDeviceReady() {
    if (device.platform === 'iOS' && parseFloat(device.version) >= 7.0) {
        document.body.style.marginTop = "20px";
    }
}

document.addEventListener('deviceready', onDeviceReady, false);

setInterval(changeColors, 1000);
