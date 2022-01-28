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
			currentDateStatus: false,
			currentTime: null,
			event: {},
			tickets: [],
			cart: {},
			total: 0,
      masks: {
        // title: 'MMM',
        weekdays: 'WWW',
      },
		};
	},	
	mounted() {
		this.event = {
			event_id: 1001,
			address: 'ул. Ленина 1',
		};
		// const ref = this.$refs.calendar.pages[0];
		// ref.weeks = 1;
		// ref.title = 'wadwa';
		// ref.days = {};
	},
	methods: {
    getDate: function (day) { //get date from calendar
      this.currentTime = null;
      let currentDate = {
        id: day.id,
        ariaLabel: day.ariaLabel,
        day: day.day,
        months: day.month,
        year: day.year
      };
      this.currentDate = currentDate;
			this.currentDateStatus = true;
      this.times = ['12:00', '13:00'];
    },
		setTime: function (time) {
      this.currentTime = time;
			this.tickets = this.getTickets(time);
		},
		getTickets: function (time) {
      // return API
			console.log('get API time:', time);

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

			if (this.cart[this.currentDate.id + this.currentTime]) {
				for (let key in this.cart[this.currentDate.id + this.currentTime][
					'tickets'
				]) {
					tickets[key]['quantity'] =
						this.cart[this.currentDate.id + this.currentTime]['tickets'][key][
							'quantity'
						];
				}
			}
			return tickets;
		},
		addTicket: function (ticket) {
			ticket.quantity++;

			if (!this.cart[this.currentDate.id + this.currentTime]) {
				const data = {
					event_id: this.event.event_id,
					date: this.currentDate,
					time: this.currentTime,
					address: this.event.address,
					tickets: {},
				};
				this.cart[this.currentDate.id + this.currentTime] = data;
			}

			this.cart[this.currentDate.id + this.currentTime]['tickets'][ticket.id] = {
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
				this.cart[this.currentDate.id + this.currentTime]['tickets'][ticket.id] = {
					...ticket,
				};
			} else {
				if (ticket.quantity === 1) {
					ticket.quantity--;
				}
				// если 1 то удаляем из массива
				delete this.cart[this.currentDate.id + this.currentTime]['tickets'][
					ticket.id
				];

				if (
					this.isEmpty(
						this.cart[this.currentDate.id + this.currentTime]['tickets']
					)
				) {
					delete this.cart[this.currentDate.id + this.currentTime];
				}
			}

			this.updateTotal();
		},
		removeTicketFull: function (elem) {
			delete this.cart[this.currentDate.id + this.currentTime];
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
