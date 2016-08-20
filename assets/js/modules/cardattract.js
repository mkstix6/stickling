'use strict'

let mposit = [0, 0]

document.onmousemove = handleMouseMove;

function handleMouseMove(event) {
    mposit = [event.pageX - 500, event.pageY - 500]
}

function cardAttract() {
    let card = document.getElementById('mecard')

    function renderattract() {
        card.style.transform = "rotateX(" + (mposit[1] * 0.01) + "deg) rotateY(" + (mposit[0] * -0.01) + "deg)"

        window.requestAnimationFrame(renderattract)
    }
    window.requestAnimationFrame(renderattract)
}

module.exports = cardAttract;