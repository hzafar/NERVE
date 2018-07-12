(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],2:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],3:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":1,"./encode":2}],4:[function(require,module,exports){
// This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.
require('../../js/transition.js')
require('../../js/alert.js')
require('../../js/button.js')
require('../../js/carousel.js')
require('../../js/collapse.js')
require('../../js/dropdown.js')
require('../../js/modal.js')
require('../../js/tooltip.js')
require('../../js/popover.js')
require('../../js/scrollspy.js')
require('../../js/tab.js')
require('../../js/affix.js')
},{"../../js/affix.js":5,"../../js/alert.js":6,"../../js/button.js":7,"../../js/carousel.js":8,"../../js/collapse.js":9,"../../js/dropdown.js":10,"../../js/modal.js":11,"../../js/popover.js":12,"../../js/scrollspy.js":13,"../../js/tab.js":14,"../../js/tooltip.js":15,"../../js/transition.js":16}],5:[function(require,module,exports){
/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

},{}],6:[function(require,module,exports){
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

},{}],7:[function(require,module,exports){
/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

},{}],8:[function(require,module,exports){
/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

},{}],9:[function(require,module,exports){
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

},{}],10:[function(require,module,exports){
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

},{}],11:[function(require,module,exports){
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

},{}],12:[function(require,module,exports){
/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

},{}],13:[function(require,module,exports){
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

},{}],14:[function(require,module,exports){
/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

},{}],15:[function(require,module,exports){
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

},{}],16:[function(require,module,exports){
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

},{}],17:[function(require,module,exports){
'use strict';

var prevJQuery = window.jQuery;
var $ = require('jquery');
window.jQuery = $;
require('bootstrap');
window.jQuery = prevJQuery;

// entitySources is an object passed in by registerEntitySources that looks like:
// where the value of each setter on the map is an imported module.
/*
{
    people: (new Map()).set('viaf', viaf).set('dbpedia': dbpedia).set('wikidata': wikidata).set('getty':getty),
    places: (new Map()).set('viaf', viaf).set('dbpedia': dbpedia).set('wikidata': wikidata).set('getty':getty),
    organizations: (new Map()).set('viaf', viaf).set('dbpedia': dbpedia).set('wikidata': wikidata).set('getty':getty),
    titles: (new Map()).set('viaf', viaf).set('dbpedia': dbpedia).set('wikidata': wikidata).set('getty':getty),
}
*/

var entitySources = void 0;
function registerEntitySources(sources) {
    entitySources = sources;
}

function destroyModal() {
    var modal = $('#cwrc-entity-lookup');
    modal.modal('hide').data('bs.modal', null);
    modal[0].parentNode.removeChild(modal[0]);
}

function returnResult(result, searchOptions) {
    destroyModal();
    searchOptions.success(result);
}

function cancel(searchOptions) {
    destroyModal();
    if (searchOptions.cancel) searchOptions.cancel();
}

function clearOldResults() {
    $('.cwrc-result-list').empty();
}

function find(searchOptions) {
    clearOldResults();
    entitySources[searchOptions.entityType].forEach(function (entitySource, entitySourceName) {
        entitySource[searchOptions.entityLookupMethodName](searchOptions.query).then(function (results) {
            return showResults(results, entitySourceName, searchOptions);
        }, function (error) {
            return console.log('an error in the find: ' + error);
        });
    });
}

var popoverAnchor = null;

function showPopover(result, li, ev) {

    ev.stopPropagation();

    if (popoverAnchor) {
        if (popoverAnchor[0] === li) {
            return; // we've already got a popup for this list item, so just return
        } else {
            popoverAnchor.popover('destroy');
            popoverAnchor = null;
            // have to remove the old click handler on the modal, which would have been bound to the old popover,
            // which now doesn't exist anymore, and so would try to destroy a non-existant popover, causing an
            // exception
            $('#cwrc-entity-lookup').off('.popover');
        }
    }

    popoverAnchor = $(li);

    popoverAnchor.popover({
        // delay: { "show": 600, "hide": 100 },
        animation: true,
        trigger: "manual",
        //placement: "auto",
        html: true,
        title: result.name,
        content: function content() {
            return '<iframe id="entity-iframe" src="' + result.uriForDisplay + '" style="border:none;height:40em;width:38em"/>';
        }
    });

    popoverAnchor.popover('show');

    // resize the popover
    popoverAnchor.data("bs.popover").tip().css({ "max-width": "40em" });

    // add a check on the modal for a click event --> this will close the popover
    $('#cwrc-entity-lookup').on('click.popover', function (ev) {
        // close popover
        popoverAnchor.popover('destroy');
        popoverAnchor = null;
        // remove this click handler
        $('#cwrc-entity-lookup').off('.popover');
    });
}

function showResults(results, entitySourceName, searchOptions) {
    var resultList = document.getElementById('cwrc-' + entitySourceName + '-list');
    //<li class="list-group-item">One</li>
    results.forEach(function (result, i) {
        var li = document.createElement('li');
        li.className = 'list-group-item cwrc-result-item';

        var descDiv = document.createElement('div');
        li.appendChild(descDiv);
        descDiv.innerHTML = result.description ? '<b>' + result.name + '</b> - <i>' + result.description + '</i>' : '<b>' + result.name + '</b>';

        if (result.externalLink) {
            var linkDiv = document.createElement('div');
            li.appendChild(linkDiv);
            linkDiv.innerHTML = '<a href="' + result.externalLink + '" target="_blank">Open Full Description in New Window</a>';
        }

        resultList.appendChild(li);

        if (result.uriForDisplay) {
            $(li).on('click', function (ev) {
                showPopover(result, li, ev);
            });
        }
        li.ondblclick = function () {
            return returnResult(result, searchOptions);
        };
    });
}

function initializeEntityPopup(searchOptions) {
    if (!document.getElementById('cwrc-entity-lookup')) {
        var el = searchOptions.parentEl || document.body;
        $(el).append($.parseHTML('<div id="cwrc-entity-lookup" class="modal fade">\n                <div class="modal-dialog modal-lg ui-dialog">\n                    <div class="modal-content">\n                        <div class="modal-header">\n                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n                            <h3 id="cwrc-entity-lookup-title" class="modal-title"></h3>\n                        </div>\n                        <form id="entity-search-form">\n                        <div class="modal-body">\n                            \n                            <div style="text-align:center;margin: 0 auto;padding-bottom: 2em" >\n                              <input type="text" placeholder="Enter a name to find" class="form-control" id="cwrc-entity-query"/>\n                            </div>\n                            <div style="width:100%">  \n                                <div style="display:inline-block;width:70%">\n                                \n                                    <div class="panel-group cwrc-result-panel" id="cwrc-viaf-panel">\n                                        <div class="panel panel-default">\n                                          <div class="panel-heading">\n                                            <h4 class="panel-title">\n                                              <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">VIAF</a>\n                                            </h4>\n                                          </div>\n                                          <div id="collapse1" class="panel-collapse collapse in">\n                                            <ul class="list-group cwrc-result-list" id="cwrc-viaf-list">\n                                            </ul>  \n                                          </div>\n                                        </div>\n                                    </div>\n                                    \n                                    <div class="panel-group cwrc-result-panel" id="cwrc-dbpedia-panel">\n                                        <div class="panel panel-default">\n                                          <div class="panel-heading">\n                                            <h4 class="panel-title">\n                                              <a data-toggle="collapse" href="#collapse2">DBPedia</a>\n                                            </h4>\n                                          </div>\n                                          <div id="collapse2" class="panel-collapse collapse in">\n                                            <ul class="list-group  cwrc-result-list" id="cwrc-dbpedia-list">\n                                            </ul>  \n                                          </div>\n                                        </div>\n                                    </div>\n                                    \n                                    <div class="panel-group cwrc-result-panel" id="cwrc-geonames-panel">\n                                        <div class="panel panel-default">\n                                          <div class="panel-heading">\n                                            <h4 class="panel-title">\n                                              <a data-toggle="collapse" href="#collapse3">GeoNames</a>\n                                            </h4>\n                                          </div>\n                                          <div id="collapse3" class="panel-collapse collapse in">\n                                            <ul class="list-group  cwrc-result-list" id="cwrc-geonames-list">\n                                            </ul>  \n                                          </div>\n                                        </div>\n                                    </div>\n                                    \n                                    <div class="panel-group cwrc-result-panel" id="cwrc-geocode-panel">\n                                        <div class="panel panel-default">\n                                          <div class="panel-heading">\n                                            <h4 class="panel-title">\n                                              <a data-toggle="collapse" href="#collapse4">GeoCode</a>\n                                            </h4>\n                                          </div>\n                                          <div id="collapse4" class="panel-collapse collapse in">\n                                            <ul class="list-group  cwrc-result-list" id="cwrc-geocode-list">\n                                            </ul>  \n                                          </div>\n                                        </div>\n                                    </div>\n                                    \n                                    <div class="panel-group cwrc-result-panel" id="cwrc-getty-panel">\n                                        <div class="panel panel-default">\n                                          <div class="panel-heading">\n                                            <h4 class="panel-title">\n                                              <a data-toggle="collapse" href="#collapse5">Getty ULAN</a>\n                                            </h4>\n                                          </div>\n                                          <div id="collapse5" class="panel-collapse collapse in">\n                                            <ul class="list-group  cwrc-result-list" id="cwrc-getty-list">\n                                            </ul>  \n                                          </div>\n                                        </div>\n                                    </div>\n                                    \n                                    <div class="panel-group cwrc-result-panel" id="cwrc-wikidata-panel">\n                                        <div class="panel panel-default">\n                                          <div class="panel-heading">\n                                            <h4 class="panel-title">\n                                              <a data-toggle="collapse" href="#collapse6">Wikidata</a>\n                                            </h4>\n                                          </div>\n                                          <div id="collapse6" class="panel-collapse collapse in">\n                                            <ul class="list-group  cwrc-result-list" id="cwrc-wikidata-list">\n                                            </ul>  \n                                          </div>\n                                        </div>\n                                    </div>\n                               </div>\n                                <!--div style="display: inline-block; vertical-align:top; width:28%; padding-left:2em">\n                                    <div id="div-iframe" style="border-style: inset; border-color: grey; overflow: scroll; height:100%; width:100%"> \n                                           <iframe align="top" id="cwrc-entity-info-frame" style="height:25em"  src="" sandbox="allow-same-origin"></iframe>\n                                    </div>\n                                </div-->\n                            </div>\n                        </div><!-- /.modal-body --> \n                        <div class="modal-footer">\n                            <button id="cwrc-entity-lookup-cancel" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>\n                            <button id="cwrc-entity-lookup-redo" type="submit" value="Submit"  class="btn btn-default">Search again.</button>\n                        </div><!-- /.modal-footer -->   \n                        </form>\n                    </div><!-- /.modal-content -->\n                </div><!-- /.modal-dialog -->\n            <!-- /.modal -->\n            </div>'));
        $('#cwrc-entity-lookup button[data-dismiss="modal"]').on('click', function () {
            return cancel(searchOptions);
        });

        $('#cwrc-entity-lookup-title').text(searchOptions.entityLookupTitle);

        $('#entity-search-form').submit(function (event) {
            event.preventDefault();
            var newSearchOptions = Object.assign({}, searchOptions, { query: $('#cwrc-entity-query').val() });
            find(newSearchOptions);
        });
    }
    $('#cwrc-entity-lookup').modal('show');

    if (searchOptions.parentEl) {
        var data = $('#cwrc-entity-lookup').data('bs.modal');
        data.$backdrop.detach().appendTo(searchOptions.parentEl);
    }
}

function layoutPanels(searchOptions) {
    initializeEntityPopup(searchOptions);
    // hide all panels
    $(".cwrc-result-panel").hide();
    // show panels registered for entity type
    entitySources[searchOptions.entityType].forEach(function (entitySource, entitySourceName) {
        return $('#cwrc-' + entitySourceName + '-panel').show();
    });
}

function initialize(entityType, entityLookupMethodName, entityLookupTitle, searchOptions) {
    // create a new object and assign a few new properties,
    // We create the new object to avoid modifying the original object, i.e., avoid at least that side effect
    var newSearchOptionsObject = Object.assign({ entityType: entityType, entityLookupMethodName: entityLookupMethodName, entityLookupTitle: entityLookupTitle }, searchOptions);
    layoutPanels(newSearchOptionsObject);
    if (newSearchOptionsObject.query) {
        document.getElementById('cwrc-entity-query').value = newSearchOptionsObject.query;
        find(newSearchOptionsObject);
    }
}

function popSearchPerson(searchOptions) {
    return initialize('people', 'findPerson', 'Find a Person', searchOptions);
}
function popSearchPlace(searchOptions) {
    return initialize('places', 'findPlace', 'Find a Place', searchOptions);
}
function popSearchOrganization(searchOptions) {
    return initialize('organizations', 'findOrganization', 'Find an Organization', searchOptions);
}
function popSearchTitle(searchOptions) {
    return initialize('titles', 'findTitle', 'Find a Title', searchOptions);
}

module.exports = {
    // registerEntitySources lets us more easily pass in mocks when testing.
    registerEntitySources: registerEntitySources,

    popSearchPerson: popSearchPerson,
    popSearchOrganization: popSearchOrganization,
    popSearchPlace: popSearchPlace,
    popSearchTitle: popSearchTitle,

    popSearch: {
        person: popSearchPerson,
        organization: popSearchOrganization,
        place: popSearchPlace,
        title: popSearchTitle
    }

    /*
    The object that is passed to popupSearchXXX :
    {
        query: query,
        success: (result)=>{result is described below},
        error: (error)=>{},
        cancelled: ()=>{},
    }
    The object that is returned in the success callback:
    {
        result.id    // the cwrcBridge callback overwrites this with the result.uri
        result.uri
        result.name
        result.repository
        result.data  // the cwrc bridge doesn't use this, and actually just deletes it.
    }
        The cwrcBridge either passes this to the Entity.setLookupInfo (which uses the id, name, and repository) if the call was the result of a search on
        an existing entity, OR passes the result object to the 'local' dialog.
    */

};

},{"bootstrap":4,"jquery":45}],18:[function(require,module,exports){
'use strict';

/*
     config is passed through to fetch, so could include things like:
     {
         method: 'get',
         credentials: 'same-origin'
    }
    Note that the default config includes the accept header.  If an over-riding config
    is passed in, don't forget to set the accept header so we get json back from dbpedia
    and not XML.
*/

function fetchWithTimeout(url) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { headers: { 'Accept': 'application/json' } };
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8000;


    return new Promise(function (resolve, reject) {
        // the reject on the promise in the timeout callback won't have any effect, *unless*
        // the timeout is triggered before the fetch resolves, in which case the setTimeout rejects
        // the whole outer Promise, and the promise from the fetch is dropped entirely.
        setTimeout(function () {
            return reject(new Error('Call to DBPedia timed out'));
        }, timeout);
        fetch(url, config).then(resolve, reject);
    }).then(function (response) {
        // check for ok status
        if (response.ok) {
            return response.json();
        }
        // if status not ok, through an error
        throw new Error('Something wrong with the call to DBPedia, possibly a problem with the network or the server. HTTP error: ' + response.status);
    } /*,
      // instead of handling and rethrowing the error here, we just let it bubble through
      error => {
      // we could instead handle a reject from either of the fetch or setTimeout promises,
      // whichever first rejects, do some loggingor something, and then throw a new rejection.
         console.log(error)
         return Promise.reject(new Error(`some error jjk: ${error}`))
      }*/
    );
}

// note that this method is exposed on the npm module to simplify testing,
// i.e., to allow intercepting the HTTP call during testing, using sinon or similar.
function getEntitySourceURI(queryString, queryClass) {
    // Calls a cwrc proxy (https://lookup.services.cwrc.ca/dbpedia), so that we can make https calls from the browser.
    // The proxy in turn then calls http://lookup.dbpedia.org
    // The dbpedia lookup doesn't seem to have an https endpoint
    return 'https://lookup.services.cwrc.ca/dbpedia/api/search/KeywordSearch?QueryClass=' + queryClass + '&MaxHits=5&QueryString=' + encodeURIComponent(queryString);
}

function getPersonLookupURI(queryString) {
    return getEntitySourceURI(queryString, 'person');
}

function getPlaceLookupURI(queryString) {
    return getEntitySourceURI(queryString, 'place');
}

function getOrganizationLookupURI(queryString) {
    return getEntitySourceURI(queryString, 'organisation');
}

function getTitleLookupURI(queryString) {
    return getEntitySourceURI(queryString, 'work');
}

function callDBPedia(url, queryString, queryClass) {

    return fetchWithTimeout(url).then(function (parsedJSON) {
        return parsedJSON.results.map(function (_ref) {
            var uri = _ref.uri,
                name = _ref.label,
                _ref$description = _ref.description,
                description = _ref$description === undefined ? 'No description available' : _ref$description;

            return {
                nameType: queryClass,
                id: uri,
                uri: uri,
                uriForDisplay: uri.replace('http://dbpedia.org', 'https://dbpedia.lookup.services.cwrc.ca'),
                name: name,
                repository: 'dbpedia',
                originalQueryString: queryString,
                description: description
            };
        });
    });
}

function findPerson(queryString) {
    return callDBPedia(getPersonLookupURI(queryString), queryString, 'person');
}

function findPlace(queryString) {
    return callDBPedia(getPlaceLookupURI(queryString), queryString, 'place');
}

function findOrganization(queryString) {
    return callDBPedia(getOrganizationLookupURI(queryString), queryString, 'organisation');
}

function findTitle(queryString) {
    return callDBPedia(getTitleLookupURI(queryString), queryString, 'work');
}

module.exports = {
    findPerson: findPerson,
    findPlace: findPlace,
    findOrganization: findOrganization,
    findTitle: findTitle,
    getPersonLookupURI: getPersonLookupURI,
    getPlaceLookupURI: getPlaceLookupURI,
    getOrganizationLookupURI: getOrganizationLookupURI,
    getTitleLookupURI: getTitleLookupURI
};

},{}],19:[function(require,module,exports){
'use strict';

/*
     config is passed through to fetch, so could include things like:
     {
         method: 'get',
         credentials: 'same-origin'
    }
    Note that the default config includes the accept header.  If an over-riding config
    is passed in, don't forget to set the accept header so we get json back from dbpedia
    and not XML.
*/

function fetchWithTimeout(url) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { headers: { 'Accept': 'application/json' } };
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8000;


    return new Promise(function (resolve, reject) {
        // the reject on the promise in the timeout callback won't have any effect, *unless*
        // the timeout is triggered before the fetch resolves, in which case the setTimeout rejects
        // the whole outer Promise, and the promise from the fetch is dropped entirely.
        setTimeout(function () {
            return reject(new Error('Call to geonames timed out'));
        }, timeout);
        fetch(url, config).then(resolve, reject);
    }).then(function (response) {
        // check for ok status
        if (response.ok) {
            return response.json();
        }
        // if status not ok, through an error
        throw new Error('Something wrong with the call to geonames, possibly a problem with the network or the server. HTTP error: ' + response.status);
    } /*,
      // instead of handling and rethrowing the error here, we just let it bubble through
      error => {
      // we could instead handle a reject from either of the fetch or setTimeout promises,
      // whichever first rejects, do some loggingor something, and then throw a new rejection.
         console.log(error)
         return Promise.reject(new Error(`some error jjk: ${error}`))
      }*/
    );
}

// note that this method is exposed on the npm module to simplify testing,
// i.e., to allow intercepting the HTTP call during testing, using sinon or similar.
function getPlaceLookupURI(queryString) {
    // http://api.geonames.org/searchJSON?q=london&maxRows=10&username=demo
    return 'https://secure.geonames.org/searchJSON?q=' + encodeURIComponent(queryString) + '&maxRows=10';
}

function callGeonamesURL(url, queryString) {

    return fetchWithTimeout(url).then(function (parsedJSON) {
        return parsedJSON.geonames.map(function (_ref) {
            var toponymName = _ref.toponymName,
                _ref$adminName = _ref.adminName1,
                state = _ref$adminName === undefined ? '' : _ref$adminName,
                _ref$countryName = _ref.countryName,
                countryName = _ref$countryName === undefined ? '' : _ref$countryName,
                geonameId = _ref.geonameId,
                _ref$fcodeName = _ref.fcodeName,
                description = _ref$fcodeName === undefined ? 'No description available' : _ref$fcodeName;

            var name = toponymName + ' ' + state + ' ' + countryName;
            var uri = 'http://geonames.org/' + geonameId;
            return {
                nameType: 'place',
                id: uri,
                uri: uri,
                uriForDisplay: null,
                externalLink: uri,
                name: name,
                repository: 'geonames',
                originalQueryString: queryString,
                description: description
            };
        });
    });
}

function findPlace(queryString) {
    return callGeonamesURL(getPlaceLookupURI(queryString), queryString);
}

module.exports = {
    findPlace: findPlace,
    getPlaceLookupURI: getPlaceLookupURI
};

},{}],20:[function(require,module,exports){
'use strict';

/*
     config is passed through to fetch, so could include things like:
     {
         method: 'get',
         credentials: 'same-origin'
    }
*/

var gettyULAN = 'ulan';
var gettyTGN = 'tgn';

function fetchWithTimeout(url) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8000;


    return new Promise(function (resolve, reject) {
        // the reject on the promise in the timeout callback won't have any effect, *unless*
        // the timeout is triggered before the fetch resolves, in which case the setTimeout rejects
        // the whole outer Promise, and the promise from the fetch is dropped entirely.
        setTimeout(function () {
            return reject(new Error('Call to Getty timed out'));
        }, timeout);
        fetch(url, config).then(resolve, reject);
    }).then(function (response) {
        // check for ok status
        if (response.ok) {
            return response.json();
        }
        // if status not ok, through an error
        throw new Error('Something wrong with the call to Getty, possibly a problem with the network or the server. HTTP error: ' + response.status);
    } /*,
      // instead of handling and rethrowing the error here, we just let it bubble through
      error => {
      // we could instead handle a reject from either of the fetch or setTimeout promises,
      // whichever first rejects, do some loggingor something, and then throw a new rejection.
         console.log(error)
         return Promise.reject(new Error(`some error jjk: ${error}`))
      }*/
    );
}

// note that this method is exposed on the npm module to simplify testing,
// i.e., to allow intercepting the HTTP call during testing, using sinon or similar.
function getEntitySourceURI(queryString, gettyVocab) {

    // Calls a cwrc proxy (https://lookup.services.cwrc.ca/getty), so that we can make https calls from the browser.
    // The proxy in turn then calls http://vocab.getty.edu
    // The getty lookup doesn't seem to have an https endpoint
    return 'https://lookup.services.cwrc.ca/getty/sparql.json?query=' + encodeURIComponent('select ?Subject ?Term ?Parents ?Descr ?ScopeNote ?Type (coalesce(?Type1,?Type2) as ?ExtraType) {\n  ?Subject luc:term "' + queryString + '"; a ?typ; skos:inScheme ' + gettyVocab + ':.\n  ?typ rdfs:subClassOf gvp:Subject; rdfs:label ?Type.\n  filter (?typ != gvp:Subject)\n  optional {?Subject gvp:placeTypePreferred [gvp:prefLabelGVP [xl:literalForm ?Type1]]}\n  optional {?Subject gvp:agentTypePreferred [gvp:prefLabelGVP [xl:literalForm ?Type2]]}\n  optional {?Subject gvp:prefLabelGVP [xl:literalForm ?Term]}\n  optional {?Subject gvp:parentStringAbbrev ?Parents}\n  optional {?Subject foaf:focus/gvp:biographyPreferred/schema:description ?Descr}\n  optional {?Subject skos:scopeNote [dct:language gvp_lang:en; rdf:value ?ScopeNote]}}\n  LIMIT 5');
}

function getPersonLookupURI(queryString) {
    return getEntitySourceURI(queryString, gettyULAN);
}

function getPlaceLookupURI(queryString) {
    return getEntitySourceURI(queryString, gettyTGN);
}

function callGetty(url, queryString, gettyVocab) {

    return fetchWithTimeout(url).then(function (parsedJSON) {
        return parsedJSON.results.bindings.map(function (_ref) {
            var uri = _ref.Subject.value,
                name = _ref.Term.value,
                _ref$Descr = _ref.Descr;
            _ref$Descr = _ref$Descr === undefined ? "No description available" : _ref$Descr;
            var _ref$Descr$value = _ref$Descr.value,
                description = _ref$Descr$value === undefined ? 'No description available' : _ref$Descr$value;

            return {
                nameType: gettyVocab,
                id: uri,
                uri: uri,
                uriForDisplay: uri.replace('http://vocab.getty.edu', 'https://getty.lookup.services.cwrc.ca'),
                name: name,
                repository: 'getty',
                originalQueryString: queryString,
                description: description
            };
        });
    });
}

function findPerson(queryString) {
    return callGetty(getPersonLookupURI(queryString), queryString, gettyULAN);
}

function findPlace(queryString) {
    return callGetty(getPlaceLookupURI(queryString), queryString, gettyTGN);
}

module.exports = {
    findPerson: findPerson,
    findPlace: findPlace,
    getPersonLookupURI: getPersonLookupURI,
    getPlaceLookupURI: getPlaceLookupURI
};

},{}],21:[function(require,module,exports){
Constants = class Constants {
	constructor() {
	}
	static __isTransient() {
		return false;
	}
	static __getClass() {
		return "ca.fa.jjjrmi.translator.Constants";
	}
	static __isEnum() {
		return false;
	}
};

Constants.KeyParam = "key";
Constants.FlagParam = "flags";
Constants.TypeParam = "type";
Constants.PrimitiveParam = "primitive";
Constants.ValueParam = "value";
Constants.FieldsParam = "fields";
Constants.NameParam = "name";
Constants.ElementsParam = "elements";
Constants.DepthParam = "depth";
Constants.PointerParam = "ptr";
Constants.EnumParam = "enum";
Constants.CustomType = "@custom";
Constants.TransientValue = "trans";
Constants.NullValue = "null";
Constants.PrimativeTypeString = "string";
Constants.PrimativeTypeNumber = "number";
Constants.PrimativeTypeBoolean = "boolean";

module.exports = Constants;
},{}],22:[function(require,module,exports){
let Constants = require("./Constants");
let EncodedJSON = require("./EncodedJSON");

class RestoredObject {
    constructor(json, translator) {
        this.json = json;
        this.translator = translator;
        this.fields = json.get(Constants.FieldsParam);
    }
    decode() {
        let className = this.json.get(Constants.TypeParam);
        let aClass = this.translator.getClass(className);

        let newInstance = null;

        /* aready restored, retrieve restored object */;
        /* if handler, create new object with handler */;
        /* create new object from description */;
        if (this.json.has(Constants.KeyParam) && this.translator.hasReference(this.json.get(Constants.KeyParam))) {
            newInstance = this.translator.getReferredObject(this.json.get(Constants.KeyParam));
            return newInstance;
        } else if (this.translator.hasHandler(aClass)) {
            let handler = this.translator.getHandler(aClass);
            newInstance = handler.instatiate();
        } else {
            newInstance = new aClass();
        }

        if (!aClass.__isTransient()) this.translator.addReference(this.json.get(Constants.KeyParam), newInstance);
        else this.translator.addTempReference(this.json.get(Constants.KeyParam), newInstance);

        if (this.translator.hasHandler(aClass)) {
            let handler = this.translator.getHandler(aClass);
            handler.decode(this, newInstance);
        } else if (typeof newInstance.jjjDecode === "function") {
            newInstance.jjjDecode(this);
        } else {
            for (let field in this.json.get(Constants.FieldsParam)) {
                new Decoder(new EncodedJSON(this.json.get(Constants.FieldsParam)[field]), this.translator).decode(r=>newInstance[field] = r);
            }
        }

        this.translator.notifyDecode(newInstance);
        if (typeof newInstance.jjjOnDecode === "function"){
            newInstance.jjjOnDecode();
        }
        return newInstance;
    }
    decodeField(name, callback) {
        new Decoder(new EncodedJSON(this.fields[name]), this.translator).decode(r=>callback(r));
    }
    getJavaField(aClass, name) {
        while (aClass !== Object.class) {
            for (let field of aClass.getDeclaredFields()) {
                if (field.getName() === name) return field;
            }
            aClass = aClass.getSuperclass();
        }
        return null;
    }
    getType() {
        return this.json.get(Constants.TypeParam);
    }
}

class RestoredArray {
    constructor(json, translator) {
        this.json = json;
        this.translator = translator;
        this.elements = json.get(Constants.ElementsParam);
    }
    decode() {
        let newInstance = [];

        for (let i = 0; i < this.elements.length; i++) {
            let element = this.elements[i];
            new Decoder(new EncodedJSON(element), this.translator).decode(r=>newInstance[i] = r);
        }

        return newInstance;
    }
}

class Decoder {
    constructor(json, translator) {
        this.json = json;
        this.translator = translator;
    }
    decode(callback) {
        this.callback = callback;
        /* the value is a primative, check expected type */;
        /* expected type not found, refer to primitive type */;
        if (this.json.has(Constants.TypeParam) && this.json.get(Constants.TypeParam) === Constants.NullValue) callback(null);
        else if (this.json.has(Constants.PointerParam)) {
            if (!this.translator.hasReference(this.json.get(Constants.PointerParam))) this.translator.deferDecoding(this);
            let referredObject = this.translator.getReferredObject(this.json.get(Constants.PointerParam));
            callback(referredObject);
        } else if (this.json.has(Constants.EnumParam)) {
            let className = this.json.get(Constants.EnumParam);
            let fieldName = this.json.get(Constants.ValueParam);
            let aClass = this.translator.getClass(className);
            let result = aClass[fieldName];
            callback(result);
        } else if (this.json.has(Constants.ValueParam)) {
            callback(this.json.get(Constants.ValueParam));
        } else if (this.json.has(Constants.ElementsParam)) {
            let array = new RestoredArray(this.json, this.translator).decode();
            callback(array);
        } else if (this.json.has(Constants.FieldsParam)) {
            let object = new RestoredObject(this.json, this.translator).decode();
            callback(object);
        } else {
            console.log(this.json.toString(2));
            throw new Error("java.lang.RuntimeException");
        }
    }
    resume() {
        this.decode(this.callback);
    }
}

module.exports = Decoder;
},{"./Constants":21,"./EncodedJSON":23}],23:[function(require,module,exports){
class EncodedJSON{
    constructor(json){
        if (json === null) throw new Error("JSON object is null.");
        if (typeof json === "undefined") throw new Error("JSON object is undefined.");  
        this.json = json;
    }

    has(key){
        return typeof this.json[key] !== "undefined";
    }

    get(key){
        return this.json[key];
    }

    toString(){
        return JSON.stringify(this.json, null, 2);
    }
}

module.exports = EncodedJSON;
},{}],24:[function(require,module,exports){
/* global Constants */
let Constants = require("./Constants");

class Encoder {
    constructor(object, translator, keys) {
        if (object !== null && typeof object === "object" && !object instanceof Array) {
            if (typeof object.constructor === "undefined") {
                throw new Error(`Object missing constructor.`);
            }
            if (typeof object.constructor.__isTransient !== "function") {
                throw new Error(`Class "${object.constructor.name}" missing method "__isTransient".`);
            }
            if (typeof object.constructor.__isEnum !== "function") {
                throw new Error(`Class "${object.constructor.name}" missing method "__isEnum".`);
            }
            if (typeof object.constructor.__getClass !== "function") {
                throw new Error(`Class "${object.constructor.name}" missing method "__getClass".`);
            }
        }
        
        this.object = object;
        this.translator = translator;
        this.keys = keys;
    }
    encode() {
        /* undefined & NULL objects are treated as NULL */
        if (typeof this.object === "undefined" || this.object === null) {
            return new EncodedNull().toJSON();
        }
        /* primitives */
        else if (typeof this.object === "number" || typeof this.object === "string" || typeof this.object === "boolean") {
            return new EncodedPrimitive(this.object).toJSON();
        }
        /* object is stored from previous transaction */
        else if (this.translator.hasReferredObject(this.object)) {
            return new EncodedReference(this.translator.getReference(this.object)).toJSON();
        }
        /* is array */
        else if (this.object instanceof Array) {
            return new EncodedArray(this.object, this.translator, this.keys).toJSON();
        }
        /* set to null skips encoding all together */
        else if (this.object["jjjEncode"] === null) {
            return null;
        }        
        /* is Enum */
        else if (this.object.constructor.__isEnum()) {
            return new EncodedEnum(this.object, this.translator, this.keys).toJSON();
        }
        /* handler has been registered */
        else if (this.translator.hasHandler(this.object.constructor)) {
            let handler = this.translator.getHandler(this.object.constructor);
            let encodedObject = new EncodedObject(this.object, this.translator, this.keys);
            handler.encode(encodedObject, this.object);
            return encodedObject.toJSON();
        }
        /* object handles it's self */
        else if (typeof this.object["jjjEncode"] === "function") {
            let encodedObject = new EncodedObject(this.object, this.translator, this.keys);
            this.object.jjjEncode(encodedObject);
            return encodedObject.toJSON();
        }
        /* encode object */
        else {
            let encodedObject = new EncodedObject(this.object, this.translator, this.keys);
            encodedObject.encode();
            return encodedObject.toJSON();
        }
    }
}

class EncodedNull {
    constructor() {
        this.json = {};
        this.json[Constants.TypeParam] = Constants.NullValue;
    }
    toJSON() {
        return this.json;
    }
}

class EncodedPrimitive {
    constructor(value) {
        this.json = {};
        this.json[Constants.PrimitiveParam] = typeof value;
        this.json[Constants.ValueParam] = value;
    }
    toJSON() {
        return this.json;
    }
}

class EncodedReference {
    constructor(ref) {
        this.json = {};
        this.json[Constants.PointerParam] = ref;
    }
    toJSON() {
        return this.json;
    }
}

class EncodedArray {
    constructor(object, translator, keys) {
        this.json = {};
        this.object = object;
        this.translator = translator;
        this.keys = keys;
        this.json[Constants.ElementsParam] = [];
        this.encode();
    }
    encode() {
        this.setValues(this.json[Constants.ElementsParam], this.object);
    }
    setValues(parent, current) {
        for (let i = 0; i < current.length; i++) {
            let element = current[i];
            let value = new Encoder(element, this.translator, this.keys).encode();
            if (value !== null) parent.push(value);
        }
    }
    toJSON() {
        return this.json;
    }
}

class EncodedEnum {
    constructor(object, translator, keys) {
        this.json = {};
        this.json[Constants.ValueParam] = object.toString();
        this.json[Constants.EnumParam] = object.constructor.__getClass();
    }

    toJSON() {
        return this.json;
    }
}

class EncodedObject {
    constructor(object, translator, keys) {
        this.json = {};
        this.object = object;
        this.translator = translator;
        this.keys = keys;

        this.json[Constants.TypeParam] = this.object.constructor.__getClass();
        this.json[Constants.FieldsParam] = {};

        let key = this.translator.allocNextKey();
        this.json[Constants.KeyParam] = key;

        if (this.object.constructor.__isTransient()) {
            this.translator.addTempReference(key, this.object);
        } else {
            this.translator.addReference(key, this.object);
        }

        if (typeof object.constructor.__isTransient !== "function") {
            window.object = object;
            throw new Error(`Field '__isTransient' of class '${object.constructor.name}' is not of type function, found type '${typeof object.constructor.__isTransient}'.`);
        }
    }

    encode() {
        for (let field in this.object) {
            this.setField(field, this.object[field]);
        }
        return this.json;
    }

    setField(name, value) {
        let encodedValue = new Encoder(value, this.translator, this.keys).encode();
        if (encodedValue !== null) this.json[Constants.FieldsParam][name] = encodedValue;
    }

    toJSON() {
        return this.json;
    }
}

module.exports = Encoder;
},{"./Constants":21}],25:[function(require,module,exports){
let Translator = require("./Translator");
let jjjrmi = require("./gen/package");
let ArrayList = require("./java-equiv/ArrayList");
let HashMap = require("./java-equiv/HashMap");

class JJJRMISocket {
    constructor(socketName) {
        this.jjjSocketName = socketName;
        this.translator = new Translator();
        this.callback = {};
        this.flags = Object.assign(JJJRMISocket.flags);
        this.socket = null;
        this.translator.copyFrom(JJJRMISocket.classes);

        this.translator.addDecodeListener(obj=>obj.__jjjWebsocket = this);
        this.translator.addEncodeListener(obj=>obj.__jjjWebsocket = this);
        this.jjjEncode = null;
    }

    getHandler(aClass) {
        return this.translator.getHandler(aClass);
    }
    hasHandler(aClass) {
        return this.translator.hasHandler(aClass);
    }
    setHandler(aClass, handler) {
        this.translator.setHandler(aClass, handler);
    }

    async connect(url) {
        if (this.flags.CONNECT) console.log(`${this.jjjSocketName} connecting`);
        if (!url) url = this.getAddress();

        let cb = function (resolve, reject) {
            this.socket = new WebSocket(url);
            this.onready = resolve;
            this.onreject = reject;
            this.socket.onerror = (err) => {
                console.error("websocket error");
                console.error(err);
                reject(err);
            };
            this.socket.onmessage = (evt) => this.onMessage(evt);
            this.nextUID = 0;
            this.callback = {};
        }.bind(this);

        return new Promise(cb);
    }

    getAddress(){
        let prequel = "ws://";
        if (window.location.protocol === "https:") prequel = "wss://";
        let pathname = window.location.pathname.substr(1);
        pathname = pathname.substr(0, pathname.indexOf("/"));
        return `${prequel}${window.location.host}/${pathname}/${this.jjjSocketName}`;
    }

    reset(){
        this.translator.clear();
    }

    /**
     * Send a method request to the server.
     * callbacks.
     * @param {type} src
     * @param {type} methodName
     * @param {type} args
     * @returns {undefined}
     */
    methodRequest(src, methodName, args) {
        if (!this.translator.hasReferredObject(src)){
            console.warn("see window.debug for source");
            window.debug = src;
            throw new Error(`Attempting to call server side method on non-received object: ${src.constructor.name}.${methodName}`);
        }
        let uid = this.nextUID++;
        let ptr = this.translator.getReference(src);

        let argsArray = [];
        for (let i in args) argsArray.push(args[i]);

        let f = function (resolve, reject) {
            this.callback[uid] = {
                resolve: resolve,
                reject: reject
            };
            let packet = new jjjrmi.MethodRequest(uid, ptr, methodName, argsArray);
            let encodedPacket = this.translator.encode(packet);
            if (this.flags.SENT) console.log(encodedPacket);
            let encodedString = JSON.stringify(encodedPacket, null, 4);
            if (this.flags.SENT && this.flags.VERBOSE) console.log(encodedString);

            if (this.socket !== null) this.socket.send(encodedString);
            else console.warn(`Socket "${this.socketName}" not connected.`);
        }.bind(this);

        return new Promise(f);
    }
    /**
     * All received messages are parsed by this method.  All messages must of the java type 'RMIResponse' which will
     * always contain the field 'type:RMIResponseType'.
     * @param {type} evt
     * @returns {undefined}
     */
    onMessage(evt) {
        if (this.flags.RECEIVED && this.flags.VERBOSE){
            let json = JSON.parse(evt.data);
            console.log(JSON.stringify(json, null, 2));
        }
        let rmiMessage = this.translator.decode(evt.data);
        if (this.flags.RECEIVED) console.log(rmiMessage);

        switch (rmiMessage.type) {
            case jjjrmi.JJJMessageType.FORGET:{
                if (this.flags.ONMESSAGE) console.log(this.jjjSocketName + " FORGET");
                this.translator.removeByKey(rmiMessage.key);
                break;
            }
            case jjjrmi.JJJMessageType.READY:{
                if (this.flags.CONNECT || this.flags.ONMESSAGE) console.log(this.jjjSocketName + " READY");
                this.onready(rmiMessage.getRoot());
                break;
            }
            /* client originated request */
            case jjjrmi.JJJMessageType.LOCAL:{
                if (this.flags.ONMESSAGE) console.log(`Response to client side request: ${this.jjjSocketName} ${rmiMessage.methodName}`);
                let callback = this.callback[rmiMessage.uid];
                delete(this.callback[rmiMessage.uid]);
                callback.resolve(rmiMessage.rvalue);
                break;
            }
            /* server originated request */
            case jjjrmi.JJJMessageType.REMOTE:{
            if (this.flags.ONMESSAGE) console.log(`Server side originated request: ${this.jjjSocketName} ${rmiMessage.methodName}`);
                let target = this.translator.getReferredObject(rmiMessage.ptr);
                this.remoteMethodCallback(target, rmiMessage.methodName, rmiMessage.args);
//                let response = new InvocationResponse(rmiMessage.uid, InvocationResponseCode.SUCCESS);
//                let encodedResponse = this.translator.encode(response);
//                let encodedString = JSON.stringify(encodedResponse, null, 4);
//
//                if (this.flags.ONMESSAGE) console.log(`Server side request: ${this.jjjSocketName} ${target.constructor.name}.${rmiMessage.methodName}`);
//                if (socket !== null) this.socket.send(encodedString);
//                else console.warn(`Socket "${this.socketName}" not connected.`);
                break;
            }
            case jjjrmi.JJJMessageType.EXCEPTION:{
                if (!this.flags.SILENT) console.log(this.jjjSocketName + " EXCEPTION " + rmiMessage.methodName);
                if (!this.flags.SILENT) console.warn(rmiMessage);
                let callback = this.callback[rmiMessage.uid];
                delete(this.callback[rmiMessage.uid]);
                callback.reject(rmiMessage);
                break;
            }
            case jjjrmi.JJJMessageType.REJECTED_CONNECTION:{
                if (this.flags.CONNECT || this.flags.ONMESSAGE) console.log(this.jjjSocketName + " REJECTED_CONNECTION");
                this.onreject();
                break;
            }
        }
    }

    /**
     * Handles a server originated request.  Will throw a warning if the client does not have a method to handle the
     * request.
     * @param {type} target
     * @param {type} methodName
     * @param {type} args
     * @returns {undefined}
     */
    remoteMethodCallback(target, methodName, args) {
        if (typeof target[methodName] !== "function") {
            if (!JJJRMISocket.silent) console.warn(this.socket.url + ":" + target.constructor.name + " does not have remotely invokable method '" + methodName + "'.");
        } else {
            return target[methodName].apply(target, args);
        }
    }
};

JJJRMISocket.flags = {
        SILENT: false, /* do not print exceptions to console */
        CONNECT: false, /* show the subset of ONMESSAGE that deals with the initial connection */
        ONMESSAGE: false, /* describe the action taken when a message is received */
        SENT: false, /* show the send object, versbose shows the json text as well */
        RECEIVED: false, /* show the received server object, verbose shows the json text as well */
        VERBOSE: false, /* print raw text for SENT / RECEIVED */
        ONREGISTER: false /* report classes as they are registered */
};

JJJRMISocket.classes = new Map();

JJJRMISocket.registerClass = function(aClass){
    if (typeof aClass !== "function"){
        console.log(aClass);
        throw new Error(`paramater 'class' of method 'registerClass' is '${typeof aClass}', expected 'function'`);
    }
    if (typeof aClass.__getClass !== "function"){
        throw new Error(`in Class ${aClass.constructor.name} method __getClass of type ${typeof aClass.__getClass}`);
    }
    
    if (JJJRMISocket.flags.ONREGISTER) console.log(`Register ${aClass.__getClass()}`);
    
    JJJRMISocket.classes.set(aClass.__getClass(), aClass);
    
    for (let field in aClass){     
        if (JJJRMISocket.flags.ONREGISTER && JJJRMISocket.flags.VERBOSE) console.log(`considering ${aClass.__getClass()}.${field}`);
        if (typeof aClass[field] === "function" && typeof aClass[field].__getClass === "function"){
            JJJRMISocket.registerClass(aClass[field]);
        }
    }
};

/* for registering all classes returned from generated JS */
JJJRMISocket.registerPackage = function(package){
    for (let aClass in package){
        JJJRMISocket.registerClass(package[aClass]);
    }
};

/* register the classes required for JJJRMISocket */
JJJRMISocket.registerPackage(jjjrmi);
JJJRMISocket.registerClass(ArrayList);
JJJRMISocket.registerClass(HashMap);

jjjrmisocket = {};
jjjrmisocket.JJJRMISocket = JJJRMISocket;
jjjrmisocket.Translator = Translator;
jjjrmisocket.ArrayList = ArrayList;
jjjrmisocket.HashMap = HashMap;
module.exports = jjjrmisocket;
},{"./Translator":26,"./gen/package":38,"./java-equiv/ArrayList":39,"./java-equiv/HashMap":40}],26:[function(require,module,exports){
let Encoder = require("./Encoder");
let Decoder = require("./Decoder");
let ArrayList = require("./java-equiv/ArrayList");
let EncodedJSON = require("./EncodedJSON");

class BiMap {
    constructor() {
        this.objectMap = new Map();
        this.reverseMap = new Map();
    }
    clear() {
        this.objectMap.clear();
        this.reverseMap.clear();
    }
    keys() {
        return this.objectMap.keys();
    }
    removeByKey(key) {
        let obj = this.objectMap.get(key);
        this.objectMap.delete(key);
        this.reverseMap.delete(obj);
    }
    removeByValue(obj) {
        let key = this.reverseMap.get(obj);
        this.objectMap.delete(key);
        this.reverseMap.delete(obj);
    }
    get(key) {
        return this.objectMap.get(key);
    }
    put(key, value) {
        this.objectMap.set(key, value);
        this.reverseMap.set(value, key);
    }
    getKey(value) {
        return this.reverseMap.get(value);
    }
    containsKey(key) {
        return this.objectMap.has(key);
    }
    containsValue(value) {
        return this.reverseMap.has(value);
    }
    /* remove target freom the translator replacing it with source, maintaining the same key */
    swap(source, target) {
        let key = this.getKey(target);
        this.objectMap.set(key, source);
        this.reverseMap.delete(target);
        this.reverseMap.set(source, key);
    }
}

class ClassMap {
    constructor() {
        this.classmap = new Map();
    }
    registerPackage(pkg) {
        for (let aClass in pkg)
            this.registerClass(pkg[aClass]);
    }

    registerClass(aClass) {
        if (typeof aClass !== "function") throw new Error(`paramater 'class' of method 'registerClass' is '${typeof aClass.__getClass}', expected 'function'`);
        if (typeof aClass.__getClass !== "function") throw new Error(`in Class ${aClass.constructor.name} method __getClass of type ${typeof aClass.__getClass}`);
        this.classmap.set(aClass.__getClass(), aClass);
    }

    getClass(classname) {
        if (!this.classmap.has(classname)) throw new Error(`Class ${classname} not registered.`);
        return this.classmap.get(classname);
    }

    copyFrom(map) {
        for (let classname of map.keys()) {
            this.classmap.set(classname, map.get(classname));
        }
    }
}

class Translator extends ClassMap {
    constructor() {
        super();
        this.handlers = new Map();
        this.encodeListeners = new ArrayList();
        this.decodeListeners = new ArrayList();
        this.deferred = new ArrayList();
        this.objectMap = new BiMap();
        this.tempReferences = new ArrayList();
        this.nextKey = 0;
    }
    addDecodeListener(lst) {
        this.decodeListeners.add(lst);
    }
    addEncodeListener(lst) {
        this.encodeListeners.add(lst);
    }
    addReference(reference, object) {
        this.objectMap.put(reference, object);
    }
    addTempReference(reference, object) {
        this.objectMap.put(reference, object);
        this.tempReferences.add(reference);
    }
    allocNextKey() {
        return "C" + this.nextKey++;
    }
    clear() {
        this.objectMap.clear();
        this.tempReferences.clear();
    }
    clearTempReferences() {
        for (let ref of this.tempReferences) {
            this.removeByKey(ref);
        }
        this.tempReferences.clear();
    }
    decode(json) {
        if (json === null) throw new Error("JSON object is null.");
        if (typeof json === "undefined") throw new Error("JSON object is undefined.");
        if (typeof json === "string") json = JSON.parse(json);

        let rvalue = null;
        let eson = new EncodedJSON(json);
        new Decoder(eson, this, null).decode(r => {
            while (!this.deferred.isEmpty())
                this.deferred.remove(0).resume();
            this.clearTempReferences();
            rvalue = r;
        });
        return rvalue;
    }
    deferDecoding(decoder) {
        this.deferred.add(decoder);
    }
    encode(object) {
        let toJSON = new Encoder(object, this).encode();
        this.clearTempReferences();
        return toJSON;
    }
    getAllReferredObjects() {
        let values = this.objectMap.values();
        return new ArrayList(values);
    }
    getHandler(aClass) {
        return this.handlers.get(aClass.__getClass());
    }
    hasHandler(aClass) {
        return this.handlers.has(aClass.__getClass());
    }
    setHandler(aClass, handler) {
        this.handlers.set(aClass.__getClass(), handler);
    }
    getReference(object) {
        return this.objectMap.getKey(object);
    }
    getReferredObject(reference) {
        return this.objectMap.get(reference);
    }
    hasReference(reference) {
        return this.objectMap.containsKey(reference);
    }
    hasReferredObject(object) {
        return this.objectMap.containsValue(object);
    }
    notifyDecode(object) {
        for (let decodeListener of this.decodeListeners) {
            decodeListener(object);
        }
    }
    notifyEncode(object) {
        for (let encodeListener of this.encodeListeners) {
            encodeListener(object);
        }
    }
    removeByKey(key) {
        if (!this.objectMap.containsKey(key))
            return false;
        this.objectMap.removeByKey(key);
        return true;
    }
    removeByValue(obj) {
        if (!this.objectMap.containsValue(obj))
            return false;

        this.objectMap.remove(this.objectMap.getKey(obj));
        return true;
    }
}
;
module.exports = Translator;
},{"./Decoder":22,"./EncodedJSON":23,"./Encoder":24,"./java-equiv/ArrayList":39}],27:[function(require,module,exports){
const ClientMessageType = require("./ClientMessageType");
class ClientMessage {
	constructor() {
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.jjjrmi.socket.message.ClientMessage";
	}
	static __isEnum() {
		return false;
	}
};

if (typeof module !== "undefined") module.exports = ClientMessage;
},{"./ClientMessageType":28}],28:[function(require,module,exports){
class ClientMessageType {
	constructor(value) {
		this.__value = value;
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.jjjrmi.socket.message.ClientMessageType";
	}
	static __isEnum() {
		return true;
	}
	toString() {
		return this.__value;
	}
	name() {
		return this.__value;
	}
	toString() {
		return this.__value;
	}
};
ClientMessageType.valueArray = [];
ClientMessageType.valueArray.push(ClientMessageType.METHOD_REQUEST = new ClientMessageType("METHOD_REQUEST"));
ClientMessageType.valueArray.push(ClientMessageType.INVOCATION_RESPONSE = new ClientMessageType("INVOCATION_RESPONSE"));
ClientMessageType.values = function(){return ClientMessageType.valueArray;};

if (typeof module !== "undefined") module.exports = ClientMessageType;
},{}],29:[function(require,module,exports){
const JJJMessageType = require("./JJJMessageType");
class ClientRequestMessage {
	constructor(uid, ptr, methodName, args) {
		this.uid = uid;
		this.ptr = ptr;
		this.methodName = methodName;
		this.args = args;
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.jjjrmi.socket.message.ClientRequestMessage";
	}
	static __isEnum() {
		return false;
	}
};

if (typeof module !== "undefined") module.exports = ClientRequestMessage;
},{"./JJJMessageType":32}],30:[function(require,module,exports){
const JJJMessageType = require("./JJJMessageType");
class ForgetMessage {
	constructor() {
		
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.jjjrmi.socket.message.ForgetMessage";
	}
	static __isEnum() {
		return false;
	}
};

if (typeof module !== "undefined") module.exports = ForgetMessage;
},{"./JJJMessageType":32}],31:[function(require,module,exports){
const JJJMessageType = require("./JJJMessageType");
class JJJMessage {
	constructor() {
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.jjjrmi.socket.message.JJJMessage";
	}
	static __isEnum() {
		return false;
	}
};

if (typeof module !== "undefined") module.exports = JJJMessage;
},{"./JJJMessageType":32}],32:[function(require,module,exports){
class JJJMessageType {
	constructor(value) {
		this.__value = value;
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.jjjrmi.socket.message.JJJMessageType";
	}
	static __isEnum() {
		return true;
	}
	toString() {
		return this.__value;
	}
	name() {
		return this.__value;
	}
	toString() {
		return this.__value;
	}
};
JJJMessageType.valueArray = [];
JJJMessageType.valueArray.push(JJJMessageType.LOCAL = new JJJMessageType("LOCAL"));
JJJMessageType.valueArray.push(JJJMessageType.REMOTE = new JJJMessageType("REMOTE"));
JJJMessageType.valueArray.push(JJJMessageType.READY = new JJJMessageType("READY"));
JJJMessageType.valueArray.push(JJJMessageType.LOAD = new JJJMessageType("LOAD"));
JJJMessageType.valueArray.push(JJJMessageType.EXCEPTION = new JJJMessageType("EXCEPTION"));
JJJMessageType.valueArray.push(JJJMessageType.FORGET = new JJJMessageType("FORGET"));
JJJMessageType.valueArray.push(JJJMessageType.REJECTED_CONNECTION = new JJJMessageType("REJECTED_CONNECTION"));
JJJMessageType.values = function(){return JJJMessageType.valueArray;};

if (typeof module !== "undefined") module.exports = JJJMessageType;
},{}],33:[function(require,module,exports){
const ClientMessageType = require("./ClientMessageType");
class MethodRequest {
	constructor(uid, ptr, methodName, args) {
		this.uid = uid;
		this.objectPTR = ptr;
		this.methodName = methodName;
		this.methodArguments = args;
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.jjjrmi.socket.message.MethodRequest";
	}
	static __isEnum() {
		return false;
	}
};

if (typeof module !== "undefined") module.exports = MethodRequest;
},{"./ClientMessageType":28}],34:[function(require,module,exports){
const JJJMessageType = require("./JJJMessageType");
class MethodResponse {
	constructor(uid, objectPTR, methodName, rvalue) {
		this.uid = uid;
		this.methodName = methodName;
		this.rvalue = rvalue;
		this.objectPTR = objectPTR;
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.jjjrmi.socket.message.MethodResponse";
	}
	static __isEnum() {
		return false;
	}
	getUid() {
		return this.uid;
	}
	getMethodName() {
		return this.methodName;
	}
	getObjectPTR() {
		return this.objectPTR;
	}
	getRvalue() {
		return this.rvalue;
	}
};

if (typeof module !== "undefined") module.exports = MethodResponse;
},{"./JJJMessageType":32}],35:[function(require,module,exports){
const JJJMessageType = require("./JJJMessageType");
class ReadyMessage {
	constructor() {
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.jjjrmi.socket.message.ReadyMessage";
	}
	static __isEnum() {
		return false;
	}
	getRoot() {
		return this.root;
	}
};

if (typeof module !== "undefined") module.exports = ReadyMessage;
},{"./JJJMessageType":32}],36:[function(require,module,exports){
const JJJMessageType = require("./JJJMessageType");
class RejectedConnectionMessage {
	constructor() {
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.jjjrmi.socket.message.RejectedConnectionMessage";
	}
	static __isEnum() {
		return false;
	}
};

if (typeof module !== "undefined") module.exports = RejectedConnectionMessage;
},{"./JJJMessageType":32}],37:[function(require,module,exports){
const JJJMessageType = require("./JJJMessageType");
class ServerSideExceptionMessage {
	constructor() {
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.jjjrmi.socket.message.ServerSideExceptionMessage";
	}
	static __isEnum() {
		return false;
	}
};

if (typeof module !== "undefined") module.exports = ServerSideExceptionMessage;
},{"./JJJMessageType":32}],38:[function(require,module,exports){
let package = {};
package.ClientMessageType = require("./ClientMessageType");
package.JJJMessageType = require("./JJJMessageType");
package.ClientMessage = require("./ClientMessage");
package.ClientRequestMessage = require("./ClientRequestMessage");
package.ForgetMessage = require("./ForgetMessage");
package.JJJMessage = require("./JJJMessage");
package.MethodRequest = require("./MethodRequest");
package.MethodResponse = require("./MethodResponse");
package.ReadyMessage = require("./ReadyMessage");
package.RejectedConnectionMessage = require("./RejectedConnectionMessage");
package.ServerSideExceptionMessage = require("./ServerSideExceptionMessage");

if (typeof module !== "undefined") module.exports = package;
},{"./ClientMessage":27,"./ClientMessageType":28,"./ClientRequestMessage":29,"./ForgetMessage":30,"./JJJMessage":31,"./JJJMessageType":32,"./MethodRequest":33,"./MethodResponse":34,"./ReadyMessage":35,"./RejectedConnectionMessage":36,"./ServerSideExceptionMessage":37}],39:[function(require,module,exports){
let ArrayList = class ArrayList {
    constructor() {
        this.elementData = [];
    }
    static __isTransient() {
        return false;
    }
    static __getClass() {
        return "java.util.ArrayList";
    }
    static __isEnum() {
        return false;
    }
    addAll(c) {
        if (typeof c === "number") throw new Error("unsupported java to js operation");
        for (let e of c)
            this.add(e);
    }
    isEmpty() {
        return this.size() === 0;
    }
    removeAll(c) {
        for (let e of c) {
            this.remove(e);
        }
    }
    retainAll(c) {
        let newElementData = [];
        for (let e of c) {
            if (this.contains(e)) newElementData.add(e);
        }
        this.elementData = newElementData;
    }
    size() {
        return this.elementData.length;
    }
    clone() {
        let that = new ArrayList();
        for (let e of this) {
            that.add(e);
        }
        return that;
    }
    get(index) {
        return this.elementData[index];
    }
    set(index, element) {
        let old = this.elementData[index];
        this.elementData[index] = element;
        return old;
    }
    toArray(a = []) {
        for (let i = 0; i < this.elementData.length; i++)
            a[i] = this.elementData[i];
        return a;
    }
    iterator() {
        throw new Error("unsupported java to js operation");
    }
    subList(fromIndex, toIndex) {
        throw new Error("unsupported java to js operation");
    }
    listIterator() {
        throw new Error("unsupported java to js operation");
    }
    listIterator(index) {
        throw new Error("unsupported java to js operation");
    }
    add(index, element) {
        this.splice(index, 0, element);
    }
    add(e) {
        this.elementData.push(e);
        return true;
    }
    clear() {
        this.elementData = [];
    }
    contains(o) {
        return this.elementData.indexOf(o) !== -1;
    }
    indexOf(o) {
        return this.elementData.indexOf(o);
    }
    [Symbol.iterator] () {
        return this.elementData[Symbol.iterator]();
    }
    lastIndexOf(o) {
        return this.elementData.lastIndexOf(o);
    }
    remove(o) {
        if (typeof o === "number") return this.removeIndex(o);
        let index = this.indexOf(o);
        if (index === -1) return undefined;
        let r = this.elementData.splice(index, 1);
        return r[0];
    }
    removeRange(fromIndex, toIndex) {
        this.elementData.splice(fromIndex, toIndex - fromIndex);
    }
    removeIndex (index) {
        if (this.size >= index) throw new Error(`index '${index}' out of range`);
        if (this.size < 0) throw new Error(`index '${index}' out of range`);
        let r = this.elementData.splice(index, 1);
        return r[0];
    }
};

module.exports = ArrayList;
},{}],40:[function(require,module,exports){
let HashMap = class HashMap {
    constructor() {
        this.map = new Map();
    }
    static __isTransient() {
        return false;
    }
    static __getClass() {
        return "java.util.HashMap";
    }
    static __isEnum() {
        return false;
    }
    /**
     * Returns the number of key-value mappings in this map.
     *
     * @return the number of key-value mappings in this map
     */
    size() {
        return this.map.size;
    }
    /**
     * Returns <tt>true</tt> if this map contains no key-value mappings.
     *
     * @return <tt>true</tt> if this map contains no key-value mappings
     */
    isEmpty() {
        return this.map.size === 0;
    }
    /**
     * Returns the value to which the specified key is mapped,
     * or {@code null} if this map contains no mapping for the key.
     *
     * <p>More formally, if this map contains a mapping from a key
     * {@code k} to a value {@code v} such that {@code (key==null ? k==null :
     * key.equals(k))}, then this method returns {@code v}; otherwise
     * it returns {@code null}.  (There can be at most one such mapping.)
     *
     * <p>A return value of {@code null} does not <i>necessarily</i>
     * indicate that the map contains no mapping for the key; it's also
     * possible that the map explicitly maps the key to {@code null}.
     * The {@link #containsKey containsKey} operation may be used to
     * distinguish these two cases.
     *
     * @see #put(Object, Object)
     */
    get(key) {
        return this.map.get(key);
    }
    /**
     * Returns <tt>true</tt> if this map contains a mapping for the
     * specified key.
     *
     * @param   key   The key whose presence in this map is to be tested
     * @return <tt>true</tt> if this map contains a mapping for the specified
     * key.
     */
    containsKey(key) {
        return this.map.has(key);
    }
    /**
     * Associates the specified value with the specified key in this map.
     * If the map previously contained a mapping for the key, the old
     * value is replaced.
     *
     * @param key key with which the specified value is to be associated
     * @param value value to be associated with the specified key
     * @return the previous value associated with <tt>key</tt>, or
     *         <tt>null</tt> if there was no mapping for <tt>key</tt>.
     *         (A <tt>null</tt> return can also indicate that the map
     *         previously associated <tt>null</tt> with <tt>key</tt>.)
     */
    put(key, value) {
        let r = this.get(key);
        this.map.set(key, value);
        return r;
    }
    /**
     * Copies all of the mappings from the specified map to this map.
     * These mappings will replace any mappings that this map had for
     * any of the keys currently in the specified map.
     *
     * @param m mappings to be stored in this map
     * @throws NullPointerException if the specified map is null
     */
    putAll(that) {

    }
    /**
     * Removes the mapping for the specified key from this map if present.
     *
     * @param  key key whose mapping is to be removed from the map
     * @return the previous value associated with <tt>key</tt>, or
     *         <tt>null</tt> if there was no mapping for <tt>key</tt>.
     *         (A <tt>null</tt> return can also indicate that the map
     *         previously associated <tt>null</tt> with <tt>key</tt>.)
     */
    remove(key) {
        let r = this.get(key);
        this.map.delete(key);
        return r;
    }
    /**
     * Removes all of the mappings from this map.
     * The map will be empty after this call returns.
     */
    clear() {
        this.map.clear();
    }
    /**
     * Returns <tt>true</tt> if this map maps one or more keys to the
     * specified value.
     *
     * @param value value whose presence in this map is to be tested
     * @return <tt>true</tt> if this map maps one or more keys to the
     *         specified value
     */
    containsValue(value) {
        for (let v of this.map.values()) {
            if (v === value) return true;
        }
        return false;
    }
    /**
     * Returns a {@link Set} view of the keys contained in this map.
     * The set is backed by the map, so changes to the map are
     * reflected in the set, and vice-versa.  If the map is modified
     * while an iteration over the set is in progress (except through
     * the iterator's own <tt>remove</tt> operation), the results of
     * the iteration are undefined.  The set supports element removal,
     * which removes the corresponding mapping from the map, via the
     * <tt>Iterator.remove</tt>, <tt>Set.remove</tt>,
     * <tt>removeAll</tt>, <tt>retainAll</tt>, and <tt>clear</tt>
     * operations.  It does not support the <tt>add</tt> or <tt>addAll</tt>
     * operations.
     */
    keySet() {
        return this.map.keys();
    }
    /**
     * Returns a {@link Collection} view of the values contained in this map.
     * The collection is backed by the map, so changes to the map are
     * reflected in the collection, and vice-versa.  If the map is
     * modified while an iteration over the collection is in progress
     * (except through the iterator's own <tt>remove</tt> operation),
     * the results of the iteration are undefined.  The collection
     * supports element removal, which removes the corresponding
     * mapping from the map, via the <tt>Iterator.remove</tt>,
     * <tt>Collection.remove</tt>, <tt>removeAll</tt>,
     * <tt>retainAll</tt> and <tt>clear</tt> operations.  It does not
     * support the <tt>add</tt> or <tt>addAll</tt> operations.
     */
    values() {
        return this.map.values();
    }

    jjjDecode(resObj) {
        let keys = null;
        let values = null;

        let cb1 = function (r) {
            keys = r;
            resObj.decodeField("values", cb2);
        };

        let cb2 = function (r) {
            values = r;
            for (let i = 0; i < keys.length; i++) {
                this.put(keys[i], values[i]);
            }
        }.bind(this);

        resObj.decodeField("keys", cb1);
    }

    jjjEncode(encodedObject) {
        let keys = [];
        let values = [];

        this.map.forEach((value, key)=>{
            keys.push(key);
            values.push(value);
        });

        encodedObject.setField("keys", keys);
        encodedObject.setField("values", values);
    }
};

module.exports = HashMap;
},{}],41:[function(require,module,exports){
class SQLEntry {
	constructor() {
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.utility.SQL.SQLEntry";
	}
	static __isEnum() {
		return false;
	}
	getName() {
		return this.name;
	}
	getValue() {
		return this.value;
	}
};

if (typeof module !== "undefined") module.exports = SQLEntry;
},{}],42:[function(require,module,exports){
const SQLEntry = require("./SQLEntry");
class SQLRecord {
	constructor() {
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.utility.SQL.SQLRecord";
	}
	static __isEnum() {
		return false;
	}
	getEntry(column) {
		for(let i = 0; i < this.entries.length; i++)if (this.entries[i].getName() === column)return this.entries[i];
		
		
		return null;
	}
	hasEntry(column) {
		for(let i = 0; i < this.entries.length; i++)if (this.entries[i].getName() === column)return true;
		
		
		return false;
	}
	[Symbol.iterator]() {
		return this.entries[Symbol.iterator]();
	}
};

if (typeof module !== "undefined") module.exports = SQLRecord;
},{"./SQLEntry":41}],43:[function(require,module,exports){
const SQLRecord = require("./SQLRecord");
class SQLResult {
	constructor() {
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.frar.utility.SQL.SQLResult";
	}
	static __isEnum() {
		return false;
	}
	[Symbol.iterator]() {
		return this.records[Symbol.iterator]();
	}
	size() {
		return this.records.length;
	}
	isEmpty() {
		return this.records.length === 0;
	}
	get(i) {
		return this.records[i];
	}
	hasRecord(name, value) {
		for(let record of this.records){
			if (record.hasEntry(name))return true;
			
		}
		return false;
	}
	getRecord(name, value) {
		for(let record of this.records){
			if (record.hasEntry(name) && record.getEntry(name).getValue() === value)return record;
			
		}
		return null;
	}
};

if (typeof module !== "undefined") module.exports = SQLResult;
},{"./SQLRecord":42}],44:[function(require,module,exports){
let package = {};
package.SQLEntry = require("./SQLEntry");
package.SQLRecord = require("./SQLRecord");
package.SQLResult = require("./SQLResult");

if (typeof module !== "undefined") module.exports = package;
},{"./SQLEntry":41,"./SQLRecord":42,"./SQLResult":43}],45:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],46:[function(require,module,exports){
const TagInfo = require("./TagInfo");
const NameSource = require("./NameSource");
class Context {
	constructor() {
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.sharcnet.nerve.context.Context";
	}
	static __isEnum() {
		return false;
	}
	hasTagSourceAttribute() {
		return !this.tagSourceAttribute.isEmpty();
	}
	getTagSourceAttribute() {
		return this.tagSourceAttribute;
	}
	hasScriptFilename() {
		return !this.scriptFilename.isEmpty();
	}
	getScriptFilename() {
		return this.scriptFilename;
	}
	getName() {
		return this.name;
	}
	getSchemaName() {
		return this.schemaName;
	}
	readFromDictionary() {
		return this.dictionaries;
	}
	styles() {
		return this.styleList;
	}
	tags() {
		return this.tagList;
	}
	getTagInfo(tagname, source) {
		for(let tagInfo of this.tagList){
			if (tagInfo.getName(source) === tagname)return tagInfo;
			
		}
		throw new Error("ca.sharcnet.nerve.context.ContextException");
	}
	isTagName(tagname, source) {
		for(let tagInfo of this.tagList){
			if (tagInfo.getName(source) === tagname)return true;
			
		}
		return false;
	}
};

if (typeof module !== "undefined") module.exports = Context;
},{"./NameSource":47,"./TagInfo":50}],47:[function(require,module,exports){
class NameSource {
	constructor(value) {
		this.__value = value;
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.sharcnet.nerve.context.NameSource";
	}
	static __isEnum() {
		return true;
	}
	toString() {
		return this.__value;
	}
	name() {
		return this.__value;
	}
	toString() {
		return this.__value;
	}
};
NameSource.valueArray = [];
NameSource.valueArray.push(NameSource.NAME = new NameSource("NAME"));
NameSource.valueArray.push(NameSource.DICTIONARY = new NameSource("DICTIONARY"));
NameSource.valueArray.push(NameSource.DIALOG = new NameSource("DIALOG"));
NameSource.valueArray.push(NameSource.NERMAP = new NameSource("NERMAP"));
NameSource.values = function(){return NameSource.valueArray;};

if (typeof module !== "undefined") module.exports = NameSource;
},{}],48:[function(require,module,exports){
const ProgressStage = require("./ProgressStage");
class ProgressPacket {
	constructor() {
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.sharcnet.nerve.ProgressPacket";
	}
	static __isEnum() {
		return false;
	}
};

if (typeof module !== "undefined") module.exports = ProgressPacket;
},{"./ProgressStage":49}],49:[function(require,module,exports){
class ProgressStage {
	constructor(value) {
		this.__value = value;
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.sharcnet.nerve.ProgressStage";
	}
	static __isEnum() {
		return true;
	}
	toString() {
		return this.__value;
	}
	name() {
		return this.__value;
	}
	toString() {
		return this.__value;
	}
};
ProgressStage.valueArray = [];
ProgressStage.valueArray.push(ProgressStage.START = new ProgressStage("START"));
ProgressStage.valueArray.push(ProgressStage.CONTINUE = new ProgressStage("CONTINUE"));
ProgressStage.valueArray.push(ProgressStage.COMPLETE = new ProgressStage("COMPLETE"));
ProgressStage.valueArray.push(ProgressStage.ERROR = new ProgressStage("ERROR"));
ProgressStage.values = function(){return ProgressStage.valueArray;};

if (typeof module !== "undefined") module.exports = ProgressStage;
},{}],50:[function(require,module,exports){
const NameSource = require("./NameSource");
class TagInfo {
	constructor() {
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.sharcnet.nerve.context.TagInfo";
	}
	static __isEnum() {
		return false;
	}
	defaults() {
		return new HashMap(this.defaults);
	}
	hasEncodeScript() {
		return !this.encodeScript.isEmpty();
	}
	hasDecodeScript() {
		return !this.decodeScript.isEmpty();
	}
	getEncodeScript() {
		return this.encodeScript;
	}
	getDecodeScript() {
		return this.decodeScript;
	}
	getDefault(key) {
		return this.defaults.get(key);
	}
	hasDefault(key) {
		return this.defaults.containsKey(key);
	}
	getLemmaAttribute() {
		return this.lemmaAttribute;
	}
	getLinkAttribute() {
		return this.linkAttribute;
	}
	getIdAttribute() {
		return this.idAttribute;
	}
	getDialogMethod() {
		return this.dialogMethod;
	}
	hasName(name) {
		if (this.getName(NameSource.DICTIONARY) === name)return true;
		
		if (this.getName(NameSource.DIALOG) === name)return true;
		
		if (this.getName(NameSource.NERMAP) === name)return true;
		
		if (this.getName(NameSource.NAME) === name)return true;
		
		return false;
	}
	getName(nameSource) {
		switch (nameSource){
			case NameSource.DICTIONARY: return this.dictionary;
			
			case NameSource.DIALOG: return this.dialog;
			
			case NameSource.NERMAP: return this.nerMap;
			
			case NameSource.NAME: ;
			default: return this.name;
			
		}
	}
};

if (typeof module !== "undefined") module.exports = TagInfo;
},{"./NameSource":47}],51:[function(require,module,exports){
let package = {};
package.NameSource = require("./NameSource");
package.ProgressStage = require("./ProgressStage");
package.Context = require("./Context");
package.TagInfo = require("./TagInfo");
package.ProgressPacket = require("./ProgressPacket");

if (typeof module !== "undefined") module.exports = package;
},{"./Context":46,"./NameSource":47,"./ProgressPacket":48,"./ProgressStage":49,"./TagInfo":50}],52:[function(require,module,exports){
'use strict';

/*
     config is passed through to fetch, so could include things like:
     {
         method: 'get',
         credentials: 'same-origin'
    }
*/

function fetchWithTimeout(url) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8000;


    return new Promise(function (resolve, reject) {
        // the reject on the promise in the timeout callback won't have any effect, *unless*
        // the timeout is triggered before the fetch resolves, in which case the setTimeout rejects
        // the whole outer Promise, and the promise from the fetch is dropped entirely.
        setTimeout(function () {
            return reject(new Error('Call to VIAF timed out'));
        }, timeout);
        fetch(url, config).then(resolve, reject);
    }).then(function (response) {
        // check for ok status
        if (response.ok) {
            return response.json();
        }
        // if status not ok, through an error
        throw new Error('Something wrong with the call to VIAF, possibly a problem with the network or the server. HTTP error: ' + response.status);
    } /*,
      // instead of handling and rethrowing the error here, we just let it bubble through
      error => {
      // we could instead handle a reject from either of the fetch or setTimeout promises,
      // whichever first rejects, do some loggingor something, and then throw a new rejection.
         console.log(error)
         return Promise.reject(new Error(`some error jjk: ${error}`))
      }*/
    );
}

// note that this method is exposed on the npm module to simplify testing,
// i.e., to allow intercepting the HTTP call during testing, using sinon or similar.
function getEntitySourceURI(queryString, methodName) {
    return 'https://viaf.org/viaf/search?query=' + methodName + '+all+%22' + encodeURIComponent(queryString) + '%22&httpAccept=application/json&maximumRecords=5';
}

function getPersonLookupURI(queryString) {
    return getEntitySourceURI(queryString, 'local.personalNames');
}

function getPlaceLookupURI(queryString) {
    return getEntitySourceURI(queryString, 'local.geographicNames');
}

function getOrganizationLookupURI(queryString) {
    return getEntitySourceURI(queryString, 'local.corporateNames');
}

function getTitleLookupURI(queryString) {
    return getEntitySourceURI(queryString, 'local.uniformTitleWorks');
}

function callVIAF(url, queryString) {

    return fetchWithTimeout(url).then(function (parsedJSON) {
        console.log(parsedJSON);
        return parsedJSON.searchRetrieveResponse.records ? parsedJSON.searchRetrieveResponse.records.map(function (_ref) {
            var _ref$record$recordDat = _ref.record.recordData,
                nameType = _ref$record$recordDat.nameType,
                uri = _ref$record$recordDat.Document['@about'],
                headings = _ref$record$recordDat.mainHeadings.data;

            var name = Array.isArray(headings) ? headings[0].text : headings.text;
            var uriForDisplay = uri.replace('http', 'https');
            return { nameType: nameType, id: uri, uri: uri, uriForDisplay: uriForDisplay, name: name, repository: 'VIAF', originalQueryString: queryString };
        }) : [];
    });
}

function findPerson(queryString) {
    return callVIAF(getPersonLookupURI(queryString), queryString);
}

function findPlace(queryString) {
    return callVIAF(getPlaceLookupURI(queryString), queryString);
}

function findOrganization(queryString) {
    return callVIAF(getOrganizationLookupURI(queryString), queryString);
}

function findTitle(queryString) {
    return callVIAF(getTitleLookupURI(queryString), queryString);
}

module.exports = {
    findPerson: findPerson,
    findPlace: findPlace,
    findOrganization: findOrganization,
    findTitle: findTitle,
    getPersonLookupURI: getPersonLookupURI,
    getPlaceLookupURI: getPlaceLookupURI,
    getOrganizationLookupURI: getOrganizationLookupURI,
    getTitleLookupURI: getTitleLookupURI,
    fetchWithTimeout: fetchWithTimeout
};

},{}],53:[function(require,module,exports){
'use strict';

/*
     config is passed through to fetch, so could include things like:
     {
         method: 'get',
         credentials: 'same-origin'
    }
*/

var wdk = require('wikidata-sdk');

function fetchWithTimeout(url) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8000;


    return new Promise(function (resolve, reject) {
        // the reject on the promise in the timeout callback won't have any effect, *unless*
        // the timeout is triggered before the fetch resolves, in which case the setTimeout rejects
        // the whole outer Promise, and the promise from the fetch is dropped entirely.
        setTimeout(function () {
            return reject(new Error('Call to Wikidata timed out'));
        }, timeout);
        fetch(url, config).then(resolve, reject);
    }).then(function (response) {
        // check for ok status
        if (response.ok) {
            return response.json();
        }
        // if status not ok, through an error
        throw new Error('Something wrong with the call to Wikidata, possibly a problem with the network or the server. HTTP error: ' + response.status);
    } /*,
      // instead of handling and rethrowing the error here, we just let it bubble through
      error => {
      // we could instead handle a reject from either of the fetch or setTimeout promises,
      // whichever first rejects, do some loggingor something, and then throw a new rejection.
         console.log(error)
         return Promise.reject(new Error(`some error jjk: ${error}`))
      }*/
    );
}

// note that this method is exposed on the npm module to simplify testing,
// i.e., to allow intercepting the HTTP call during testing, using sinon or similar.
function getEntitySourceURI(queryString) {
    // the wdk used below, actually uses the wikidata php api
    return wdk.searchEntities({
        search: queryString,
        format: 'json',
        language: 'en',
        limit: 5
    });
}

function getPersonLookupURI(queryString) {
    return getEntitySourceURI(queryString);
}

function getPlaceLookupURI(queryString) {
    return getEntitySourceURI(queryString);
}

function getOrganizationLookupURI(queryString) {
    return getEntitySourceURI(queryString);
}

function getTitleLookupURI(queryString) {
    return getEntitySourceURI(queryString);
}

function callWikidata(url, queryString) {

    return fetchWithTimeout(url).then(function (parsedJSON) {

        return parsedJSON.search.map(function (_ref) {
            var uri = _ref.concepturi,
                name = _ref.label,
                description = _ref.description;

            return {
                nameType: 'unknown',
                id: uri,
                uriForDisplay: uri.replace('http', 'https'),
                uri: uri,
                name: name,
                repository: 'wikidata',
                originalQueryString: queryString,
                description: description
            };
        });
    });
}

function findPerson(queryString) {
    return callWikidata(getPersonLookupURI(queryString), queryString);
}

function findPlace(queryString) {
    return callWikidata(getPlaceLookupURI(queryString), queryString);
}

function findOrganization(queryString) {
    return callWikidata(getOrganizationLookupURI(queryString), queryString);
}

function findTitle(queryString) {
    return callWikidata(getTitleLookupURI(queryString), queryString);
}

module.exports = {
    findPerson: findPerson,
    findPlace: findPlace,
    findOrganization: findOrganization,
    findTitle: findTitle,
    getPersonLookupURI: getPersonLookupURI,
    getPlaceLookupURI: getPlaceLookupURI,
    getOrganizationLookupURI: getOrganizationLookupURI,
    getTitleLookupURI: getTitleLookupURI,
    fetchWithTimeout: fetchWithTimeout
};

},{"wikidata-sdk":65}],54:[function(require,module,exports){
const toDateObject = require('./wikidata_time_to_date_object')

const helpers = {}
helpers.isNumericId = id => /^[0-9]+$/.test(id)
helpers.isEntityId = id => /^(Q|P)[0-9]+$/.test(id)
helpers.isItemId = id => /^Q[0-9]+$/.test(id)
helpers.isPropertyId = id => /^P[0-9]+$/.test(id)

helpers.getNumericId = function (id) {
  if (!(helpers.isEntityId(id))) throw new Error(`invalid wikidata id: ${id}`)
  return id.replace(/Q|P/, '')
}

helpers.wikidataTimeToDateObject = toDateObject

// Try to parse the date or return the input
const bestEffort = fn => value => {
  try {
    return fn(value)
  } catch (err) {
    console.error('wikidata-sdk time conversion error:', err)
    return value
  }
}

const toEpochTime = wikidataTime => toDateObject(wikidataTime).getTime()
const toISOString = wikidataTime => toDateObject(wikidataTime).toISOString()

// A date format that knows just three precisions:
// 'yyyy', 'yyyy-mm', and 'yyyy-mm-dd' (including negative and non-4 digit years)
// Should be able to handle the old and the new Wikidata time:
// - in the old one, units below the precision where set to 00
// - in the new one, those months and days are set to 01 in those cases,
//   so when we can access the full claim object, we check the precision
//   to recover the old format
const toSimpleDay = wikidataTime => {
  // Also accept claim datavalue.value objects, and actually prefer those,
  // as we can check the precision
  if (typeof wikidataTime === 'object') {
    const { time, precision } = wikidataTime
    // Year precision
    if (precision === 9) wikidataTime = time.replace('-01-01T', '-00-00T')
    // Month precision
    else if (precision === 10) wikidataTime = time.replace('-01T', '-00T')
    else wikidataTime = time
  }

  return wikidataTime.split('T')[0]
  // Remove positive years sign
  .replace(/^\+/, '')
  // Remove years padding zeros
  .replace(/^(-?)0+/, '$1')
  // Remove days if not included in the Wikidata date precision
  .replace(/-00$/, '')
  // Remove months if not included in the Wikidata date precision
  .replace(/-00$/, '')
}

helpers.wikidataTimeToEpochTime = bestEffort(toEpochTime)
helpers.wikidataTimeToISOString = bestEffort(toISOString)
helpers.wikidataTimeToSimpleDay = bestEffort(toSimpleDay)

module.exports = helpers

},{"./wikidata_time_to_date_object":64}],55:[function(require,module,exports){
const { wikidataTimeToISOString, wikidataTimeToEpochTime, wikidataTimeToSimpleDay } = require('./helpers')

const simple = datavalue => datavalue.value

const monolingualtext = (datavalue, options) => {
  return options.keepRichValues ? datavalue.value : datavalue.value.text
}

const item = (datavalue, options) => prefixedId(datavalue, options.entityPrefix)

const property = (datavalue, options) => {
  return prefixedId(datavalue, options.propertyPrefix)
}

const entityLetter = { item: 'Q', property: 'P' }
const prefixedId = function (datavalue, prefix) {
  const { value } = datavalue
  const id = value.id || entityLetter[value['entity-type']] + value['numeric-id']
  return typeof prefix === 'string' ? `${prefix}:${id}` : id
}

const quantity = (datavalue, options) => {
  const { value } = datavalue
  const amount = parseFloat(value.amount)
  if (options.keepRichValues) {
    const amount = parseFloat(value.amount)
    const unit = value.unit.replace('http://www.wikidata.org/entity/', '')
    const upperBound = parseFloat(value.upperBound)
    const lowerBound = parseFloat(value.lowerBound)
    return { amount, unit, upperBound, lowerBound }
  } else {
    return amount
  }
}

const coordinate = datavalue => {
  return [ datavalue.value.latitude, datavalue.value.longitude ]
}

const time = (datavalue, options) => {
  return getTimeConverter(options.timeConverter)(datavalue.value)
}

const getTimeConverter = (key = 'iso') => timeConverters[key]

// Each time converter should be able to accept 2 keys of arguments:
// - either datavalue.value objects (prefered as it gives access to the precision)
// - or the time string (datavalue.value.time)
const timeConverters = {
  iso: wikidataTimeToISOString,
  epoch: wikidataTimeToEpochTime,
  'simple-day': wikidataTimeToSimpleDay,
  none: wikidataTime => wikidataTime.time || wikidataTime
}

const claimParsers = {
  string: simple,
  commonsMedia: simple,
  url: simple,
  'external-id': simple,
  math: simple,
  monolingualtext,
  'wikibase-item': item,
  'wikibase-property': property,
  time,
  quantity,
  'globe-coordinate': coordinate,
  'geo-shape': simple,
  'tabular-data': simple
}

module.exports = (datatype, datavalue, options) => {
  // If you get an error like 'TypeError: claimParsers[datatype] is not a function'
  // it means that the current datatype isn't supported yet:
  // please report to https://github.com/maxlath/wikidata-sdk/issues
  return claimParsers[datatype](datavalue, options)
}

},{"./helpers":54}],56:[function(require,module,exports){
const simplifyEntity = require('./simplify_entity')

module.exports = {
  wd: {
    entities: function (res) {
      res = res.body || res
      const { entities } = res
      Object.keys(entities).forEach(entityId => {
        entities[entityId] = simplifyEntity(entities[entityId])
      })
      return entities
    }
  }
}

},{"./simplify_entity":58}],57:[function(require,module,exports){
const parseClaim = require('./parse_claim')
const { uniq } = require('../utils/utils')

// Expects an entity 'claims' object
// Ex: entity.claims
const simplifyClaims = function (claims, ...options) {
  const { propertyPrefix } = parseOptions(options)
  const simpleClaims = {}
  for (let id in claims) {
    let propClaims = claims[id]
    if (propertyPrefix) {
      id = propertyPrefix + ':' + id
    }
    simpleClaims[id] = simplifyPropertyClaims(propClaims, ...options)
  }
  return simpleClaims
}

// Expects the 'claims' array of a particular property
// Ex: entity.claims.P369
const simplifyPropertyClaims = function (propClaims, ...options) {
  // Avoid to throw on empty inputs to allow to simplify claims array
  // without having to know if the entity as claims for this property
  // Ex: simplifyPropertyClaims(entity.claims.P124211616)
  if (propClaims == null || propClaims.length === 0) return []

  const { keepNonTruthy, areSubSnaks } = parseOptions(options)
  if (!(keepNonTruthy || areSubSnaks)) {
    propClaims = filterOutNonTruthyClaims(propClaims)
  }

  propClaims = propClaims
    .map(claim => simplifyClaim(claim, ...options))
    .filter(nonNull)

  // Deduplicate values unless we return a rich value object
  if (propClaims[0] && typeof propClaims[0] !== 'object') {
    return uniq(propClaims)
  } else {
    return propClaims
  }
}

const aggregatePerRank = function (aggregate, claim) {
  const { rank } = claim
  aggregate[rank] || (aggregate[rank] = [])
  aggregate[rank].push(claim)
  return aggregate
}

const filterOutNonTruthyClaims = function (claims) {
  const aggregate = claims.reduce(aggregatePerRank, {})
  // on truthyness: https://www.mediawiki.org/wiki/Wikibase/Indexing/RDF_Dump_Format#Truthy_statements
  return aggregate.preferred || aggregate.normal || []
}

const nonNull = obj => obj != null

// Expects a single claim object
// Ex: entity.claims.P369[0]
const simplifyClaim = function (claim, ...options) {
  options = parseOptions(options)
  const { keepQualifiers, keepReferences, keepIds, keepHashes } = options
  // tries to replace wikidata deep claim object by a simple value
  // e.g. a string, an entity Qid or an epoch time number
  const { mainsnak } = claim

  var datatype, datavalue, isQualifierSnak, isReferenceSnak
  if (mainsnak) {
    datatype = mainsnak.datatype
    datavalue = mainsnak.datavalue
    // Known case: snaktype set to `somevalue`
    if (!datavalue) return null
  } else {
    // Should only happen in snaktype: `novalue` cases or alikes
    if (!(claim && claim.datavalue)) return null
    // Qualifiers have no mainsnak, and define datatype, datavalue on claim
    datavalue = claim.datavalue
    datatype = claim.datatype
    // Duck typing the sub-snak type
    if (claim.hash) isQualifierSnak = true
    else isReferenceSnak = true
  }

  const value = parseClaim(datatype, datavalue, options)

  // Qualifiers should not attempt to keep sub-qualifiers or references
  if (isQualifierSnak) {
    if (keepHashes) return { value, hash: claim.hash }
    else return value
  }

  if (isReferenceSnak) return value

  // No need to test keepHashes as it has no effect if neither
  // keepQualifiers or keepReferences is true
  if (!(keepQualifiers || keepReferences || keepIds)) return value

  // When keeping qualifiers or references, the value becomes an object
  // instead of a direct value
  const richValue = { value }

  // Using a new object so that the original options object isn't modified
  const subSnaksOptions = Object.assign({}, options, { areSubSnaks: true, keepHashes })

  if (keepQualifiers) {
    richValue.qualifiers = simplifyClaims(claim.qualifiers, subSnaksOptions)
  }

  if (keepReferences) {
    claim.references = claim.references || []
    richValue.references = claim.references.map(refRecord => {
      const snaks = simplifyClaims(refRecord.snaks, subSnaksOptions)
      if (keepHashes) return { snaks, hash: refRecord.hash }
      else return snaks
    })
  }

  if (keepIds) richValue.id = claim.id

  return richValue
}

const parseOptions = function (options) {
  if (options == null) return {}

  if (options[0] && typeof options[0] === 'object') return options[0]

  // Legacy interface
  var [ entityPrefix, propertyPrefix, keepQualifiers ] = options
  return { entityPrefix, propertyPrefix, keepQualifiers }
}

module.exports = { simplifyClaims, simplifyPropertyClaims, simplifyClaim }

},{"../utils/utils":75,"./parse_claim":55}],58:[function(require,module,exports){
const { simplifyClaims } = require('./simplify_claims')
const simplify = require('./simplify_text_attributes')
const simplifySitelinks = require('./simplify_sitelinks')

module.exports = (entity, options) => {
  const simplified = {
    id: entity.id,
    type: entity.type,
    modified: entity.modified
  }

  simplifyIfDefined(entity, simplified, 'labels')
  simplifyIfDefined(entity, simplified, 'descriptions')
  simplifyIfDefined(entity, simplified, 'aliases')

  if (entity.claims != null) {
    simplified.claims = simplifyClaims(entity.claims, options)
  }

  if (entity.sitelinks != null) {
    simplified.sitelinks = simplifySitelinks(entity.sitelinks, options)
  }

  return simplified
}

const simplifyIfDefined = (entity, simplified, attribute) => {
  if (entity[attribute] != null) {
    simplified[attribute] = simplify[attribute](entity[attribute])
  }
}

},{"./simplify_claims":57,"./simplify_sitelinks":59,"./simplify_text_attributes":61}],59:[function(require,module,exports){
const { getSitelinkUrl } = require('./sitelinks_helpers')

module.exports = (sitelinks, options = {}) => {
  const { addUrl } = options
  return Object.keys(sitelinks).reduce(aggregateValues(sitelinks, addUrl), {})
}

const aggregateValues = (sitelinks, addUrl) => (index, key) => {
  const { title } = sitelinks[key]
  if (addUrl) {
    index[key] = { title, url: getSitelinkUrl(key, title) }
  } else {
    index[key] = title
  }
  return index
}

},{"./sitelinks_helpers":62}],60:[function(require,module,exports){
module.exports = function (input) {
  if (typeof input === 'string') input = JSON.parse(input)

  const { vars } = input.head
  const results = input.results.bindings

  if (vars.length === 1) {
    const varName = vars[0]
    return results
    .map(result => parseValue(result[varName]))
    // filtering-out bnodes
    .filter(result => result != null)
  } else {
    const [ varsWithLabel, varsWithout ] = identifyVars(vars)
    return results.map(getSimplifiedResult(varsWithLabel, varsWithout))
  }
}

const parseValue = function (valueObj) {
  if (!(valueObj)) return
  var { datatype } = valueObj
  datatype = datatype && datatype.replace('http://www.w3.org/2001/XMLSchema#', '')
  const parser = parsers[valueObj.type] || getDatatypesParsers(datatype)
  return parser(valueObj)
}

const parsers = {
  uri: valueObj => parseUri(valueObj.value),
  // blank nodes will be filtered-out in order to get things simple
  bnode: () => null
}

const numberParser = valueObj => parseFloat(valueObj.value)

const getDatatypesParsers = function (datatype) {
  datatype = datatype && datatype.replace('http://www.w3.org/2001/XMLSchema#', '')
  return datatypesParsers[datatype] || passValue
}

const datatypesParsers = {
  decimal: numberParser,
  integer: numberParser,
  float: numberParser,
  double: numberParser,
  boolean: valueObj => valueObj.value === 'true'
}

// return the raw value if the datatype is missing
const passValue = valueObj => valueObj.value

const parseUri = function (uri) {
  return uri
  .replace('http://www.wikidata.org/entity/', '')
  .replace('http://www.wikidata.org/prop/direct/', '')
}

const identifyVars = function (vars) {
  const varsWithLabel = []
  const varsWithoutLabel = []

  for (let varName of vars) {
    if (vars.indexOf(`${varName}Label`) > -1) {
      varsWithLabel.push(varName)
    } else if (!(/^\w+Label$/.test(varName))) {
      varsWithoutLabel.push(varName)
    }
    // letting aside `${varName}Label` vars
    // as they will simply be embedded in varName results
  }

  return [ varsWithLabel, varsWithoutLabel ]
}

const getSimplifiedResult = function (varsWithLabel, varsWithout) {
  return function (result) {
    const simplifiedResult = {}
    for (let varName of varsWithLabel) {
      let value = parseValue(result[varName])
      if (value != null) {
        let label = result[`${varName}Label`] && result[`${varName}Label`].value
        simplifiedResult[varName] = { value, label }
      }
    }
    for (let varName of varsWithout) {
      simplifiedResult[varName] = parseValue(result[varName])
    }
    return simplifiedResult
  }
}

},{}],61:[function(require,module,exports){
const simplifyTextAttributes = multivalue => data => {
  return Object.keys(data).reduce(aggregateValues(data, multivalue), {})
}

const aggregateValues = (data, multivalue) => (index, lang) => {
  const obj = data[lang]
  index[lang] = multivalue ? obj.map(getValue) : obj.value
  return index
}

const getValue = obj => obj.value

const singleValue = simplifyTextAttributes(false)

module.exports = {
  labels: singleValue,
  descriptions: singleValue,
  aliases: simplifyTextAttributes(true)
}

},{}],62:[function(require,module,exports){
const { fixedEncodeURIComponent, replaceSpaceByUnderscores, isPlainObject } = require('../utils/utils')
const { isPropertyId } = require('./helpers')
const wikidataBase = 'https://www.wikidata.org/wiki/'
const languages = require('./sitelinks_languages')

const getSitelinkUrl = (site, title) => {
  if (isPlainObject(site)) {
    title = site.title
    site = site.site
  }

  if (!site) throw new Error('missing a site')
  if (!title) throw new Error('missing a title')

  if (site === 'commons') return `https://commons.wikimedia.org/wiki/${title}`
  if (site === 'wikidata') {
    if (isPropertyId(title)) return `${wikidataBase}Property:${title}`
    return `${wikidataBase}${title}`
  }

  const { lang, project } = getSitelinkData(site)
  title = fixedEncodeURIComponent(replaceSpaceByUnderscores(title))
  return `https://${lang}.${project}.org/wiki/${title}`
}

const getSitelinkData = site => {
  if (site === 'commons') return { lang: 'en', project: 'commons' }
  if (site === 'wikidata') return { lang: 'en', project: 'wikidata' }

  const [ lang, projectSuffix, rest ] = site.split('wik')

  // Detecting cases like 'frwikiwiki' that would return [ 'fr', 'i', 'i' ]
  if (rest != null) throw new Error(`invalid sitelink: ${site}`)

  if (languages.indexOf(lang) === -1) {
    throw new Error(`sitelink lang not found: ${lang}`)
  }

  const project = projectsBySuffix[projectSuffix]
  if (!project) throw new Error(`sitelink project not found: ${project}`)

  return { lang, project }
}

const isSitelinkKey = site => {
  try {
    // relies on getSitelinkData validation
    getSitelinkData(site)
    return true
  } catch (err) {
    return false
  }
}

const projectsBySuffix = {
  i: 'wikipedia',
  isource: 'wikisource',
  iquote: 'wikiquote',
  tionary: 'wiktionary',
  ibooks: 'wikibooks',
  iversity: 'wikiversity',
  ivoyage: 'wikivoyage',
  inews: 'wikinews'
}

module.exports = { getSitelinkUrl, getSitelinkData, isSitelinkKey }

},{"../utils/utils":75,"./helpers":54,"./sitelinks_languages":63}],63:[function(require,module,exports){
// Taken from https://www.wikidata.org/w/api.php?action=help&modules=wbgetentities
// sites list, once removed their project suffix and eduplicates
module.exports = [ 'aa', 'ab', 'ace', 'ady', 'af', 'ak', 'als', 'am', 'an', 'ang', 'ar', 'arc', 'arz', 'as', 'ast', 'atj', 'av', 'ay', 'az', 'azb', 'ba', 'bar', 'bat_smg', 'bcl', 'be', 'be_x_old', 'bg', 'bh', 'bi', 'bjn', 'bm', 'bn', 'bo', 'bpy', 'br', 'bs', 'bug', 'bxr', 'ca', 'cbk_zam', 'cdo', 'ce', 'ceb', 'ch', 'cho', 'chr', 'chy', 'ckb', 'co', 'commons', 'cr', 'crh', 'cs', 'csb', 'cu', 'cv', 'cy', 'da', 'de', 'din', 'diq', 'dsb', 'dty', 'dv', 'dz', 'ee', 'el', 'eml', 'en', 'eo', 'es', 'et', 'eu', 'ext', 'fa', 'ff', 'fi', 'fiu_vro', 'fj', 'fo', 'fr', 'frp', 'frr', 'fur', 'fy', 'ga', 'gag', 'gan', 'gd', 'gl', 'glk', 'gn', 'gom', 'got', 'gu', 'gv', 'ha', 'hak', 'haw', 'he', 'hi', 'hif', 'ho', 'hr', 'hsb', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'ilo', 'io', 'is', 'it', 'iu', 'ja', 'jam', 'jbo', 'jv', 'ka', 'kaa', 'kab', 'kbd', 'kbp', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'koi', 'kr', 'krc', 'ks', 'ksh', 'ku', 'kv', 'kw', 'ky', 'la', 'lad', 'lb', 'lbe', 'lez', 'lg', 'li', 'lij', 'lmo', 'ln', 'lo', 'lrc', 'lt', 'ltg', 'lv', 'mai', 'map_bms', 'mdf', 'mediawiki', 'meta', 'mg', 'mh', 'mhr', 'mi', 'min', 'mk', 'ml', 'mn', 'mo', 'mr', 'mrj', 'ms', 'mt', 'mus', 'mwl', 'my', 'myv', 'mzn', 'na', 'nah', 'nap', 'nds', 'nds_nl', 'ne', 'new', 'ng', 'nl', 'nn', 'no', 'nov', 'nrm', 'nso', 'nv', 'ny', 'oc', 'olo', 'om', 'or', 'os', 'pa', 'pag', 'pam', 'pap', 'pcd', 'pdc', 'pfl', 'pi', 'pih', 'pl', 'pms', 'pnb', 'pnt', 'ps', 'pt', 'qu', 'rm', 'rmy', 'rn', 'ro', 'roa_rup', 'roa_tara', 'ru', 'rue', 'rw', 'sa', 'sah', 'sc', 'scn', 'sco', 'sd', 'se', 'sg', 'sh', 'si', 'simple', 'sk', 'sl', 'sm', 'sn', 'so', 'species', 'sq', 'sr', 'srn', 'ss', 'st', 'stq', 'su', 'sv', 'sw', 'szl', 'ta', 'tcy', 'te', 'tet', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tpi', 'tr', 'ts', 'tt', 'tum', 'tw', 'ty', 'tyv', 'udm', 'ug', 'uk', 'ur', 'uz', 've', 'vec', 'vep', 'vi', 'vls', 'vo', 'wa', 'war', 'wo', 'wuu', 'xal', 'xh', 'xmf', 'yi', 'yo', 'za', 'zea', 'zh', 'zh_classical', 'zh_min_nan', 'zh_yue', 'zu' ]

},{}],64:[function(require,module,exports){
module.exports = function (wikidataTime) {
  // Also accept claim datavalue.value objects
  if (typeof wikidataTime === 'object') {
    wikidataTime = wikidataTime.time
  }

  const sign = wikidataTime[0]
  const rest = wikidataTime.slice(1)
  const date = fullDateData(sign, rest)

  if (date.toString() === 'Invalid Date') {
    return parseInvalideDate(sign, rest)
  } else {
    return date
  }
}

const fullDateData = function (sign, rest) {
  return sign === '-' ? negativeDate(rest) : positiveDate(rest)
}

const positiveDate = rest => new Date(rest)
const negativeDate = function (rest) {
  // using ISO8601 expanded notation for negative years: adding 2 leading zeros
  const date = `-00${rest}`
  return new Date(date)
}

const parseInvalideDate = function (sign, rest) {
  // This is probably a date of unsuffisient precision
  // such as 1953-00-00T00:00:00Z, thus invalid
  // It should at least have a year, so let's fallback to ${year}-01-01
  const year = rest.split('T')[0].split('-')[0]
  return fullDateData(sign, year)
}

},{}],65:[function(require,module,exports){
const wdk = module.exports = {}

wdk.searchEntities = require('./queries/search_entities')
wdk.getEntities = require('./queries/get_entities')
wdk.getManyEntities = require('./queries/get_many_entities')
wdk.getWikidataIdsFromSitelinks = require('./queries/get_wikidata_ids_from_sitelinks')
wdk.sparqlQuery = require('./queries/sparql_query')
wdk.getReverseClaims = require('./queries/get_reverse_claims')
wdk.getRevisions = require('./queries/get_revisions')

wdk.parse = require('./helpers/parse_responses')

const claimsSimplifiers = require('./helpers/simplify_claims')
const simplifySparqlResults = require('./helpers/simplify_sparql_results')

wdk.simplify = require('../lib/helpers/simplify_text_attributes')
wdk.simplify.entity = require('../lib/helpers/simplify_entity')
wdk.simplify.claim = claimsSimplifiers.simplifyClaim
wdk.simplify.propertyClaims = claimsSimplifiers.simplifyPropertyClaims
wdk.simplify.claims = claimsSimplifiers.simplifyClaims
wdk.simplify.sitelinks = require('../lib/helpers/simplify_sitelinks')
wdk.simplify.sparqlResults = simplifySparqlResults

// Legacy
wdk.simplifySparqlResults = require('./helpers/simplify_sparql_results')
Object.assign(wdk, claimsSimplifiers)

// Aliases
wdk.getWikidataIdsFromWikipediaTitles = wdk.getWikidataIdsFromSitelinks

const helpers = require('../lib/helpers/helpers')
const sitelinksHelpers = require('../lib/helpers/sitelinks_helpers')
Object.assign(wdk, helpers, sitelinksHelpers)

},{"../lib/helpers/helpers":54,"../lib/helpers/simplify_entity":58,"../lib/helpers/simplify_sitelinks":59,"../lib/helpers/simplify_text_attributes":61,"../lib/helpers/sitelinks_helpers":62,"./helpers/parse_responses":56,"./helpers/simplify_claims":57,"./helpers/simplify_sparql_results":60,"./queries/get_entities":66,"./queries/get_many_entities":67,"./queries/get_reverse_claims":68,"./queries/get_revisions":69,"./queries/get_wikidata_ids_from_sitelinks":70,"./queries/search_entities":71,"./queries/sparql_query":72}],66:[function(require,module,exports){
const buildUrl = require('../utils/build_url')
const { isPlainObject, forceArray, shortLang } = require('../utils/utils')

module.exports = function (ids, languages, props, format) {
  // Polymorphism: arguments can be passed as an object keys
  if (isPlainObject(ids)) {
    ({ ids, languages, props, format } = ids)
  }

  format = format || 'json'

  // ids can't be let empty
  if (!(ids && ids.length > 0)) throw new Error('no id provided')

  // Allow to pass ids as a single string
  ids = forceArray(ids)

  if (ids.length > 50) {
    console.warn(`getEntities accepts 50 ids max to match Wikidata API limitations:
      this request won't get all the desired entities.
      You can use getManyEntities instead to generate several request urls
      to work around this limitation`)
  }

  // Properties can be either one property as a string
  // or an array or properties;
  // either case me just want to deal with arrays

  const query = {
    action: 'wbgetentities',
    ids: ids.join('|'),
    format
  }

  if (languages) {
    languages = forceArray(languages).map(shortLang)
    query.languages = languages.join('|')
  }

  if (props && props.length > 0) query.props = forceArray(props).join('|')

  return buildUrl(query)
}

},{"../utils/build_url":73,"../utils/utils":75}],67:[function(require,module,exports){
const getEntities = require('./get_entities')
const { isPlainObject } = require('../utils/utils')

module.exports = function (ids, languages, props, format) {
  // Polymorphism: arguments can be passed as an object keys
  if (isPlainObject(ids)) {
    ({ ids, languages, props, format } = ids)
  }

  if (!(ids instanceof Array)) throw new Error('getManyEntities expects an array of ids')

  return getIdsGroups(ids)
  .map(idsGroup => getEntities(idsGroup, languages, props, format))
}

const getIdsGroups = function (ids) {
  const groups = []
  while (ids.length > 0) {
    let group = ids.slice(0, 50)
    ids = ids.slice(50)
    groups.push(group)
  }
  return groups
}

},{"../utils/utils":75,"./get_entities":66}],68:[function(require,module,exports){
const helpers = require('../helpers/helpers')
const sparqlQuery = require('./sparql_query')
// Fiter-out properties. Can't be filtered by
// `?subject a wikibase:Item`, as those triples are omitted
// https://www.mediawiki.org/wiki/Wikibase/Indexing/RDF_Dump_Format#WDQS_data_differences
const itemsOnly = 'FILTER NOT EXISTS { ?subject rdf:type wikibase:Property . } '

module.exports = function (property, value, options = {}) {
  var { limit, caseInsensitive, keepProperties } = options
  limit = limit || 1000
  const sparqlFn = caseInsensitive ? caseInsensitiveValueQuery : directValueQuery
  const valueString = getValueString(value)
  const filter = keepProperties ? '' : itemsOnly

  // Allow to request values for several properties at once
  if (property instanceof Array) {
    property = property.map(prefixifyProperty).join('|')
  } else {
    property = prefixifyProperty(property)
  }

  const sparql = sparqlFn(property, valueString, filter, limit)
  return sparqlQuery(sparql)
}

function getValueString (value) {
  if (helpers.isItemId(value)) {
    value = `wd:${value}`
  } else if (typeof value === 'string') {
    value = `'${value}'`
  }
  return value
}

function directValueQuery (property, value, filter, limit) {
  return `SELECT DISTINCT ?subject WHERE {
    ?subject ${property} ${value} .
    ${filter}
  }
  LIMIT ${limit}`
}

// Discussion on how to make this query optimal:
// http://stackoverflow.com/q/43073266/3324977
function caseInsensitiveValueQuery (property, value, filter, limit) {
  return `SELECT DISTINCT ?subject WHERE {
    ?subject ${property} ?value .
    FILTER (lcase(?value) = ${value.toLowerCase()})
    ${filter}
  }
  LIMIT ${limit}`
}

const prefixifyProperty = property => 'wdt:' + property

},{"../helpers/helpers":54,"./sparql_query":72}],69:[function(require,module,exports){
const buildUrl = require('../utils/build_url')
const { forceArray } = require('../utils/utils')

module.exports = function (ids, options = {}) {
  ids = forceArray(ids)
  const uniqueId = ids.length === 1
  const query = {
    action: 'query',
    prop: 'revisions'
  }
  query.titles = ids.join('|')
  query.format = options.format || 'json'
  if (uniqueId) query.rvlimit = options.limit || 'max'
  if (uniqueId && options.start) query.rvstart = getEpochSeconds(options.start)
  if (uniqueId && options.end) query.rvend = getEpochSeconds(options.end)
  return buildUrl(query)
}

const getEpochSeconds = function (date) {
  // Return already formatted epoch seconds:
  // if a date in milliseconds appear to be earlier than 2000-01-01, that's probably
  // already seconds actually
  if (typeof date === 'number' && date < earliestPointInMs) return date
  return Math.trunc(new Date(date).getTime() / 1000)
}

const earliestPointInMs = new Date('2000-01-01').getTime()

},{"../utils/build_url":73,"../utils/utils":75}],70:[function(require,module,exports){
const buildUrl = require('../utils/build_url')
const { isPlainObject, forceArray, shortLang } = require('../utils/utils')

module.exports = function (titles, sites, languages, props, format) {
  // polymorphism: arguments can be passed as an object keys
  if (isPlainObject(titles)) {
    // Not using destructuring assigment there as it messes with both babel and standard
    const params = titles
    titles = params.titles
    sites = params.sites
    languages = params.languages
    props = params.props
    format = params.format
  }

  format = format || 'json'

  // titles cant be let empty
  if (!(titles && titles.length > 0)) throw new Error('no title provided')
  // default to the English Wikipedia
  if (!(sites && sites.length > 0)) sites = [ 'enwiki' ]

  // Properties can be either one property as a string
  // or an array or properties;
  // either case me just want to deal with arrays
  titles = forceArray(titles)
  sites = forceArray(sites).map(parseSite)
  props = forceArray(props)

  const query = {
    action: 'wbgetentities',
    titles: titles.join('|'),
    sites: sites.join('|'),
    format: format
  }

  // Normalizing only works if there is only one site and title
  if (sites.length === 1 && titles.length === 1) {
    query.normalize = true
  }

  if (languages) {
    languages = forceArray(languages).map(shortLang)
    query.languages = languages.join('|')
  }

  if (props && props.length > 0) query.props = props.join('|')

  return buildUrl(query)
}

// convert 2 letters language code to Wikipedia sitelinks code
const parseSite = site => site.length === 2 ? `${site}wiki` : site

},{"../utils/build_url":73,"../utils/utils":75}],71:[function(require,module,exports){
const buildUrl = require('../utils/build_url')
const { isPlainObject } = require('../utils/utils')

module.exports = function (search, language, limit, format, uselang) {
  // polymorphism: arguments can be passed as an object keys
  if (isPlainObject(search)) {
    // Not using destructuring assigment there as it messes with both babel and standard
    const params = search
    search = params.search
    language = params.language
    limit = params.limit
    format = params.format
    uselang = params.uselang
  }

  if (!(search && search.length > 0)) throw new Error("search can't be empty")

  language = language || 'en'
  uselang = uselang || language
  limit = limit || '20'
  format = format || 'json'

  return buildUrl({
    action: 'wbsearchentities',
    search: search,
    language: language,
    limit: limit,
    format: format,
    uselang: uselang
  })
}

},{"../utils/build_url":73,"../utils/utils":75}],72:[function(require,module,exports){
const { fixedEncodeURIComponent } = require('../utils/utils')

module.exports = function (sparql) {
  const query = fixedEncodeURIComponent(sparql)
  return `https://query.wikidata.org/sparql?format=json&query=${query}`
}

},{"../utils/utils":75}],73:[function(require,module,exports){
const wikidataApiRoot = 'https://www.wikidata.org/w/api.php'
const isBrowser = typeof location !== 'undefined' && typeof document !== 'undefined'
const qs = isBrowser ? require('./querystring_lite') : require('querystring')

module.exports = function (queryObj) {
  // Request CORS headers if the request is made from a browser
  // See https://www.wikidata.org/w/api.php ('origin' parameter)
  if (isBrowser) queryObj.origin = '*'
  return wikidataApiRoot + '?' + qs.stringify(queryObj)
}

},{"./querystring_lite":74,"querystring":3}],74:[function(require,module,exports){
module.exports = {
  stringify: function (queryObj) {
    var qstring = ''
    for (let key in queryObj) {
      let value = queryObj[key]
      if (value) qstring += `&${key}=${value}`
    }

    qstring = qstring.slice(1)

    // encodeURI should be accessible in a browser environment
    // otherwise if neither node.js querystring nor encodeURI
    // are accessible, just return the string
    if (encodeURI) return encodeURI(qstring)
    return qstring
  }
}

},{}],75:[function(require,module,exports){
module.exports = {
  // Ex: keep only 'fr' in 'fr_FR'
  shortLang: language => language.toLowerCase().split(/[^a-z]/)[0],

  // a polymorphism helper:
  // accept either a string or an array and return an array
  forceArray: function (array) {
    if (typeof array === 'string') array = [ array ]
    return array || []
  },

  // simplistic implementation to filter-out arrays
  isPlainObject: function (obj) {
    if (!obj || typeof obj !== 'object' || obj instanceof Array) return false
    return true
  },

  // encodeURIComponent ignores !, ', (, ), and *
  // cf https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#Description
  fixedEncodeURIComponent: function (str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, encodeCharacter)
  },

  replaceSpaceByUnderscores: str => str.replace(/\s/g, '_'),

  uniq: array => Array.from(new Set(array))
}

const encodeCharacter = char => '%' + char.charCodeAt(0).toString(16)

},{}],76:[function(require,module,exports){
const EntityValues = require("./EntityValues");
class Dictionary {
	constructor() {
	}
	static __isTransient() {
		return false;
	}
	static __getClass() {
		return "ca.sharcnet.dh.nerve.Dictionary";
	}
	static __isEnum() {
		return false;
	}
	addEntity(value) {
		return this.__jjjWebsocket.methodRequest(this, "addEntity", arguments);
	}
	deleteEntity(value) {
		return this.__jjjWebsocket.methodRequest(this, "deleteEntity", arguments);
	}
	lookup(text, lemma, tag, source) {
		return this.__jjjWebsocket.methodRequest(this, "lookup", arguments);
	}
	getEntities(entity) {
		return this.__jjjWebsocket.methodRequest(this, "getEntities", arguments);
	}
	lookupCollection(values) {
		return this.__jjjWebsocket.methodRequest(this, "lookupCollection", arguments);
	}
	pollEntity(entity) {
		return this.__jjjWebsocket.methodRequest(this, "pollEntity", arguments);
	}
};

if (typeof module !== "undefined") module.exports = Dictionary;
},{"./EntityValues":78}],77:[function(require,module,exports){
class EncodeResponse {
	constructor() {
	}
	static __isTransient() {
		return false;
	}
	static __getClass() {
		return "ca.sharcnet.dh.nerve.EncodeResponse";
	}
	static __isEnum() {
		return false;
	}
	setFilename(filename) {
		this.filename = filename;
	}
};

if (typeof module !== "undefined") module.exports = EncodeResponse;
},{}],78:[function(require,module,exports){
class EntityValues {
	constructor(entity, lemma, link, tag, collection) {
		this.entityValue = null;
		this.lemmaValue = null;
		this.linkValue = null;
		this.tagValue = null;
		this.datasourceValue = null;
		this.entityValue = entity;
		this.lemmaValue = lemma;
		this.linkValue = link;
		this.tagValue = tag;
		this.datasourceValue = collection;
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.sharcnet.dh.nerve.EntityValues";
	}
	static __isEnum() {
		return false;
	}
	static extract(entity) {
		
		let text = $(entity).text();
		let lemma = $(entity).lemma();
		let link = $(entity).link();
		let tag = $(entity).tag();
		let collection = $(entity).attr("data-collection");
		if (!collection) collection = "";
		return new EntityValues(text, lemma, link, tag, collection);
	}
	copyTo(dest) {
		
		if (this.text() !== null) dest.text(this.text());
		if (this.lemma() !== null) dest.lemma(this.lemma());
		if (this.link() !== null) dest.link(this.link());
		if (this.tag() !== null) dest.tag(this.tag());
		if (this.collection() !== null) dest.collection(this.text());
		
		return this;
	}
	copy() {
		return new EntityValues(this.text(), this.lemma(), this.link(), this.tag(), this.datasource());
	}
	text(value) {
		
		if (typeof value === "undefined") return this.entityValue;
		
		this.entityValue = value;
		return this.entityValue;
	}
	lemma(value) {
		
		if (typeof value === "undefined") return this.lemmaValue;
		
		this.lemmaValue = value;
		return this.lemmaValue;
	}
	link(value) {
		
		if (typeof value === "undefined") return this.linkValue;
		
		this.linkValue = value;
		return this.linkValue;
	}
	tag(value) {
		
		if (typeof value === "undefined") return this.tagValue;
		
		this.tagValue = value;
		return this.tagValue;
	}
	datasource(value) {
		
		if (typeof value === "undefined") return this.datasourceValue;
		
		this.datasourceValue = value;
		return this.datasourceValue;
	}
};

if (typeof module !== "undefined") module.exports = EntityValues;
},{}],79:[function(require,module,exports){
const ProgressMonitor = require("./ProgressMonitor");
const Dictionary = require("./Dictionary");
const Scriber = require("./Scriber");
class NerveRoot {
	constructor() {
	}
	static __isTransient() {
		return false;
	}
	static __getClass() {
		return "ca.sharcnet.dh.nerve.NerveRoot";
	}
	static __isEnum() {
		return false;
	}
	getScriber() {
		return this.scriber;
	}
	getDictionary() {
		return this.dictionary;
	}
	getProgressMonitor() {
		return this.progressMonitor;
	}
};

if (typeof module !== "undefined") module.exports = NerveRoot;
},{"./Dictionary":76,"./ProgressMonitor":80,"./Scriber":81}],80:[function(require,module,exports){
class ProgressMonitor extends require('../mvc/model/AbstractModel') {
	constructor() {
		super();
	}
	static __isTransient() {
		return false;
	}
	static __getClass() {
		return "ca.sharcnet.dh.nerve.ProgressMonitor";
	}
	static __isEnum() {
		return false;
	}
	notifyProgress(pp) {
		
		this.notifyListeners("notifyProgress", pp);
	}
};

if (typeof module !== "undefined") module.exports = ProgressMonitor;
},{"../mvc/model/AbstractModel":91}],81:[function(require,module,exports){
const EncodeResponse = require("./EncodeResponse");
class Scriber {
	constructor() {
	}
	static __isTransient() {
		return false;
	}
	static __getClass() {
		return "ca.sharcnet.dh.nerve.Scriber";
	}
	static __isEnum() {
		return false;
	}
	link(source) {
		return this.__jjjWebsocket.methodRequest(this, "link", arguments);
	}
	encode(source) {
		return this.__jjjWebsocket.methodRequest(this, "encode", arguments);
	}
	tag(source) {
		return this.__jjjWebsocket.methodRequest(this, "tag", arguments);
	}
	edit(source) {
		return this.__jjjWebsocket.methodRequest(this, "edit", arguments);
	}
	decode(source) {
		return this.__jjjWebsocket.methodRequest(this, "decode", arguments);
	}
	getContext(contextFileName) {
		return this.__jjjWebsocket.methodRequest(this, "getContext", arguments);
	}
};

if (typeof module !== "undefined") module.exports = Scriber;
},{"./EncodeResponse":77}],82:[function(require,module,exports){
let package = {};
package.ProgressMonitor = require("./ProgressMonitor");
package.Dictionary = require("./Dictionary");
package.EncodeResponse = require("./EncodeResponse");
package.EntityValues = require("./EntityValues");
package.NerveRoot = require("./NerveRoot");
package.Scriber = require("./Scriber");

if (typeof module !== "undefined") module.exports = package;
},{"./Dictionary":76,"./EncodeResponse":77,"./EntityValues":78,"./NerveRoot":79,"./ProgressMonitor":80,"./Scriber":81}],83:[function(require,module,exports){
const View = require("./mvc/view/View");
const EntityDialog = require("./mvc/EntityDialog");
const EnityPanelWidget = require("./mvc/EnityPanelWidget");
const Menu = require("./mvc/menu/Menu");

const DragDropHandler = require("./mvc/model/DragDropHandler");
const MessageHandler = require("./mvc/messageHandler");
const CWRCDialogModel = require("./mvc/CWRCDialogModel");
const Model = require("./mvc/model/Model");
const HostInfo = require("./util/hostinfo");

const TaggedEntityWidget = require("./mvc/model/TaggedEntityWidget");

const lemmaDialog = require("./mvc/lemmaDialog");
const nerve = require("./gen/nerve");
const AbstractModel = require("./mvc/model/AbstractModel");

window.jjjrmi = require("jjjrmi");

$(window).on('load', async function () {
    console.log("Initializing main");

    jjjrmi.JJJRMISocket.flags.CONNECT = true;
    jjjrmi.JJJRMISocket.flags.RECEIVED = true;
    jjjrmi.JJJRMISocket.flags.SENT = true;

    jjjrmi.JJJRMISocket.registerPackage(require("nerscriber"));
    jjjrmi.JJJRMISocket.registerPackage(require("jjjsql"));
    jjjrmi.JJJRMISocket.registerPackage(nerve);

    window.main = new Main();
    await main.initialize();

    console.log("... main init complete");
});

class Main extends AbstractModel {
    constructor() {
        super();
        this.model = null;
        this.view = null;
    }
    async initialize() {
        this.dragDropHandler = new DragDropHandler();
        
        /* --- USER INTERACTION & DOCUMENT MODEL --- */
        this.model = new Model(this.dragDropHandler);
        this.view = new View();
        this.cwrc = new CWRCDialogModel();        
        this.view.setThrobberMessage("Loading...");
        this.view.showThrobber(true, 1.0);
        
        this.model.addListener(this.view);
        this.model.addListener(new MessageHandler($("#userMessage")));
        this.model.addListener(this.cwrc);
        this.model.addListener($.fn.xmlAttr);
        
        /* --- LEMMA DIALOG (LHS) --- */
        this.lemmaDialogModel = new lemmaDialog.LemmaDialogModel(this.dragDropHandler);
        this.lemmaDialogController = new lemmaDialog.LemmaDialogController(this.lemmaDialogModel);
        this.lemmaDialogView = new lemmaDialog.LemmaDialogView();
        this.lemmaDialogModel.addListener(this.lemmaDialogView);

        /* --- ENTITY PANEL (middle) --- */
        this.entityPanelWidget = new EnityPanelWidget();

        /* --- ENTITY DIALOG (RHS) --- */
        this.entityDialog = new EntityDialog();        

        /* --- MENU (top) --- */
        this.menu = new Menu();
        
        /* SETUP ALL CROSS LISTENERS (order may matter) */
        this.model.addListener(this.lemmaDialogView);        
        this.model.addListener(this.entityPanelWidget);
        this.model.addListener(this.entityDialog);
        this.model.addListener(this.lemmaDialogController); 
        
        this.entityPanelWidget.addListener(this.model);
        this.lemmaDialogModel.addListener(this.entityPanelWidget);    
        
        this.entityDialog.addListener(this.lemmaDialogController);
        this.entityDialog.addListener(this.entityPanelWidget);
        this.entityDialog.addListener(this.model);
        this.entityDialog.addListener(this.cwrc);
        
        this.entityPanelWidget.addListener(this.entityDialog);

        this.cwrc.addListener(this.entityPanelWidget);
        this.cwrc.addListener(this.entityDialog);        

        this.menu.addListener(this.view);
        this.menu.addListener(this.model);
        this.menu.addListener(this.entityPanelWidget);            
        
        /* --- CONNECT SOCKET AND EXTRANEOUS SETUP --- */
//        let hostInfo = new HostInfo();
        this.rootSocket = new jjjrmi.JJJRMISocket("NerveSocket");   
        this.rootObject = await this.rootSocket.connect();
//        this.rootObject = await this.rootSocket.connect(hostInfo.rootSocketAddress);
        this.scriber = this.rootObject.scriber;
        this.model.setScriber(this.scriber);

        this.rootObject.getProgressMonitor().addListener(this.view);

        await this.model.init(this.rootObject.dictionary);
        this.view.showThrobber(false);
        
        TaggedEntityWidget.contextMenu.setDictionary(this.rootObject.dictionary);     
        
        this.entityPanelWidget.addListener(TaggedEntityWidget.contextMenu);
        this.addListener(TaggedEntityWidget.contextMenu);
        this.addListener(this.entityDialog);
        
        this.notifyListeners("notifyReady");
    }
}
},{"./gen/nerve":82,"./mvc/CWRCDialogModel":84,"./mvc/EnityPanelWidget":85,"./mvc/EntityDialog":86,"./mvc/lemmaDialog":88,"./mvc/menu/Menu":89,"./mvc/messageHandler":90,"./mvc/model/AbstractModel":91,"./mvc/model/DragDropHandler":93,"./mvc/model/Model":94,"./mvc/model/TaggedEntityWidget":95,"./mvc/view/View":97,"./util/hostinfo":103,"jjjrmi":25,"jjjsql":44,"nerscriber":51}],84:[function(require,module,exports){
const AbstractModel = require("./model/AbstractModel");
const NameSource = require("nerscriber").NameSource;
const EntityValues = require("../gen/EntityValues");

/**
 * Events: notifyCWRCSelection, notifyCWRCCancelled
**/

const nerscriber = require("nerscriber");

class CWRCDialogModel extends AbstractModel{
    constructor(){
        super();

        this.dialogs = require('cwrc-public-entity-dialogs');
        let viaf = require('viaf-entity-lookup');
        let wikidata = require('wikidata-entity-lookup');
        let getty = require('getty-entity-lookup');
        let dbpedia = require('dbpedia-entity-lookup');
        let geonames = require('geonames-entity-lookup');

        this.dialogs.registerEntitySources({
            people: (new Map()).set('viaf', viaf).set('wikidata', wikidata).set('getty', getty).set('dbpedia', dbpedia),
            places: (new Map()).set('viaf', viaf).set('geonames', geonames).set('dbpedia', viaf).set('wikidata', wikidata).set('geocode', viaf).set('dbpedia', dbpedia),
            organizations: (new Map()).set('viaf', viaf).set('dbpedia', viaf).set('wikidata', wikidata).set('dbpedia', dbpedia),
            titles: (new Map()).set('viaf', viaf).set('dbpedia', viaf).set('wikidata', wikidata).set('dbpedia', dbpedia)
        });

        this.queryOptions = {
            query: 'jones',
            success: (result) => console.log(result),
            cancelled: () => console.log('cancelled')
        };
    }

    notifyLoookupEntity(values){
        this.query(values.text(), values);
    }

    notifyLoookupLemma(values){
        this.query(values.lemma(), values);
    }

    notifyContextChange(context){
        this.context = context;
    }

    query(searchTerm, entityValue){
        let tagInfo = this.context.getTagInfo(entityValue.tag(), NameSource.NAME);
        if (tagInfo.getDialogMethod() === "") return;

        this.dialogs[tagInfo.getDialogMethod()]({
            query: searchTerm,
            success: (result) => {
                console.log(result);
                let values = new EntityValues(entityValue.text(), result.name, result.uri, entityValue.tag(), "");
                super.notifyListeners("notifyCWRCSelection", values);
            },
            cancelled: () => {
                super.notifyListeners("notifyCWRCCancelled");
            }
        });
    }

    queryPerson(term){
        this.dialogs.popSearchPerson({
            query: term,
            success: (result) => {
                super.notifyListeners("notifyCWRCSelection", result);
            },
            cancelled: () => {
                super.notifyListeners("notifyCWRCCancelled");
            }
        });
    }
}

module.exports = CWRCDialogModel;
},{"../gen/EntityValues":78,"./model/AbstractModel":91,"cwrc-public-entity-dialogs":17,"dbpedia-entity-lookup":18,"geonames-entity-lookup":19,"getty-entity-lookup":20,"nerscriber":51,"viaf-entity-lookup":52,"wikidata-entity-lookup":53}],85:[function(require,module,exports){
const ArrayList = require("jjjrmi").ArrayList;
const Collection = require("./model/Collection");

class EnityPanelWidget extends AbstractModel {

    constructor() {
        super();
        this.lemmaWidget = null;
        this.index = -1;
        this.context = null;
        this.selectedCategories = new Map();
        this.taggedEntities = new ArrayList(); /* a list of all tagged entities in the document */
        this.selectedEntities = new Collection();
        this.selectedEntities.setDelegate(this);
        this.addListener(this);
        
        /* Default Document Click Event */
        $("#entityPanel").click((event) => {
            if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
                this.notifyListeners("notifyDocumentClick");
            }
        });        
    }

    __emptyCollection() {
        for (let collectionEntity of this.selectedEntities) {
            collectionEntity.highlight(false);
        }
        this.selectedEntities.clear();
    }

    notifyCWRCSelection(values){
        for (let taggedEntityWidget of this.selectedEntities) {
            taggedEntityWidget.values(values);
        }
    }

    notifyDialogChange(fieldID, value) {
        for (let taggedEntityWidget of this.selectedEntities) {
            switch (fieldID) {
                case "entityText":
                    taggedEntityWidget.text(value);
                    break;
                case "lemma":
                    taggedEntityWidget.lemma(value);
                    break;
                case "link":
                    taggedEntityWidget.link(value);
                    break;
                case "tagName":
                    taggedEntityWidget.tag(value);
                    break;
            }
        }
    }

    requestUntagAll() {
        if (this.selectedEntities.isEmpty()) return 0;
        for (let taggedEntityWidget of this.selectedEntities) {
            taggedEntityWidget.untag();
        }
        this.selectedEntities.clear();
    }

    notifyClickLemmaWidget(lemmaWidget, double, control, shift, alt) {
        if (!control) this.__emptyCollection();

        for (let taggedEntity of this.taggedEntities) {
            if (taggedEntity.lemma() !== lemmaWidget.getLemma()) continue;
            if (taggedEntity.tag() !== lemmaWidget.getCategory()) continue;
            this.selectedEntities.add(taggedEntity);
            taggedEntity.highlight(true);
        }
    }

    notifyDocumentClick() {
        this.__emptyCollection();
    }

    notifyTaggedEntityClick(taggedEntity, double, control, shift, alt) {
        if (double) {
            window.alert("TODO: select like entities by lemma");
        } else if (control && !this.selectedEntities.contains(taggedEntity)) {
            this.selectedEntities.add(taggedEntity);
            taggedEntity.highlight(true);
        } else if (control && this.selectedEntities.contains(taggedEntity)) {
            this.selectedEntities.remove(taggedEntity);
            taggedEntity.highlight(false);
        } else {
            this.__emptyCollection();
            this.selectedEntities.add(taggedEntity);
            taggedEntity.highlight(true);
        }
    }

    notifyContextChange(context) {
        this.context = context;
        this.selectedCategories = new Map();
    }

    notifyNewTaggedEntities(taggedEntityWidgetArray) {
        for (let taggedEntityWidget of taggedEntityWidgetArray) {
            let value = this.selectedCategories.has(taggedEntityWidget.tag());
            taggedEntityWidget.setHasBackground(value);
            this.taggedEntities.add(taggedEntityWidget);
        }
    }

    notifyUntaggedEntities(taggedEntityWidgetArray) {
        for (let taggedEntityWidget of taggedEntityWidgetArray) {
            this.taggedEntities.remove(taggedEntityWidget);
        }
    }

    notifySelectCategory(categoryButton) {
        let category = categoryButton.getCategory();
        for (let TaggedEntityWidget of this.taggedEntities) {
            if (TaggedEntityWidget.tag() === category) {
                TaggedEntityWidget.setHasBackground(true);
            }
        }
        this.selectedCategories.set(category, category);
    }

    notifyUnselectCategory(categoryButton) {
        let category = categoryButton.getCategory();
        for (let TaggedEntityWidget of this.taggedEntities) {
            if (TaggedEntityWidget.tag() === category) {
                TaggedEntityWidget.setHasBackground(false);
            }
        }
        this.selectedCategories.delete(category);
    }

    notifyAddCategories(categoryButtonArray) {
        for (let categoryButton of categoryButtonArray) {
            let category = categoryButton.getCategory();
            for (let TaggedEntityWidget of this.taggedEntities) {
                if (TaggedEntityWidget.tag() === category) {
                    TaggedEntityWidget.setHasBackground(true);
                }
            }
            this.selectedCategories.set(category, category);
        }
    }

    notifySelectLemmaWidget(lemmaWidget) {
        this.lemmaWidget = lemmaWidget;
    }
    notifyUnselectLemmaWidget(lemmaWidget) {
        this.lemmaWidget = null;
    }

    notifyReselectLemmaWidget(lemmaWidget) {
        this.index++;
        if (this.index >= lemmaWidget.entities().length) this.index = 0;
        this.scrollTo(lemmaWidget.entities()[this.index]);
    }

    scrollTo(TaggedEntityWidget) {
        let element = TaggedEntityWidget.getElement();

        $("#panelContainer").scrollTop(
                $(element).offset().top - $("#panelContainer").offset().top + $("#panelContainer").scrollTop() - ($("#panelContainer").height() / 2)
                );
    }
}

module.exports = EnityPanelWidget;
},{"./model/Collection":92,"jjjrmi":25}],86:[function(require,module,exports){
const AbstractModel = require("./model/AbstractModel");
const EntityValues = require("../gen/nerve").EntityValues;
const NameSource = require("nerscriber").NameSource;

class EntityTextBox {
    constructor(delegate, selector, dialogStringID) {
        this.delegate = delegate;
        this.update = false;
        
        $(selector).on("input", () => {
            this.update = true;
        });       
        
        $(selector).on("blur", () => {
            if (this.update) {
                this.delegate.notifyListeners("notifyDialogChange", dialogStringID, $(selector).val());
            }
            this.update = false;
        });          
        
        $(selector).keyup((event) => {
            if (event.keyCode !== 13) return;
            this.delegate.notifyListeners("notifyDialogChange", dialogStringID, $(selector).val());
            this.update = false;
            event.stopPropagation();
        });        
    }
}

class EntityListSelector{
    constructor(delegate, selector, dialogStringID) {
        this.delegate = delegate;
        this.dialogStringID = dialogStringID;
        this.selector = selector;
        this.update = false;
        
        $(selector).on("input", (event) => {
            this.delegate.notifyListeners("notifyDialogChange", dialogStringID, $(selector).val());
        });        
    }
    
    setValue(value){
        this.value = value;
    }
    
    ready(){
        this.delegate.notifyListeners("notifyDialogChange", this.dialogStringID, $(this.selector).val());
    }
}

class EntityDialog extends AbstractModel {
    constructor() {
        super();

        new EntityTextBox(this, "#txtEntity", "entityText");
        new EntityTextBox(this, "#txtLemma", "lemma");
        new EntityTextBox(this, "#txtLink", "link");
        this.entitySelctorList = new EntityListSelector(this, "#selectTagName", "tagName");

        $('#txtEntity').textinput();
        $('#searchDialog').textinput();
        $('#txtLemma').textinput();
        $('#txtLink').textinput();
        
        $("#goLink").click((event) => {
            this.goLink();
        });        
        
        $("#entityLookupButton").click((event)=>this.notifyListeners("notifyLoookupEntity", this.getValues()));
        $("#lemmaLookupButton").click((event)=>this.notifyListeners("notifyLoookupLemma", this.getValues()));
    }
    
    notifyReady(){
        this.entitySelctorList.ready();
    }
    
    goLink() {
        let url = $("#txtLink").val();
        if (url.length === 0) return;
        if (!url.startsWith("http") && !url.startsWith("https")) {
            url = "http://" + $("#txtLink").val();
        }
        var win = window.open(url, '_blank');
        win.focus();
    }    
    
    getValues() {
        return new EntityValues($("#txtEntity").val(), $("#txtLemma").val(), $("#txtLink").val(), $("#selectTagName").val());
    }
    notifyContextChange(context) {
        this.context = context;

        /* clear then repopulate the drop down tagName selector */
        let selector = document.getElementById("selectTagName");
        while (selector.hasChildNodes()) {
            selector.removeChild(selector.firstChild);
        }

        for (let tagInfo of this.context.tags()) {
            var opt = document.createElement('option');
            $(opt).val(tagInfo.getName(NameSource.NAME));
            opt.innerHTML = tagInfo.getName(NameSource.NAME);
            selector.appendChild(opt);
        }

        this.__setTagName(this.context.tags().get(0).getName());
    }

    notifyCollectionAdd(collection, TaggedEntityWidget) {
        this.__setDialogs(collection);
    }
    notifyCollectionClear(collection, TaggedEntityWidgets) {
        this.__clearDialogs();
    }
    notifyCollectionRemove(collection, TaggedEntityWidget) {
        if (collection.isEmpty()) this.__clearDialogs();
        this.__setDialogs(collection);
    }

    notifyCWRCSelection(values){
        this.__setEntity(values.text());
        this.__setLemma(values.lemma());
        this.__setLink(values.link());
        this.__setTagName(values.tag());
    }  

    __setDialogs(collection) {
        this.__clearDialogs();
        this.__clearDialogBG();

        let entity = collection.getLast();

        this.__setEntity(entity.text());
        this.__setLemma(entity.lemma());
        this.__setLink(entity.link());
        this.__setTagName(entity.tag());

        let values = this.getValues();

        for (let entity of collection) {
            if (entity.lemma() !== values.lemma()) this.__setDialogBG("lemma");
            if (entity.link() !== values.link()) this.__setDialogBG("link");
            if (entity.text() !== values.text()) this.__setDialogBG("text");
            if (entity.tag() !== values.tag()) this.__setDialogBG("tag");
        }
    }
    
    __clearDialogBG() {
        $("#selectTagName").parent().css("color", "#000000");
        $("#txtEntity").parent().css("background-color", "#ffffff");
        $("#txtLemma").parent().css("background-color", "#ffffff");
        $("#txtLink").parent().css("background-color", "#ffffff");
    }
    
    __setDialogBG(item) {
        switch (item) {
            case "tag":
                $("#selectTagName").parent().css("color", "#ff0000");
                break;
            case "text":
                $("#txtEntity").parent().css("background-color", "#ffcccc");
                break;
            case "lemma":
                $("#txtLemma").parent().css("background-color", "#ffcccc");
                break;
            case "link":
                $("#txtLink").parent().css("background-color", "#ffcccc");
                break;
        }
    }

    __setTagName(string) {
        $("#selectTagName").val(string);
        $("#selectTagName").selectmenu("refresh", true);
    }
    __setEntity(string) {
        document.getElementById("txtEntity").value = string;
    }
    __setLemma(string) {
        document.getElementById("txtLemma").value = string;
    }
    __setLink(string) {
        document.getElementById("txtLink").value = string;
    }

    __clearDialogs() {
        document.getElementById("txtEntity").value = "";
        document.getElementById("txtLemma").value = "";
        document.getElementById("txtLink").value = "";
    }
}

module.exports = EntityDialog;
},{"../gen/nerve":82,"./model/AbstractModel":91,"nerscriber":51}],87:[function(require,module,exports){

class ShowHTMLWidget{
    
    constructor(taggedEntityWidget){
        this.modal = $("#ShowHTMLWidget");
        let taggedEntityElement = taggedEntityWidget.getElement();
        let html = taggedEntityElement.outerHTML;        
        while(html.indexOf("&quot;") !== -1){ 
            html = html.replace("&quot;", "\"");
        }
        $(this.modal).find("[data-widget-id='html-contents']").text(html);
    }    
    
    show(){
        $(this.modal).modal("show");
    }
}

module.exports = ShowHTMLWidget;
},{}],88:[function(require,module,exports){
/**
 * Events:
 * notifyAddCategories(CategoryButton)
 * notifyClearCategories(CategoryButton)
 * notifySelectCategory(CategoryButton)
 * notifyUnselectCategory(CategoryButton)
 * notifyAddLemmas(LemmaWidget)
 * notifyRemoveLemmas(LemmaWidget)
 * notifyUpdateLemma(LemmaWidget)
 * notifyAddEntity(LemmaWidget, TaggedEntityWidget)
 * notifyRemoveEntity(LemmaWidget, TaggedEntityWidget)
 * notifyClickLemmaWidget(LemmaWidget)
 * notifyUnselectLemmaWidget(LemmaWidget)
 * notifyReselectLemmaWidget(LemmaWidget)
 */

const AbstractModel = require("./model/AbstractModel");
const nerscriber = require("nerscriber");
const ArrayList = require("jjjrmi").ArrayList;

/**
 * A LemmaWidget is created for every unique lemma value in the document.
 */
class LemmaWidget {
    constructor(lemma, category, delegate, dragDropHandler) {
        Utility.log(LemmaWidget, "constructor");

        this.lemma = lemma;
        this.category = category;
        this.taggedEntities = new ArrayList();

        this.dragDropHandler = dragDropHandler;
        this.element = $(document.createElement("button"));
        this.element.addClass("btn");
        this.element.addClass("btn-primary");
        this.element.text(lemma + " : " + category);

        $(this.element).attr("draggable", "true");
        $(this.element).on("dragstart", (event) => this.dragstart(event));
        $(this.element).on("dragover", (event) => this.dragover(event));
        $(this.element).on("drop", (event) => this.drop(event));

        $(this.element).click((event) => {
            delegate.notifyListeners("notifyClickLemmaWidget", this, false, event.ctrlKey, event.shiftKey, event.altKey);
        });
        $(this.element).dblclick((event) => {
            delegate.notifyListeners("notifyClickLemmaWidget", this, true, event.ctrlKey, event.shiftKey, event.altKey);
        });
    }
    drop(event) {
        if (this.dragDropHandler.hasData("lemmaWidget")) {
            let src = this.dragDropHandler.deleteData("lemmaWidget");
            for (let entity of src.taggedEntities) {
                entity.lemma(this.lemma);
                entity.tag(this.category);
            }
        } else if (this.dragDropHandler.hasData("TaggedEntityWidget")) {
            let src = this.dragDropHandler.deleteData("TaggedEntityWidget");
            src.lemma(this.lemma);
            src.tag(this.category);
        }
    }
    dragover(event) {
        if (this.dragDropHandler.hasData("lemmaWidget")) {
            event.originalEvent.preventDefault();
        } else if (this.dragDropHandler.hasData("TaggedEntityWidget")) {
            event.originalEvent.preventDefault();
        }
    }
    dragstart(event) {
        this.dragDropHandler.setData("lemmaWidget", this);
    }
    getCategory() {
        return this.category;
    }
    getLemma() {
        return this.lemma;
    }
    hide() {
        $(this.element).hide();
    }
    show() {
        $(this.element).show();
    }
    detach() {
        $(this.element).detach();
    }
    appendTo(target) {
        $(target).append(this.element);
    }
    active(value) {
        if (value === undefined) return $(this.element).hasClass("highlight");
        else if (value) $(this.element).addClass("highlight");
        else $(this.element).removeClass("highlight");
    }

    addEntity(taggedEntityWidget) {
        if (this.taggedEntities.contains(taggedEntityWidget)) return false;
        this.taggedEntities.add(taggedEntityWidget);
        return true;
    }
    removeEntity(taggedEntityWidget) {
        if (!this.taggedEntities.contains(taggedEntityWidget)) return false;
        this.taggedEntities.remove(taggedEntityWidget);
        return true;
    }
    entityCount() {
        return this.taggedEntities.size();
    }
}

class CategoryButton {
    constructor(text, category, lemmaDialogModel) {
        this.category = category;
        this.element = $(document.createElement("button"));
        this.element.addClass("btn");
        this.element.addClass("btn-primary");
        this.element.addClass("active");
        this.element.text(text);

        $(this.element).mouseup(() => {
            lemmaDialogModel.toggleCategory(this);
        });
        $(this.element).dblclick(() => {
            lemmaDialogModel.selectNoCategories();
            lemmaDialogModel.selectCategory(this);
        });
    }
    getCategory() {
        return this.category;
    }
    active(value) {
        if (value === undefined) return $(this.element).hasClass("active");
        else if (value) $(this.element).addClass("active");
        else $(this.element).removeClass("active");
    }
    detach() {
        $(this.element).detach();
    }
    appendTo(target) {
        $(target).append(this.element);
    }
}

/**
 * Listens for event triggers that will manipulate lemma dialog model.
 */
class LemmaDialogController {
    constructor(lemmaDialogModel) {
        this.lemmaDialogModel = lemmaDialogModel;
        this.taggedEntityList = new ArrayList();
    }

    /* event from Model */
    notifyUnsetDocument() {
        let lemmaWidgetArray = [];
        for (let taggedEntityWidget of this.taggedEntityList) {
            let lemmaWidget = this.lemmaDialogModel.getWidget(taggedEntityWidget.lemma(), taggedEntityWidget.tag());
            lemmaWidgetArray.push(lemmaWidget);
            lemmaWidget.removeEntity(taggedEntityWidget);

            if (lemmaWidget.entityCount() === 0) {
                this.lemmaDialogModel.removeWidget(taggedEntityWidget.lemma(), taggedEntityWidget.tag());
            }
        }
        this.lemmaDialogModel.notifyListeners("notifyRemoveLemmas", lemmaWidgetArray);
    }

    async notifyEntityUpdate(taggedEntityWidget, oldValues) {
        let lemmaWidget = this.lemmaDialogModel.addWidget(taggedEntityWidget.lemma(), taggedEntityWidget.tag());
        this.lemmaDialogModel.notifyListeners("notifyAddLemmas", [lemmaWidget]);

        let oldLemma = taggedEntityWidget.lemma();
        let oldTag = taggedEntityWidget.tag();
        if (oldValues.lemma() !== null) oldLemma = oldValues.lemma();
        if (oldValues.tag() !== null) oldTag = oldValues.tag();

        let oldLemmaWidget = this.lemmaDialogModel.getWidget(oldLemma, oldTag);
        let newLemmaWidget = this.lemmaDialogModel.getWidget(taggedEntityWidget.lemma(), taggedEntityWidget.tag());
        oldLemmaWidget.removeEntity(taggedEntityWidget);
        newLemmaWidget.addEntity(taggedEntityWidget);
        
        if (oldLemmaWidget.entityCount() === 0){
            let lemmaWidget = this.lemmaDialogModel.removeWidget(oldLemma, oldTag);
            this.lemmaDialogModel.notifyListeners("notifyRemoveLemmas", [lemmaWidget]);
        }
    }

    async notifyNewTaggedEntities(taggedEntityWidgetArray) {
        let lemmaWidgetArray = [];

        for (let taggedEntityWidget of taggedEntityWidgetArray) {
            let lemmaWidget = this.lemmaDialogModel.addWidget(taggedEntityWidget.lemma(), taggedEntityWidget.tag());
            this.taggedEntityList.add(taggedEntityWidget);
            lemmaWidget.addEntity(taggedEntityWidget);
            lemmaWidgetArray.push(lemmaWidget);
        }
        this.lemmaDialogModel.notifyListeners("notifyAddLemmas", lemmaWidgetArray);
    }

    async notifyUntaggedEntities(taggedEntityWidgetArray) {
        let lemmaWidgetArray = [];
        
        for (let taggedEntityWidget of taggedEntityWidgetArray) {
            this.taggedEntityList.remove(taggedEntityWidget);
            let lemmaWidget = this.lemmaDialogModel.getWidget(taggedEntityWidget.lemma(), taggedEntityWidget.tag());

            if (lemmaWidget === null || lemmaWidget === undefined) {
                let error = new Error("Undefined Lemma Widget");
                error.taggedEntityWidget = taggedEntityWidget;
                window.error = error;
                throw error;
            }

            lemmaWidget.removeEntity(taggedEntityWidget);
            if (lemmaWidget.entityCount() === 0) {
                let lemmaWidget = this.lemmaDialogModel.removeWidget(taggedEntityWidget.lemma(), taggedEntityWidget.tag()); 
                lemmaWidgetArray.push(lemmaWidget);
            }
        }
        this.lemmaDialogModel.notifyListeners("notifyRemoveLemmas", lemmaWidgetArray);
    }

    async notifyContextChange(context) {
        this.lemmaDialogModel.clearCategories();
        let tags = context.tags();

        let categoryButtonArray = [];

        for (let tagInfo of tags) {
            let name = tagInfo.getName(nerscriber.NameSource.NAME);
            let categoryButton = this.lemmaDialogModel.addCategory(name);
            categoryButtonArray.push(categoryButton);
        }

        await this.lemmaDialogModel.notifyListeners("notifyAddCategories", categoryButtonArray);
    }
}

/**
 * The LemmaDialogModel generates multiple LemmaWidgets and CategoryButtons
 */
class LemmaDialogModel extends AbstractModel {
    constructor(dragDropHandler) {
        Utility.log(LemmaDialogModel, "constructor");
        super();

        this.dragDropHandler = dragDropHandler;
        this.categories = new Map();
        this.lemmaWidgets = new Map();

        $("#selectAllCategories").mouseup((event) => {
            this.selectAllCategories();
        });

        $("#selectNoCategories").mouseup((event) => {
            this.selectNoCategories();
        });
    }

    hasWidget(lemma, category) {
        Utility.log(LemmaDialogModel, "hasWidget");
        // Utility.enforceTypes(arguments, String, String);

        let key = lemma + ":" + category;
        return this.lemmaWidgets.has(key);
    }

    addWidget(lemma, category) {
        Utility.log(LemmaDialogModel, "addWidget");
        // Utility.enforceTypes(arguments, String, String);

        let key = lemma + ":" + category;
        if (this.lemmaWidgets.has(key)) return this.lemmaWidgets.get(key);
        let lemmaWidget = new LemmaWidget(lemma, category, this, this.dragDropHandler);
        this.lemmaWidgets.set(key, lemmaWidget);

        return lemmaWidget;
    }

    removeWidget(lemma, category) {
        let key = lemma + ":" + category;
        if (!this.lemmaWidgets.has(key)) return;
        let lemmaWidget = this.lemmaWidgets.get(key);
        lemmaWidget.detach();
        this.lemmaWidgets.delete(key);
        return lemmaWidget;
    }

    getWidget(lemma, category) {
        let key = lemma + ":" + category;
        return this.lemmaWidgets.get(key);
    }

    clearCategories() {
        for (let categoryButton of this.categories.values()) {
            categoryButton.detach();
        }
        this.categories.clear();
        this.notifyListeners("notifyClearCategories");
    }

    addCategory(category) {
        Utility.log(LemmaDialogModel, "addCategory");
        // Utility.enforceTypes(arguments, String);

        if (this.categories.has(category)) return;
        let button = new CategoryButton(category, category, this);
        this.categories.set(category, button);
        return button;
    }

    clear() {
        Utility.log(LemmaDialogModel, "clear");
        // Utility.enforceTypes(arguments);

        this.notifyListeners("notifyClearCategories", this.categories.values());
        let lemmaWidgetArray = [];
        for (let lemmaWidget of this.lemmaWidgets.values()) {
            lemmaWidgetArray.push(lemmaWidget);
        }
        this.notifyListeners("notifyRemoveLemmas", lemmaWidgetArray);

        this.categories = new Map();
        this.lemmaWidgets = new Map();
    }

    selectAllCategories() {
        Utility.log(LemmaDialogModel, "selectAllCategories");
        for (let b of this.categories.values()) {
            this.selectCategory(b);
        }
    }
    selectNoCategories() {
        Utility.log(LemmaDialogModel, "selectNoCategories");
        for (let b of this.categories.values()) {
            this.unselectCategory(b);
        }
    }
    selectCategory(categoryButton) {
        Utility.log(LemmaDialogModel, "selectCategory");
        if (!categoryButton.active()) {
            categoryButton.active(true);
            this.notifyListeners("notifySelectCategory", categoryButton);
        }
    }
    unselectCategory(categoryButton) {
        Utility.log(LemmaDialogModel, "unselectCategory");
        if (categoryButton.active()) {
            categoryButton.active(false);
            this.notifyListeners("notifyUnselectCategory", categoryButton);
        }
    }
    toggleCategory(categoryButton) {
        Utility.log(LemmaDialogModel, "toggleCategory");
        // Utility.enforceTypes(arguments, CategoryButton);

        if (!categoryButton.active()) {
            categoryButton.active(true);
            this.notifyListeners("notifySelectCategory", categoryButton);
        } else {
            categoryButton.active(false);
            this.notifyListeners("notifyUnselectCategory", categoryButton);
        }
    }
}

class LemmaDialogView {
    constructor() {
        Utility.log(LemmaDialogView, "constructor");

        this.lemmaWidgets = [];
        this.categoryButtons = new Map();
        this.currentHighlight = null;

        if ($("#lemmaDialog > #buttonArea").length === 0) {
            console.warn("element #lemmaDialog > #buttonArea not found");
            return;
        }

        if ($("#lemmaDialog > #displayArea").length === 0) {
            console.warn("element #displayArea > #buttonArea not found");
            return;
        }

        this.buttonArea = $("#lemmaDialog > #buttonArea");
        this.displayArea = $("#lemmaDialog > #displayArea");

        $(document).ready(() => this.layout());
        $(window).on("resize", () => this.layout());
    }
    layout() {
        Utility.log(LemmaDialogView, "layout");
        let calculatedHeight = `calc(100% - ${this.buttonArea.height() + 25}px)`;
        this.displayArea.height(calculatedHeight);
    }
    notifyClearCategories() {
        Utility.log(LemmaDialogView, "notifyClearCategories");
        for (let categoryButton of this.categoryButtons.values()) {
            categoryButton.detach();
        }
        this.lemmaWidgets = [];
        this.categoryButtons.clear();
        this.layout();
    }
    notifyAddCategories(categoryButtonArray) {
        Utility.log(LemmaDialogView, "notifyAddCategories");
        for (let categoryButton of categoryButtonArray) {
            categoryButton.appendTo(this.buttonArea);
            this.categoryButtons.set(categoryButton.getCategory(), categoryButton);
        }
        this.layout();
    }
    notifyAddLemmas(lemmaWidgetArray) {
        Utility.log(LemmaDialogView, "notifyAddLemmas");

        for (let lemmaWidget of lemmaWidgetArray) {
            lemmaWidget.appendTo(this.displayArea);
            this.lemmaWidgets.push(lemmaWidget);

            if (!this.categoryButtons.has(lemmaWidget.getCategory())) {
                console.warn("category not found: " + lemmaWidget.getCategory());
                return;
            }

            let categoryButton = this.categoryButtons.get(lemmaWidget.getCategory());
            if (categoryButton.active()) lemmaWidget.show();
            else lemmaWidget.hide();
        }

    }
    notifyRemoveLemmas(lemmaWidgetArray) {
        Utility.log(LemmaDialogView, "notifyRemoveLemmas");
        for (let lemmaWidget of lemmaWidgetArray) {
            lemmaWidget.detach();
            let index = this.lemmaWidgets.indexOf(lemmaWidget);
            this.lemmaWidgets.splice(index, 1);
        }
    }
    notifyUnselectCategory(categoryButton) {
        Utility.log(LemmaDialogView, "notifyUnselectCategory");
        for (let widget of this.lemmaWidgets) {
            let category = categoryButton.getCategory();
            if (widget.getCategory() === category) {
                widget.hide();
            }
        }
    }
    notifySelectCategory(categoryButton) {
        Utility.log(LemmaDialogView, "notifySelectCategory");
        for (let widget of this.lemmaWidgets) {
            let category = categoryButton.getCategory();
            if (widget.getCategory() === category) {
                widget.show();
            }
        }
    }

    scrollTo(lemmaWidget) {
        Utility.log(LemmaDialogView, "scrollTo");
        let element = lemmaWidget.element;

        $("#displayArea").scrollTop(
                $(element).offset().top - $("#displayArea").offset().top + $("#displayArea").scrollTop() - ($("#displayArea").height() / 2)
                );
    }
}
;

module.exports = {
    LemmaDialogModel: LemmaDialogModel,
    LemmaDialogController: LemmaDialogController,
    LemmaDialogView: LemmaDialogView
};
},{"./model/AbstractModel":91,"jjjrmi":25,"nerscriber":51}],89:[function(require,module,exports){
/* global Utility */

const AbstractModel = require("../model/AbstractModel");

class Menu extends AbstractModel {
    constructor() {
        super();

        /* file dialog event - related to menu open */
        $("#fileOpenDialog").change(async (event) => {
        });

        /* search events */
//        $("#searchTextArea").keyup((event) => {
//            if (event.keyCode !== 13) return;
//            event.stopPropagation();
//            this.model.getSearchModel().search($("#searchTextArea").val());
//            this.model.getSearchModel().next();
//        });

        /* menu events key events fire these events */
        $("#menuSave").click(async (event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuSave");
        });

        $("#menuOpen").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuOpen", "OPEN"); /* NER & dict */
        });

        $("#menuLink").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuOpen", "LINK"); /* Link (dictionary) only */
        });

        $("#menuNER").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuOpen", "TAG"); /* NER only */
        });

        $("#menuEdit").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuOpen", "EDIT"); /* open no dict, no NER */
        });

        $("#menuClose").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuClose");
        });

        $("#menuTags").click((event) => {
            this.notifyListeners("onMenuTags");
        });

        $("#menuClear").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuClear");
        });

        $("#menuUndo").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuUndo");
        });

        $("#menuRedo").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuRedo");
        });

        $("#menuCopy").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuCopy");
        });

        $("#menuPaste").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuPaste");
        });

        $("#menuTag").click((event) => {
            event.stopPropagation();
            event.preventDefault();
            this.notifyListeners("onMenuTag");
        });

        $("#menuUntag").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuUntag");
        });

        $("#menuMerge").click(async (event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuMerge");
        });

        $("#menuWiki").click((event) => {
            var win = window.open("https://github.com/cwrc/NERVE/wiki", '_blank');
            win.focus();
        });

        /* control delete and backspace this.events */
        document.addEventListener('keydown', function (event) {
            var d = event.srcElement || event.target;
            if (event.keyCode !== 8 && event.keyCode !== 46) return;
            if (
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'TEXT') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'PASSWORD') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'FILE') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'SEARCH') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'EMAIL') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'NUMBER') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'DATE') ||
                    (d.tagName.toUpperCase() === 'TEXTAREA') ||
                    (d.hasAttribute("contenteditable") && d.getAttribute("contenteditable") === "true")
                    ) {
                event.stopPropagation();
                return;
            }

            event.preventDefault();
        }, true);

        /* key Press Events */
        $(document).keydown((event) => {
            var d = event.srcElement || event.target;
            if (
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'TEXT') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'PASSWORD') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'FILE') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'SEARCH') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'EMAIL') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'NUMBER') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'DATE') ||
                    (d.tagName.toUpperCase() === 'TEXTAREA') ||
                    (d.hasAttribute("contenteditable") && d.getAttribute("contenteditable") === "true")
                    ) {
                event.stopPropagation();
                return;
            }

            if (event.ctrlKey || event.metaKey) {
                switch (event.key) {
                    case "a":
                        $("#menuSelectLemma").click();
                        break;
                    case "c":
                        $("#menuCopy").click();
                        break;
                    case "e":
                        $("#menuTag").click();
                        break;
//                    case "f":
//                        $("#menuFind").click();
//                        break;
                    case "m":
                        $("#menuMerge").click();
                        break;
                    case "o":
                        $("#menuOpen").click();
                        break;
                    case "r":
                        $("#menuUntag").click();
                        break;
                    case "s":
                        $("#menuSave").click();
                        break;
                    case "v":
                        $("#menuPaste").click();
                        break;
                    case "y":
                        $("#menuRedo").click();
                        break;
                    case "z":
                        $("#menuUndo").click();
                        break;
                    default:
                        return;
                }
            } else { /* no ctrl/meta */
                switch (event.key) {
                    case "Backspace":
                    case "Delete":
                        $("#menuUntag").click();
                        break;
                    case "Escape":
                        $("#menuClear").click();
                        break;
                    default:
                        return;
                }
            }

            event.preventDefault();
            event.stopPropagation();
        });
    }
}

