function onpage() {
  if (!sessionStorage.getItem("land")) {
    alert("您还未登录")
    window.location = "login.html";
  }
}
onpage()



window.location.hash="no-back";
window.location.hash="Again-No-back-button";
window.onhashchange=function(){window.location.hash="no-back";}
 

function user1() {
  $.ajax({
    type: "GET",
    url: "user.html",
    data: {

    },
    success: function (dates) {
      $("#mainContent").html(dates);//要刷新的div
    },
    error: function () {
      alert("失败，请稍后再试！");
    }
  });
}
function greens() {
  $.ajax({
    type: "GET",
    url: "greens.html",
    data: {},
    success: function (dates) {
      $("#mainContent").html(dates);//要刷新的div
    },
    error: function () {
      // alert("失败，请稍后再试！");
    }
  });

}
function order() {
  $.ajax({
    type: "GET",
    url: "order.html",
    data: {},
    success: function (dates) {
      $("#mainContent").html(dates);//要刷新的div
    },
    error: function () {
      // alert("失败，请稍后再试！");
    }
  });
}
function openNav() {
	document.getElementById("myNav").style.height = "154px";
  }
  
  function closeNav() {
	document.getElementById("myNav").style.height = "0px";
  }