$(document).ready(() => {
  $(document).foundation();
});

$('.mobile__menu').click(function() {
  $('.mobile-menu__container').toggleClass('mobile-menu-active');
  $('.mobile__menu').toggleClass('mobile__menu-icon-active');
});