module.exports = Menu;
},{"../model/AbstractModel":91}],90:[function(require,module,exports){
Utility = require("../util/utility");

module.exports = class MessageHandler {
    constructor(element) {
        Utility.log(MessageHandler, "constructor");
        // Utility.enforceTypes(arguments, [HTMLElement, jQuery]);
        this.container = null;
        this.setContainer(element);
    }
    setContainer(element) {
        Utility.log(MessageHandler, "setContainer");
        // Utility.enforceTypes(arguments, [HTMLElement, jQuery]);
        this.container = element;
    }
    userMessage(string, duration = 3000) {
        Utility.log(MessageHandler, "userMessage");
        // Utility.enforceTypes(arguments, String, ["optional", Number]);

        let msgElement = document.createElement("div");
        msgElement.className = "userMessageElement";
        $(this.container).append(msgElement);

        msgElement.style.display = 'block';
        msgElement.innerText = string;

        let timeDelta = 50;
        let opacity = 1;
        let opacityDelta = timeDelta / 1000;
        let time = duration;

        msgElement.style.opacity = opacity;
        msgElement.style.filter = 'alpha(opacity=' + opacity * 100 + ")";

        let showMessageTimer = setInterval(function () {
            if (time <= 1000) {
                opacity -= opacityDelta;
                msgElement.style.opacity = opacity;
                msgElement.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
            }

            time -= timeDelta;
            if (time <= 0.0) {
                clearInterval(showMessageTimer);

                $(msgElement).remove();
                showMessageTimer = null;
            }
        }.bind(this), timeDelta);
    }
};
},{"../util/utility":105}],91:[function(require,module,exports){
class AbstractModel {

    constructor() {
        this.abstractModelListeners = [];
    }

    addListener(listener) {
        Utility.log(AbstractModel, "addListener", listener.constructor.name);
        // Utility.enforceTypes(arguments, Object);

        this.abstractModelListeners.push(listener);
    }

    /**
     * Call as notifyListeners(methodName, [methodArgument0, ... methodArgumentN])
     * @param {type} method
     * @returns {undefined}
     */
    async notifyListeners(method) {
        Utility.log(AbstractModel, "notifyListeners", method);

        if (method === "notifyEntityUpdate") console.warn("notifyEntityUpdate");

        console.log("EVENT " + this.constructor.name + " " + method);

        Array.prototype.shift.apply(arguments);
        window.lastEvent = {
            method: method,
            args: arguments
        };
        AbstractModel.events.push(window.lastEvent);

        for (let listener of this.abstractModelListeners) {
            if (typeof listener[method] !== "function") {
//                console.log(" ? " + listener.constructor.name);
            } else {
                console.log(" + " + listener.constructor.name + " " + method);
                await listener[method].apply(listener, arguments);
            }
        }
    }
}
;

AbstractModel.events = [];
module.exports = AbstractModel;
},{}],92:[function(require,module,exports){
/* global Utility, Symbol */

/**
 * events: notifyCollectionAdd, notifyCollectionClear, notifyCollectionRemove
 * @type type
 */

Utility = require("../../util/utility");
AbstractModel = require("./AbstractModel");

module.exports = class Collection extends AbstractModel{
    constructor(array) {
        Utility.log(Collection, "constructor");
        // Utility.enforceTypes(arguments, ["optional", Array, HTMLCollection]);

        super();
        this.delegate = this;

        this.innerArray = [];

        if (typeof array !== "undefined" & array !== null) {
            this.innerArray = Array(array.length);
            let i = array.length;
            while (i--) this.innerArray[i] = array[i];
        }
    }

    setDelegate(delegate){
        this.delegate = delegate;
    }

    $() {
        return $(this.innerArray);
    }
    [Symbol.iterator] () {
        return this.innerArray[Symbol.iterator]();
    }
    add(obj) {
        Utility.log(Collection, "add");
        // Utility.enforceTypes(arguments, Object);

        if (!this.contains(obj)) {
            this.innerArray.push(obj);
            this.delegate.notifyListeners("notifyCollectionAdd", this, obj);
        }
    }
    set(obj) {
        Utility.log(Collection, "add");
        // Utility.enforceTypes(arguments, Object);
        this.clear();
        this.add(obj);
    }
    async clear() {
        Utility.log(Collection, "clear");
        // Utility.enforceTypes(arguments);
        if (this.isEmpty()) return;
        let oldArray = this.innerArray;
        this.innerArray = [];
        await this.delegate.notifyListeners("notifyCollectionClear", this, oldArray);
    }
    get(i) {
        Utility.log(Collection, "get");
        // Utility.enforceTypes(arguments, Number);
        return this.innerArray[i];
    }
    getLast() {
        Utility.log(Collection, "getLast");
        // Utility.enforceTypes(arguments);
        return this.innerArray[this.innerArray.length - 1];
    }
    getFirst() {
        Utility.log(Collection, "getFirst");
        // Utility.enforceTypes(arguments);
        return this.innerArray[0];
    }
    size() {
        Utility.log(Collection, "size");
        // Utility.enforceTypes(arguments);
        return this.innerArray.length;
    }
    isEmpty() {
        Utility.log(Collection, "isEmpty", "", this.innerArray.length === 0);
        // Utility.enforceTypes(arguments);
        return this.innerArray.length === 0;
    }
    remove(obj) {
        Utility.log(Collection, "remove");
        // Utility.enforceTypes(arguments, Object);
        if (!this.contains(obj)) return null;
        this.innerArray.splice(this.innerArray.indexOf(obj), 1);
        this.delegate.notifyListeners();
        this.delegate.notifyListeners("notifyCollectionRemove", this, obj);
        return obj;
    }
    contains(obj) {
        Utility.log(Collection, "contains");
        // Utility.enforceTypes(arguments, Object);
        return this.innerArray.indexOf(obj) !== -1;
    }
}
},{"../../util/utility":105,"./AbstractModel":91}],93:[function(require,module,exports){
const AbstractModel = require("./AbstractModel");

class DragDropHandler extends AbstractModel{

    constructor(){
        super();
        this.dataMap = new Map();
    }

    setData(field, data){
        this.dataMap.set(field, data);
    }

    getData(field){
        return this.dataMap.get(field);
    }

    /**
     * Retrieve and delete a field, return null if not found.
     * @param {type} field
     * @returns {DragDropHandler.deleteData@call;getData}
     */
    deleteData(field){
        if (!this.hasData(field)) return null;
        let r = this.getData(field);
        this.dataMap.delete(field);
        return r;
    }

    hasData(field){
        return this.dataMap.has(field);
    }
};

module.exports = DragDropHandler;
},{"./AbstractModel":91}],94:[function(require,module,exports){
/**
 * events: 
 *  - notifyDocumentClosed
 *  - notifyContextChange
 *  - setDocument 
 *  - setText
 *  - userMessage
 *  - notifyNewTaggedEntities(taggedEntityWidgetArray)
 * events from TaggedEntityWidget: 
 *  - notifyEntityUpdate(taggedEntityWidget, previousValues)
 *  - notifyUntaggedEntities(TaggedEntityWidget)
 * events from collection: 
 *  - notifyCollectionAdd
 *  - notifyCollectionClear
 *  - notifyCollectionRemove
 */

const Schema = require("./schema");
const TaggedEntityWidget = require("./TaggedEntityWidget");
const Storage = require("../../util/storage");
const HostInfo = require("../../util/hostinfo");
const AbstractModel = require("./AbstractModel");
const Utility = require("../../util/Utility");
const ArrayList = require("jjjrmi").ArrayList;
const EntityValues = require("../../gen/nerve").EntityValues;
const FileOperations = require("../../util/fileOperations");

class Model extends AbstractModel {
    constructor(dragDropHandler) {
        Utility.log(Model, "constructor");
        super();

        this.hostInfo = new HostInfo();
        this.dragDropHandler = dragDropHandler;

        this.storage = new Storage("NERVE_MODEL");
        this.storage.registerPackage(require("nerscriber"));
        this.storage.registerClass(require("jjjrmi").ArrayList);
        this.storage.registerClass(require("jjjrmi").HashMap);

//        this.selectedEntites = new ArrayList();
        this.clipboard = null;

        this.latestValues = new EntityValues();
        this.taggedEntityList = new ArrayList();

        this.currentStateIndex = 0;
        this.maxStateIndex = 30;
        this.__resetState();

        this.reader = new FileReader();
        this.reader.model = this;
        this.reader.onload = async function (event) {
            await this.model.loadDocument(this.filename, event.target.result, this.action);
        }.bind(this.reader);

        /* file dialog event - related to menu open */
        $("#fileOpenDialog").change(async (event) => {
            if (this.hasOpenDocument) this.close();
            this.reader.filename = event.currentTarget.files[0].name;
            await this.reader.readAsText(event.currentTarget.files[0]);
            $("#fileOpenDialog").val("");
        });

        this.addListener(this);
    }

    async init(dictionary) {
        this.dictionary = dictionary;

        if (this.storage.hasValue("document")) {
            await this.setDocument(
                this.storage.getValue("document"),
                this.storage.getValue("context"),
                this.storage.getValue("filename"),
                this.storage.getValue("schemaURL")
            );
        }
    }

    async contextAddDict(taggedEntityWidget) {
        this.notifyListeners("showThrobber");
        let r = await this.dictionary.addEntity(taggedEntityWidget.values());
        if (r === 1) {
            this.notifyListeners("notifyMessage", "entity added to dictionary");
            taggedEntityWidget.datasource("custom");
        } else {
            this.notifyListeners("notifyMessage", "entity not added to dictionary: " + r);
        }
        this.notifyListeners("clearThrobber");
    }

    async contextRemoveDict(taggedEntityWidget){
        this.notifyListeners("showThrobber");
        let r = await this.dictionary.deleteEntity(taggedEntityWidget.values());
        if (r === 1) {
            this.notifyListeners("notifyMessage", "entity removed from dictionary");
            taggedEntityWidget.datasource("custom");
        } else {
            this.notifyListeners("notifyMessage", "entity not removed from dictionary: " + r);
        }
        this.notifyListeners("clearThrobber");        
    }

    async onMenuUndo() {
        this.revertState();
    }

    async onMenuRedo() {
        this.advanceState();
    }

    async onMenuClose() {
        await this.close();
    }

    async onMenuClear() {
        this.getCollection().clear();
    }

    async onMenuCopy() {
        this.copy();
    }

    async onMenuPaste() {
        this.paste();
        this.saveState();
    }

    async onMenuMerge() {
        let entity = await this.mergeEntities(this.collection);
        this.getCollection().set(entity);
        this.saveState();
    }

    async onMenuTag() {
        await this.tagSelection(window.getSelection());
        this.saveState();
    }

    async onMenuUntag() {
        this.notifyListeners("requestUntagAll");
        this.isSaved = false;
        this.saveState();
    }

    async loadDocument(filename, text, action) {
        Utility.log(Model, "loadDocument");

        let encodeResponse = null;
        switch (action) {
            case "OPEN": /* NER & dict */
                encodeResponse = await this.scriber.encode(text);
                break;
            case "EDIT": /* open no dict, no NER */
                encodeResponse = await this.scriber.edit(text);
                break;
            case "TAG": /* NER only */
                encodeResponse = await this.scriber.tag(text);
                break;
            case "LINK": /* NER only */
                encodeResponse = await this.scriber.link(text);
                break;
        }

        encodeResponse.setFilename(filename);
        await this.setDocument(encodeResponse.text, encodeResponse.context, encodeResponse.filename, encodeResponse.schemaURL);
        this.isSaved = true;
    }

    setScriber(scriber) {
        this.scriber = scriber;
    }

    async onMenuSave() {
        let contents = "<doc>" + this.getDocument() + "</doc>";
        let result = await this.scriber.decode(contents);
        FileOperations.saveToFile(result, this.getFilename());
        this.isSaved = true;
    }

    hasOpenDocument() {
        let filename = this.storage.getValue("filename");
        return (filename !== undefined && filename !== null);
    }

    async onMenuOpen(action) {
        this.reader.action = action;
        $("#fileOpenDialog").click();
    }

    /**
     * Return a string representing the current document.  Not the actual html
     * node.
     * @returns {String}
     */
    getDocument() {
        Utility.log(Model, "getDocument");

        let doc = $("#entityPanel").get(0);
        let clone = doc.cloneNode(true);

        let taggedEntities = $(clone).find(".taggedentity");
        taggedEntities.each((i, element) => {
            let contents = $(element).find(".contents").contents();
            $(element).empty();
            $(element).append(contents);
        });

        let docText = $(clone).html();
        console.log(docText);

        return docText;
    }

    notifyDialogChange(fieldID, value) {
        switch (fieldID) {
            case "entityText":
                this.latestValues.text(value);
                break;
            case "lemma":
                this.latestValues.lemma(value);
                break;
            case "link":
                this.latestValues.link(value);
                break;
            case "tagName":
                this.latestValues.tag(value);
                break;
        }
    }

    async setDocument(text, context, filename, schemaURL) {
        Utility.log(Model, "setDocument");
        // Utility.enforceTypes(arguments, String, Context, String, String);

        await this.notifyListeners("notifyUnsetDocument");

        this.context = context;
        this.schema = new Schema();
        await this.schema.load(schemaURL);

        $("#entityPanel").html(text);

        await this.notifyListeners("notifyContextChange", context);
        await this.notifyListeners("notifySetDocument", $("#entityPanel").get(0));
        await this.notifyListeners("notifySetFilename", filename);

        let taggedEntityArray = [];
        $(".taggedentity").each(async (i, element) => {
            let taggedEntity = new TaggedEntityWidget(this, this.dragDropHandler, element);
            taggedEntityArray.push(taggedEntity);
            this.taggedEntityList.add(taggedEntity);            
        });
        this.notifyListeners("notifyNewTaggedEntities", taggedEntityArray);

        this.storage.setValue("document", text);
        this.storage.setValue("filename", filename);
        this.storage.setValue("context", context);
        this.storage.setValue("schemaURL", schemaURL);
        this.__resetState();

//        await this.__addDictionaryAttribute();
    }

    debug() {
        let i = 0;
        for (let taggedEntityWidget of this.taggedEntityList) {
            console.log((i++) + " " + taggedEntityWidget.lemma() + " " + taggedEntityWidget.tag());
        }
        console.log("------------------------------------------");
        console.log(this.taggedEntityList.size() + " entities");
    }

    async untagAll() {
        let i = 0;
        while (!this.taggedEntityList.isEmpty()) {
            let taggedEntityWidget = this.taggedEntityList.remove(0);
            console.log("* UNTAG " + (i++) + "/" + this.taggedEntityList.size() + " " + taggedEntityWidget.lemma() + " " + taggedEntityWidget.tag());
            await taggedEntityWidget.untag();
        }
//        this.taggedEntityList.clear();                          
    }

    async close() {
        Utility.log(Model, "close");
        // Utility.enforceTypes(arguments);
        this.storage.setValue("document", null);
        this.storage.setValue("filename", null);
        this.storage.setValue("context", null);
        localStorage.clear();

        let i = 0;

        let taggedEntityWidgetArray = [];
        while (!this.taggedEntityList.isEmpty()) {
            let taggedEntityWidget = this.taggedEntityList.remove(0);
            taggedEntityWidgetArray.push(taggedEntityWidget);
            taggedEntityWidget.untag();
        }
        this.taggedEntityList.clear();
        this.notifyListeners("notifyUntaggedEntities", taggedEntityWidgetArray);

        $("#entityPanel").html("");
        this.notifyListeners("notifyDocumentClosed");
    }

    getCollection() {
        Utility.log(Model, "getCollection");
        // Utility.enforceTypes(arguments);
        return this.collection;
    }

    async mergeEntities() {
        Utility.log(Model, "mergeEntities");
        let selection = window.getSelection();
        if (selection.rangeCount !== 0 && !selection.isCollapsed) {
            let newEntity = await this.tagSelectedRange();
            this.collection.add(newEntity);
        }

        let contents = $();

        let taggedEntityArray = [];
        for (let entity of this.collection) {
            let contentElement = entity.getContentElement();
            $(entity.getElement()).replaceWith(contentElement);
            contents = contents.add(contentElement);
            taggedEntityArray.push(entity);
        }
        this.notifyListeners("notifyUntaggedEntities", taggedEntityArray);

        contents = contents.mergeElements();
        contents[0].normalize();
        return this.createTaggedEntity(contents[0]);
    }

    async createTaggedEntity(element) {
        Utility.log(Model, "createTaggedEntity");
//        let values = await this.dictionary.pollEntity(this.context, $(element).text());
//        if (values === null) values = this.latestValues;

        let values = this.latestValues;

        values.text(null);
        values.lemma(null);

        let taggedEntity = new TaggedEntityWidget(this, this.dragDropHandler, element, values.tag());
        taggedEntity.values(values, false);
        this.taggedEntityList.add(taggedEntity);
        
        let result = await this.dictionary.lookup(taggedEntity.text(), taggedEntity.lemma(), taggedEntity.tag(), null);
        if (result.size() > 0){            
            let first = result.get(0);
            taggedEntity.datasource(first.getEntry("source").getValue(), false);
            taggedEntity.link(first.getEntry("link").getValue(), false);
        }        

        this.notifyListeners("notifyNewTaggedEntities", [taggedEntity]);
        return taggedEntity;
    }

    notifyUntaggedEntities(taggedEntityWidgetArray) {
        for (let taggedEntityWidget of taggedEntityWidgetArray) {
            if (this.taggedEntityList.contains(taggedEntityWidget)) {
                this.taggedEntityList.remove(taggedEntityWidget);
            }
        }
    }

    /* seperate so that the model isn't saved twice on merge */
    async tagSelection(selection) {
        Utility.log(Model, "tagSelection");
        if (selection.rangeCount === 0) return null;

        let range = selection.getRangeAt(0);
        range = this.__trimRange(range);

        let tagName = this.latestValues.tag();

        if (!this.schema.isValid(range.commonAncestorContainer, tagName)) {
            this.notifyListeners("userMessage", `Tagging "${tagName}" is not valid in the Schema at this location.`);
            return null;
        }

        var element = document.createElement("div");
        $(element).append(range.extractContents());

        let taggedEntity = await this.createTaggedEntity(element);

        range.deleteContents();
        range.insertNode(element);

        selection.removeAllRanges();
        document.normalize();

        console.log(taggedEntity);

        return taggedEntity;
    }

    __trimRange(range) {
        Utility.log(Model, "__trimRange");
        while (range.toString().charAt(range.toString().length - 1) === ' ') {
            range.setEnd(range.endContainer, range.endOffset - 1);
        }

        while (range.toString().charAt(0) === ' ') {
            range.setStart(range.startContainer, range.startOffset + 1);
        }

        return range;
    }

    /**
     * Call 'saveState()' after any change that you want to be able to recover
     * to.  This is typically any change in the model that can be seen by the
     * user.
     * @returns {undefined}
     */
    saveState() {
        Utility.log(Model, "saveState");
        // Utility.enforceTypes(arguments);

        this.currentStateIndex = this.currentStateIndex + 1;
        this.stateList[this.currentStateIndex] = $("#entityPanel").html();
        this.storage.setValue("document", $("#entityPanel").html());

        if (this.currentStateIndex === this.maxStateIndex) {
            this.stateList = this.stateList.slice(1, this.currentStateIndex);
        } else {
            for (let i = this.currentStateIndex + 1; i < this.maxStateIndex; i++) {
                this.stateList[i] = null;
            }
        }
    }

    async revertState() {
        Utility.log(Model, "revertState");

        if (this.currentStateIndex <= 0) return false;
        this.currentStateIndex = this.currentStateIndex - 1;
        let docHTML = this.stateList[this.currentStateIndex];
        this.__setDocument(docHTML);
    }

    async advanceState() {
        Utility.log(Model, "advanceState");

        if (typeof this.stateList[this.currentStateIndex + 1] === "undefined" || this.stateList[this.currentStateIndex + 1] === null) return;
        this.currentStateIndex = this.currentStateIndex + 1;
        let docHTML = this.stateList[this.currentStateIndex];
        this.__setDocument(docHTML);
    }

    __setDocument(docHTML) {
        while (!this.taggedEntityList.isEmpty()) {
            let taggedEntityWidget = this.taggedEntityList.remove(0);
            taggedEntityWidget.untag();
        }
        this.taggedEntityList.clear();
        if (docHTML === undefined) return;

        $("#entityPanel").html(docHTML);

        $(".taggedentity").each((i, element) => {
            let taggedEntity = new TaggedEntityWidget(this, this.dragDropHandler, element);
            this.taggedEntityList.add(taggedEntity);
            this.notifyListeners("notifyNewTaggedEntities", [taggedEntity]);
        });

        this.storage.setValue("current", "document", docHTML);
    }

    __resetState() {
        Utility.log(Model, "__resetState");
        // Utility.enforceTypes(arguments);

        this.stateList = [];
        this.currentStateIndex = 0;
        this.stateList[0] = $("#entityPanel").html();
    }
    getFilename() {
        Utility.log(Model, "getFilename");
        // Utility.enforceTypes(arguments);
        return this.storage.getValue("filename");
    }

    getContext() {
        Utility.log(Model, "getContext");
        // Utility.enforceTypes(arguments);
        return this.context;
    }

    copy() {
        window.alert("TODO: copy");
    }

    paste() {
        window.alert("TODO: paste");
    }
}

module.exports = Model;
},{"../../gen/nerve":82,"../../util/Utility":100,"../../util/fileOperations":102,"../../util/hostinfo":103,"../../util/storage":104,"./AbstractModel":91,"./TaggedEntityWidget":95,"./schema":96,"jjjrmi":25,"nerscriber":51}],95:[function(require,module,exports){
const NameSource = require("nerscriber").NameSource;
const EntityValues = require("../../gen/nerve").EntityValues;
const ShowHTMLWidget = require("../ShowHTMLWidget");
const Constants = require("../../util/Constants");
const AbstractModel = require("./AbstractModel");

class ContextMenu {
    constructor() {
        this.state = false;
        this.flags = {};
        this.lastSubMenu = null;        
    }

    setDictionary(dictionary) {
        this.dictionary = dictionary;
    }

    notifyDocumentClick(){
        $(ContextMenu.SELECTOR).hide();
    }

    notifyReady() {
        $(ContextMenu.SELECTOR).hide();
        $(ContextMenu.SELECTOR).find(".context-subdialog").hide();

        /* open submenu (if active) */
        $(ContextMenu.SELECTOR).find(".context-subdialog").each((i, e) => {
            $(e).parent().mouseenter(() => {
                let p = $(e).parent();                
                if ($(p).hasClass("inactive") === false){
                    $(e).show();
                }
            });
        });
        
        /* close submenu */
        $(ContextMenu.SELECTOR).find(".context-subdialog").each((i, e) => {
            $(e).parent().mouseleave(() => {
                $(e).hide();
            });
        });

        $(ContextMenu.SELECTOR).find(".context-item").click((event) => {
            if ($(event.delegateTarget).hasClass("inactive")) return;
            let flags = $(event.delegateTarget).data("contextflags");
            if (flags && flags.hide) $(ContextMenu.SELECTOR).hide();
            let eventname = $(event.delegateTarget).attr("data-eventname");
            this.taggedEntityWidget.notifyListeners(eventname, this.taggedEntityWidget);
        });
        
        /* setup help popups */
        $(ContextMenu.SELECTOR).find("[data-context-help]").each((i, e) => {
            $(e).click((event) => {
                let target = $(e).attr("data-context-help");
                $(ContextMenu.SELECTOR).find(`#${target}`).show();
                this.position($(ContextMenu.SELECTOR).find(`#${target}`).get(0), event);
                console.log(target);
            });
        });
        
        $(ContextMenu.SELECTOR).find(".context-help").each((i, e) => {
            $(e).mouseleave(() => $(e).hide());
        });        
    }

    /* list all available entities for the user to select */
    /* if none are found, "select entity" option is disabled */
    loadOptions(text) {
        $(ContextMenu.SELECTOR).find("#dictOptions > #dictOptionList").empty();
        $(ContextMenu.SELECTOR).find("#dictOptions").addClass("inactive");
        $(ContextMenu.SELECTOR).find("#dictOptions > .context-right-image").attr("src", "assets/loader400.gif");
        let result = this.dictionary.lookup(text, null, null, null);

        result.then((sqlResult) => {
            if (sqlResult.size() !== 0) {
                $(ContextMenu.SELECTOR).find("#dictOptions").removeClass("inactive");
                for (let sqlRecord of sqlResult) {
                    this.addOption(sqlRecord);
                }
                $(ContextMenu.SELECTOR).find("#dictOptions > .context-right-image").show();
                $(ContextMenu.SELECTOR).find("#dictOptions > .context-right-image").attr("src", "assets/context-arrow.png");
            } else {
                $(ContextMenu.SELECTOR).find("#dictOptions > .context-right-image").hide();
            }
        });
    }
    
    setSelected(contextOptionDiv){
        let img = document.createElement("img");
        $(img).attr("src", "assets/context-selected.png");
        $(img).addClass("context-left-image");
        $(contextOptionDiv).append(img);
    }
    
    addClickEvent(contextOptionDiv, sqlRecord){
        $(contextOptionDiv).click(()=>{
            this.taggedEntityWidget.lemma(sqlRecord.getEntry("lemma").getValue());
            this.taggedEntityWidget.datasource(sqlRecord.getEntry("source").getValue());
            this.taggedEntityWidget.tag(sqlRecord.getEntry("tag").getValue());
            this.taggedEntityWidget.link(sqlRecord.getEntry("link").getValue());
            $(ContextMenu.SELECTOR).hide();
        });
    }

    addOption(sqlRecord) {
        let div = document.createElement("div");
        let label = document.createElement("div");
        $(div).addClass("context-item");
        $(label).addClass("context-label");
        $(label).text(sqlRecord.getEntry("lemma").getValue() + " : " + sqlRecord.getEntry("tag").getValue());
        $(div).append(label);
        $(div).attr("title", "collection " + sqlRecord.getEntry("source").getValue());
        $(ContextMenu.SELECTOR).find("#dictOptions > #dictOptionList").append(div);
        
        if (sqlRecord.getEntry("lemma").getValue() === this.taggedEntityWidget.lemma()
        &&  sqlRecord.getEntry("tag").getValue() === this.taggedEntityWidget.tag()
        &&  sqlRecord.getEntry("source").getValue() === this.taggedEntityWidget.datasource())
        {
            this.setSelected(div);
        }
        this.addClickEvent(div, sqlRecord);
        return div;
    }

    isFlag(flagname) {
        if (this.flags[flagname] === undefined) return false;
        else return this.flags[flagname];
    }

    position(element, event) {       
        let posX = event.clientX - 5;
        let posY = event.clientY - 5;
        element.style.left = posX + "px";
        element.style.top = posY + "px";
    }

    show(event, taggedEntityWidget) {
        $(ContextMenu.SELECTOR).show();
        this.loadOptions(taggedEntityWidget.text());
        this.position($(ContextMenu.SELECTOR).get(0), event);
        this.taggedEntityWidget = taggedEntityWidget;
        this.toggleAddMenuItem(taggedEntityWidget);
        this.toggleRemoveMenuItem(taggedEntityWidget);
    }
    
    /* if the tagged entity does not match an existing entry */
    /* enable the addDict menu item                          */
    toggleAddMenuItem(taggedEntityWidget){
        $(ContextMenu.SELECTOR).find("#addDict > .context-right-image").show();
        $(ContextMenu.SELECTOR).find("#addDict").addClass("inactive");
        
        let text = taggedEntityWidget.text();
        let lemma = taggedEntityWidget.lemma();
        let tag = taggedEntityWidget.tag();
        let result = this.dictionary.lookup(text, lemma, tag, null);
        
        result.then((sqlResult) => {
            if (sqlResult.size() === 0){
                $(ContextMenu.SELECTOR).find("#addDict").removeClass("inactive");                
            }
            $(ContextMenu.SELECTOR).find("#addDict > .context-right-image").hide();
        });
    }
    
    
    toggleRemoveMenuItem(taggedEntityWidget){
        $(ContextMenu.SELECTOR).find("#removeDict > .context-right-image").show();
        $(ContextMenu.SELECTOR).find("#removeDict").addClass("inactive");        
        
        let text = taggedEntityWidget.text();
        let lemma = taggedEntityWidget.lemma();
        let tag = taggedEntityWidget.tag();
        let result = this.dictionary.lookup(text, lemma, tag, "custom");
        
        result.then((sqlResult) => {
            if (sqlResult.size() !== 0){
                $(ContextMenu.SELECTOR).find("#removeDict").removeClass("inactive");              
            }
            $(ContextMenu.SELECTOR).find("#removeDict > .context-right-image").hide();
        });        
    }
}

ContextMenu.SELECTOR = "#taggedEntityContextMenu";

/**
 * All tagged entity elements get passed to a TaggedEntity constructor to provide functionality.
 * The TaggedEntity has a reference to the element, and the element will have a reverence to the
 * tagged entity as 'element.entity'.  will throw an exception is the tagged text does not have
 * a tagname attribute and the tagName is not provided.  When a field is changed the old values
 * will be sent with the event with the unchanged values as null.
 * 
 * TaggedEntityClick(this, double, control, shift, alt);
 * 
 * @type type
 */
class TaggedEntityWidget extends AbstractModel {
    constructor(model, dragDropHandler, element, tagName = null) {
        Utility.log(TaggedEntityWidget, "constructor");
//        // Utility.enforceTypes(arguments, Model, DragDropHandler, HTMLDivElement, ["optional", String]);

        super();
        this.element = element;
        this.dragDropHandler = dragDropHandler;
        this.model = model;
        this.context = model.getContext();
        element.entity = this;

        this.addListener(this);
        this.addListener(model);

        $(element).addClass("taggedentity");
        $(element).attr("draggable", "true");

        $(element).on("dragstart", (event) => this.dragstart(event));
        $(element).on("dragover", (event) => this.dragover(event));
        $(element).on("drop", (event) => this.drop(event));

        $(element).on("contextmenu", (event) => {
            event.preventDefault();
            TaggedEntityWidget.contextMenu.show(event, this);
        });

        $(element).click((event) => {
            if (event.button !== 0) return; /* left click only */
            this.model.notifyListeners("notifyTaggedEntityClick", this, false, event.ctrlKey, event.shiftKey, event.altKey);
            event.stopPropagation();
        });
        $(element).dblclick((event) => {
            if (event.button !== 0) return; /* left click only */
            this.model.notifyListeners("notifyTaggedEntityClick", this, true, event.ctrlKey, event.shiftKey, event.altKey);
            event.stopPropagation();
        });

        this.format();

        /* default values - will throw an exception is the tagged text does not have a tagname attribute and
         * the tagName is not provided.
         */
        if (tagName !== null) this.tag(tagName, true);
        this.lemma(this.text(), true);
    }

    contextShowHTML() {
        window.last = this;
        new ShowHTMLWidget(this).show();
    }

    contextUntag() {
        this.untag();
    }

    /**
     * This method will add html markup specific for the nerve environment.
     * Must use markdown before saving.
     * @return {undefined}
     */
    format() {
        if ($(this.element).contents().length === 0) {
            this.contents = document.createElement("div");
            $(this.contents).addClass("contents");
            $(this.element).prepend(this.contents);
        } else if ($(this.element).children().filter(".contents").length === 0) {
            this.contents = $(this.element).contents().wrap().get(0);
            $(this.contents).addClass("contents");
        } else {
            this.contents = $(this.element).children(".contents").get(0);
        }

        if ($(this.element).children().filter(".tagname-markup").length === 0) {
            this.markup = document.createElement("div");
            $(this.element).prepend(this.markup);
            $(this.markup).addClass("tagname-markup");
            this.tag($(this.element).tag(), true);
        } else {
            this.markup = $(this.element).children(".tagname-markup");
        }
    }

    /**
     * This method will remove html markup specific for the nerve environment.
     * Must use markup before displaying
     * @return {undefined}
     */
    unformat() {
        let replaceWith = $(this.contents).contents();
        $(this.element).empty();
        $(this.element).append(replaceWith);
    }

    drop(event) {
        if (this.dragDropHandler.hasData("TaggedEntityWidget")) {
            let src = this.dragDropHandler.deleteData("TaggedEntityWidget");
            let srcValues = src.values();
            srcValues.text(null);
            this.values(srcValues);
        }
    }

    dragover(event) {
        if (this.dragDropHandler.hasData("TaggedEntityWidget")) {
            event.originalEvent.preventDefault();
        }
    }

    dragstart(event) {
        this.dragDropHandler.setData("TaggedEntityWidget", this);
    }

    selectLikeEntitiesByLemma() {
        window.alert("TODO: select like entities by lemma");
    }

    getElement() {
        Utility.log(TaggedEntityWidget, "getElement");
        // Utility.enforceTypes(arguments);
        return this.element;
    }

    $() {
        return $(this.getElement());
    }

    getContentElement() {
        Utility.log(TaggedEntityWidget, "getElement");
        // Utility.enforceTypes(arguments);
        return this.contents;
    }

    tag(value = null, silent = false) {
        Utility.log(TaggedEntityWidget, "tag", value);
        if (value === null) return $(this.element).tag();

        let updateInfo = new EntityValues(null, null, null, $(this.element).tag(), null);

        if (!this.context.isTagName(value, NameSource.NAME)) {
            throw new Error(`Tagname '${value}' doesn't match any known name in context ${this.context.getName()}`);
        }

        let tagInfo = this.context.getTagInfo(value, NameSource.NAME);

        $(this.markup).text(value);
        $(this.markup).attr("data-norm", tagInfo.getName(NameSource.DICTIONARY));
        $(this.element).tag(value);

        if (!silent) this.model.notifyListeners("notifyEntityUpdate", this, updateInfo);
        return $(this.element).tag();
    }
    /**
     * Set standard value.
     * @param {string} value if null do not set, just return value
     * @param {boolean} silent true = fire notifyEntityUpdate event
     * @returns {string} the value of lemma
     */
    lemma(value = null, silent = false) {
        Utility.log(TaggedEntityWidget, "lemma", value);
        if (value === null) return $(this.element).lemma();
        let updateInfo = new EntityValues(null, $(this.element).lemma(), null, null, null);

        $(this.element).lemma(value);

        if (!silent) this.model.notifyListeners("notifyEntityUpdate", this, updateInfo);
        return $(this.element).lemma();
    }
    link(value = null, silent = false) {
        Utility.log(TaggedEntityWidget, "link", value);
        if (value === null) return $(this.element).link();
        let updateInfo = new EntityValues(null, null, $(this.element).link(), null, null);

        $(this.element).link(value);

        if (!silent) this.model.notifyListeners("notifyEntityUpdate", this, updateInfo);
        return $(this.element).link();
    }
    text(value = null, silent = false) {
        Utility.log(TaggedEntityWidget, "text", value);
        if (value === null) return $(this.contents).text();
        let updateInfo = new EntityValues($(this.contents).text(), null, null, null, null);

        $(this.contents).text(value);

        if (!silent) this.model.notifyListeners("notifyEntityUpdate", this, updateInfo);
        return $(this.element).link();
        return $(this.contents).text();
    }
    datasource(value = null, silent = false) {
        Utility.log(TaggedEntityWidget, "datasource", value);
        if (value === null) return $(this.element).xmlAttr(Constants.DICT_SRC_ATTR);
        let updateInfo = new EntityValues(null, null, null, null, $(this.element).xmlAttr(Constants.DICT_SRC_ATTR));

        $(this.element).xmlAttr(Constants.DICT_SRC_ATTR, value);
        
        if (!silent){
            console.warn(silent);
            this.model.notifyListeners("notifyEntityUpdate", this, updateInfo);
        }
        return $(this.element).xmlAttr(Constants.DICT_SRC_ATTR);
    }
    values(value = null, silent = false) {
        Utility.log(TaggedEntityWidget, "values");
        // Utility.enforceTypes(arguments, ["optional", EntityValues], ["optional", Boolean]);

        if (value === null) return new EntityValues(this.text(), this.lemma(), this.link(), this.tag(), this.datasource());
        else {
            let updateInfo = new EntityValues(null, null, null, null, null);
            if (value.text() !== null) {
                updateInfo.text(this.text());
                this.text(value.text(), true);
            }
            if (value.lemma() !== null) {
                updateInfo.lemma(this.lemma());
                this.lemma(value.lemma(), true);
            }
            if (value.link() !== null) {
                updateInfo.link(this.link());
                this.link(value.link(), true);
            }
            if (value.tag() !== null) {
                updateInfo.tag(this.tag());
                this.tag(value.tag(), true);
            }
            if (value.datasource() !== null) {
                updateInfo.datasource(this.datasource());
                this.datasource(value.datasource(), true);
            }
            if (!silent) this.model.notifyListeners("notifyEntityUpdate", this, updateInfo);
        }

        return new EntityValues(this.text(), this.lemma(), this.link(), this.tag(), this.datasource());
    }
    async untag() {
        let children = $(this.contents).contents();
        $(this.element).replaceWith(children);
        document.normalize();
        return children;
    }
    addClass(classname) {
        $(this.element).addClass(classname);
    }
    removeClass(classname) {
        $(this.element).removeClass(classname);
    }

    setHasBackground(value) {
        $(this.contents).attr(`data-hasbg`, value);
    }

    highlight(value) {
        if (value === undefined) return $(this.element).hasClass("selected");
        else if (value) $(this.element).addClass("selected");
        else $(this.element).removeClass("selected");
    }
}
;

TaggedEntityWidget.contextMenu = new ContextMenu();
module.exports = TaggedEntityWidget;
},{"../../gen/nerve":82,"../../util/Constants":98,"../ShowHTMLWidget":87,"./AbstractModel":91,"nerscriber":51}],96:[function(require,module,exports){
/* global Context, Utility, Function, FileOperations */

const FileOperations = require("../../util/FileOperations");

class Schema {
    constructor() {
        Utility.log(Schema, "constructor");
        // Utility.enforceTypes(arguments);
    }
    async load(url) {
        Utility.log(Schema, "load");
        // Utility.enforceTypes(arguments, String);

        let fileResult = await FileOperations.loadFromRemote(url);
        let xml = $.parseXML(fileResult);
        window.$xml = $(xml);
        this.$xml = $(xml);
        this.$start = $xml.find("start");
    }
    static branch(element) {
        while ($(element).attr("xmltagname") === undefined) {
            let parent = $(element).parent();
            if (parent.length === 0) throw new Error("Could not locate attribute 'xmltagname' on elements ancestors.");
            element = parent;
        }

        let branch = [];
        let parents = $(element).parents();

        branch.push($(element).attr("xmltagname"));

        for (let x of parents) {
            if ($(x).attr("xmltagname") === undefined) break;
            branch.unshift($(x).attr("xmltagname"));
        }

        return branch;
    }
    isValid(element, childNodeName) {
        Utility.log(Schema, "isValid");
        // Utility.enforceTypes(arguments, Object, String);

        let path = Schema.branch(element);
        if (childNodeName) path.push(childNodeName);
        return this.checkValidity(path, this.$start);
    }
    checkValidity(path, schemaNode) {
        Utility.log(Schema, "checkValidity");

        switch ($(schemaNode).prop("tagName")) {
            case "element":
                return this.checkElement(path, schemaNode);
            case "ref":
                return this.checkRef(path, schemaNode);
            case "define":
            case "start":
            case "zeroOrMore":
            case "group":
            case "interleave":
            case "choice":
            case "optional":
            case "oneOrMore":
            case "List":
            case "mixed":
                return this.checkGroup(path, schemaNode);
            default:
                return false;
        }
    }
    checkElement(path, schemaNode) {
        Utility.log(Schema, "checkElement");
        if ($(schemaNode).attr("name") !== path[0]) return false;

        let head = path.shift();
        if (path.length === 0) return true;

        for (let child of $(schemaNode).children()) {
            if (this.checkValidity(path, child)) return true;
        }

        path.unshift(head);
        return false;
    }
    checkRef(path, schemaNode) {
        Utility.log(Schema, "checkRef");
        let name = $(schemaNode).attr("name");
        let defines = $xml.find(`define[name='${name}']`);
        if (defines.length === 0) throw new Error(`Undefined lookup : ${name}`);
        return this.checkValidity(path, defines[0]);
    }
    checkGroup(path, schemaNode) {
        Utility.log(Schema, "checkGroup");
        for (let child of $(schemaNode).children()) {
            if (this.checkValidity(path, child)) return true;
        }
        return false;
    }
}

module.exports = Schema;
},{"../../util/FileOperations":99}],97:[function(require,module,exports){
/* global Utility, TaggedEntityWidget, Collection, ProgressPacket */

const ProgressStage = require("nerscriber").ProgressStage;

module.exports = class View {
    constructor() {
        Utility.log(View, "constructor");

        this.context = null;
        this.onMenuTags(false);

        this.delayThrobber = null;
        this.throbberMessageStack = [];
        this.lastFade = true;
        this.tagMode = false;
    }

    notifySetFilename(filename){
        $("#documentTitle").text(filename);
    }

    notifyDocumentClosed(filename){
        $("#documentTitle").text("");
    }

    notifyCollectionAdd(collection, TaggedEntityWidget) {
        Utility.log(View, "notifyCollectionAdd", TaggedEntityWidget.text());
        // // Utility.enforceTypes(arguments, Collection, TaggedEntityWidget);
        $(TaggedEntityWidget.getElement()).addClass("selected");
    }
    notifyCollectionClear(collection, TaggedEntityWidgets) {
        Utility.log(View, "notifyCollectionClear");
        // // Utility.enforceTypes(arguments, Collection, Array);
        for (let TaggedEntityWidget of TaggedEntityWidgets) {
            $(TaggedEntityWidget.getElement()).removeClass("selected");
        }
    }
    notifyCollectionRemove(collection, TaggedEntityWidget) {
        Utility.log(View, "notifyCollectionRemove");
        // // Utility.enforceTypes(arguments, Collection, TaggedEntityWidget);
        $(TaggedEntityWidget.getElement()).removeClass("selected");
    }
    notifyProgress(progressPacket) {
        Utility.log(View, "notifyProgress");
        // // Utility.enforceTypes(arguments, ProgressPacket);

        if (progressPacket.progressStage === ProgressStage.START){
            this.showThrobber(true);
        } else if (progressPacket.progressStage === ProgressStage.CONTINUE){
            this.setThrobberMessage(progressPacket.message);
        } else if (progressPacket.progressStage === ProgressStage.COMPLETE){
            this.showThrobber(false);
        }
    }
    notifySetDocument(docElement){
        Utility.log(View, "notifySetDocument");
        // // Utility.enforceTypes(arguments, HTMLDivElement );
        $(docElement).find("*").removeClass("selected");
    }
    setDictionaryButton(button) {
        Utility.log(View, "setDictionaryButton");
        // // Utility.enforceTypes(arguments, String);

        $("#dictionary > button").hide();
        switch (button) {
            case "add":
                $("#dictAdd").show();
                break;
            case "remove":
                $("#dictRemove").show();
                break;
            case "update":
                $("#dictUpdate").show();
                break;
        }
    }
    scrollTo(element) {
        Utility.log(View, "scrollTo");
        // // Utility.enforceTypes(arguments, [Element]);

        $("#panelContainer").scrollTop(
                $(element).offset().top - $("#panelContainer").offset().top + $("#panelContainer").scrollTop() - ($("#panelContainer").height() / 2)
                );
    }
    focusFind() {
        Utility.log(View, "focusFind");
        // // Utility.enforceTypes(arguments);
        document.getElementById("epsTextArea").focus();
    }
    setFindText(string) {
        Utility.log(View, "setFindText");
        // // Utility.enforceTypes(arguments, String);
        document.getElementById("epsTextArea").value = string;
    }
    getSearchTerm() {
        Utility.log(View, "getSearchTerm");
        // // Utility.enforceTypes(arguments);
        return document.getElementById("epsTextArea").value;
    }
    clear() {
        Utility.log(View, "clear");
        // // Utility.enforceTypes(arguments);

        $("#entityPanel").empty();
        $("#tagnamePanel").empty();
    }
    setFilename(text) {
        Utility.log(View, "setFilename");
        // // Utility.enforceTypes(arguments, String);

        document.getElementById("documentTitle").innerHTML = text;
    }
    setDialogs(value) {
        Utility.log(View, "setDialogs");
        // // Utility.enforceTypes(arguments, EntityValues);

        $("#txtEntity").val(value.text());
        $("#txtLemma").val(value.lemma());
        $("#txtLink").val(value.link());
        $("#selectTagName").val(value.tag());
    }
    setSearchText(string) {
        Utility.log(View, "setSearchText");
        // // Utility.enforceTypes(arguments, String);

        if (typeof string === undefined || string === null) {
            string = "";
        }
        document.getElementById("epsTextArea").value = string;
    }
    
    notifyMessage(message){
        let modal = $("#globalMessage");
        $(modal).find("[data-widget-id='message']").text(message);
        $(modal).modal("show");
    }    
    
    notifyContextChange(context) {
        Utility.log(View, "notifyContextChange");
        // // Utility.enforceTypes(arguments, Context);

        /* remove old .css class */
        if (this.context !== null) {
            for (let stylename of this.context.styles()) {
                $("#entityPanel").removeClass(stylename);
            }
        }

        this.context = context;

        /* add new .css class */
        for (let stylename of this.context.styles()) {
            $("#entityPanel").addClass(stylename);
        }
    }
    /* add a link element to the head of the document as a style sheet.  Adds
     * a link id = filename so it's easily found again.
     * @param {type} filename
     * @returns {undefined}
     */
    attachStyle(filename) {
        Utility.log(View, "attachStyle", filename);
        // // Utility.enforceTypes(arguments, String);

        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", "styles/" + filename);
        fileref.setAttribute("id", filename);
        document.head.appendChild(fileref);

        window.requestAnimationFrame(() => {
            $(window).trigger('resize');
        });
    }
    /* Removes a stylesheet that was attached using the 'attachstyle' method.
     *
     * @param {type} filename
     * @returns {undefined}
     */
    detachStyle(filename) {
        Utility.log(View, "detachStyle", filename);
        // // Utility.enforceTypes(arguments, String);

        let style = document.getElementById(filename);
        if (typeof style !== "undefined" && style !== null) {
            let parent = style.parentNode;
            parent.removeChild(style);
        }
    }
    clearThrobber() {
        this.showThrobber(false);
        $("message").text("");
        $("#baubles > img").hide();
        $("#percent").hide();
        this.throbberMessageStack = [];
    }
    showPercent(amount) {
        $("#percent").show();
        $("#percent").text(amount + "%");
    }
    showBaubles(index, max) {
        $("#baubles > img").hide();
        $("#baubles > img").attr("src", "resources/light-off.png");

        for (let i = 1; i <= max; i++) {
            $(`#baubles > img[data-index="${i}"]`).show();
            if (i <= index) $(`#baubles > img[data-index="${i}"]`).attr("src", "resources/light-on.png");
        }
    }
    showThrobber(flag = true, opacity = 0.7) {
        Utility.log(View, "showThrobber", flag);
        // // Utility.enforceTypes(arguments, ["optional", Boolean], ["optional", Number]);

        $("#throbberBG").css("opacity", opacity);

        if (flag) $("#throbberBG").show();
        else $("#throbberBG").hide();
    }
    pushThrobberMessage(string) {
        Utility.log(View, "pushThrobberMessage");
        // // Utility.enforceTypes(arguments, String);

        this.throbberMessageStack.push(string);
        document.getElementById("message").innerText = string;
    }
    popThrobberMessage() {
        Utility.log(View, "popThrobberMessage");
        // // Utility.enforceTypes(arguments);

        let string = "";
        this.throbberMessageStack.pop();
        if (this.throbberMessageStack.length > 0) {
            string = this.throbberMessageStack[this.throbberMessageStack.length - 1];
        }
        document.getElementById("message").innerText = string;
    }
    setThrobberMessage(string) {
        Utility.log(View, "setThrobberMessage", string);
        // // Utility.enforceTypes(arguments, String);

        this.throbberMessageStack = [string];
        document.getElementById("message").innerText = string;
    }
    onMenuTags(value) {
        Utility.log(View, "onMenuTags");
        
        if (value === undefined){
            this.tagMode = !this.tagMode;
        }
        
        if (this.tagMode) {
            $("#menuTags").text("Tag Mode On");
            $("#entityPanel").addClass("show-tags");
        } else {
            $("#menuTags").text("Tag Mode Off");
            $("#entityPanel").removeClass("show-tags");
        }
    }
};
},{"nerscriber":51}],98:[function(require,module,exports){
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author edward
 */
//public class Constants {
//    
//}

class Constants{
    
}

    /**
    The name of the HTML dom element.
    */
    Constants.HTML_TAGNAME = "div";

    /**
    The HTML attribute that contains the XML tag name.
    */
    Constants.ORG_TAGNAME = "xmltagname";

    /**
    The HTML attribute whose value is the XML attributes as a JSON object.
    */
    Constants.XML_ATTR_LIST = "xmlattrs";

    /**
    The HTML class for non entity, non prolog elements.
    */
    Constants.HTML_NONENTITY = "xmltag";

    /**
    The HTML class for XML instruction elements.
    */
    Constants.HTML_PROLOG = "xmlprolog";

    /**
    The HTML class for XML doctype elements.
    */
    Constants.HTML_DOCTYPE = "xmldoctype";

    /**
    The HTML class for XML tagged entity elements.
    */
    Constants.HTML_ENTITY = "taggedentity";

    /**
    The innertext value of XML doctype elements.
    */
    Constants.DOCTYPE_INNERTEXT = "xmlinnertext";

    /**
    The name of the html attribute which contains the context name.
    */
    Constants.CONTEXT_ATTRIBUTE = "data-context";

    /*
    The name of the instruction node which will have the schema url.
    */
    Constants.SCHEMA_NODE_NAME = "xml-model";

    /*
    The name of the attribue in the schema instruction node which holds the chema url value.
    */
    Constants.SCHEMA_NODE_ATTR = "href";

    /*
    The name of the instruction node which will have the schema url.
    */
    Constants.CONTEXT_NODE_NAME = "context";

    /*
    The name of the attribue in the schema instruction node which holds the chema url value.
    */
    Constants.CONTEXT_NODE_ATTR = "name";
    
    /*
    The value to put into tag-source-attribute if the tag was generated by NER.
    */
    Constants.TAG_SRC_VAL_NER = "nerve-ner";    
    
    /*
    The value to put into tag-source-attribute if the tag was generated by dictionary lookup.
    */
    Constants.TAG_SRC_VAL_DICT = "nerve-dict";        
    
    /*
    This attribute will contain the name of the dictonary source for the lemma/tagname values.
    It will be ignored during decode.    
    */
    Constants.DICT_SRC_ATTR = "dict-src";
    
module.exports = Constants;
},{}],99:[function(require,module,exports){
/* global Utility */
class FileOperations {
    static getServerName() {
        let server = "";

        if (location.host === "cwrc-dev-06.srv.ualberta.ca") {
            server = location.host + "/tools/nerve";
        } else if (location.host === "http://beta.cwrc.ca/") {
            server = location.host + "/tools/nerve";
        } else {
            server = location.host + "/nerve";
        }
        return server;
    }

    /*
     * Send contents of 'filename' from server to client.
     * @param {String} filename
     * @param {Function} successCallback
     * @param {Function} errorCallback
     * @returns {undefined}
     */
    static loadFromRemote(url) {
        let callback = function (resolve, reject) {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4) {
                    if (xhttp.status === 200) {
                        resolve(xhttp.responseText);
                    } else {
                        reject(xhttp.status, xhttp.responseText);
                    }
                }
            };

            xhttp.open("POST", url, true);
            xhttp.send(null);
        };

        return new Promise(callback);
    }

    /*
     * Send contents of 'filename' from server to client.
     * @param {String} filename
     * @param {Function} successCallback
     * @param {Function} errorCallback
     * @returns {undefined}
     */
    static loadFromServer(filename) {
        let callback = function (resolve, reject) {
            var xhttp = new XMLHttpRequest();
            var data = {};
            var url = "http://" + FileOperations.getServerName() + "/" + filename;

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4) {
                    if (xhttp.status === 200) {
                        resolve(xhttp.responseText);
                    } else {
                        reject(xhttp.status, xhttp.responseText);
                    }
                }
            };

            xhttp.open("POST", url, true);
            xhttp.send(JSON.stringify(data));
        };

        return new Promise(callback);
    }
    /**
     * User selects a file, it's contents and filename are sent to 'callback'.
     * @returns {undefined}
     */
