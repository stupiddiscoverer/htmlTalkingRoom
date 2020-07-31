function init(){
    var imgUrl = getCookie('imgUrl')
    var age = getCookie('myAge')
    var sex = getCookie('mySex')
    var degree = getCookie('myDegree')
    var color = getCookie('myColor')
    var fils = ByClassName('filtrate')
    for(var i=1;i<=fils.length;i++){
        if(getCookie('fil'+i) == 'true')
            fils[i].checked = true
    }
    if(imgUrl != null)
        ById("myPicture").src = imgUrl
    if(age != null)
        ByClassName('age_selector')[0].value = age
    if(sex != null)
        ByClassName('select_sex')[0].value = sex
    if(degree != null)
        ByClassName('select_degree')[0].value = degree
    if(color != null){
        ById('colorInput').value = color
        myColor()
    }
    // xx = setInterval(() => {
    //     alert('叽里呱啦')
    // }, 3000);
    //if()
    //    clearInterval(xx)
}

function ById(a){
    return document.getElementById(a)
}
function ByClassName(a){
    return document.getElementsByClassName(a)
}
function ByTagName(a){
    return document.getElementsByTagName(a)
}
(function (){
    var bar = ByClassName('functions')
    var detail = ByClassName('function_detail')
    var state = -1
    bar[0].onclick = function(){
        if(state != 0){
            detail[0].style.display = 'block'
            bar[0].style.background = 'pink'
            detail[1].style.display = 'none'
            bar[1].style.background = 'khaki'
            detail[2].style.display = 'none'
            bar[2].style.background = 'khaki'
            state = 0
        }else{
            detail[0].style.display = 'none'
            bar[0].style.background = 'khaki'
            state = -1
        }
    }
    bar[1].onclick = function(){
        if(state != 1){
            detail[1].style.display = 'block'
            bar[1].style.background = 'pink'
            detail[0].style.display = 'none'
            bar[0].style.background = 'khaki'
            detail[2].style.display = 'none'
            bar[2].style.background = 'khaki'
            state = 1
        }else{
            detail[1].style.display = 'none'
            bar[1].style.background = 'khaki'
            state = -1
        }
    }
    bar[2].onclick = function(){
        if(state != 2){
            detail[2].style.display = 'block'
            bar[2].style.background = 'pink'
            detail[1].style.display = 'none'
            bar[1].style.background = 'khaki'
            detail[0].style.display = 'none'
            bar[0].style.background = 'khaki'
            state = 2
        }else{
            detail[2].style.display = 'none'
            bar[2].style.background = 'khaki'
            state = -1
        }
    }
})();
function filtrate(){
    var fil = ByClassName('filtrate')
    var count = 0
    for(var i=0;i<fil.length;i++){
        if(fil[i].checked){
            count++
            setCookie(fil[i].value,true,30)
        }else{
            setCookie(fil[i].value,false,30)
        }
    }
    alert(count)
}
function sendText(){
    alert("sent")
}
function mySex(){
    x = ByClassName("select_sex")[0].value
    alert(x)
    setCookie('mySex',x,30)
}
function myDegree(){
    x = ByClassName("select_degree")[0].value
    alert(x)
    setCookie("myDegree",x,30)
}
function myAge(){
    x = ByClassName("age_selecter")[0].value
    setCookie('myAge',x,30)
    alert(x)
}
function myAddress(){
    navigator.geolocation.getCurrentPosition(
        (position)=>{
            ByClassName('my_address')[0].innerHTML = '高度'+
                parseInt(position.coords.altitude)
            setCookie('myAddress',position.coords,30)
        },
        (err)=>{
            alert('失败'+JSON.stringify(err))
            console.log(err)
            if (err.code == 1) {
                return alert('用户拒绝页面发起的地理位置')
            }
            if (err.code == 2) {
                return alert('无法获取当前位置')
            }
            if (err.code == 3) {
                return alert('超时')
            }
            return alert('未知错误')
        },
        {
            enableHighAcuracy: false, //  是否启动高精模式（布尔值）
            maximumAge: 0, // 设置定位缓存过期的时间（毫秒，0为禁用缓存）
            timeout: 5000, // 设置获取定位信息的时常（超时触发ErrorCallback）
        }
    )
}
function hostTime(){
	var d=new Date()
    var a=d.getTime()
    var millisec=a%1000
	var seconds = (a=parseInt(a/1000))%60
	var minutes = (a=parseInt(a/60))%60
	var hours = ((a=parseInt(a/60))%24+8)
	var days = d.getUTCDate() //日期有点复杂，闰年，大小月，起始日期等
	var months = parseInt((a=parseInt(a/24))%365/30)//闰年多出的几天被365舍去了
    var years = ((a=parseInt(a/365))+1970)
    var time = years+"/"+months+'/'+days+' '+hours+':'+minutes+':'+seconds+'.'+millisec
    return time
}
function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+'='+cvalue+';'+expires
}
function getCookie(name){
    var records = document.cookie.split(';')
    if(!(name in records))
        return null
    for(var i=0;i<ca.length;i++){
        if(records[i].trim().indexOf(name)==0) //c的模式：name1=value1;name2=value2;..
            return c.substring(name.length+1,c.length)
    }
}
function myColor(){
    var Body = ByTagName('body')[0]
    color = ById('colorInput').value
    Body.style.background = color
    setCookie('myColor',color,30)
}
function clickFileButton(){
    ById('chooseImage').click()
}
function myHead(){
    var url; 
    if (navigator.userAgent.indexOf("MSIE")>=1) { // IE 
        url = ById("chooseImage").value; 
    } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox 
        url = window.URL.createObjectURL(ById("chooseImage").files.item(0)); 
    } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome 
        url = window.URL.createObjectURL(ById("chooseImage").files.item(0));
    }
    ById("myPicture").src = url
    ByClassName('function_detail')[2].style.background = 'url('+url+')'
    setCookie("imgUrl",url,30)
    if(ById("chooseImage").files[0].size > 1024*1024*10)
        alert("文件超过10MB,只能本地查看")
}
function startTalk(id){
    x = ById('talking').style
    //x.background = 'linear-gradient(to right,'+'pink,'+ById('colorInput').value+')'
    x.display = 'block'
    y = ById('rightText')
    y.innerHTML = ByClassName('select_sex')[0].value+'<br>'+ByClassName('select_degree')[0].value+'<br>'+
        ByClassName('age_selecter')[0].value+'<br>'+ByClassName('my_address')[0].value+'<br>'+
        ByClassName('my_description')[0].value
    ById('rightHead').style.background = 'url('+ById('myPicture').src+')'
    ById('rightHead').style.backgroundImage.objectFit = 'cover'
    ById('records').innerHTML = ById(id).innerHTML+'--'+hostTime()
    ByClassName('talks')[0].removeChild(ById(id))
}
function closeTalking(){
    ById('talking').style.display = 'none'
}
function sendTalking(){
    x = ById('inputTalking')
    if(x.value === '')
        return
    ById('records').innerHTML += "<div style='color:white'>"+x.value+'</div>'
    x.value = ''
    ById('records').scrollTop = ById('records').scrollHeight
    return
}
function enterSend(a){
    var keyCode
    if(a.keyCode)
        keyCode = a.keyCode
    else
        keyCode = a.which
    if(keyCode==13){
        a.preventDefault()
        sendTalking()
    }
}