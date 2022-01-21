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

// Vue.component('vue-horizontal-calendar', {
//   el: '#app',
//   components: {
//     VueHorizontalCalendar
//   }
// });

var app = new Vue({
  el: '#app',
  data: () => ({
    // Страница Сделать пожертвование
    prices: ['100', '300', '500', '1000'],
    // Страница Оформление заказа
    date: [], // тут данные с календаря
    numbers: [ 1, 2, 3, 4, 5 ],
    hours: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'], // Часы
    ticket: [
      {
        id: 1,
        name: 'Взрослый',
        price: 100,
        quantity: 0,
        timeStart: '10:00'
      },
      {
        id: 2,
        name: 'Детский',
        price: 50,
        quantity: 0,
        timeStart: '10:00'
      },
      {
        id: 3,
        name: 'Группам',
        price: 500,
        quantity: 0,
        timeStart: '15:00'
      },
      {
        id: 4,
        name: 'ne pokazyvat',
        price: 330,
        quantity: 0,
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
    },
    cartTime: null, // Выбранное время
    cartQuantityTotal: '', // Общее кол-во билетов в корзине -net
    ticketActive: false, // показать ранее скрытый текст "Итого"
    pickTicket: false,
    isActive: false,
  }),
  methods: {
    addTime(value) {
      this.cartTime = value;
      if (this.cartTime) {
        let data = {
          date: [],
          time: this.cartTime,
          tickets: [],
          totalCount: [],
          totalAmount: [],
        }
        this.cart.items.push (data);
        this.pickTicket = true;
      }
    },
    addTicket(index) {
      this.cart.items.forEach(item => {
        if (!item.tickets[index]) {
          let data = {
            id: this.ticket[index].id,
            name: this.ticket[index].name,
            price: this.ticket[index].price,
            quantity: this.ticket[index].quantity,
          }
          item.time = this.cartTime;
          item.tickets.push (data);
        }
        this.cartQuantityTotal = item.tickets[index].quantity += 1;
        this.cartQuantityTotal = this.ticket[index].quantity += 1;
        if (item.tickets[index].quantity >= 1) {
          this.ticketActive = true;
        }
        console.log(this.cart);
      });
    },
    deleteTicket(index) {
      this.cart.items.forEach(item => {
        if (item.tickets[index].quantity > 0) {
          this.cartQuantityTotal = item.tickets[index].quantity -= 1;
          this.cartQuantityTotal = this.ticket[index].quantity -= 1;
        }
        if (item.tickets[index].quantity < 1) {
          this.ticketActive = false;
          item.tickets.splice(index, 1);
        }
        // item.tickets = item.tickets.filter(i => i.id !== index.id);
      });
    },
  },
  computed: {
    cartTotalAmount() {
      this.cart.items.forEach(item => {
        let total = 0;
        total = item.tickets.reduce( (acc, itemTotal) => {
            return acc + (itemTotal.quantity * itemTotal.price)
        }, 0);
        item.totalAmount = total;
        return total;
      });
    },
    cartTotalCount() {
      this.cart.items.forEach(item => {
        let totalQuantity = 0;
        totalQuantity = item.tickets.reduce( (acc, itemTotal) => {
            return acc + (itemTotal.quantity)
        }, 0);
        item.totalCount = totalQuantity;
        return totalQuantity;
      });
    },
    getTickets() {
      let cartTime = this.cartTime;
      return this.ticket.filter(function (item) {
        if (item.timeStart == cartTime) {
          return item;
          // console.log(item);
        }
      });
    }
    // checkStatusBtns(index) {
    //   this.cart.items.forEach(item => {
    //     if (item.time == this.cartTime) {
    //       this.isActive = !this.isActive;
    //     }
    //   });
    // }
  }
});