//    static loadFromFile() {
//        var filename = "";
//        var reader = new FileReader();
//        var fileSelector = document.createElement("input");
//        fileSelector.type = "file";
//        fileSelector.click();
//
//        fileSelector.onchange = function (event) {
//            event.preventDefault();
//            filename = fileSelector.files[0].name;
//            reader.readAsText(fileSelector.files[0]);
//        };
//
//        let callback = function (resolve, reject) {
//            reader.onload = function (event) {
//                resolve({
//                    text : event.target.result,
//                    filename : filename
//                });
//            };
//        };
//
//        return new Promise(callback);
//    }

    /**
     * Cause 'text' to be saved as 'filename' client side.
     * @param {type} filename The default filename to save the text as.
     * @param {type} text The text to save to filename.
     * @returns {undefined}
     */
    static saveToFile(text, filename) {
        let anchor = document.createElement('a');
        let data = "text;charset=utf-8," + encodeURIComponent(text);
        anchor.setAttribute("href", "data:" + data);
        anchor.setAttribute("download", filename);
        anchor.click();
    }
}

module.exports = FileOperations;
},{}],100:[function(require,module,exports){
/* global Function */

/*
 *  1 : unused
 *  2 : print all methods not starting with "__"
 *  3 : print all methods
 */

require("./customQuery");
module.exports = Utility = {
    enableAssertions: true,
    classes: {
        Controller: 0,
        View: 0,
        Model: 0,
        Collection: 0,
        Dictionary: 0,
        Context: 0,
        Response: 0,
        Listeners: 0,
        Schema: 0,
        TaggedEntity: 0,
        EntityDialog: 0,
        TaggedEntityWidget: 0,
        LemmaDialogModel: 0,
        LemmaDialogView: 0,
        AbstractModel: 0,
        LemmaWidget: 0,
    },
    methods: {
        notifyUnselectLemmaWidget: 0,
    },
    logger: {
        logRecord: {}
    }
};
class EnforcedTypeError extends Error {
    constructor(message, object, aClass) {
        super(message);
        this.object = object;
        this.aClass = aClass;
        window.enforcedTypeError = this;
    }
}

class AssertFailedError extends Error {
    constructor(message) {
        super(message);
    }
}

class PermittedTypes {
    constructor(index, typeList) {
        this.index = index;
        if (typeList instanceof Array) {
            this.permittedList = typeList;
        } else {
            this.permittedList = [];
            this.permittedList.push(typeList);
        }
    }
    isChecked() {
        for (let i = 0; i < this.permittedList.length; i++) {
            let item = this.permittedList[i];
            if (item === "unchecked") return false;
        }
        return true;
    }
    isNullPermitted() {
        for (let i = 0; i < this.permittedList.length; i++) {
            let item = this.permittedList[i];
            if (item === "null") return true;
        }
        return false;
    }
    isUndefinedPermitted() {
        for (let i = 0; i < this.permittedList.length; i++) {
            let item = this.permittedList[i];
            if (item === "undefined") return true;
        }
        return false;
    }
    isOptional() {
        for (let i = 0; i < this.permittedList.length; i++) {
            let item = this.permittedList[i];
            if (item === "optional") return true;
        }
        return false;
    }
    contains(object) {
        for (let i = 0; i < this.permittedList.length; i++) {
            if (this.permittedList[i] instanceof Function) {
                if (!(object instanceof Object)) {
                    if (this.permittedList[i] === Boolean && typeof object === "boolean") return true;
                    if (this.permittedList[i] === Number && typeof object === "number") return true;
                    if (this.permittedList[i] === String && typeof object === "string") return true;
                } else if (object.constructor instanceof this.permittedList[i].constructor) {
                    return true;
                } else {
                    window.obj = object;
                    window.per = this.permittedList[i];
                }
            }
        }
        return false;
    }
    toString() {
        let rvalue = [];
        for (let i = 0; i < this.permittedList.length; i++) {
            let item = this.permittedList[i];
            if (typeof item === "function") rvalue.push(item.name);
        }
        return "{" + rvalue.toString() + "}";
    }
    check(object) {
        if (!this.isChecked()) return;
        if (typeof object === "undefined") {
            if (!this.isUndefinedPermitted() && !this.isOptional()) {
                throw new EnforcedTypeError("UNDEFINED Parameter Exception @ parameter index " + this.index);
            }
        } else if (object === null) {
            if (!this.isNullPermitted()) {
                throw new EnforcedTypeError("NULL Parameter Exception @ parameter index " + this.index);
            }
        } else if (!this.contains(object)) {
            throw new EnforcedTypeError("type assertion failed @ parameter index " + this.index + "," + " found " + object.constructor.name + " expected " + this.toString());
        }
    }
}

Utility.typeCheck = function (args) {
    for (var i = 0; i < arguments.length - 1; i++) {
        let object = arguments[i + 1];


        if (typeof object === "undefined") {
            if (!this.isUndefinedPermitted() && !this.isOptional()) {
                throw new EnforcedTypeError("UNDEFINED Parameter Exception @ parameter index " + this.index);
            }
        } else if (object === null) {
            if (!this.isNullPermitted()) {
                throw new EnforcedTypeError("NULL Parameter Exception @ parameter index " + this.index);
            }
        } else if (!this.contains(object)) {
            throw new EnforcedTypeError("type assertion failed @ parameter index " + this.index + "," + " found " + object.constructor.name + " expected " + this.toString());
        }
    }
};

 Utility.enforceTypes = function (args) {
    if (!Utility.enableAssertions) return;

    /* TODO test this next in statement */
    if (args.length > (arguments.length - 1) || args.length < Utility.__minArgCount(arguments)) {
        Utility.lastTypes = args;
        throw new EnforcedTypeError("Parameter count mismatch, expected " + (arguments.length - 1) + ", found " + args.length, null, null);
    }

    for (var i = 0; i < arguments.length - 1; i++) {
        new PermittedTypes(i, arguments[i + 1]).check(args[i]);
    }
};

Utility.__isChecked = function (arrayOfTypes) {
    if (!arrayOfTypes instanceof Array) return true;
    for (let i = 0; i < arrayOfTypes.length; i++) {
        if (arrayOfTypes[i] === "unchecked") return false;
    }
    return true;
};

Utility.__permittedUndefined = function (arrayOfTypes) {
    if (!arrayOfTypes instanceof Array) return false;
    for (let i = 0; i < arrayOfTypes.length; i++) {
        if (arrayOfTypes[i] === "optional") return true;
    }
    return false;
};

Utility.__permittedNull = function (arrayOfTypes) {
    if (!arrayOfTypes instanceof Array) return false;
    for (let i = 0; i < arrayOfTypes.length; i++) {
        if (arrayOfTypes[i] === "null") return true;
    }
    return false;
};

Utility.__matchAnyType = function (object, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] instanceof Function && Utility.__testType(object, array[i])) return true;
    }
    return false;
};

