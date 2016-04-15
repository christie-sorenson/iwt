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
    
    setInterval(changeColors, 1000);
