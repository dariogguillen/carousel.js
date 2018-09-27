const carousel = document.getElementById('carousel')
const items = carousel.children
const btns = document.querySelectorAll('.btn')
const swipeCont = document.getElementById('swipe')
let increment = 360 / items.length
let rotationItem = 0
let rotation = 0
let swipeOrigin = 0
let swipeEnd = 0

Object.keys(items).forEach(key => {
  items[key].style.transform = `rotateY(${increment *
    key}deg) translateZ(400px) rotateY(-${increment * key}deg)`
})

const rotateCarousel = el => {
  if (el.textContent === 'left') {
    rotation += increment
    rotationItem = increment
  } else {
    rotation -= increment
    rotationItem = -increment
  }
  carousel.style.transform = `rotateY(${rotation}deg)`
  Object.keys(items).forEach(key => {
    let origin = Number(
      items[key].style.transform
        .split(' ')[2]
        .split('(')[1]
        .split('d')[0]
    )
    items[key].style.transform = `rotateY(${increment *
      key}deg) translateZ(400px) rotateY(${origin - rotationItem}deg)`
  })
}

const swipe = (from, to) => {
  if (from + 50 < to) {
    rotateCarousel(document.getElementById('left'))
  } else if (to < from - 50) {
    rotateCarousel(document.getElementById('right'))
  }
}

// Click
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    rotateCarousel(btn)
  })
})

// mouse events
swipeCont.addEventListener('mousedown', e => {
  swipeOrigin = e.clientX
})
swipeCont.addEventListener('mouseup', e => {
  swipeEnd = e.clientX
})
swipeCont.addEventListener('click', () => {
  swipe(swipeOrigin, swipeEnd)
})

// touch events
swipeCont.addEventListener('touchstart', e => {
  e.preventDefault()
  swipeOrigin = e.touches[0].clientX
})
swipeCont.addEventListener('touchmove', e => {
  swipeEnd = e.changedTouches[0].clientX
})
swipeCont.addEventListener('touchend', () => {
  swipe(swipeOrigin, swipeEnd)
})