Utility.__extractTypeNames = function (array) {
    var nameArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] instanceof Function) nameArray.push(array[i].prototype.name);
    }
    return false;
};

Utility.__testType = function (object, aClass) {
    if (!(object instanceof Object)) {
        if (aClass === Boolean && typeof object === "boolean") return true;
        if (aClass === Number && typeof object === "number") return true;
        if (aClass === String && typeof object === "string") return true;
    } else if (object instanceof aClass) {
        return true;
    }
    return false;
};

Utility.__minArgCountDebug = function (arguments) {
    let count = 0;

    console.log(arguments[0]);
    console.log(arguments[1]);

    for (let i = 1; i < arguments.length; i++) {
        console.log((typeof arguments[i]) + " instanceof Array " + (arguments[i] instanceof Array));
        if (arguments[i] instanceof Array) {
            for (let j = 0; j < arguments[i].length; j++) {
                if (arguments[i][j] instanceof String && arguments[i][j] === "optional") {
                    continue;
                }
            }
        } else {
            count++;
        }
    }
    return count;
};


Utility.__minArgCount = function (arguments) {
    let count = 0;

    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] instanceof Array) {
            for (let j = 0; j < arguments[i].length; j++) {
                if (arguments[i][j] instanceof String && arguments[i][j] === "optional") {
                    continue;
                }
            }
        } else {
            count++;
        }
    }
    return count;
};

