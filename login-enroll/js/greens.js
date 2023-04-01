//判断是否已经登录
function onpage() {
    if (!sessionStorage.getItem("land")) {
        alert("您还未登录")
        window.location = "login.html";
    }
}
onpage()
var op = document.querySelector(".upupdate");
var ada = document.querySelector(".ada");
var us = document.getElementById("name");
var price = document.getElementById("price");
var typeid = document.getElementById("typeid");
var typename = document.getElementById("typename");
var id = document.getElementById("id");
var desc = document.getElementById("desc");
var searchpage = document.getElementById("searchpage");
var sea = document.getElementById("sea");
var searchpagetop = document.getElementById("searchpage-top");
var clo = document.getElementById("closepage");
var us1 = document.getElementById("name1");
var price1 = document.getElementById("price1");
var typeid1 = document.getElementById("typeid1");
var typename1 = document.getElementById("typename1");
var desc1 = document.getElementById("desc1");
var cen = document.querySelector("#change-button");
var shadeBox = document.querySelector(".shadeBox");
var num11 = document.getElementById("num1");
var inputOne = document.getElementById("inputOne");

// 定义转义html的方法
function htmlEscape(htmlStr) {
    return htmlStr.replace(/<|>|"|&/g, match => {
        switch (match) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case '&':
                return '&amp;';
        }
    })
}
// 定义还原html的方法
function htmlUnescape(html) {
    return html.replace(/&lt;|&gt;|&quot;|&amp;/g, match => {
        switch (match) {
            case '&lt;':
                return '<';
            case '&gt;':
                return '>';
            case '&quot;':
                return '"';
            case '&amp;':
                return '&';
        }
    })
}

function chagePage() {
    $.ajax({
        type: 'post',
        url: 'http://118.195.129.130:3000/food/getInfoByPage',
        data: {
            page: page,
            per_page: 4
        },
        dataType: "json",
        success: function (res) {
            ul1.innerHTML = "";
            let data = res.data;
            for (let i = 0; i < data.length; i++) {
                let b = data[i].typeid;
                if (b == 0) {
                    b = "面";
                }
                if (b == 1) {
                    b = "米";
                }
                if (b == 2) {
                    b = "饮品";
                }
                if (b == 3) {
                    b = "水果";
                }
                ul1.innerHTML += "<li><span>" + data[i].name + "</span><span>" + b + "</span><span >" + data[i].price + "</span><span>" + data[i].desc + "</span><span>" + data[i].typename + "</span><span style='display: none;'>" + data[i]._id + "</span><button onclick='revise(this)' id='first'>修改</button><button onclick='delete1(this)' id='second'>删除</button></li>"
                const htmlStr = data[i].name + b + data[i].price + data[i].desc + data[i].typename
                let html = htmlEscape(htmlStr);
                let str = htmlUnescape(html);
                // ul1.innerHTML += str;
                console.log(html);
                console.log(str);
            }
            console.log(data[i].name);

            console.log(res);
        },
        error: function (err) {
            console.log(err);
        }
    })
}
chagePage()


// function htmllEscape(htmlstr){
//     return htmlstr.replace(/<|>"|&/g,(match)=>{
//         switch(match){
//             case '<':
//                 return "&lt"
//             case '>':
//                 return "&gt"
//             case '&':
//                 return "&amp"
//         }
//     })
//  }
//  function openhtmllEscape(htmlstr){
//     return htmlstr.replace(/&lt|&gt"|&amp/g,(match)=>{
//         switch(match){
//             case '&lt':
//                 return "<"
//             case '&gt':
//                 return ">"
//             case '&amp':
//                 return ""
//         }
//     })
//  }












function revise(event) {
    op.style.display = "block";
    shadeBox.style.display = "block";
    let data = event.parentNode.getElementsByTagName('span')
    us.value = data[0].innerHTML;
    // typeid.value=data[1].innerHTML;
    price.value = data[2].innerHTML;
    desc.value = data[3].innerHTML;
    typename.value = data[4].innerHTML;
    id.value = data[5].innerHTML;
}



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

// i = 0;
// page += num;
// console.log(page);
// inputOne.value = page;
// if (page == 1) {
//     // page = 1;
//     left.onclick = function(){
//         console.log("-----");
//     };
//     left.style.cursor="no-drop";
//     // $("#left").css("pointer-events","none"); 
//     // alert("已经是第一页了")
// }
// if (page == totalNum ) {
//     // $("#right").css("pointer-events","none"); 
//     right.onclick = null;
//     right.style.cursor="no-drop";

