$(document).ready(() => {
  $(document).foundation();
});

$('.mobile__menu').click(function() {
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

/*slider with thumbs*/
var swiper1 = new Swiper(".mySwiper-1", {
  freeMode: false,
  navigation: {
    nextEl: "#swiper-button-thumbs-next",
    prevEl: "#swiper-button-thumbs-prev",
  },
  centeredSlides: false,
  watchSlidesProgress: true,
  slidesPerView: 3,
});
var swiper2 = new Swiper(".mySwiper2", {
  thumbs: {
    swiper: swiper1,
  },
});

/*section virtual text open*/
$('.l-virtual__descr-open-btn').click(function() {
  $('.l-virtual__descr-container').toggleClass('l-virtual__descr-container-open');
  $('.l-events__detail-image').css('background-size', '100%');
  $('.l-virtual__descr-open-btn').text('СКРЫТЬ ТЕКСТ');
});

var app = new Vue({
  el: '#app',
  data: () => ({
    //Страница Сделать пожертвование
    prices: ['100', '300', '500', '1000'],
    //Страница Оформление заказ
    time: 'Выберите время',
    hours: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
    cartTime: null,
    ticket: [
      {
        id: 1,
        name: 'Взрослый',
        price: 100,
        quantity: 0,
        time: ''
      },
      {
        id: 2,
        name: 'Детский',
        price: 50,
        quantity: 0,
        time: ''
      }
    ],
    ticketQuantityTotal: '',
    ticketActive: false,
    total: null,
    cart: [],
  }),
  methods: {
    addTime(value) {
      this.cartTime = value;
      console.log(this.cartTime);
    },
    addTicket(idx) {
      if (!this.cart[idx]) {
        let data = {
          id: this.ticket[idx].id,
          name: this.ticket[idx].name,
          price: this.ticket[idx].price,
          quantity: this.ticket[idx].quantity,
          time: this.cartTime,
          totalPrice: this.price * this.quantity
        }
        this.cart.push (data)
        // this.cart.push ({
        //   time: this.cartTime[idx]
        // })
      }
      this.ticketActive = true;
      this.ticketQuantityTotal = this.cart[idx].quantity += 1;
      this.ticketQuantityTotal = this.ticket[idx].quantity += 1;
      this.total = this.cart[idx].price * this.cart[idx].quantity
      console.log(this.cart);
    },
    deleteTicket(idx) {
      if (this.ticketQuantityTotal <= 1) {
        this.ticketActive = false;
      } 
      if (this.ticketQuantityTotal > 0) {
        this.ticketQuantityTotal = this.ticket[idx].quantity -= 1;
        this.total = this.cart[idx].price * this.cart[idx].quantity
      }
    },
  }
});