Utility.getParameterNames = function (func) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
};

Utility.log = function (aClass, methodName, ptext = "", rtext = null) {
    let className = aClass.name;

    if (ptext === null) ptext = "[NULL]";
    else if (typeof ptext === "undefined") ptext = "[UNDEFINED]";

    let text = "";
    if (Utility.classes[className] >= 2 && !methodName.startsWith("__")) {
        let seconds = Math.round(Date.now() / 100 % 1000) / 10;
        text = seconds + " : " + className + "." + methodName + `(${ptext})`;
        if (typeof rtext === "string") text = text + " : " + rtext;
        else if (typeof rtext === "function") text = text + " : " + rtext();
        else if (rtext !== null) text = text + " : " + rtext.toString();
    }

    if (Utility.methods[methodName] === 2){
        console.log(text);
    }
    else if (Utility.methods[methodName] === 3){
        console.warn(text);
    }
    else if (Utility.methods[methodName] === 3){
        console.err(text);
    }
    else if (Utility.classes[className] === 2){
        console.log(text);
    }
    else if (Utility.classes[className] === 3){
        console.warn(text);
    }
    else if (Utility.classes[className] === 3){
        console.err(text);
    }

    /* setup the log record the first time a class is called */
    if (typeof Utility.logger.logRecord[className] === "undefined") {
        Utility.setupLogger(aClass);
    }

    try {
        /* add to the log record when a class is called */
        Utility.logger.logRecord[className][methodName].callCount++;
    } catch (e) {
        console.log(className + "." + methodName + " record not found");
        throw e;
}
};

