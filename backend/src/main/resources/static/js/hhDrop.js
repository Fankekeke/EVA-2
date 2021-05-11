
$(function() {

    $.fn.hhDrop = function(options) {
        var options = jQuery.extend({
            preLoadSrc: "images/loading.gif"
        }, options || {});


        var defaults = {};

        return this.each(function() {

            //默认
            var options = $.extend(defaults, options);
            var $this = $(this);

            var $boxSearch = $this.find('.boxSearch');
            var $lineSearchbg = $this.nextAll().find('.lineSearchbg');



            //出发城市  到达城市
            $boxSearch.click(function() {
                var _this = $(this);
                //点击本身显示隐藏
                if (_this.hasClass('boxSearchHover')) {
                    _this.removeClass('boxSearchHover');
                    _this.children('.btn_search').removeClass('btn_search_current');
                    _this.parent().find('.search_form_suggest').hide();

                } else {
                    _this.addClass('boxSearchHover');
                    _this.children('.btn_search').addClass('btn_search_current');
                    _this.parent().find('.search_form_suggest').show();
                }

                _this.next().find('.clr_after a').click(function() {

                    _this.find('span.key_word b').text($(this).text());

                });


                _this.next().find('.search_city_result a').click(function() {

                    _this.find('span.key_word b').text($(this).text());

                });

                //阻止冒泡
                $(document).bind('click', function(event) {
                    if (!$(event.target).parent().hasClass('boxSearch') && !$(event.target).hasClass('boxSearch') && !$(event.target).parent().parent().hasClass('boxSearch') && !$(event.target).hasClass('input_city')) {
                        _this.children('.btn_search').removeClass('btn_search_current');
                        _this.removeClass('boxSearchHover');
                        _this.parent().find('.search_form_suggest').hide();
                    }
                });

            });

            $lineSearchbg.each(function() {
                //搜索框 请输入目的地、主题或关键词
                $(this).find('#arriveSearchText').focus(function() {
                    var arrive = $(this).val();
                    if (arrive == '请输入主题或关键词') {
                        $(this).val('').css('color', '#000');
                    }
                });
                $(this).find('#arriveSearchText').blur(function() {
                    var arrive = $(this).val();
                    if (arrive == '') {
                        $(this).val('请输入主题或关键词').css('color', '#b5b5b5');
                    }
                });

                //删除搜索信息
                $(this).find('#btn_delete').click(function() {
                    $(this).prev('#arriveSearchText').focus().val('').css('color', '#000');
                });
            });
        });
    }
});