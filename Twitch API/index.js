$(document).ready(async function () {
    //https://wind-bow.glitch.me/twitch-api/streams/
    var channels = ["esl_csgo", "chessnetwork", "monstercat", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    var status = [];
    var url = "https://wind-bow.glitch.me/twitch-api/streams/";
    for (i in channels) {
        await $.getJSON(url + channels[i], function (data) {
            status[i] = data
        })
    }
    for (i in status) {
        var name = status[i]._links.channel.split("/")[status[i]._links.channel.split("/").length - 1];
        if (status[i].stream) {
            $(".content").append(
                `
                    <div class = 'card mb-5 text-white bg-success' style = 'width: 18rem;'>
                        <div class = 'card-body' >
                            <h5 class = 'card-title'> ` + name + ` </h5> 
                            <p class = 'card-text'> ` + name + ` is currently online, and is playing: ` + status[i].stream.game + `</p> 
                            <p class = 'card-text'> ` + status[i].stream.channel.status + ` </p> 
                            <a href = '` + status[i].stream.channel.url + `' class = 'btn btn-primary' > Go to Stream </a> 
                        </div> 
                    </div>
                    `
            );
        } else {
            $(".content").append(
                `
                    <div class = 'card mb-5 bg-danger text-white' style = 'width: 18rem;'>
                        <div class = 'card-body' >
                            <h5 class = 'card-title'> ` + name + ` </h5> 
                            <p class = 'card-text'> ` + name + ` is currently Offline. </p>  
                        </div> 
                    </div>
                    `
            );
        }
    }

    $('.btn-group .btn input').on('change', function () {
        $(".content").empty();
        if (this.id == "option1") {
            for (i in status) {
                var name = status[i]._links.channel.split("/")[status[i]._links.channel.split("/").length - 1];
                if (status[i].stream) {
                    $(".content").append(
                        `
                    <div class = 'card mb-5 text-white bg-success' style = 'width: 18rem;'>
                        <div class = 'card-body' >
                            <h5 class = 'card-title'> ` + name + ` </h5> 
                            <p class = 'card-text'> ` + name + ` is currently online, and is playing: ` + status[i].stream.game + `</p> 
                            <p class = 'card-text'> ` + status[i].stream.channel.status + ` </p> 
                            <a href = '` + status[i].stream.channel.url + `' class = 'btn btn-primary' > Go to Stream </a> 
                        </div> 
                    </div>
                    `
                    );
                } else {
                    $(".content").append(
                        `
                    <div class = 'card mb-5 bg-danger text-white' style = 'width: 18rem;'>
                        <div class = 'card-body' >
                            <h5 class = 'card-title'> ` + name + ` </h5> 
                            <p class = 'card-text'> ` + name + ` is currently Offline. </p>  
                        </div> 
                    </div>
                    `
                    );
                }
            }
        } else if (this.id == "option2") {
            for (i in status) {
                var name = status[i]._links.channel.split("/")[status[i]._links.channel.split("/").length - 1];
                if (status[i].stream) {
                    $(".content").append(
                        `
                    <div class = 'card mb-5 text-white bg-success' style = 'width: 18rem;'>
                        <div class = 'card-body' >
                            <h5 class = 'card-title'> ` + name + ` </h5> 
                            <p class = 'card-text'> ` + name + ` is currently online, and is playing: ` + status[i].stream.game + `</p> 
                            <p class = 'card-text'> ` + status[i].stream.channel.status + ` </p> 
                            <a href = '` + status[i].stream.channel.url + `' class = 'btn btn-primary' > Go to Stream </a> 
                        </div> 
                    </div>
                    `
                    );
                }
            }
        } else {
            for (i in status) {
                var name = status[i]._links.channel.split("/")[status[i]._links.channel.split("/").length - 1];
                if (!status[i].stream) {
                    $(".content").append(
                        `
        <div class = 'card mb-5 bg-danger text-white' style = 'width: 18rem;'>
            <div class = 'card-body' >
                <h5 class = 'card-title'> ` + name + ` </h5> 
                <p class = 'card-text'> ` + name + ` is currently Offline. </p>  
            </div> 
        </div>
        `
                    );
                }
            }
        }
    });
});