Utility.setupLogger = function (aClass) {
    Utility.logger.logRecord[aClass.name] = {};
    Utility.logger.logRecord[aClass.name].name = aClass.name;
    var methods = Object.getOwnPropertyNames(aClass.prototype);
    for (let method of methods) {
        let methodName = method;
        Utility.logger.logRecord[aClass.name][methodName] = {};
        Utility.logger.logRecord[aClass.name][methodName].callCount = 0;
    }
};

Utility.logger.reportUnvisited = function (aClass = null) {
    let count = 0;
    if (aClass === null) {
        var classNames = Object.getOwnPropertyNames(Utility.logger.logRecord);
        for (let className of classNames) {
            var methodNames = Object.getOwnPropertyNames(Utility.logger.logRecord[className]);
            for (let methodName of methodNames) {
                if (Utility.logger.logRecord[className][methodName].callCount === 0) {
                    console.log(className + "." + methodName);
                    count++;
                }
            }
        }
    } else {
        var className = aClass.name;
        var record = Utility.logger.logRecord[className];
        var methodNames = Object.getOwnPropertyNames(record);
        for (let methodName of methodNames) {
            if (Utility.logger.logRecord[className][methodName].callCount === 0) {
                console.log(className + "." + methodName);
                count++;
            }
        }
    }
    console.log(count + " unvisited");
};

