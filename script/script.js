window.addEventListener("DOMContentLoaded", () => {
    function countTimer(deadline) {
        const timerHours = document.querySelector("#timer-hours"),
            timerMinutes = document.querySelector("#timer-minutes"),
            timerSeconds = document.querySelector("#timer-seconds"),
            timerNumbers = document.querySelector(".timer-numbers"),
            span = timerNumbers.querySelectorAll("span"),
            timerAction = document.querySelector(".timer-action");

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, seconds, minutes, hours };
        }
        const timeInterval = setInterval(updateClock, 1000);

        function correctTimer(element) {
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
        }

        function updateClock() {
            const time = getTimeRemaining();
            timerHours.textContent = correctTimer(time.hours) + "ч";
            timerMinutes.textContent = correctTimer(time.minutes) + "м";
            timerSeconds.textContent = correctTimer(time.seconds) + "с";
            console.log('timerSeconds: ', timerSeconds);

            if (time.timeRemaining <= 0) {
                timerNumbers.style.color = "#ff5453";
                timerAction.textContent = " Акция закончилась";
                clearInterval(timeInterval);
                timerHours.textContent = "00";
                timerMinutes.textContent = "00";
                timerSeconds.textContent = "00";
            }
        }

    }
    countTimer("22 November 2020");
});
