// eslint-disable-next-line strict
"use strict";
window.addEventListener("DOMContentLoaded", () => {
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
                clearInterval();
                timerHours.textContent = "00";
                timerMinutes.textContent = "00";
                timerSeconds.textContent = "00";
            }
        };
        setInterval(updateClock, 1000);
    };
    countTimer("24 November 2020");
    //Menu

    const toggleMenu = () => {
        const btnMenu = document.querySelector(".menu"),
            menu = document.querySelector("menu"),
            closeBtn = document.querySelector(".close-btn"),
            menuItems = menu.querySelectorAll("ul>li");

        const handlerMenu = () => menu.classList.toggle("active-menu");
        btnMenu.addEventListener("click", handlerMenu);
        closeBtn.addEventListener("click", handlerMenu);
        menuItems.forEach(item => item.addEventListener("click", handlerMenu));
    };
    toggleMenu();

    const togglePopup = () => {
        const popup = document.querySelector(".popup"),
            popupBtn = document.querySelectorAll(".popup-btn"),
            closePopup = document.querySelector(".popup-close");

        closePopup.addEventListener("click", () => popup.style.display = "none");
        popupBtn.forEach(item => {

            item.addEventListener("click", () => {
                const screeWidth = document.documentElement.clientWidth;
                let count = -100;
                const popupAnimate = setInterval(() => {
                    popup.style.transform = "translateY(-100%)";
                    popup.style.display = "block";
                    count++;
                    popup.style.transform = `translateY(${count}%)`;

                    if (count === 0 || screeWidth < 768) {
                        clearInterval(popupAnimate);
                        popup.style.transform = "translateY(0)";
                    }
                }, 0);
            });
        });
    };
    togglePopup();

    const scroll = () => {
        const anchors = document.querySelectorAll('a[href^="#"]');
        for (const anchor of anchors) {
            anchor.addEventListener("click", e => {
                e.preventDefault();
                const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body';
                document.querySelector(goto).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        }
    };
    scroll();
});
