$("#search-icon").click(function () {
  $(".nav").toggleClass("search");
  $(".nav").toggleClass("no-search");
  $(".search-input").toggleClass("search-active");
});

$(".menu-toggle").click(function () {
  $(".nav").toggleClass("mobile-nav");
  $(this).toggleClass("is-active");
});
AOS.init();


var playerNames = [];
var result;
var inputplayer;
$("#playername").on("keyup", function () {
  inputplayer = $(this).val();
  $.ajax({
    method: "POST",
    url: "/getplayernames",
    data: { input: $(this).val() },
    success: function (data) {
      //console.log(data.names)
      playerNames = data.names;
      let match = playerNames.filter((name) => {
        const regex = new RegExp(`^${inputplayer}`, "gi");
        return name.match(regex);
      });

      if (inputplayer.length === 0) {
        playerNames = [];
      }

      $("#playername").autocomplete({
        source: match,
      });
    },
  });
});





$("#playername").onchange = function () {
  inputplayer = $(this).val();
  console.log(inputplayer);
};





$("#form").submit(function (e) {
  e.preventDefault()


  $("#button").text("Fetching Player Stats")
  $("#button").prop("disabled", "true")
  $("#result1").empty()
  $("#result2").empty()
  $("#result3").empty()

  // getting player general information
  $.ajax({
    method: "POST",
    url: "/getplayerinfo",
    data: { playername: inputplayer },
    success: function (data) {
      console.log(data.inputplayer);
      console.log(data.info);
      if (data.info == "Player not found") {
        $("#playername").val("")
        $("#button").removeAttr("disabled");
        $("#button").text("Get Player Info")
        swal("Error", "Player Name Doesn't Found", "error");
      } else {
        $("#playername").val("")
        $("#button").removeAttr("disabled");
        $("#button").text("Get Player Info")
        result1 = `
                  <br>
  <h4 class="text-center" style="color:black; margin-top:300px; margin-bottom:20px; font-weight:bolder;"> Player Information</h4>
                      <table class="table table-striped" style="width:80%; margin-left:10%,>
  <thead style="color: black; font-weight: 500;">
    <tr style="color: black;"> 
      <th>Name</th>
      <th>Date of Birth (Age)</th>
      <th>Birth Place</th>
      <th>Country</th>
    </tr>
  </thead>
  <tbody style="color: blue;">
    <tr>
      <td>${data.info.name}</td>
      <td>${data.info.DoBFormat}</td>
      <td>${data.info.birthPlace}</td>
      <td>${data.info.intlTeam}</td>
    </tr>
  </tbody>
  </table>
                      `;
        $("#result1").append(result1)
      }// else
    }

  })


  // getting player batting stats

  $.ajax({
    method: "POST",
    url: "/getplayerbatinfo",
    data: { playername: inputplayer },
    success: function (data) {
      console.log(data.inputplayer);
      console.log(data.info);
      if (data.info == "Player not found") {
        $("#playername").val("")
        $("#button").removeAttr("disabled");
        $("#button").text("Get Player Info")
        swal("Error", "Player Name Doesn't Found", "error");
      } else {
        $("#playername").val("")
        $("#button").removeAttr("disabled");
        $("#button").text("Get Player Info")
        console.log(data.info.values[0].values[0]);
        result2 = `
                  <br>
  <h4 class="text-center" style="color:black; margin-bottom:20px;">Batting Statistics</h4>
                      <table class="table table-striped" style="width:80%; margin:0% 0%;>
  <thead style="color: black">
    <tr style="color: black">
      <th> parameter </th>
      <th>TEST</th>
      <th>ODI </th>
      <th>T-20</th>
    </tr>
  </thead>
  <tbody style="color: blue">
    <tr>
      
      <td>${data.info.values[0].values[0]}</td>
      <td>${data.info.values[0].values[1]}</td>
      <td>${data.info.values[0].values[2]}</td>
      <td>${data.info.values[0].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[1].values[0]}</td>
      <td>${data.info.values[1].values[1]}</td>
      <td>${data.info.values[1].values[2]}</td>
      <td>${data.info.values[1].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[2].values[0]}</td>
      <td>${data.info.values[2].values[1]}</td>
      <td>${data.info.values[2].values[2]}</td>
      <td>${data.info.values[2].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[3].values[0]}</td>
      <td>${data.info.values[3].values[1]}</td>
      <td>${data.info.values[3].values[2]}</td>
      <td>${data.info.values[3].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[4].values[0]}</td>
      <td>${data.info.values[4].values[1]}</td>
      <td>${data.info.values[4].values[2]}</td>
      <td>${data.info.values[4].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[5].values[0]}</td>
      <td>${data.info.values[5].values[1]}</td>
      <td>${data.info.values[5].values[2]}</td>
      <td>${data.info.values[5].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[6].values[0]}</td>
      <td>${data.info.values[6].values[1]}</td>
      <td>${data.info.values[6].values[2]}</td>
      <td>${data.info.values[6].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[8].values[0]}</td>
      <td>${data.info.values[8].values[1]}</td>
      <td>${data.info.values[8].values[2]}</td>
      <td>${data.info.values[8].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[9].values[0]}</td>
      <td>${data.info.values[9].values[1]}</td>
      <td>${data.info.values[9].values[2]}</td>
      <td>${data.info.values[9].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[10].values[0]}</td>
      <td>${data.info.values[10].values[1]}</td>
      <td>${data.info.values[10].values[2]}</td>
      <td>${data.info.values[10].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[11].values[0]}</td>
      <td>${data.info.values[11].values[1]}</td>
      <td>${data.info.values[11].values[2]}</td>
      <td>${data.info.values[11].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[12].values[0]}</td>
      <td>${data.info.values[12].values[1]}</td>
      <td>${data.info.values[12].values[2]}</td>
      <td>${data.info.values[12].values[3]}</td>
    </tr>
  </tbody>
  </table>
  <br>
                      `;
        $("#result2").append(result2)
      }// else



    }

  })
  // getting player bowling stats
  $.ajax({
    method: "POST",
    url: "/getplayerbowlinfo",
    data: { playername: inputplayer },
    success: function (data) {
      console.log(data.inputplayer);
      console.log(data.info);
      if (data.info == "Player not found") {
        $("#playername").val("")
        $("#button").removeAttr("disabled");
        $("#button").text("Get Player Info")
        swal("Error", "Player Name Doesn't Found", "error");
      } else {
        $("#playername").val("")
        $("#button").removeAttr("disabled");
        $("#button").text("Get Player Info")
        result3 = `
                  <br>
  <h4 class="text-center" style="color:black; margin-bottom:20px;">Bowling Statistics</h4>
                      <table class="table table-striped" style="width:80%; margin:0%;>
  <thead style="color: black">
    <tr style="color: black">
      <th>parameter</th>
      <th>Test</th>
      <th>T-20</th>
      <th>ODI</th>
    </tr>
  </thead>
  <tbody style="color: blue">
    <tr>

      <td>${data.info.values[0].values[0]}</td>
      <td>${data.info.values[0].values[1]}</td>
      <td>${data.info.values[0].values[2]}</td>
      <td>${data.info.values[0].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[1].values[0]}</td>
      <td>${data.info.values[1].values[1]}</td>
      <td>${data.info.values[1].values[2]}</td>
      <td>${data.info.values[1].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[5].values[0]}</td>
      <td>${data.info.values[5].values[1]}</td>
      <td>${data.info.values[5].values[2]}</td>
      <td>${data.info.values[5].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[7].values[0]}</td>
      <td>${data.info.values[7].values[1]}</td>
      <td>${data.info.values[7].values[2]}</td>
      <td>${data.info.values[7].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[4].values[0]}</td>
      <td>${data.info.values[4].values[1]}</td>
      <td>${data.info.values[4].values[2]}</td>
      <td>${data.info.values[4].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[12].values[0]}</td>
      <td>${data.info.values[12].values[1]}</td>
      <td>${data.info.values[12].values[2]}</td>
      <td>${data.info.values[12].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[13].values[0]}</td>
      <td>${data.info.values[13].values[1]}</td>
      <td>${data.info.values[13].values[2]}</td>
      <td>${data.info.values[13].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[9].values[0]}</td>
      <td>${data.info.values[9].values[1]}</td>
      <td>${data.info.values[9].values[2]}</td>
      <td>${data.info.values[9].values[3]}</td>
    </tr>
    <tr>
      <td>${data.info.values[10].values[0]}</td>
      <td>${data.info.values[10].values[1]}</td>
      <td>${data.info.values[10].values[2]}</td>
      <td>${data.info.values[10].values[3]}</td>
    </tr>
  </tbody>
  </table>
  
                      `;
        $("#result3").append(result3)
      }// else



    }

  })

})


