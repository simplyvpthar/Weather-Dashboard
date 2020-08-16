$ (document).on("click", ".city", getForecast);
$("#submitCity").on("click", function (event) {
    event.preventDefault();
    $('#city-input').val("");
    renderButtons();
  getForecast()
});
renderButtons();
function getForecast(){
    var city = $(this).text();
    var days = 5;
    if(city != '' && days != ''){
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + "&units=Imperial" + "&cnt=" + days + "&APPID=c10bb3bd22f90d636baa008b1529ee25",
            type: "GET",
            dataType: "json",
            success: function(response){
                var table = '';
                var i = 0;
                var header = '<h3 style="font-weight:bold; font-size:20px; margin-top:20px;">Weather Forecast for ' + response.city.name + ', ' + response.city.country + '</h3>'
                for(var i = 0; i < response.list.length; i++){
                    table += "<tr>";
                    table += "<td><img src='https://openweathermap.org/img/w/"+response.list[i].weather[0].icon+".png'></td>";
                    table += "<td>" + response.list[i].weather[0].main + "</td>";
                    table += "<td>" + response.list[i].weather[0].description + "</td>";
                    table += "<td>" + response.list[i].temp.min + "&deg;F</td>";
                    table += "<td>" + response.list[i].temp.max + "&deg;F</td>";
                    table += "<td>" + response.list[i].humidity + "%</td>";
                    table += "</tr>";
                }
                $("#forecastWeather").html(table);
                $("#header").html(header);
                $("#city").val('');
                $("#days").val('')
            }
        });
    }else{
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>");
    }
}





