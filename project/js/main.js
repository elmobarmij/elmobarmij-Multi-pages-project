"use strict";

const menuBtn = document.querySelector(".header__menu");
const openBtn = document.querySelector(".icon__open");
const closeBtn = document.querySelector(".icon__close");
const headerLinks = document.querySelector(".header__links");

menuBtn.addEventListener("click", function () {
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    headerLinks.classList.add("active");
    headerLinks.style.display = "flex";
  } else {
    headerLinks.classList.remove("active");
    headerLinks.style.display = "none";
  }
});
