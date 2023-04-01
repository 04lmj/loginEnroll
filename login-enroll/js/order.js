//判断是否已经登陆
function onpage(){
    if(!sessionStorage.getItem("land")) {
      alert("您还未登录")
      window.location = "login.html";
    }
  }
  onpage()
var op = document.querySelector(".upupdate");
var ada = document.querySelector(".ada");
var us = document.getElementById("name");
var am = document.getElementById("amount");
var ph = document.getElementById("phone");
var pa = document.getElementById("pay");
var id = document.getElementById("id");
var searchpage = document.getElementById("searchpage");
var sea = document.getElementById("sea");
var searchpagetop = document.getElementById("searchpage-top");
var clo = document.getElementById("closepage");
var us1 = document.getElementById("name1");
var am1 = document.getElementById("amount1");
var ph1 = document.getElementById("phone1");
var pa1 = document.getElementById("pay1");
var cen = document.getElementById("button-center");
var shadeBox = document.querySelector(".shadeBox");
var page = 1;
var i = 0;
function chagePage(){
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/order/getInfoByPage_order',
        data:{
            page:page,
            per_page:4
        },
        dataType: "json",
        success:function(res){
            ul1.innerHTML="";
            let data=res.data;
            for(let i =0;i<data.length;i++){
                let a=data[i].pay ==0?"已支付":"未支付";
                ul1.innerHTML+="<li><span>"+data[i].us+"</span><span>"+data[i].amount+"</span><span >"+data[i].phone+"</span><span>"+a+"</span><span style='display: none;'>"+data[i]._id+"</span><button onclick='revise(this)' id='first'>修改</button><button onclick='delete1(this)' id='second'>删除</button></li>"
            }           
            console.log(res);
        },
        error:function(err){
            console.log(err);
        }
    })
}
chagePage()

function revise(event){
    op.style.display = "block";
    shadeBox.style.display = "block";
    let data=event.parentNode.getElementsByTagName('span')
    us.value=data[0].innerHTML; //这里的这个us不能进行修改(接口的问题)
    am.value=data[1].innerHTML;
    ph.value=data[2].innerHTML;
    // pa.value=data[3].innerHTML;
    id.value=data[4].innerHTML;
}
//分页按钮
// function button(num) {
//     i = 0;
//     page += num;
//     if(page <= 0) {
//         page = totalNum;
//     } else if(page > totalNum) {
//         page = 1;
//     }
//     cen.value = page;
//     console.log(page);
//     chagePage();
// }
// $.ajax({
//     url: "http://118.195.129.130:3000/order/allpage_order",
//     type: "GET",
//     data: {}, 
//     dataType: "json",
//     success: function (result) {
//         console.log(result);
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
    url: "http://118.195.129.130:3000/order/allpage_order",
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
        url: "http://118.195.129.130:3000/order/allpage_order",
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













//修改订单信息
function yes(){
        $.ajax({
            type:'post',
            url:'http://118.195.129.130:3000/order/update_order',
            data:{
               us:us.value,
               amount:am.value,
               phone:ph.value,
               pay:pa.value,
               _id:id.value
            },
            datatype: "json",
            success:function(res){
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

                    ph.value = "";
                }
                if (am.value > 0 && am.value != "" && reg.test(ph.value)) {
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
                    chagePage()
                    console.log(res);
                  
                   

                }
                if (am.value == "") {
                    document.getElementById("hintPagenulltwo").style.opacity = "1";
                    document.getElementById("usOrpsnulltwo").style.opacity = "1";
                    document.getElementById("hintPagenulltwo").style.border = "1px solid blue";
                    document.getElementById("hintPagenulltwo").style.borderRadius = "20px";
            
                    setTimeout(function () {
                        document.getElementById("hintPagenulltwo").style.opacity = "0";
                        document.getElementById("usOrpsnulltwo").style.opacity = "0";
            
                    }, 1000);   
                    // alert("输入框不能为空")
                }
                if (am.value < 0) {
                    document.getElementById("hintPagepay").style.opacity = "1";
                    document.getElementById("usOrpspay").style.opacity = "1";
                    document.getElementById("hintPagepay").style.border = "1px solid blue";
                    document.getElementById("hintPagepay").style.borderRadius = "20px";
                    setTimeout(function () {
                        document.getElementById("hintPagepay").style.opacity = "0";
                        document.getElementById("usOrpspay").style.opacity = "0";
    
                    }, 1000);
                    }                
            },
            error:function(err){
                console.log(err);
            }
        })
    }
function no(){
        op.style.display = "none";
        shadeBox.style.display = "none";
    }
var se = document.getElementById("inin")

