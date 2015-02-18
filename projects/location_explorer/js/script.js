
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var streetAdd = $("#street").val();
    var cityAdd = $("#city").val();

    var svPicURL = ("https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + streetAdd + "," + cityAdd);

    //$("body").attr("background" , svPicURL);
    $body.append('<img class="bgimg" src="' + svPicURL + '">');

    // NY Times AJAX request
    var stringifiedSearch = cityAdd.trim().replace(/[^\w\s]|_/g, "").replace(" ", "+");
    console.log(stringifiedSearch);
    var timesPath = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+ stringifiedSearch  + "&api-key=f05087d2e5ce467379c50f9a2a7046d7:3:71173025";
    
    //$.getJSON( "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&api-key=f05087d2e5ce467379c50f9a2a7046d7:3:71173025", function (data) {
    $.getJSON(timesPath, function (data) {
        //ONLY RUNS WHEN DATA IS RECEIVED!
        //console.log("data retrieved!");
        //console.log(data);

        for (var articleCounter = 0; articleCounter < data.response.docs.length; articleCounter++) {
            headlineText = data.response.docs[articleCounter].headline.main;
            headlineLink = data.response.docs[articleCounter].web_url;
            articleText = data.response.docs[articleCounter].snippet;
            var newSubjt = '<li class="nytimes-articles">'
            var newHeadlineLink = '<a href="' + headlineLink + '">' + headlineText + '</a>';
            var newHeadlineSnippet = '<p>' + articleText + '</p>';

            //console.log(data.response.docs[articleCounter].headline.main);

            $nytElem.append(newSubjt + newHeadlineLink + newHeadlineSnippet);
        }

    }).error(function(e){
        $nytHeaderElem.text("New York Times Failed to load");
    });

    // Wikipedia work here
    //xhr.setRequestHeader( 'Api-User-Agent', 'Example/1.0');

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityAdd + '&format=json&callback=wikiCallback';

    $.ajax( {

        url: wikiUrl,
        dataType : 'jsonp',
        success : function(response) {
            //console.log(response);
            for ( var wikiPageIndex = 0; wikiPageIndex < response[1].length; wikiPageIndex++) {
                    var wikiPageTitle = response[1][wikiPageIndex];
                    var wikiPageLink = response[3][wikiPageIndex];
                    $wikiElem.append('<li><a href="' + wikiPageLink + '">' + wikiPageTitle + '</a></li>');


                }
            }
        


    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
