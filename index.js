"use strict";

let mposit = [0, 0]

document.onmousemove = handleMouseMove;

;
(function attract() {
    let card = document.getElementById('mecard')
        // cposition = card.getBoundingClientRect()

    function renderattract() {
        // cposition = card.getBoundingClientRect()
        card.style.transform = "rotateX(" + (mposit[1] * 0.01) + "deg) rotateY(" + (mposit[0] * -0.01) + "deg)"

        // console.log(cposition)
        // console.log("position", mposit)
        window.requestAnimationFrame(renderattract)
    }
    window.requestAnimationFrame(renderattract)
})()

function handleMouseMove(event) {

    mposit = [event.pageX - 500, event.pageY - 500]
}