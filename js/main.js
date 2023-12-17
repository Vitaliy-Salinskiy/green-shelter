const sliderLine = document.querySelector(".top-content"),
	pagination = document.querySelectorAll(".top__pagination-item"),
	nav = document.querySelector(".header__menu"),
	header = document.querySelector(".header"),
	headerBtn = document.querySelector(".header__btn"),
	link = document.querySelectorAll(".header__menu-list"),
	logo = document.querySelector(".header-img"),
	burger = document.querySelector(".header__burger"),
	aboutImg = document.querySelector(".about-img"),
	popupImg = document.querySelector(".popup-img"),
	body = document.body,
	wrapper = document.querySelector(".wrapper"),
	main = document.querySelector(".main"),
	footer = document.querySelector(".footer"),
	pay = document.querySelector(".pay"),
	blogBtns = document.querySelectorAll(".blog__more-btn"),
	blogVideo = document.querySelectorAll(".blog-video"),
	blogItems = document.querySelectorAll(".blog__more-item"),
	cardBtn = document.querySelector("#card-btn"),
	cardAboutBtn = document.querySelector(".card__about-btn"),
	cardClose = document.querySelector(".card-close"),
	card = document.querySelector(".card"),
	payClose = document.querySelector(".pay-close"),
	html = document.querySelector("HTML"),
	popup = document.querySelector(".popup"),
	topLines = document.querySelectorAll(".top-line"),
	loader = document.querySelector(".loader"),
	progres = document.querySelector(".loader-paw"),
	cardAboutButton = document.querySelector(".card__about-btn"),
	contactBtn = document.querySelector("#my-form-button"),
	contactInputs = document.querySelectorAll(".contact-input"),
	payment = document.querySelector(".payment"),
	paymentImage = document.querySelector(".payment-img"),
	contactMap = document.querySelector(".contact__map");

// carousel

let offset = 0;
paginationShow();

document.querySelector(".top-arrow-right").addEventListener("click", () => {
	offset += 100;
	if (offset > 300) {
		offset = 0;
	};
	sliderLine.style.left = -offset + "%";
	paginationShow();
});

document.querySelector(".top-arrow-left").addEventListener("click", () => {
	offset -= 100;
	if (offset < 0) {
		offset = 300;
	};
	sliderLine.style.left = -offset + "%";
	paginationShow();
});

function paginationShow() {
	pagination.forEach(pag => {
		if (+pag.getAttribute('data-page') == (offset / 100)) {
			pag.classList.add("top__pagination-item--active");
			for (let i = 0;i < topLines.length;i++) {
				if (topLines[i].getAttribute('data-offset') == +pag.getAttribute('data-page') * 100) {
					topLines.forEach(line => {
						line.classList.remove("active")
					})
					topLines[i].classList.add("active");
				}
			}
		}
		else {
			pag.classList.remove("top__pagination-item--active");
		};
	});
};

pagination.forEach(circle => {
	circle.addEventListener("click", () => {
		pagination.forEach(el => {
			el.classList.remove("top__pagination-item--active");
		});
		offset = circle.getAttribute('data-page') * 100;
		circle.classList.add("top__pagination-item--active");
		sliderLine.style.left = -offset + "%";
		paginationShow()
	});
});

// /carousel

// burger

burger.addEventListener("click", () => {
	burger.classList.toggle("active");
	logo.classList.toggle("active");
	header.classList.toggle("active");
	nav.classList.toggle("active");
	headerBtn.classList.toggle("disactive");
	sectionsToggle(disableArray)
});

link.forEach(li => {
	li.addEventListener("click", () => {
		burger.classList.remove("active");
		logo.classList.remove("active");
		header.classList.remove("active");
		nav.classList.remove("active");
		headerBtn.classList.remove("disactive");
		sectionsOn(disableArray)
	});
});

// /burger

// Events

aboutImg.addEventListener("click", (e) => {
	popupImg.src = e.target.src;
	popup.classList.add("active");
	html.classList.add("unscroll");
});