Utility.logger.reportVisits = function () {
    var classNames = Object.getOwnPropertyNames(Utility.logger.logRecord);
    for (let className of classNames) {
        var methodNames = Object.getOwnPropertyNames(Utility.logger.logRecord[className]);
        for (let methodName of methodNames) {
            console.log(className + "." + methodName + " " + Utility.logger.logRecord[className][methodName].callCount);
        }
    }
};

Assert = {};

Assert.exists = function (object) {
    if (typeof object === "undefined") {
        throw new AssertFailedError("assert exist failed, undefined");
    } else if (object === null) {
        throw new AssertFailedError("assert exist failed, null");
    }
};

/**
 * Return true if 'child' is a descendent of 'parent'.
 * @param {type} parent
 * @param {type} child
 * @returns {Boolean}
 */
Utility.isDescendent = function (parent, child) {
    Utility.assertType(parent, HTMLElement);
    Utility.assertType(child, HTMLElement);

    var node = child.parentNode;
    while (node !== null) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

//class EventAutomation {
//    constructor() {
//        Utility.log(EventAutomation, "constructor");
//        // Utility.enforceTypes(arguments);
//    }
//    selectRange(nodeID, startOffset, endOffset) {
//        let range = new Range();
//        let node = document.getElementById(nodeID);
//        range.setStart(node.childNodes[0], startOffset);
//        range.setEnd(node.childNodes[0], endOffset);
//        console.log(node.childNodes[0]);
//        window.getSelection().addRange(range);
//    }
//}
//
//EventAutomation.clickElement = function (nodeID) {
//    let event = new Event("click", {
//        'view': window,
//        'bubbles': true,
//        'cancelable': true
//    });
//
//    let element = document.getElementById(nodeID);
//    element.dispatchEvent(event);
//};
//
//EventAutomation.keyDown = function (nodeID) {
//    let event = new Event("keydown", {
//        'view': window,
//        'bubbles': true,
//        'cancelable': true
//    });
//
//    document.dispatchEvent(event);
//};
//
//EventAutomation.selectRange = function (nodeID, startOffset, endOffset) {
//    let range = new Range();
//    let node = document.getElementById(nodeID);
//    Utility.assertType(node, HTMLElement);
//    let start = EventAutomation.getTextNodeAtOffset(node, startOffset);
//    let end = EventAutomation.getTextNodeAtOffset(node, endOffset);
//
//    range.setStart(start.node, start.offset);
//    range.setEnd(end.node, end.offset);
//
//    window.getSelection().removeAllRanges();
//    window.getSelection().addRange(range);
//};
//
//EventAutomation.getTextNodeAtOffset = function (node, offset) {
//    let childNodes = node.childNodes;
//    let sum = 0;
//    let rOffset = offset;
//
//    for (let i = 0; i < childNodes.length; i++) {
//        let nodeType = childNodes[i].nodeType;
//
//        switch (nodeType) {
//            case 1:
//                sum = sum + childNodes[i].innerText.length;
//                if (sum <= offset) {
//                    rOffset = rOffset - childNodes[i].innerText.length;
//                } else {
//                    return EventAutomation.getTextNodeAtOffset(childNodes[i], rOffset);
//                }
//                break;
//            case 3:
//                sum = sum + childNodes[i].length;
//                if (sum <= offset) {
//                    rOffset = rOffset - childNodes[i].length;
//                } else {
//                    return {
//                        node: childNodes[i],
//                        offset: rOffset
//                    };
//                }
//                break;
//        }
//    }
//};


},{"./customQuery":101}],101:[function(require,module,exports){
/* global Utility, Context */
const NameSource = require("nerscriber").NameSource;

(function ($) {
    $.fn.mergeElements = function (name = "div") {
        let range = $(this).asRange();
        let element = document.createElement(name);
        range.surroundContents(element);
        $(this).contents().unwrap();
        return $(element);
    };
}(jQuery));

(function ($) {
    $.fn.wrap = function (name = "div") {
        let range = $(this).asRange();
        let element = document.createElement(name);
        range.surroundContents(element);
        return $(element);
    };
}(jQuery));

(function ($) {
    $.fn.selectAsRange = function () {
        let range = $(this).asRange();
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        return this;
    };
}(jQuery));

(function ($) {
    $.fn.asRange = function () {
        let start = null;
        let end = null;

        this.each(function () {
            let range = new Range();
            range.setStartBefore($(this).get(0));
            range.setEndAfter($(this).get(0));
            if (start === null || range.startOffset < start.startOffset) start = range;
            if (end === null || range.endOffset > end.endOffset) end = range;
        });

        let range = new Range();
        range.setStart(start.startContainer, start.startOffset);
        range.setEnd(end.endContainer, end.endOffset);
        return range;
    };
}(jQuery));

/**
 * Get/Set an xml attribute of this entity.  An xml attribute will be present when the document is decoded.
 * @param {type} $
 * @returns {undefined}
 */
(function ($) {
    $.fn.xmlAttr = function (key, value) {
        if (key === "" && value) throw new Error("Empty key value.");

        if (typeof value === "undefined") {
            let xmlAttr = $(this).attr($.fn.xmlAttr.defaults.attrName);
            if (typeof xmlAttr === "undefined") return xmlAttr;
            let jsonObj = JSON.parse(xmlAttr);
            if (!jsonObj[key]) return "";
            return jsonObj[key];
        }

        return this.each(function () {
            let xmlAttr = $(this).attr($.fn.xmlAttr.defaults.attrName);
            if (!xmlAttr) {
                $(this).attr($.fn.xmlAttr.defaults.attrName, "{}");
                xmlAttr = $(this).attr($.fn.xmlAttr.defaults.attrName);
            }

            let jsonObj = JSON.parse(xmlAttr);
            jsonObj[key] = value;
            $(this).attr($.fn.xmlAttr.defaults.attrName, JSON.stringify(jsonObj));
        });
    };
}(jQuery));

/**
 * Get/Set an xml attribute of this entity.  An xml attribute will be present when the document is decoded.
 * @param {type} $
 * @returns {undefined}
 */
(function ($) {
    $.fn.renameXMLAttr = function (fromKey, toKey) {
        if (!fromKey) return;
        if (!toKey) return;
        if (fromKey === toKey) return;

        return this.each(function () {
            let xmlAttr = $(this).attr($.fn.xmlAttr.defaults.attrName);
            /* all divs that come from encode will have this attribute */
            if (typeof xmlAttr !== "undefined") {
                let jsonObj = JSON.parse(xmlAttr);
                jsonObj[toKey] = jsonObj[fromKey];
                delete jsonObj[fromKey];
                $(this).attr($.fn.xmlAttr.defaults.attrName, JSON.stringify(jsonObj));
            }
        });
    };
}(jQuery));

/**
 * Get/Set the value of the collection attribute of this entity.  This is not
 * an xml attribute.  Will return an empty string if no collection found.
 * @param {type} $
 * @returns {undefined}
 */
(function ($) {
    $.fn.collection = function (value) {
        if (typeof value === "undefined") {
            let collection = $(this).attr("data-collection");
            if (!collection) collection = "";
            return collection;
        }

        return this.each(function () {
            if (value === "") {
                $(this).removeAttr("data-collection");
            } else {
                $(this).attr("data-collection", value);
            }
        });
    };
}(jQuery));

/**
 * Get/Set the value of the lemma attribute of this entity.
 * @param {type} $
 * @returns {undefined}
 */
(function ($) {
    $.fn.lemma = function (value) {
        var context = $.fn.xmlAttr.context;

        if (typeof value === "undefined") {
            let tagName = $(this).attr($.fn.xmlAttr.defaults.xmlTagName);
            let lemmaAttr = context.getTagInfo(tagName, NameSource.NAME).getLemmaAttribute();
            if (lemmaAttr === "" || typeof lemmaAttr === "undefined") return "";
            return $(this).xmlAttr(lemmaAttr);
        }

        return this.each(function () {
            let tagName = $(this).attr($.fn.xmlAttr.defaults.xmlTagName);
            let lemmaAttr = context.getTagInfo(tagName, NameSource.NAME).getLemmaAttribute();
            if (lemmaAttr !== "") $(this).xmlAttr(lemmaAttr, value);
        });
    };
}(jQuery));

/**
 * Get/Set the value of the link attribute of this entity.
 * @param {type} $
 * @returns {undefined}
 */
(function ($) {
    $.fn.link = function (value) {
        var context = $.fn.xmlAttr.context;

        if (typeof value === "undefined") {
            let tagName = $(this).attr($.fn.xmlAttr.defaults.xmlTagName);
            let linkAttr = context.getTagInfo(tagName, NameSource.NAME).getLinkAttribute();
            if (linkAttr === "" || typeof linkAttr === "undefined") return "";
            return $(this).xmlAttr(linkAttr);
        }

        return this.each(function () {
            let tagName = $(this).attr($.fn.xmlAttr.defaults.xmlTagName);
            let linkAttr = context.getTagInfo(tagName, NameSource.NAME).getLinkAttribute();
            $(this).xmlAttr(linkAttr, value);
        });
    };
}(jQuery));

/**
 * Get/Set the value of the tag attribute of this entity.
 * @param {type} $
 * @returns {undefined}
 */
(function ($) {
    $.fn.tag = function (value) {
        let context = $.fn.xmlAttr.context;

        if (!value) {
            return $(this).attr($.fn.xmlAttr.defaults.xmlTagName);
        }

        /* when changing the entity tag, attribute name of the link & lemma attributes may change */
        return this.each(function () {
            let oldEntityTag = $(this).attr($.fn.xmlAttr.defaults.xmlTagName);
            if (oldEntityTag) {
                $(this).renameXMLAttr(context.getTagInfo(oldEntityTag, NameSource.NAME).getLinkAttribute(), context.getTagInfo(value, NameSource.NAME).getLinkAttribute());
                $(this).renameXMLAttr(context.getTagInfo(oldEntityTag, NameSource.NAME).getLemmaAttribute(), context.getTagInfo(value, NameSource.NAME).getLemmaAttribute());
            }
            return $(this).attr($.fn.xmlAttr.defaults.xmlTagName, value);
        });
    };
}(jQuery));

///**
// * Get/Set the value of the tag attribute of this entity.
// * @param {type} $
// * @returns {undefined}
// */
//(function ($) {
//    $.fn.tagName = function (value) {
//        console.warn("deprecated, use 'tag' instead");
//        let context = $.fn.xmlAttr.context;
//
//        if (!value) {
//            return $(this).attr($.fn.xmlAttr.defaults.xmlTagName);
//        }
//
//        /* when changing the entity tag, attribute name of the link & lemma attributes may change */
//        return this.each(function () {
//            let oldEntityTag = $(this).attr($.fn.xmlAttr.defaults.xmlTagName);
//            if (oldEntityTag) {
//                $(this).renameXMLAttr(context.getTagInfo(oldEntityTag, NameSource.NAME).getLinkAttribute(), context.getTagInfo(value, NameSource.NAME).getLinkAttribute());
//                $(this).renameXMLAttr(context.getTagInfo(oldEntityTag, NameSource.NAME).getLemmaAttribute(), context.getTagInfo(value, NameSource.NAME).getLemmaAttribute());
//            }
//            return $(this).attr($.fn.xmlAttr.defaults.xmlTagName, value);
//        });
//    };
//}(jQuery));

$.fn.xmlAttr.notifyContextChange = function(context){
    // Utility.enforceTypes(arguments, Context);
    $.fn.xmlAttr.context = context;
};

$.fn.xmlAttr.context = null;

$.fn.xmlAttr.defaults = {
    attrName: "xmlattrs",
    xmlTagName: "xmltagname"
};


},{"nerscriber":51}],102:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"dup":99}],103:[function(require,module,exports){
module.exports = class HostInfo {
    constructor() {
        let prequel = "ws://";
        let host = window.location.host;
        if (host === "beta.cwrc.ca") host = "dh.sharcnet.ca";
        if (window.location.protocol === "https:") prequel = "wss://";
        
        this.rootSocketAddress = `${prequel}${host}/${HostInfo.rootPath()}/NerveSocket`;
        
//        this.dictionarySocketAddress = `${prequel}${host}/${HostInfo.rootPath()}/Dictionary`;
//        this.scriberSocketAddress = `${prequel}${host}/${HostInfo.rootPath()}/Scriber`;
    }

    static getType(){ return HostInfo;}
    static rootPath(){ return window.location.pathname.split("/")[1];}
};
},{}],104:[function(require,module,exports){
const jjjrmi = require("jjjrmi");

module.exports = class Storage {
    constructor(settingsName = location.pathname.split("/")[1]) {
        this.sName = settingsName;
        this.translator = new jjjrmi.Translator();
        
        if (!localStorage.hasOwnProperty(settingsName)) {
            Storage.putObject({}, settingsName);
        }
    }

    static putObject(obj, objectID){
        localStorage[objectID] = JSON.stringify(obj);
    }

    static getObject(objectID){
        if (localStorage.hasOwnProperty(objectID)) {
            return JSON.parse(localStorage[objectID]);
        } else {
            return {};
        }
    }

    registerPackage(pkg){
        this.translator.registerPackage(pkg);
    }

    registerClass(aClass){
        this.translator.registerClass(aClass);
    }

    clearAll() {
        Storage.putObject({}, this.sName);
    }
    getValue(key) {        
        var encoded = Storage.getObject(this.sName);
        if (encoded[key] === null) throw new Error(`null value associated with key "${key}" in storage "${this.sName}"`);
        if (typeof encoded[key] === "undefined") throw new Error(`undefined value associated with key "${key}" in storage "${this.sName}"`);
        let decoded = this.translator.decode(encoded[key]);
        this.translator.clear();
        return decoded;
    }
    hasValue(key) {
        var settings = Storage.getObject(this.sName);
        if (typeof settings[key] === "undefined" || settings[key] === null) return false;
        return true;
    }
    deleteValue(key) {
        var settings = Storage.getObject(this.sName);
        delete settings[key];
        Storage.putObject(settings, this.sName);
    }
    setValue(key, value) {
        let encoded = this.translator.encode(value);
        var settings = Storage.getObject(this.sName);
        settings[key] = encoded;
        Storage.putObject(settings, this.sName);
        this.translator.clear();
    }

    toString() {
        return JSON.stringify(Storage.getObject(this.sName), null, 2);
    }
}
},{"jjjrmi":25}],105:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"./customQuery":101,"dup":100}]},{},[83])