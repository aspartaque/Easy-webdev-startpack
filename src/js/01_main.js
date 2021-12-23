$(document).ready(() => {
  $(document).foundation();
});

$('.mobile__menu').click(function() {
  $('.mobile-menu__container').toggleClass('mobile-menu-active');
  $('.mobile__menu').toggleClass('mobile__menu-icon-active');
});

/*slider*/
var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});