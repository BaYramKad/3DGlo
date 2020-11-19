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

/*
  Таймер (Алгоритм действий )

  Подключаем JS
  2 - навешиваем событие DOMContentLoaded (Ждет пока прогрузиться DOM дерево)
  3 - Высчитываем миллисекунды текущего времени и дедлайна через метод setTime()
  4 - после того как узнал миллисекунды нужно узнать промежуток между ними так же
  в миллисекундах
  5 - и с этим промежутком высчитываем секунды минуты часы дни годы все что нужно
  полученные миллисекунтды мы делим на 1000 чтобы получить секунды  при вычислениях конечно же округляем методом Math.floor()
  5 Секунды - миллисекунды % 60
  6 Минуты - (миллисекунтды / 60) % 60
  7 Часы - (миллисекунды / 60 / 60)

  и их присваиваем к элементам на странице
*/
