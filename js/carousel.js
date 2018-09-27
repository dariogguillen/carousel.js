var Carousel = function (config) {
  var carousel = document.getElementById(config.carouselContainer)
  var btnLeft = document.getElementById(config.btnLeft)
  var btnRight = document.getElementById(config.btnRight)
  var touchCont = document.getElementById(config.touchCont)
  var items = Object.values(carousel.children)
  var increment = 360 / items.length
  var radio = config.radio
  var translation = 0
  var rotation = 0
  var itemActive = 0
  var touchOrigin = 0
  var touchEnd = 0

  // cambiar id y clase de elemento activo
  function changeIdClass () {
    if (itemActive > items.length - 1) {
      itemActive = 0
    } else if (itemActive < 0) {
      itemActive = items.length - 1
    }

    if (config.activeItemId) {
      var idActive = config.activeItemId
      items.forEach(function (item) {
        if (item === items[itemActive]) {
          item.id = idActive
        } else {
          item.id = ''
        }
      })
    }

    if (config.activeItemClass) {
      var classActive = config.activeItemClass
      items.forEach(function (item) {
        if (item === items[itemActive]) {
          item.classList.add(classActive)
        } else {
          item.classList.remove(classActive)
        }
      })
    }
  }

  // colocar items en posición
  function initialPosition () {
    if (config.rotation) {
      items.forEach(function (item, i) {
        item.style.transform = 'rotateY(' + (increment * i) +
          'deg) translateZ(' + radio + 'px) rotateY(' +
          (-increment * i) + 'deg)'
      })
    } else {
      items.forEach(function (item, i) {
        item.style.transform = 'rotateY(' + (increment * i) +
          'deg) translateZ(' + radio + 'px)'
      })
    }
    changeIdClass()
  }

  // rotacion individual para que todos los elemtos vea hacia el frente
  function rotationIndividual () {
    if (config.rotation) {
      items.forEach(function (item, i) {
        var origin = Number(item.style.transform.split(' ')[2].split('(')[1].split('d')[0])
        item.style.transform = 'rotateY(' + (increment * i) +
        'deg) translateZ(' + radio + 'px) rotateY(' +
        (origin + rotation) + 'deg)'
      })
    }
  }

  // rotar carousel a la izquierda
  function rotateLeft () {
    translation -= increment
    rotation = increment
    carousel.style.transform = 'rotateY(' + translation + 'deg)'
    itemActive++
    changeIdClass()
    rotationIndividual()
  }

  // rotar carousel a la derecha
  function rotateRight () {
    translation += increment
    rotation = -increment
    carousel.style.transform = 'rotateY(' + translation + 'deg)'
    itemActive--
    changeIdClass()
    rotationIndividual()
  }

  // funcion para evento touch
  function swipeTo (from, to) {
    if (from + 50 < to) {
      rotateRight()
    } else if (to < from - 50) {
      rotateLeft()
    }
  }

  // manejador de eventos dependiendo del elemento
  function handleEvents (e) {
    switch (e.target) {
      case btnLeft:
        rotateLeft()
        break
      case btnRight:
        rotateRight()
        break
      case touchCont:
        swipeTo(touchOrigin, touchEnd)
        touchOrigin = 0
        touchEnd = 0
        break
    }
  }

  function touchActive () {
    if (config.touchActive) {
      touchCont.addEventListener('touchstart', function (e) {
        e.preventDefault()
        touchOrigin = e.touches[0].clientX
      })
      touchCont.addEventListener('touchmove', function (e) {
        touchEnd = e.changedTouches[0].clientX
      })
      touchCont.addEventListener('touchend', handleEvents)
    }
  }

  // inicar carousel
  function init () {
    initialPosition()
    btnRight.addEventListener('click', handleEvents)
    btnLeft.addEventListener('click', handleEvents)
    touchActive()
  }

  init()

  return {
    rotateLeft: rotateLeft,
    rotateRight: rotateRight
  }
}

var carousel = Carousel({
  carouselContainer: 'carousel',
  btnLeft: 'left',
  btnRight: 'right',
  rotation: true,
  activeItemId: 'active',
  activeItemClass: 'active',
  radio: 400,
  touchActive: true,
  touchCont: 'touchCont'
})