popup.addEventListener("click", () => {
	popup.classList.remove("active");
	html.classList.remove("unscroll");
});

// /Events

// popups

headerBtn.addEventListener("click", () => {
	sectionsOff(disableArray);
	pay.classList.add("active");
});

payClose.addEventListener("click", () => {
	sectionsOn(disableArray);
	pay.classList.remove("active");
	card.classList.remove("active");
});

cardBtn.addEventListener("click", () => {
	pay.classList.remove("active");
	card.classList.add("active");
});

cardClose.addEventListener("click", () => {
	sectionsOn(disableArray);
	header.classList.remove("popup");
	main.classList.remove("popup");
	footer.classList.remove("popup");
	pay.classList.remove("active");
	card.classList.remove("active");
});

cardAboutBtn.addEventListener("click", (e) => {
	paymentAppear()
	card.classList.remove("active")
	sectionsOn(disableArray)
})

// /popups

// scroll animation

const animItems = document.querySelectorAll(".anim-items");

if (animItems.length > 0) {
	window.addEventListener("scroll", animOnScroll);
	function animOnScroll() {
		for (let index = 0;index < animItems.length;index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = getHeight(animItem).top;
			const animStart = 8;
			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			};
			if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
				animItem.classList.add("_active");
			} else {
				if (!animItem.classList.contains("_anim-no-hide")) {
					animItem.classList.remove("_active");
				};
			};
		};
	};
	function getHeight(el) {
		const rect = el.getBoundingClientRect(),
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop };
	};
	animOnScroll();
};

// /scroll animation

// button animation

function btnAnimation(element) {
	element.addEventListener("mousemove", (e) => {
		const x = e.pageX - element.offsetLeft;
		const y = e.pageY - element.offsetTop;

		element.style.setProperty("--x", x + "px");
		element.style.setProperty("--y", y + "px");
	});
}

btnAnimation(headerBtn);
btnAnimation(cardAboutBtn);

// /button animation

// video button

blogBtns.forEach((btn, index) => {
	btn.addEventListener("click", (e) => {
		const isPlaying = !blogVideo[index].paused && !blogVideo[index].ended;
		if (!isPlaying) {
			blogVideo[index].play();
			e.target.classList.replace("play", "pause");
			blogBtns[index].src = "./images/blog/pause.svg";
		} else {
			blogVideo[index].pause();
			e.target.classList.replace("pause", "play");
			blogBtns[index].src = "./images/blog/play.svg";
		};
	});
});

blogItems.forEach((video, index) => {
	video.addEventListener("mouseleave", () => {
		blogBtns[index].classList.add("disactive");
	});
	video.addEventListener("mouseenter", () => {
		blogBtns[index].classList.remove("disactive");
	});
});

blogVideo.forEach(volumeOf => {
	volumeOf.volume = 0.3
})

// /video button

// languages

const uaBtns = document.querySelectorAll(".ua");
const enBtns = document.querySelectorAll(".en");

let allLanguages = ["ua", "en"];
let lang = "ua"

