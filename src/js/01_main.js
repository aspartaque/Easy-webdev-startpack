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
	data() {
		return {
			dates: ['28-01-2022', '29-01-2022', '30-01-2022'],
			times: [],
			currentDate: null,
			currentTime: null,
			event: {},
			tickets: [],
			cart: {},
			total: 0,
      masks: {
        title: 'MMM',
        weekdays: 'WWW',
      },
      attrs: [
        {
          days: 7,
          weeks: 1
        }
      ]
		};
	},
  // components: {
  //   Calendar,
  // },
	mounted() {
		this.event = {
			event_id: 1001,
			address: 'ул. Ленина 1',
		};
	},
	methods: {
    getTimes: function (date) {
      this.currentTime = null;
			this.currentDate = date;
      
			// get times API
			// example
      
			this.times = ['12:00', '13:00'];
		},
		setTime: function (time) {
      this.currentTime = time;
			this.tickets = this.getTickets(time);
		},
		getTickets: function (time) {
      // return API
      console.log(this.$refs.pages.pages);
			console.log('get API time:', time);
      this.$refs.pages.pages[0].days[5].label = '222';
			let tickets = {
				1: {
					id: 1,
					name: 'Взрослый',
					price: 1000,
					quantity: 0,
				},
				2: {
					id: 2,
					name: 'Детский',
					price: 800,
					quantity: 0,
				},
			};

			if (this.cart[this.currentDate + this.currentTime]) {
				for (let key in this.cart[this.currentDate + this.currentTime][
					'tickets'
				]) {
					tickets[key]['quantity'] =
						this.cart[this.currentDate + this.currentTime]['tickets'][key][
							'quantity'
						];
				}
			}
			return tickets;
		},
		addTicket: function (ticket) {
			ticket.quantity++;

			if (!this.cart[this.currentDate + this.currentTime]) {
				const data = {
					event_id: this.event.event_id,
					date: this.currentDate,
					time: this.currentTime,
					address: this.event.address,
					tickets: {},
				};
				this.cart[this.currentDate + this.currentTime] = data;
			}

			this.cart[this.currentDate + this.currentTime]['tickets'][ticket.id] = {
				...ticket,
			};

			this.updateTotal();
			// => return updated cart API
		},
		removeTicket: function (ticket) {
			console.log('remove ticket');

			// если больше 0 то минусуем
			if (ticket.quantity > 1) {
				ticket.quantity--;
				this.cart[this.currentDate + this.currentTime]['tickets'][ticket.id] = {
					...ticket,
				};
			} else {
				if (ticket.quantity === 1) {
					ticket.quantity--;
				}
				// если 1 то удаляем из массива
				delete this.cart[this.currentDate + this.currentTime]['tickets'][
					ticket.id
				];

				if (
					this.isEmpty(
						this.cart[this.currentDate + this.currentTime]['tickets']
					)
				) {
					delete this.cart[this.currentDate + this.currentTime];
				}
			}

			this.updateTotal();
		},
		isEmpty: function (obj) {
			for (let key in obj) {
				return false;
			}
			return true;
		},
		updateTotal: function () {
			let total = 0;

			for (const key in this.cart) {
				let elem = this.cart[key]['tickets'];

				for (const ticket in elem) {
					let value = elem[ticket]['price'] * elem[ticket]['quantity'];
					total = total + value;
				}
			}
			this.total = total;
		},
		clearCart: function () {
			this.currentDate = null;
			this.currentTime = null;
			this.times = [];
			this.cart = {};
			this.updateTotal();
		},
	},
});
