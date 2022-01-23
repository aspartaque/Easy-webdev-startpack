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
/*section collections text open*/
$('.open-text').click(function() {
  $('.l-collections-small-container').toggleClass('opened-text');
  $('.open-text').text('Свернуть');
});


var app = new Vue({
  el: '#app',
  data: () => ({
    // Страница Сделать пожертвование
    prices: ['100', '300', '500', '1000'],
    // Страница Оформление заказа
    date: [], // тут данные с календаря
    hours: [
      {
        time: '10:00'
      },
      {
        time: '12:00'
      },
      {
        time: '14:00'
      },
      {
        time: '16:00'
      },
    ],
    ticket: [
      {
        id: 1,
        name: 'Взрослый',
        price: 100,
        quantity: 0,
        start: '10:00'
      },
      {
        id: 2,
        name: 'Детский',
        price: 50,
        quantity: 0,
        start: '10:00'
      },
      {
        id: 3,
        name: 'Группам',
        price: 500,
        quantity: 0,
        start: '14:00'
      },
      {
        id: 4,
        name: 'ne pokazyvat',
        price: 330,
        quantity: 0,
        // start: '10:00'
      }
    ],
    cart: {
      items: [
        // {
        //   date: [],
        //   time: [],
        //   tickets: [],
        //   totalCount: [],
        //   totalAmount: [],
        // },
      ],
      currentTime: null,
    },
    selected: false,
    totalQuantity: 0,
  }),
  // computed: {
  //   totalQ(id) {
  //     this.cart.items.forEach(item => {
  //       item.tickets.forEach(q => {
  //         this.totalQuantity = q.quantity += 1;
  //       })
  //     });
  //   }
  // },
  methods: {
    addTime(value) {
      let t = value;
      this.cart.currentTime = t.time;
      this.selected = this.cart.currentTime;
      let data = {
        date: null,
        time: this.cart.currentTime,
        count: null,
        amount: null,
        tickets: [],
      };
      this.cart.items.push (data); //пушится дважды - исправить
    },
    addTicket(id) {
      this.cart.items.forEach(item => {
        if (!item.tickets[id]) {
          let tickets = {
            id: this.ticket[id].id,
            name: this.ticket[id].name,
            price: this.ticket[id].price,
            quantity: this.ticket[id].quantity,
            start: this.ticket[id].start,
          };
          item.tickets.push (tickets);
        }
        item.tickets[id].quantity += 1;
      });
    },
  },
})