let semanticCore = {
	paw: {
		"ua": "Дай мені шанс пережити цю війну. <br> Я тобі дам лапу.",
		"en": "Give me the chance to survive from this war. I'll give you my paw."
	},
	contribution: {
		"ua": "Зроби свій внесок у будівництво нашого притулку – подаруй шанс песику знайти мирну домівку.",
		"en": "Make your contribution to the shelter building – give the chance to find a peaceful home for dog."
	},
	about: {
		"ua": "громадська організація, що опікується безпритульними собаками, яких евакуювали з зони бойових дій. Наша мета надати належні умови для  евакуйованих притулків та приватних собак, які шукають тимчасовий прихисток. Допомогти з підготовкою вакцин та документів для  подальшого виїзду за кордон у приймаючі сім’ї чи притулки інших організацій.",
		"en": "is an NGO that takes care of homeless dogs that were evacuated from the war zone. Our goal is provide appropriate conditions for evacuated shelters or owner’s dogs, who are looking for temporary shelter. Help with the preparation of vaccines and documents for further moving abroad to host families or another shelters."
	},
	features: {
		"ua": "<span>Окрім</span> донату для будівництва, ми потребуємо:",
		"en": "<span>In</span> addition to the donation for shelter`s building, we need:"
	},
	blog: {
		"ua": "З нашого відео блогу ви дізнаєтесь про життя притулку.Розповідаючи історії окремих песиків, ми звітуватимемо про нашу діяльність.Згадуватимемо тих, хто допоміг врятувати тварину та яка її подальша доля.",
		"en": "From our video blog, you will know about the shelter`s life. Telling the stories of individual dogs, we will report on our activities. We reminds those who helped save the animal and what its future fate is."
	},
	"nav-activities": {
		"ua": "Наша діяльність",
		"en": "Our activities"
	},
	"nav-about": {
		"ua": "Хто ми",
		"en": "About"
	},
	"nav-team": {
		"ua": "Команда",
		"en": "Team"
	},
	"nav-gallery": {
		"ua": "Галлерея",
		"en": "Gallery"
	},
	"nav-contact": {
		"ua": "Контакти",
		"en": "Contact"
	},
	btn: {
		"ua": "Підтримати",
		"en": "Support"
	},
	subtitle: {
		"ua": "На даний момент багато собак потребують евакувації з зони бойових <br> дій. цим якраз займаємося ми Green Shelter",
		"en": "At the moment, many dogs need evacuation from the combat zone actions. this is exactly what we are doing Green Shelter"
	},
	"top-btn": {
		"ua": "Знайти друга",
		"en": "Find friend"
	},
	"features-bowl": {
		"ua": "Миски",
		"en": "Bowl"
	},
	"features-collars": {
		"ua": "Нашийники",
		"en": "Collars"
	},
	"features-feed": {
		"ua": "Корми",
		"en": "Feed"
	},
	"features-volunteers": {
		"ua": "Волонтери для <br> догляду за собаками",
		"en": "Volunteers for <br> dog care"
	},
	"features-treatment": {
		"ua": "Припарати для <br> обробки від кліщів",
		"en": "Meds for <br> tick treatment"
	},
	"features-booth": {
		"ua": "Будки для <br> собак",
		"en": "Booths for <br> dogs"
	},
	"blog-title": {
		"ua": "<span>Наш</span> відео-блог та діяльність",
		"en": "<span>Our</span> video blog and activities"
	},
	"find-us": {
		"ua": "Знайти нас",
		"en": "Find us"
	},
	"gallery-title": {
		"ua": "<span>Г</span>алерея",
		"en": "<span>G</span>allery"
	},
	"team-title": {
		"ua": "<span>Наша</span> Команда",
		"en": "<span>Our</span> Team"
	},
	"team-text": {
		"ua": "Наша команда це група інтузіастів та людей які хочуть пренести трішки тепла в наш світ, в <span>Green Shelter</span> працюють тілки експерти та вони знають як і що правильно робити. а найголовніше всі вони з добрим піклуючим сердцем.",
		"en": "Our team is a group of enthusiasts and people who want to bring a little heat to our world, in <span>Green Shelter</span> telky experts work and they know how and what to do. and most importantly they are all with a good caring heart."
	},
	"contact-loaction": {
		"ua": "Наша Локація",
		"en": "Our Location"
	},
	"contact-hello": {
		"ua": "Скажи привіт",
		"en": "Say hello"
	},
	"location": {
		"ua": "м. Яворів Львівська область",
		"en": "Yavoriv Lviv Region"
	},
	"pay-title": {
		"ua": "Мій собака – моє серцебиття біля моїх ніг!",
		"en": "My dog is my heartbeat at my feet!"
	},
	"pay-text": {
		"ua": "Задонативши нам, ви долучитесь до будівництва притулку для собак. Також ваша фінансова допомога буде спрямована на підготовку вакцин та необхідних документів для виїзду собачок закордон.",
		"en": "Having hired us, you will join the construction of a shelter for dogs. Also, your financial assistance will be directed to the preparation of vaccines and the necessary documents for the departure of dogs abroad."
	},
	"number-of": {
		"ua": "Номер карточки",
		"en": "Card number"
	},
	"card-to": {
		"ua": "До сплати",
		"en": "To payment"
	},
	"donate": {
		"ua": "<span>Зробити внесок</span>",
		"en": "<span>Make a contribution</span>"
	},
	ivan: {
		"ua": "Іван",
		"en": "Ivan"
	},
	ira: {
		"ua": "Іра",
		"en": "Ira"
	},
	snizhanna: {
		"ua": "Сніжанна",
		"en": "Snizhanna"
	},
	liana: {
		"ua": "Ліана",
		"en": "Liana"
	},
	creator: {
		"ua": `засновниця ГО "Зелений притулро"`,
		"en": `creator of the NGO "Green Shelter"`
	},
	filmmaker: {
		"ua": `відеографіка, режисерка док. кіно`,
		"en": `videography, film director"`
	},
	designer: {
		"ua": `дизайнерка`,
		"en": `designer`
	},
	visualizer: {
		"ua": `3д візуалізатор`,
		"en": `3D visualizer`
	},
}

