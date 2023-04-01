//判断用户是否已经登陆
function onpage() {
    if (!sessionStorage.getItem("land")) {
        alert("您还未登录")
        window.location = "login.html";
    }
}
onpage()
var ada = document.querySelector(".ada");
var op = document.querySelector(".upupdate");
var age = document.getElementById("age");
var sex = document.getElementById("sex");
var id = document.getElementById("id");
var us = document.getElementById("name");
var ph = document.getElementById("phone");
var searchpage = document.getElementById("searchpage");
var sea = document.getElementById("sea");
var searchpagetop = document.getElementById("searchpage-top");
var clo = document.getElementById("closepage");
var cen = document.getElementById("button-center");
var shadeBox = document.querySelector(".shadeBox");
var page = 1;
var i = 0;
function chagePage() {
    $.ajax({
        type: 'post',
        url: 'http://118.195.129.130:3000/users/getInfoByPage_users',
        data: {
            page: page,
            per_page: 4
        },
        dataType: "json",
        success: function (res) {
            ul1.innerHTML = "";
            let data = res.data;
            for (let i = 0; i < data.length; i++) {
                let a = data[i].sex == 0 ? "男" : "女";
                ul1.innerHTML += "<li><span>" + data[i].us + "</span><span>" + data[i].age + "</span><span >" + a + "</span><span>" + data[i].phone + "</span><span style='display: none;'>" + data[i]._id + "</span><button onclick='revise(this)' id='first'>修改</button><button onclick='revise(this)' id='second'>删除</button></li>"
            }
            console.log(res);
        },
        error: function (err) {
            console.log(err);
        }
    })
}
chagePage()
function revise(event) {
    op.style.display = "block";
    shadeBox.style.display = "block";
    let data = event.parentNode.getElementsByTagName('span')
    // let data = document.getElementsByTagName("span")
    us.value = data[0].innerHTML;
    age.value = data[1].innerHTML;
    // sex.value = data[2].innerHTML;
    ph.value = data[3].innerHTML;
    id.value = data[4].innerHTML;
}
//分页按钮
// function button(num) {
//     i = 0;
//     page += num;
//     if (page <= 0) {
//         page = totalNum;
//     } else if (page > totalNum) {
//         page = 1;
//     }
//     cen.value = page;
//     console.log(page);
//     chagePage();
// }
// $.ajax({
//     url: "http://118.195.129.130:3000/users/allpage_users",
//     type: "GET",
//     data: {},
//     dataType: "json",
//     success: function (result) {
//         console.log(result);
//         //获取所能达到的最大页数
//         totalNum = Math.ceil(result.pages / 4);
//     },
//     error: function (err) {
//         console.log(err);
//     }
// });

var page = 1;
var i = 0;

//分页按钮
var left = document.getElementById("left")
var right = document.getElementById("right")
function button(num) {
    if (num == -1) {
        if (page == 2) {
            left.onclick = null;
            left.style.cursor = "no-drop";
        }
        right.onclick = function () {
            button(1);
        }
        right.style.cursor = "pointer";
        page--;
    } else {
        if (totalNum == 1) {
            left.onclick = null;
            left.style.cursor = "no-drop";
            right.onclick = null;
            right.style.cursor = "no-drop";
            return
        }
        if (page == totalNum - 1) {
          
            right.onclick = null;
            right.style.cursor = "no-drop";
        }
        left.onclick = function () {
            button(-1);
        }
        left.style.cursor = "pointer";
        page++;
    }
    inputOne.value = page;
    chagePage();
}


$.ajax({
    url: "http://118.195.129.130:3000/users/allpage_users",
    type: "GET",
    data: {

    },
    dataType: "json",
    success: function (result) {

        // console.log(cen.value);
        console.log(result);
        totalNum = Math.ceil(result.pages / 4);
    },
    error: function (err) {
        console.log(err);
    }
});

//获取一共有多少页
var sumPage = document.getElementById("sumPage");
function totalNum11() {
    $.ajax({
        type: "get",
        url: "http://118.195.129.130:3000/users/allpage_users",
        data: {
        },
        success: function (data) {
            //len即页面中所有数据的个数
            var len = data.pages;
            sumPage.innerHTML = Math.ceil(len / 4);
        },
        error: function (err) {
            console.log("操作失败！")
        }
    });
}
totalNum11()




















