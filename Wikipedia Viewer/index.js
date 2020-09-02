$(document).ready(function() {
  var search  = $("#Search"),
      results = $("#results"),
      input   = $("#input"),
      page = "https://www.wikiwand.com/en/";
  search.on("click",function(){
    results.hide();
    var value = input.val();
    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + value + "&callback=?";
    results.html("<h2>Results:</h2>");

    $.getJSON(url, function(json){
      results.append("<h4 class='text-Muted'> Total Hits: " + json.query.searchinfo.totalhits +"</h4>");
      json.query.search.forEach(element => {
        results.append("<div class='card mt-5 mb-5 bg-faded'><div class='card-block bg-faded m-5'><h2>" + element.title + "</h2><h4>" + element.snippet + " </h4>" + "<a href='"+ page + element.title + "' class='btn btn-outline-primary' role='button'> Go to page </a>" + "</div></div>")
      });
    });
    
    results.show("slow");
    return false
  });
});