//     // page = totalNum;
//     // alert("已经是最后一页了")
// }
// else if (page > 1 || page < totalNum) {
//     // $("#left").css("pointer-events","");  
//     // $("#right").css("pointer-events","");  
//     left.onclick =function(){
//         left.style.cursor="pointer";
//         button(-1);
//     } 
// right.onclick = function(){
//     button(1);
// } 

$.ajax({
    url: "http://118.195.129.130:3000/food/allpage",
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
        url: "http://118.195.129.130:3000/food/allpage",
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


//修改菜品信息
function yes() {
    $.ajax({
        type: 'post',
        url: 'http://118.195.129.130:3000/food/update',
        data: {
            name: us.value,
            price: price.value,
            desc: desc.value,
            typeid: typeid.value,
            typename: typename.value,
            _id: id.value
        },
        datatype: "json",
        success: function (res) {

            // 输入的是整数
            if (price.value % 1 == 0 && price.value > 0 && (typeid.value == 0 | typeid.value == 1 | typeid.value == 2 | typeid.value == 3) && typeid.value != "") {
                chagePage()
                op.style.display = "none";
                shadeBox.style.display = "none";
                document.getElementById("hintPagesuccess").style.opacity = "1";
                document.getElementById("usOrpssuccess").style.opacity = "1";
                document.getElementById("hintPagesuccess").style.border = "1px solid blue";
                document.getElementById("hintPagesuccess").style.borderRadius = "20px";
                setTimeout(function () {
                    document.getElementById("hintPagesuccess").style.opacity = "0";
                    document.getElementById("usOrpssuccess").style.opacity = "0";

                }, 1000);
                console.log(res);
            }
            if (typeid.value == "") {
                document.getElementById("hintPagenulltwo").style.opacity = "1";
                document.getElementById("usOrpsnulltwo").style.opacity = "1";
                document.getElementById("hintPagenulltwo").style.border = "1px solid blue";
                document.getElementById("hintPagenulltwo").style.borderRadius = "20px";
                setTimeout(function () {
                    document.getElementById("hintPagenulltwo").style.opacity = "0";
                    document.getElementById("usOrpsnulltwo").style.opacity = "0";

                }, 1000);
            }
            if (typeid.value != 0 && typeid.value != 1 && typeid.value != 2 && typeid.value != 3) {
                typeid.value = "";
                document.getElementById("hintPagenullthree").style.opacity = "1";
                document.getElementById("usOrpsnullthree").style.opacity = "1";
                document.getElementById("hintPagenullthree").style.border = "1px solid blue";
                document.getElementById("hintPagenullthree").style.borderRadius = "20px";
                setTimeout(function () {
                    document.getElementById("hintPagenullthree").style.opacity = "0";
                    document.getElementById("usOrpsnullthree").style.opacity = "0";

                }, 1000);

            }
            //输入的是负数
            // 输入的是小数
            if (price.value < 0 || price.value % 1 != 0) {
                document.getElementById("hintPagenullthree").style.opacity = "1";
                document.getElementById("usOrpsnullthree").style.opacity = "1";
                document.getElementById("hintPagenullthree").style.border = "1px solid blue";
                document.getElementById("hintPagenullthree").style.borderRadius = "20px";

                setTimeout(function () {
                    document.getElementById("hintPagenullthree").style.opacity = "0";
                    document.getElementById("usOrpsnullthree").style.opacity = "0";

                }, 1000);
                price.value = "";

                // alert("请输入正整数")
            }


            // alert("修改成功");
        },
        error: function (err) {
            console.log(err);
        }
    })
}
//取消后清除输入框中所输入的信息
function no() {
    op.style.display = "none";
    shadeBox.style.display = "none";
    // us.value = "";
    // price.value = "";
    // desc.value = "";
    // typeid.value = "";
    // typename.value = "";
}
var se = document.getElementById("inin")
function search() {
    console.log(se.value)
    var a = se.value;
    // 验证  空值判断  
    if (!a) {
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
        url: "http://118.195.129.130:3000/food/getInfoByKw",
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
                var b = data[i].typeid;
                if (b == 0) {
                    b = "面";
                }
                if (b == 1) {
                    b = "米";
                }
                if (b == 2) {
                    b = "饮品";
                }
                if (b == 3) {
                    b = "水果";
                }
                searchpage.innerHTML += "<li><span>" + data[i].name + "</span><span>" + b + "</span><span >" + data[i].price + "</span><span>" + data[i].typename + "</span><span>" + data[i].desc + "</span><span style='display: none;'>" + data[i]._id + "</span></li>"
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
//添加菜品信息
function add() {
    ada.style.display = "block";
    shadeBox.style.display = "block";
}
function yesadd() {
    $.ajax({
        type: 'post',
        url: 'http://118.195.129.130:3000/food/add',
        data: {
            name: us1.value,
            price: price1.value,
            desc: desc1.value,
            typeid: typeid1.value,
            typename: typename1.value,
        },
        datatype: "json",
        success: function (res) {
            // 输入的是整数
            // 输入的是整数
            if (price1.value % 1 == 0 && price1.value > 0 && (typeid1.value == 0 | typeid1.value == 1 | typeid1.value == 2 | typeid.value == 3) && typeid1.value != "") {

                chagePage()
                // us1.value = "";
                // price1.value = "";
                // desc1.value = "";
                // typeid1.value = "";
                // typename1.value = "";
                ada.style.display = "none";
                shadeBox.style.display = "none";
                console.log(res);
            }
            if (typeid1.value == "" | price1.value == "") {
                // alert("报错")
                document.getElementById("hintPagenulltwo").style.opacity = "1";
                document.getElementById("usOrpsnulltwo").style.opacity = "1";
                document.getElementById("hintPagenulltwo").style.border = "1px solid blue";
                document.getElementById("hintPagenulltwo").style.borderRadius = "20px";

                setTimeout(function () {
                    document.getElementById("hintPagenulltwo").style.opacity = "0";
                    document.getElementById("usOrpsnulltwo").style.opacity = "0";

                }, 1000);
            }
            if (typeid1.value != 0 && typeid1.value != 1 && typeid1.value != 2 && typeid.value != 3) {
                document.getElementById("hintPagenullthree").style.opacity = "1";
                document.getElementById("usOrpsnullthree").style.opacity = "1";
                document.getElementById("hintPagenullthree").style.border = "1px solid blue";
                document.getElementById("hintPagenullthree").style.borderRadius = "20px";

                setTimeout(function () {
                    document.getElementById("hintPagenullthree").style.opacity = "0";
                    document.getElementById("usOrpsnullthree").style.opacity = "0";

                }, 1000);
                // alert("报错")

                typeid1.value = "";
            }
            //输入的是负数
            // 输入的是小数

            if (price1.value < 0 | price1.value % 1 != 0) {
                document.getElementById("hintPagenullthree").style.opacity = "1";
                document.getElementById("usOrpsnullthree").style.opacity = "1";
                document.getElementById("hintPagenullthree").style.border = "1px solid blue";
                document.getElementById("hintPagenullthree").style.borderRadius = "20px";
                setTimeout(function () {
                    document.getElementById("hintPagenullthree").style.opacity = "0";
                    document.getElementById("usOrpsnullthree").style.opacity = "0";
                    price1.value = "";
                }, 1000);
                // alert("请输入正整数")
            }


            // alert("修改成功");
        },
        error: function (err) {
            console.log(err);
        }
    })
}
//取消后删除输入框中所输入的数据
function noadd() {
    ada.style.display = "none";
    shadeBox.style.display = "none";
    us1.value = "";
    price1.value = "";
    desc1.value = "";
    typeid1.value = "";
    typename1.value = "";
}
//删除菜品信息
var disapper1 = document.getElementById("disapper");
var deletePage1 = document.getElementById("deletePage");
var isselest;
function delete1(event) {
    deletePage1.style.display = "block";
    let data = event.parentNode.getElementsByTagName('span');
    let c = data[5].innerHTML;
    disapper1.value = c;
    console.log(disapper1.value);
    document.getElementById("noDelete").onclick = function () {
        deletePage1.style.display = "none";
        isselest = false;
    }
}
function yesDelete() {
    deletePage1.style.display = "none";
    $.ajax({
        //type规定请求类型，只有GET和POST两种
        type: "POST",
        //url是请求的路径,这里因为请求的是本地文件使用了相对路径
        url: "http://118.195.129.130:3000/food/del",
        //data是我们要传的值，里传的是一个对象(因为这里我们并不需要传值，所以就把值注掉了)
        data: {
            _id: disapper1.value
        },
        dataType: "json",
        //success是请求成功后执行的函数
        success: function (result) {

            // if (isselest == true) {
            //     console.log(c);
            //     chagePage()
            //     console.log(result);
            // }
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