uaBtns.forEach(ua => {
	ua.addEventListener("click", () => {
		lang = "ua"
		changeUrl()
	});
});

enBtns.forEach(en => {
	en.addEventListener("click", () => {
		lang = "en"
		changeUrl()
	});
});

function changeUrl() {
	location.href = window.location.pathname + "#" + lang;
	location.reload();
}

function changeLanguages() {
	let hash = (window.location.hash).substring(1);
	if (!allLanguages.includes(hash)) {
		location.href = window.location.pathname + "#ua"
		location.reload();
	}
	for (let key in semanticCore) {
		document.querySelectorAll(".language-" + key).forEach(el => {
			if (hash == "en") {
				el.classList.add(`english-${key}`);
			} else {
				el.classList.remove(`english-${key}`);
			}
			el.innerHTML = semanticCore[key][hash];
		})
	}
}

changeLanguages()

// /languages

// disable

let disableArray = [".about", ".main", ".footer"];

function sectionsOff(array) {
	array.forEach(el => {
		document.querySelector(el).classList.add("disactive");
	});
};

function sectionsOn(array) {
	array.forEach(el => {
		document.querySelector(el).classList.remove("disactive");
	});
};

function sectionsToggle(array) {
	array.forEach(el => {
		document.querySelector(el).classList.toggle("disactive");
	});
};

// disable 

// loader

setTimeout(() => {
	loader.classList.add("loader--done");
	progres.addEventListener("click", () => {
		loader.classList.add("loader--disactive");
		html.classList.remove("unscroll");
	});
}, 2300);

// /loader

// titl mobile fix

if (window.innerWidth < 1024) {
	const aboutBox = document.querySelector(".about__inner");

	let mobile = document.createElement('div');
	mobile.classList.add('about__img');
	mobile.innerHTML = '<img data-src="./images/about/about-1.webp" src="./images/lazy.png" alt="about images" class="about-img anim-items mobile">';

	aboutBox.removeChild(aboutBox.firstElementChild);
	aboutBox.insertBefore(mobile, aboutBox.firstElementChild);

	const aboutImg = document.querySelector(".about-img");

	aboutImg.addEventListener("click", openImage)

	function openImage() {
		window.open("./images/about/about-1.webp");
	};
};

// /titl mobile fix

// input validation

const inputToValidate = [16, 2, 4, 3, 10];
const cardInputs = document.querySelectorAll(".card__input");

