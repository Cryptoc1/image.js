;
(function(images, undefined) {

  function init() {

    var imgs = document.images

    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].dataset.imageJs !== undefined) {
        var img = new Image()
        img.onload = function() {
          imgs[this.index].src = this.src
        }

        var src = imgs[i].src,
          path = src.slice(0, src.lastIndexOf('.')),
          ext = src.slice(src.lastIndexOf('.'), src.length)

        img.index = i
        img.src = path + '@2x' + ext
      }
    }
  }

  images.init = init

  window.Images = images

})(window.Images || {}, undefined)
