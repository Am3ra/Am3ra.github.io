window.onload = function () {
    var a= "", b;
    pressKey();
    function pressKey() {
        a += document.getElementById('myInput').value;
        document.getElementById('myInput').value = "";
        document.getElementById("demo").innerHTML = ""+ a.split(" ").length;
    }
}