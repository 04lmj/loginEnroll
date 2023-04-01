var loginPage = document.getElementById("loginPage");
var enrollPage = document.getElementById("enrollPage");
//登录和注册两个页面之间的翻转切换
function enroll() {
	enrollPage.style.display = "block"
	loginPage.style.transform = "rotateY(180deg)"
	enrollPage.style.transform = "rotateY(0deg)"

}
function enrollOk() {
	enrollPage.style.transform = "rotateY(-180deg)"
	loginPage.style.transform = "rotateY(0deg)"
}

function backLogin(){
	enrollPage.style.transform = "rotateY(-180deg)"
	loginPage.style.transform = "rotateY(0deg)"
}
var username = document.getElementById("username");
var pass = document.getElementById("password");
var hintPage1 = document.getElementById("hintPage");
function login() {
	var us = username.value;
	var ps = pass.value;
	// 验证  空值判断  
	if (!us || !ps) {
		document.getElementById("hintPagenull").style.opacity = "1";
		document.getElementById("usOrpsnull").style.opacity = "1";
		document.getElementById("hintPagenull").style.border = "1px solid blue";
		document.getElementById("hintPagenull").style.borderRadius = "20px";

		setTimeout(function () {
			document.getElementById("hintPagenull").style.opacity = "0";
			document.getElementById("usOrpsnull").style.opacity = "0";
		}, 1000);
		return
	}
	$.ajax({
		//type规定请求类型，只有GET和POST两种
		type: "POST",
		//url是请求的路径,这里因为请求的是本地文件使用了相对路径
		url: "http://118.195.129.130:3000/user/login",
		//data是我们要传的值，里传的是一个对象
		data: {
			us: username.value,
			ps: pass.value
		},
		dataType: "json",
		//success是请求成功后执行的函数
		success: function (result) {
			sessionStorage.setItem("land", true);
			if (result.err == "0") {
				console.log(result);
				window.location = "backstage.html";
			}
			else {
				// alert("账号或密码错误");
				document.getElementById("hintPage").style.opacity = "1";
				document.getElementById("usOrps").style.opacity = "1";
				document.getElementById("hintPage").style.border = "1px solid blue";
				document.getElementById("hintPage").style.borderRadius = "20px";
				setTimeout(function () {
					document.getElementById("hintPage").style.opacity = "0";
					document.getElementById("usOrps").style.opacity = "0";

				}, 1000);
			}
		},
		//error是请求失败之后执行的函数
		error: function (err) {
			console.log(err);
		}
	})
}
var _count = document.getElementById("count"); //获取验证码按钮
var time = 59;
// 注册单击事件
var timer;
_count.addEventListener('click', function () {
	//每次开头都关闭一次定时器，防止定时器不断叠加
	clearInterval(timer);
	// 开启定时器
	timer = setInterval(function () {
		// 判断剩余秒数
		if (time == 0) {
			// 清除定时器和复原按钮
			clearInterval(timer);
			_count.innerHTML = '获取验证码';
		} else {
			_count.innerHTML = time + "秒后重新获取";
			time--;
		}
	}, 1000);
});
var user11 = document.getElementById("user1");
var password1 = document.getElementById("password1");
var mail1 = document.getElementById("mail1");
var code1 = document.getElementById("code1");
function enrollOk() {
	// 验证  空值判断  
	if (!user1.value || !password1.value || !mail1.value || !code1.value) {
		document.getElementById("hintPagenull").style.opacity = "1";
		document.getElementById("usOrpsnull").style.opacity = "1";
		document.getElementById("hintPagenull").style.border = "1px solid blue";
		document.getElementById("hintPagenull").style.borderRadius = "20px";
		setTimeout(function () {
			document.getElementById("hintPagenull").style.opacity = "0";
			document.getElementById("usOrpsnull").style.opacity = "0";

		}, 1000);
		return
	}
	$.ajax({
		//type规定请求类型，只有GET和POST两种
		type: "POST",
		//url是请求的路径,这里因为请求的是本地文件使用了相对路径
		url: "http://118.195.129.130:3000/user/reg",
		//data是我们要传的值，里传的是一个对象
		data: {
			us: user11.value,
			ps: password1.value,
			mail: mail1.value,
			code: code1.value
		},
		dataType: "json",
		//success是请求成功后执行的函数
		success: function (result) {
			//对输入的邮箱格式进行判断
			var reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
			if (reg.test(mail1.value)) { }
			else {
				document.getElementById("hintPagemail").style.opacity = "1";
				document.getElementById("usOrpsmail").style.opacity = "1";
				document.getElementById("hintPagemail").style.border = "1px solid blue";
				document.getElementById("hintPagemail").style.borderRadius = "20px";
		
				setTimeout(function () {
					document.getElementById("hintPagemail").style.opacity = "0";
					document.getElementById("usOrpsmail").style.opacity = "0";
		
				}, 1000);
				mail1.value = "";
			}
			if (reg.test(mail1.value) && user1.value != "" && password1.value != "" && mail1.value != "" && code1.value != "") {
				enrollPage.style.transform = "rotateY(-180deg)"
				loginPage.style.transform = "rotateY(0deg)"
				user11.value = "";
				password1.value = "";
				mail1.value = "";
				code1.value = "";
				console.log(result);
			}

			// sessionStorage.setItem("land",true);
		},
		//error是请求失败之后执行的函数
		error: function (err) {
			console.log(err);
		}
	})
}
//记住密码
var ipt = document.querySelector('#username')
var rem_T = document.querySelector('#remember_text')
// var rem_P = document.querySelector('#remember_password')
var password = document.querySelector('#password')
if (localStorage.getItem('ipt')) {
	ipt.value = (localStorage.getItem('ipt'))
	rem_T.checked = true
	password.value = (localStorage.getItem('password'))
	// rem_P.checked = true
}
rem_T.addEventListener('change', function () {
	if (this.checked) {
		localStorage.setItem('ipt', ipt.value);
		localStorage.setItem('password', password.value);
	} else {
		localStorage.removeItem('ipt');
		localStorage.removeItem('password');
	}
})
