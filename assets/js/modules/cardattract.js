'use strict'

let mposit = [0, 0]

document.onmousemove = handleMouseMove

function handleMouseMove (event) {
  mposit = [event.pageX - 500, event.pageY - 500]
}

function cardAttract () {
  let card = document.getElementById('mecard'),
    shimmer = document.getElementById('shimmer')

  function renderattract () {
    card.style.transform = 'rotateX(' + (mposit[1] * 0.01) + 'deg) rotateY(' + (mposit[0] * -0.01) + 'deg)'
    shimmer.style.transform = 'translateZ(0px) translateY(' + (mposit[1] * 0.1 - 100) + 'px) translateX(' + (mposit[0] * 0.1) + 'px)'

    window.requestAnimationFrame(renderattract)
  }
  window.requestAnimationFrame(renderattract)
}

module.exports = cardAttract
