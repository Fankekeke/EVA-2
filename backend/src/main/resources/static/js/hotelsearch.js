/*
    页面加声明常量 SEARCH_HOTEL_URL = "{:url('hotel/index/h_list')}"
    目的地input框 加 hotel-city 类
    日期input框 加 hotel-date 类
    搜索按钮 加 hotel-search 类
*/
$( () => {


    var date = new Date()
    var today = date.toLocaleDateString().split('/').join('-'); //当前日期

    date.setTime(date.getTime()+24*60*60*1000);
    var tomorrow = date.getFullYear()+"-" + (date.getMonth()+1) + "-" + date.getDate();  //第二天日期
    
   
    var dataVal;    //日期时段
    var dateIn;     //入住时间
    var dateOut;    //离店时间
    
    laydate.render({
        elem: '.hotel-date'
        ,theme: '#ff9e00'
        ,range: '至'
        ,trigger: 'click'
        ,min:today
       
          ,done: function(value, date, endDate){
          
            dataVal = value;
            dateIn = date;
            dateOut = endDate;
            
          }
    });
    
    
    
    $('.hotel-city').on("keydown",function(e){
        if(e.keyCode == '13'){

            let city = e.target.value.trim();
            search(city,dateIn,dateOut);

        }
    });

    $('.hotel-search').on('click',function(){
        let city = $('.hotel-city').val().trim();
        search(city,dateIn,dateOut);
    });

    function search(city,dateIn,dateOut){
        if(city==='') return false;

        if( dataVal == undefined || dataVal ==''){
               
            dateIn = today;
            dateOut = tomorrow;

        }

        sessionStorage.setItem('search_hotel_city',city);
        sessionStorage.setItem('search_hotel_in',dateIn);
        sessionStorage.setItem('search_hotel_out',dateOut);
        location.href = SEARCH_HOTEL_URL;
        
    }
})




