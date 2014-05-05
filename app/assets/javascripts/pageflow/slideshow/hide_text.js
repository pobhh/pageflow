pageflow.hideText = (function() {
  function element() {
    return $('body');
  }

  function prefix(event) {
    return _.map(event.split(' '), function(e) {
      return 'hidetext' + e;
    }).join(' ');
  }

  $(function() {
    element().on('keydown', function(e) {
      if(event.keyCode == 27) {
        pageflow.hideText.deactivate();
      }
    });
  });

  return {
    isActive: function() {
      return element().hasClass('hideText');
    },

    toggle: function() {
      if (this.isActive()) {
        this.deactivate();
      }
      else {
        this.activate();
      }
    },

    activate: function() {
      element().addClass('hideText');
      element().trigger('hidetextactivate');
    },

    deactivate: function() {
      element().removeClass('hideText');
      element().trigger('hidetextdeactivate');
    },

    on: function(event, callback) {
      element().on(prefix(event), callback);
    }
  };
}());