//修改用户信息
function yes() {
    $.ajax({
        type: 'post',
        url: 'http://118.195.129.130:3000/user/mod',
        data: {
            _id: id.value,
            us: us.value,
            phone: ph.value,
            age: age.value,
            sex: sex.value
        },
        datatype: "json",
        success: function (res) {
            var reg = /^1[3-9]\d{9}$/;
            if(reg.test(ph.value)){}
            else{
                document.getElementById("hintPagephone").style.opacity = "1";
				document.getElementById("usOrpsphone").style.opacity = "1";
				document.getElementById("hintPagephone").style.border = "1px solid blue";
				document.getElementById("hintPagephone").style.borderRadius = "20px";
				setTimeout(function () {
					document.getElementById("hintPagephone").style.opacity = "0";
					document.getElementById("usOrpsphone").style.opacity = "0";

				}, 1000);

                // alert("请输入正确的手机号格式");
                ph.value = "";
            }
            if (age.value >= 0 && age.value < 140 && reg.test(ph.value)) {
                op.style.display = "none";
                shadeBox.style.display = "none";
                chagePage()
                document.getElementById("hintPagesuccess").style.opacity = "1";
                document.getElementById("usOrpssuccess").style.opacity = "1";
                document.getElementById("hintPagesuccess").style.border = "1px solid blue";
                document.getElementById("hintPagesuccess").style.borderRadius = "20px";
                setTimeout(function () {
                    document.getElementById("hintPagesuccess").style.opacity = "0";
                    document.getElementById("usOrpssuccess").style.opacity = "0";

                }, 1000);
                // alert("修改成功");
                console.log(res);
            }

        },
        error: function (err) {
            console.log(err);
        }
    })
}
function no() {
    op.style.display = "none";
    shadeBox.style.display = "none";
    // us.value = "";
    // age.value = "";
    // ph.value = "";
    // sex.value = "";
}
var se = document.getElementById("inin");
function search() {
    console.log(se.value)
    var a = se.value;
    // 验证  空值判断  
    if (!a) {
        alert('搜索框不能为空')
        return
    }
    $.ajax({
        //type规定请求类型，只有GET和POST两种
        type: "POST",
        //url是请求的路径,这里因为请求的是本地文件使用了相对路径
        url: "http://118.195.129.130:3000/users/getInfoByKw_users",
        //data是我们要传的值，里传的是一个对象(因为这里我们并不需要传值，所以就把值注掉了)
        data: {
            kw: se.value
        },
        dataType: "json",
        //success是请求成功后执行的函数
        success: function (res) {
            shadeBox.style.display = "block";
            searchpage.style.display = "block";
            sea.style.display = "block";
            searchpagetop.style.display = "block";
            clo.style.display = "block";
            searchpage.innerHTML = "";
            let data = res.data;
            for (let i = 0; i < data.length; i++) {
                let a = data[i].sex == 0 ? "男" : "女";
                searchpage.innerHTML += "<li><span>" + data[i].us + "</span><span>" + data[i].age + "</span><span >" + a + "</span><span>" + data[i].phone + "</span><span style='display: none;'>" + data[i]._id + "</span></li>"
            }
            console.log(res);
        },
        //error是请求失败之后执行的函数
        error: function (err) {
            console.log(err)
        }
    })
}
function closepage() {
    shadeBox.style.display = "none";
    searchpage.style.display = "none";
    sea.style.display = "none";
    searchpagetop.style.display = "none";
    clo.style.display = "none";
}

//删除用户信息
function delete1() {
    let data = document.getElementsByTagName("span");
    let c = data[4].innerHTML;
    $.ajax({
        //type规定请求类型，只有GET和POST两种
        type: "POST",
        //url是请求的路径,这里因为请求的是本地文件使用了相对路径
        url: "http://118.195.129.130:3000/users/del_users",
        //data是我们要传的值，里传的是一个对象(因为这里我们并不需要传值，所以就把值注掉了)
        data: {
            _id: c
        },
        dataType: "json",
        //success是请求成功后执行的函数
        success: function (result) {
            console.log(c);
            chagePage()
            console.log(result);
        },
        //error是请求失败之后执行的函数
        error: function (err) {
            console.log(err)
        }
    })

}



//退出登录，并且退出后清空sessionStorage的数据
function escLoad() {
    document.getElementById("icon").style.height = "154px";
}
function closeLoad() {
    document.getElementById("icon").style.height = "0px";
}

var escLoad1 = document.getElementById("escLoad");
function backLogin() {
    escLoad1.style.display = "block";
}
document.getElementById("yesEsc").onclick = function () {
    window.location = "login.html";
    sessionStorage.clear();
}
document.getElementById("noEsc").onclick = function () {
    escLoad1.style.display = "none";
}
