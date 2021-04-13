/**
 * Animate the Mark Stickling SVG hero logo
 */
export default function () {
  CSSPlugin.defaultTransformPerspective = 80;
  // const svgEl = document.querySelector(".logoAnimatedParts svg");
  gsap.from(".logoAnimatedParts svg", {
    // y: translateDistance,
    scale: 2,
    rotateX: 90,
    duration: 1.4,
    ease: "elastic.out(0.3,0.3)",
  });
  const translateDistance = Math.random() * 500 + 1000;
  gsap.timeline().from(".logoAnimatedParts svg path", {
    y: translateDistance,
    scale: 0.1,
    rotate: "random(-300deg,300deg)",
    duration: "random(0.8, 1.3)",
    ease: "elastic.out(0.3,0.3)",
  });
}
