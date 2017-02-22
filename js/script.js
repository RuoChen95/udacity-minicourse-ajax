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

    //google map的api实施
    
    var cityStr = $('#street').val() + ", " + $('#city').val(); //用jquery的val函数获取input的值
    $greeting.text("So you live in" + cityStr + "?"); //改变greeting处的字符串值

    var streetviewUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + cityStr; //得到所需要的url
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">'); //利用jquery的append函数，将一个新的图片作为背景

    //纽约时报api实施
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=mykey'; //还没有获得key
    $.getJSON(nytimesUrl, function(data) {
            $nytHeaderElem.text('New york times articles about ' + cityStr);
            articles = data.response.docs;
            for (var i = 0; i < articles.length; i++) {
                var article = articles[i];
                $nytElem.append('<li class="article">' + '<a href="' + article.web_url +'">' + article.heasdline.main + '<a>' + '<p>' + article.snippet + '</p>' + '<li>');
            };
        })
        .error(function(e) {
            $nytHeaderElem.text("This could not be loaded");
        });

    return false;
};

$('#form-container').submit(loadData);