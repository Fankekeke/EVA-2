(function( $ ) {
  $.fn.camRollSlider = function() {
    var wrapper      = this;
    var screenRoll   = this.find('.crs-screen-roll');
    var screenItems  = this.find('.crs-screen-item');
    var barRollWrap  = this.find('.crs-bar-roll-wrap');
    var barRoll      = this.find('.crs-bar-roll');
    var barItem      = this.find('.crs-bar-roll-item');
    var barFirstItem = this.find('.crs-bar-roll-item:first-child');
    
    var current;

    function moveScreenTo(index) {
      screenRoll.css('left', -wrapper.width() * index);
    }

    function moveBarTo(index) {
      var barRollPos = (barRollWrap.width() / 2) 
        - (barItem.width() / 2)
        - $(barItem[index]).position().left;

      barRoll.css('left', barRollPos);
    }

    function moveToItem(target) {
      var index;

      if(typeof target  === 'number') {
        index = target;
      } else {
        index = $(target).index();
      }

      current = index;

      moveScreenTo(index, null);
      moveBarTo(index, null);
    }

    function setSizePos() {
      // set screen roll width
      screenRoll.css('width', screenRoll.children().length * wrapper.width() );
      
      // set screen items width
      screenItems.css('width', wrapper.width() );
      
      // set bar roll width
      barRoll.css('width', (barRoll.children().length * barFirstItem.width())
       + ((barRoll.children().length-1) * parseInt(barFirstItem.css('margin-right'))) );

      //set bar roll pos
      barRoll.css('transition', 'all');
      screenRoll.css('transition', 'all');

      moveToItem(current, null);
      
      setTimeout(function() {
        barRoll.css('transition', '');
        screenRoll.css('transition', '');
      }, 0);
    }

    // initial
    current = 0;
    setSizePos();

    barItem.click(function() {
      moveToItem(this);
    });

    $(window).resize(function() {
      setSizePos();
    });

    // return jQuery chain
    return this;
  };
}( jQuery ));