function search(){
console.log(se.value)
var a = se.value;
// 验证  空值判断  
if (!a) {    
    alert('搜索框不能为空')    
    return  
}
$.ajax({
    //type规定请求类型，只有GET和POST两种
    type:"POST",
    //url是请求的路径,这里因为请求的是本地文件使用了相对路径
    url:"http://118.195.129.130:3000/order/getInfoByKw_order",
    //data是我们要传的值，里传的是一个对象(因为这里我们并不需要传值，所以就把值注掉了)
    data:{
        kw:se.value
    },
    dataType: "json",
    //success是请求成功后执行的函数
    success:function(res){
        shadeBox.style.display = "block";
        searchpage.style.display= "block";
        sea.style.display= "block";
        searchpagetop.style.display= "block";
        clo.style.display= "block";
        searchpage.innerHTML="";
        let data=res.data;
        for(let i =0;i<data.length;i++){
            searchpage.innerHTML+="<li><span>"+data[i].us+"</span><span>"+data[i].amount+"</span><span >"+data[i].phone+"</span><span>"+data[i].pay+"</span><span style='display: none;'>"+data[i]._id+"</span></li>"
        }
        console.log(res);
    },
    //error是请求失败之后执行的函数
    error:function(err){
        console.log(err)
    }
})
}
function closepage(){
    shadeBox.style.display = "none";
    searchpage.style.display= "none";
    sea.style.display= "none";
    searchpagetop.style.display= "none";
    clo.style.display= "none";

}
//添加菜单
function add(){
    ada.style.display = "block";
    shadeBox.style.display = "block";
}
function yesadd(){
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/order/add_order',
        data:{
           us:us1.value,
           amount:am1.value,
           phone:ph1.value,
           pay:pa1.value,
        },
        datatype: "json",
        success:function(res){
            var reg = /^1[3-9]\d{9}$/;
            if(reg.test(ph1.value)){}
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
                ph1.value = "";
            }
            if (am1.value > 0 && am1.value != "" && reg.test(ph1.value)) {
                ada.style.display = "none";
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
                console.log(res);
                // alert("修改成功");
            }
            if (am1.value == "") {
                document.getElementById("hintPagenulltwo").style.opacity = "1";
                document.getElementById("usOrpsnulltwo").style.opacity = "1";
                document.getElementById("hintPagenulltwo").style.border = "1px solid blue";
                document.getElementById("hintPagenulltwo").style.borderRadius = "20px";
        
                setTimeout(function () {
                    document.getElementById("hintPagenulltwo").style.opacity = "0";
                    document.getElementById("usOrpsnulltwo").style.opacity = "0";
        
                }, 1000);   
            }
            if (am1.value < 0) {
                document.getElementById("hintPagepay").style.opacity = "1";
                document.getElementById("usOrpspay").style.opacity = "1";
                document.getElementById("hintPagepay").style.border = "1px solid blue";
                document.getElementById("hintPagepay").style.borderRadius = "20px";
                setTimeout(function () {
                    document.getElementById("hintPagepay").style.opacity = "0";
                    document.getElementById("usOrpspay").style.opacity = "0";

                }, 1000);
                // alert("请输入正整数")
            }                
        },
        error:function(err){
            console.log(err);
        }
    })
}
//取消之后消除输入框中的内容
function noadd(){
    ada.style.display = "none";
    shadeBox.style.display = "none";
    us1.value = "";
    am1.value = "";
    ph1.value = "";
    pa1.value = "";
}
//删除已有的订单
var disapper1 = document.getElementById("disapper");
var deletePage1 = document.getElementById("deletePage");
var isselest;
function delete1(event){
    deletePage1.style.display = "block";
     let data=event.parentNode.getElementsByTagName('span')
     console.log("us:  "+data[0].innerHTML);
     console.log("id:  "+data[4].innerHTML);
    let b = data[4].innerHTML;
    disapper1.value =b;
    disapper1.value=data[4].innerHTML;
    // console.log(disapper1.value);
    document.getElementById("noDelete").onclick = function () {
        deletePage1.style.display = "none";
        isselest = false;
    }
}

function yesDelete(){
    deletePage1.style.display = "none";
    $.ajax({
        //type规定请求类型，只有GET和POST两种
        type: "POST",
        //url是请求的路径,这里因为请求的是本地文件使用了相对路径
        url: "http://118.195.129.130:3000/order/del_order",
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





// var disapper1 = document.getElementById("disapper");
// var deletePage1 = document.getElementById("deletePage");
// var isselest;
// function delete1(event) {
//     deletePage1.style.display = "block";
//     let data = event.parentNode.getElementsByTagName('span');
//     let qq =data[4].innerHTML;
//     disapper1.value =qq;
//     console.log(disapper1.value);
//     document.getElementById("noDelete").onclick = function () {
//         deletePage1.style.display = "none";
//         isselest = false;
//     }
// }
// function yesDelete(){
//     deletePage1.style.display = "none";
//     $.ajax({
//         //type规定请求类型，只有GET和POST两种
//         type: "POST",
//         //url是请求的路径,这里因为请求的是本地文件使用了相对路径
//         url: "http://118.195.129.130:3000/order/del_order",
//         //data是我们要传的值，里传的是一个对象(因为这里我们并不需要传值，所以就把值注掉了)
//         data: {
//             _id: disapper1.value
//         },
//         dataType: "json",
//         //success是请求成功后执行的函数
//         success: function (result) {

//             // if (isselest == true) {
//             //     console.log(c);
//             //     chagePage()
//             //     console.log(result);
//             // }
//             chagePage()
//             console.log(result);

//         },
//         //error是请求失败之后执行的函数
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }
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
