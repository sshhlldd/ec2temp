var mybase = {
    mypop: function(tit, html) {
        $('.ec_pop').remove();
        $('.ec_pop').off('click', '.close')
        var modalDiv = '<div class="ec_pop">\
            <div class="cover"></div>\
            <div class="pop_box">\
            <div class="pop_head"><button type="button" class="close">×</button><h4>' + tit + '</h4></div>\
            <div class="pop_body">' + html + '</div>\
            <div class="pop_foot">\
            <button href="javascript:;" class="confirm btn btn-green">确定</button></div>\
            </div></div>';
        $('body').append(modalDiv);
        $('.ec_pop').fadeIn();
        $('.ec_pop').on('click', '.close', function() {
            $(this).parents('.ec_pop').hide();
        })
    },
    /**
     * 检测是否为空
     * @param string
     * @returns {Boolean}
     */
    isEmpty: function(string) {
        if (null == string || '' == string || false == string) {
            return true;
        }
        return false;
    },
    preloadimages: function(arr) {
        var newimages = [],
            loadedimages = 0
        var postaction = function() {} //此处增加了一个postaction函数
        var arr = (typeof arr != "object") ? [arr] : arr

        function imageloadpost() {
            loadedimages++
            if (loadedimages == arr.length) {
                postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
            }
        }
        for (var i = 0; i < arr.length; i++) {
            newimages[i] = new Image()
            newimages[i].src = arr[i]
            newimages[i].onload = function() {
                imageloadpost()
            }
            newimages[i].onerror = function() {
                imageloadpost()
            }
        }
        return { //此处返回一个空白对象的done方法
            done: function(f) {
                postaction = f || postaction
            }
        }
    },
    myScroll: function(opts) {
        var defaults = {
            autoplay: true, //是否自动播放
            autotime: 5000, //间隔时间
            currcolor: '#ec9f1e', //小圆点当前颜色
            bgcolor: '#8dbe4a' //小圆点背景颜色
        };
        var opts = $.extend(defaults, opts);
        var i = 0;
        var ww = $(opts.el).innerWidth();
        var l = opts.imgList.length;
        var con;
        var nav;
        picsrender();

        function picsrender() {
            var s = ' <div class="img_scroll rollbtn_type"> <span class="prev roll_btn"></span><span class="next roll_btn"></span>\
                  <div class="img-list">\
                    <ul class="img-con">';
            for (var j = 0; j < l; j++) {
                s += '<li><a href="javascript:;"><img src="' + opts.imgList[j] + '" width="100%"></a></li>';
            };
            s += '</ul></div><ul class="JQ-slide-nav rollbtn_type">\
                        <li style="background:' + opts.currcolor + '"></li>';
            for (var i = 0; i < l - 1; i++) {
                s += '<li style="background:' + opts.bgcolor + '"></li>';
            }
            s += '</ul></div>';
            $(opts.el).append(s);
            nav = $(opts.el).find('.JQ-slide-nav')
            con = $(opts.el).find('.img-list ul');
            $(window).resize(function() {
                ww = $(opts.el).innerWidth();
                $('.img_scroll').css({
                    'width': ww
                });
                $('.img-list').css({
                    'width': ww
                });
                $('.img-list li').css({
                    'width': ww
                });
            });
            $('.img_scroll').css({
                'width': ww
            });
            $('.img-list').css({
                'width': ww
            });
            $('.img-list li').css({
                'width': ww
            });
            if (opts.autoplay == true) {
                var MyMar = setInterval(Next, opts.autotime);
            }
            $(opts.el).on('click', '.prev', function() {
                Prev();
            })
            $(opts.el).on('click', '.next', function() {
                    Next();
                })
                //支持手机滑动
            con.touchwipe({
                wipeRight: function() {
                    Prev();
                },
                wipeLeft: function() {
                    Next();
                },
                min_move_x: 20,
                min_move_y: 20,
                preventDefaultEvents: true
            });

        }

        function Next() {
            i++;
            if (i == l) {
                i = 0;
            }
            nav.find('li').css({ "background-color": opts.bgcolor });
            nav.find("li:eq(" + i + ")").css({ "background-color": opts.currcolor });
            con.animate({
                'margin-left': -ww
            }, function() {
                con.find('li').eq(0).appendTo(con);
                con.css({
                    'margin-left': 0
                });
            });
        }

        function Prev() {
            i--;
            if (i == -1) {
                i = l - 1;
            }
            nav.find('li').css({ "background-color": opts.bgcolor });
            nav.find("li:eq(" + i + ")").css({ "background-color": opts.currcolor });
            con.find('li:last').prependTo(con);
            con.css({
                'margin-left': -ww
            });
            con.animate({
                'margin-left': 0
            });
        }


    }
}

//初始化input select
var initForm = function(rw) {
    $('input').each(function() {
        var w = $(this).closest('.form-group').width();
        $(this).css({ 'width': w - rw });
    });
    $('select').each(function() {
        var w = $(this).closest('.form-group').width();
        $(this).css({ 'width': w - rw });

    })
}