for (let i = 0;i < inputToValidate.length;i++) {
	const currentInput = cardInputs[i];
	currentInput.addEventListener("input", (e) => {
		let input = e.target.value;
		if (input.length > inputToValidate[i]) {
			input = input.slice(0, inputToValidate[i]);
			currentInput.value = input;
		};
	});
};
// /input validation

// forms spree

let form = document.querySelector(".contact-form");

async function handleSubmit(event) {
	event.preventDefault();
	var data = new FormData(event.target);
	fetch(event.target.action, {
		method: form.method,
		body: data,
		headers: {
			'Accept': 'application/json'
		}
	}).then(response => {
		if (response.ok && contactInputs[0].value.match(nameEx) && contactInputs[1].value.match(phoneEx) && contactInputs[2].value.match(emailEx)) {
			paymentAppear()
			contactInputs.forEach(input => input.classList.remove("error"));
			form.reset()
		} else {
			console.log("error");
			contactInputs.forEach(input => input.classList.add("error"));
		}
	}).catch(error => {
		contactInputs.forEach(input => {
			input.classList.add("error");
		});
	});
};
form.addEventListener("submit", handleSubmit);

contactInputs.forEach(inp => {
	inp.addEventListener("input", () => {
		contactInputs.forEach(el => {
			el.classList.remove("error");
		});
	});
});

let nameEx = /^[^\d]\w+$/gm;
let phoneEx = /^(\+?38[ -]?)?\(?(0\d{2}|\d{3})\)?[ -]?(\d{2}[ -]?\d{2}?[ -]?\d{3})$/gm;
let emailEx = /^[^\d]\w+@\w+\.\w+$/gm;

function paymentAppear() {
	payment.classList.add("active");
	html.classList.add("unscroll");
	paymentImage.classList.add("active");
	if (payment.classList.contains("active")) {
		setTimeout(() => {
			paymentImage.classList.remove("active");
			html.classList.remove("unscroll");
			payment.classList.remove("active");
		}, 2500);
	};
};

// /forms spree

// google maps

contactMap.addEventListener("mouseenter", () => {
	contactMap.classList.add("active")
});

contactMap.addEventListener("mouseleave", () => {
	contactMap.classList.remove("active")
});

// /google maps

// lazy loading

const lazyImages = document.querySelectorAll("img[data-src], source[data-srcset], div[data-src]");
const windowHeight = document.documentElement.clientHeight;

let lazyImagesPosition = [];
if (lazyImages.length > 0) {
	lazyImages.forEach(img => {
		if (img.dataset.src || img.dataset.srcset || div.dataset.src) {
			lazyImagesPosition.push(img.getBoundingClientRect().top + scrollY - 250);
			lazyScrollCheck()
		};
	});
};

window.addEventListener("scroll", lazyScroll)

function lazyScroll() {
	if (document.querySelectorAll("img[data-src], source[data-srcset]").length > 0) {
		lazyScrollCheck();
	};
	if (!contactMap.classList.contains("_loaded")) {
		getMap()
	};
};

function lazyScrollCheck() {
	let imgIndex = lazyImagesPosition.findIndex(item => scrollY > item - windowHeight);
	if (imgIndex >= 0) {
		if (lazyImages[imgIndex].dataset.src) {
			lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
			lazyImages[imgIndex].removeAttribute("data-src");
		} else if (lazyImages[imgIndex].dataset.srcset) {
			lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
			lazyImages[imgIndex].removeAttribute("data-srcset");
		};
		delete lazyImagesPosition[imgIndex];
	};
};

function getMap() {
	const loadMapBlockPos = contactMap.getBoundingClientRect().top + scrollY;
	if (scrollY > loadMapBlockPos - windowHeight) {
		console.log();
		const loadMapUrl = contactMap.dataset.map;
		console.log(loadMapUrl);
		if (loadMapUrl) {
			contactMap.insertAdjacentHTML("beforeend", `<iframe class="contact-iframe" src="${loadMapUrl}"></iframe>`)
		};
		contactMap.classList.add("_loaded")
	};
};

// /lazy loading