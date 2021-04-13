import "./components/orbiter/orbiter.scss";
import "./components/animate-logo/animate-logo.css";
import animateLogo from "./components/animate-logo/animate-logo.js";

console.log("Hello World!");

// Handler when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  animateLogo();
});
