$(document).ready(function () {
    //https://wind-bow.glitch.me/twitch-api/streams/
    var channels = ["esl_csgo", "freecodecamp", "chessnetwork","monstercat"];
    var status = {};
    var url = "https://wind-bow.glitch.me/twitch-api/streams/";
    $('.btn-group .btn input').on('change', function () {
        alert(this.id);
    });
});