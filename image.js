;
(function(images, undefined) {

  var _listeners = {}

  function on(e, cb) {
    if (!_listeners.hasOwnProperty(e)) _listeners[e] = []
    _listeners[e].push(cb)
  }

  function emit(e) {
    if (!_listeners.hasOwnProperty(e)) {
      // console.warn('Events.js: event "' + e + '" has no registered listeners.')
    } else {
      var args = Array.prototype.slice.call(arguments)
      args.splice(0, 1)

      _listeners[e].map(function(cb) {
        setTimeout(function() {
          // we use a timeout to make the call async, because we don't have to wait for cb to return
          cb.apply(null, args)
        }, 0)
      })
    }
  }


  function init() {

    var imgs = document.images

    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].dataset.imageJs !== undefined) {
        var img = new Image()
        img.onload = function() {
          imgs[this.data.index].src = this.src
          imgs[this.data.index].dataset.imageJsLoaded = true

          emit('image-loaded', {
            event: 'image-loaded',
            name: 'Image Load',
            message: 'High resolution image loaded.',
            image: this,
            elements: {
              loaded: this,
              modified: imgs[this.data.index]
            },
            time: Date.now() - this.data.init,
            src: this.src
          })
        }

        var src = imgs[i].src,
          path = src.slice(0, src.lastIndexOf('.')),
          ext = src.slice(src.lastIndexOf('.'), src.length)

        img.data = {
            index: i,
            init: Date.now()
        }
        img.src = path + '@2x' + ext
      }
    }
  }

  images.init = init
  images.on = on

  window.Images = images

})(window.Images || {}, undefined)
