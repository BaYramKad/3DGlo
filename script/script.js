
window.addEventListener("DOMContentLoaded", () => {
    // Валидация формы 
    const validationForm = () => {
        const formName = document.querySelector(".form-name");
            formName.addEventListener("input", event => {
                event.target.value = event.target.value.replace(/\d/g, "");
            });
    };
    validationForm();

    const countTimer = deadline => {
        const timerHours = document.querySelector("#timer-hours"),
            timerMinutes = document.querySelector("#timer-minutes"),
            timerSeconds = document.querySelector("#timer-seconds"),
            timerNumbers = document.querySelector(".timer-numbers"),
            timerAction = document.querySelector(".timer-action");

        const getTimeRemaining = () => {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, seconds, minutes, hours };
        };

        const correctTimer = element => {
            const arr = element + "";
            let result = [];
            for (let i = 0; i < arr.length; i++) {
                const hoursData = arr;
                const concatArray = [];
                result = [...hoursData.concat(concatArray)];
            }
            if (result.length === 2) {
                result.join("");
            } else if (result.length === 1) {
                result.unshift("0");
                result.join("");
            }
            return result.join("");
        };

        const updateClock = () => {
            const time = getTimeRemaining();
            timerHours.textContent = correctTimer(time.hours) + "ч";
            timerMinutes.textContent = correctTimer(time.minutes) + "м";
            timerSeconds.textContent = correctTimer(time.seconds) + "с";
            if (time.timeRemaining <= 0) {
                timerNumbers.style.color = "#ff5453";
                timerAction.textContent = " Акция закончилась";
                clearInterval(intervalTime);
                timerHours.textContent = "00";
                timerMinutes.textContent = "00";
                timerSeconds.textContent = "00";
            }
        };
        const intervalTime = setInterval(updateClock, 1000);
    };
    countTimer("20 Dec 2020");
    //Menu

    const toggleMenu = () => {
        const menu = document.querySelector("menu"),
            body = document.querySelector("body");

        body.addEventListener("click", event => {
            const target = event.target;

            if (target.matches(".beforeBgc")) {
                menu.classList.remove("active-menu");
            } else if (target.closest(".menu")) {
                menu.classList.add("active-menu");
            }
        });
    };
    toggleMenu();

    const togglePopup = () => {
        const popup = document.querySelector(".popup"),
            popupBtn = document.querySelectorAll(".popup-btn"),
            popupContent = document.querySelector(".popup-content"),
            popupClosed = document.querySelector(".popup-close");

        popupBtn.forEach(item => {
            item.addEventListener("click", () => {
                const screeWidth = document.documentElement.clientWidth;
                let count = -100;
                const popupAnimate = setInterval(() => {
                    popupContent.style.transform = `translateY(${count}%)`;
                    if (count === -50) {

                    }
                    popupContent.style.display = "block";
                    popup.style.display = "block";
                    count++;
                    popupContent.style.transform = `translateY(${count}%)`;
                    if (count === 0) {
                        clearInterval(popupAnimate);
                        popup.style.display = "block";
                        popupContent.style.transform = "none";
                    } 
                }, 0);
                if (screeWidth <= 768) {
                    clearInterval(popupAnimate);
                    popup.style.display = "block";
                    popupContent.style.transform = "translateX(-50px)";
                    popupClosed.style.border = "2px solid #bfbfbf";
                    popupClosed.style.borderTop = "none";
                    popupClosed.style.right = "1rem";
                    popupClosed.style.width = "5rem";
                }
            });
        });
        popup.addEventListener("click", event => {
            const target = event.target;
            if (target.matches(".popup")) {
                popup.style.display = "none";
            } else if (target.matches(".popup-close")) {
                popup.style.display = "none";
            }
        });
    };
    togglePopup();

    const scroll = () => {
        const anchors = document.querySelectorAll('a[href*="#"]');
        for (const anchor of anchors) {
            anchor.addEventListener("click", event => {
                event.preventDefault();
                const target = event.target;
                const menu = document.querySelector("menu");
                if (!target.matches(".close-btn")) {
                    menu.classList.remove("active-menu");
                    const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : "body";
                    document.querySelector(goto).scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                } else {
                    menu.classList.remove("active-menu");
                }
            });
        }
    };
    scroll();

    const tabs = () => {
        const tabHeader = document.querySelector(".service-header"),
            tabContent = document.querySelectorAll(".service-tab"),
            tab = document.querySelectorAll(".service-header-tab");

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add("active");
                    tabContent[i].classList.remove("d-none");
                } else {
                    tab[i].classList.remove("active");
                    tabContent[i].classList.add("d-none");
                }
            }
        };
        tabHeader.addEventListener("click", event => {
            let target = event.target;
            target = target.closest(".service-header-tab");
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

    const slider = () => {
        const slide = document.querySelectorAll(".portfolio-item"),
            dots = document.querySelector(".portfolio-dots"),
            slider = document.querySelector(".portfolio-content");

        let currentSlide = 0,
            interval;
        for (let i = 0; i < slide.length; i++) {
            dots.innerHTML += "<li class='dot'></li>";
            const dot = document.querySelectorAll(".dot");
            if (dot[0]) { dot[0].classList.add("dot-active"); }
        }
        const dot = document.querySelectorAll(".dot");

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, "portfolio-item-active");
            prevSlide(dot, currentSlide, "dot-active");
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(dot, currentSlide, "dot-active");
            nextSlide(slide, currentSlide, "portfolio-item-active");
        };

        const startSlide = time => {
            interval = setInterval(autoPlaySlide, time = 2500);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener("click", event => {
            event.preventDefault();
            const target = event.target;

            if (!target.matches(".portfolio-btn, .dot")) {
                return;
            }
            prevSlide(slide, currentSlide, "portfolio-item-active");
            prevSlide(dot, currentSlide, "dot-active");

            if (target.matches("#arrow-right")) {
                currentSlide++;
            } else if (target.matches("#arrow-left")) {
                currentSlide--;
            } else if (target.matches(".dot")) {
                dot.forEach((item, index) => {
                    if (item === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(dot, currentSlide, "dot-active");
            nextSlide(slide, currentSlide, "portfolio-item-active");
        });
        slider.addEventListener("mouseover", event => {
            const target = event.target;
            if (target.matches(".portfolio-btn") || target.matches(".dot")) {
                stopSlide();
            }
        });
        slider.addEventListener("mouseout", event => {
            const target = event.target;
            if (target.matches(".portfolio-btn") || target.matches(".dot")) {
                startSlide();
            }
        });
        startSlide(2500);
    };
    slider();

    // Калькулятор
    const calculator = (price = 100) => {
        const calcSquare = document.querySelector(".calc-square"),
            calcCount = document.querySelector(".calc-count"),
            calcDay = document.querySelector(".calc-day"),
            calcBlock = document.querySelector(".calc-block"),
            calcType = document.querySelector(".calc-type"),
            totalValue = document.getElementById("total");

        const validation = (...valid) => {
            valid.forEach(elem => {
                elem.addEventListener("input", event => event.target.value = event.target.value.replace(/\D/gi, ""));
            });
        };
        validation(calcSquare, calcCount, calcDay);

        const countSum = () => {
            let total = 0,
             countValue = 1,
             dayValue = 1;
            const typeValue = +calcType.options[calcType.selectedIndex].value,
                squarevalue = +calcSquare.value;

                if (calcCount.value > 1) {
                    countValue += (calcCount.value - 1) / 10;
                }

                if (calcDay.value && calcDay.value < 5) {
                    dayValue *= 2;
                } else if (calcDay.value && calcDay.value < 10) {
                    dayValue *= 1.5;
                }
                if (typeValue && squarevalue) {
                    total = price * typeValue * squarevalue * countValue * dayValue;
                }
            totalValue.textContent = total;
        };
        calcBlock.addEventListener("change", (event) => {
            const target = event.target;
            if (target.matches("select") || target.matches("input")) {
                countSum();
            }
        });

    };
    calculator(100);

    //Смена фото в блоке Команда

    const changeImage = () => {
        const comandPhoto = document.querySelectorAll(".command__photo");
        comandPhoto.forEach(elem => {
            let src = "";
            elem.addEventListener("mouseenter", event => {
                src = event.target.src;
                event.target.src = elem.dataset.img;
            });
            elem.addEventListener("mouseleave", event => event.target.src = src);
        });
    };
    changeImage();

    // Отправка на сервер

    const sendForm = () => {
        let form = document.getElementById("form1"), 
            box = document.getElementById("box"),
            div = document.createElement("div");
        div.style.marginBottom = "20px";
        div.style.fontSize = "20px";
        div.style.color = "#2aff71";
        box.style.marginBottom = "20px";

        const erroeMessage = "Что то пошло не так",
            succsessMessage = "Спасибо! Мы скоро с вами свяжемся!";
            
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            div.remove()
            box.style.display = "flex";
            ajaxRequest()
                .then(interface)
                .catch((error) => error = erroeMessage)
        })
        const ajaxRequest = () => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener("readystatechange", () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve()
                    } else {
                        reject(div.textContent)
                    }
                });

                request.open("POST", "./server/server.php");
                request.setRequestHeader("Content-Type", "aplication/json");
                const form = document.getElementById("form1");
                const formData = new FormData(form);
                request.send(formData);
            });
                
        };

        
        const interface = () => {
            setTimeout(() => {
                form.appendChild(div)
                div.textContent = succsessMessage;
                setTimeout(() => {
                    div.textContent = "";
                }, 7000)
                box.style.display = "none";
                reset()
            }, 2000)
        };

        const reset = () => {
            let form = document.getElementById("form1");
            let elementsForm = form.elements;
            for (let elem of elementsForm){
                if (elem.value !== "" && elem.localName === "input") {
                    elem.value = ""
                };
            }
        };
    };
    sendForm();
});