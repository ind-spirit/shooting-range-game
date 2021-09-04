window.onload = function () {
    var game = document.getElementsByClassName("game")[0];
    var lines = document.getElementsByClassName("line");
    var menu = document.getElementsByClassName("menu")[0];
    var start_btn = document.getElementsByClassName("start-btn")[0];
    var container_width = document.getElementsByClassName("targets-container")[0].offsetWidth;
    var target_width = document.getElementsByClassName("targets-container")[0].offsetHeight * 0.95;
    //RECOUNT IT
    var number_of_targets = Math.floor(container_width / target_width);
    var global_score = 0;
    var targets_initiated = false;
    var time = 10;
    var timer;
    var timer_toggle = false;
    var listeners_appended = false;
    function createTarget(lineToAdd) {
        var target = document.createElement("img");
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                target.src = "./assets/news.svg";
                break;
            case 1:
                target.src = "./assets/fake-news.svg";
                break;
            case 2:
                target.src = "./assets/special.svg";
                break;
            default:
                break;
        }
        target.ondragstart = function () {
            return false;
        };
        target.classList.add("target");
        lineToAdd.prepend(target);
    }
    function appendListeners() {
        if (listeners_appended)
            return;
        for (var i = 0; i < lines.length; i++) {
            var target_containers = lines[i].children;
            var _loop_1 = function (j) {
                var targets = target_containers[j].children;
                var _loop_2 = function (k) {
                    targets[k].addEventListener("click", function () {
                        targets[k].src.indexOf("/special.svg") != -1
                            ? (global_score += 2)
                            : targets[k].src.indexOf("/fake-news.svg") != -1
                                ? (global_score -= 3)
                                : (global_score += 1);
                        document.getElementsByClassName("score")[0].innerText =
                            global_score;
                        targets[k].style.opacity = "0";
                        targets[k].style.pointerEvents = "none";
                        setTimeout(function () {
                            targets[k].style.opacity = "100";
                            targets[k].style.pointerEvents = "unset";
                        }, 1000);
                        var rand = Math.floor(Math.random() * 3);
                        targets[k].src =
                            rand == 2
                                ? "./assets/special.svg"
                                : rand == 1
                                    ? "./assets/fake-news.svg"
                                    : "./assets/news.svg";
                    });
                };
                for (var k = 0; k < targets.length; k++) {
                    _loop_2(k);
                }
            };
            for (var j = 0; j < target_containers.length; j++) {
                _loop_1(j);
            }
        }
        listeners_appended = true;
    }
    function initialTargets() {
        if (targets_initiated) {
            changeTargets();
            return;
        }
        for (var i = 0; i < lines.length; i++) {
            var target_containers = lines[i].children;
            var new_number_of_targets = Math.floor((container_width - number_of_targets * 30) / target_width);
            for (var j = 0; j < new_number_of_targets; j++) {
                createTarget(target_containers[1]);
            }
            for (var j = 0; j < new_number_of_targets; j++) {
                createTarget(target_containers[0]);
            }
        }
        targets_initiated = true;
    }
    function changeTargets() {
        for (var i = 0; i < lines.length; i++) {
            var target_containers = lines[i].children;
            for (var j = 0; j < target_containers.length; j++) {
                var targets = target_containers[j].children;
                for (var k = 0; k < targets.length; k++) {
                    var rand = Math.floor(Math.random() * 3);
                    targets[k].src =
                        rand == 2
                            ? "./assets/special.svg"
                            : rand == 1
                                ? "./assets/fake-news.svg"
                                : "./assets/news.svg";
                }
            }
        }
    }
    function resetScore() {
        global_score = 0;
        document.getElementsByClassName("score")[0].innerText = global_score;
    }
    function toggleGame() {
        document.getElementsByClassName("info")[0].classList.toggle("hide");
        game.classList.toggle("hide");
    }
    function toggleMenu() {
        menu.classList.toggle("hide");
    }
    function toggleAnimation() {
        if (time <= 0) {
            return;
        }
        var all = document.getElementsByClassName("targets-container");
        for (var i = 0; i < all.length; i++) {
            all[i].classList.toggle("pause");
        }
    }
    function pauseAnimation() {
        var all = document.getElementsByClassName("targets-container");
        for (var i = 0; i < all.length; i++) {
            all[i].classList.add("pause");
        }
    }
    function startAnimation() {
        var all = document.getElementsByClassName("targets-container");
        for (var i = 0; i < all.length; i++) {
            all[i].classList.remove("pause");
        }
    }
    function makeUnclickable() {
        document.getElementsByClassName("game")[0].classList.add("unclickable");
    }
    function makeClickable() {
        document.getElementsByClassName("game")[0].classList.remove("unclickable");
    }
    function toggleClickable() {
        if (time <= 0) {
            return;
        }
        document.getElementsByClassName("game")[0].classList.toggle("unclickable");
    }
    function startTimer() {
        time = 10;
        document.getElementsByClassName("time")[0].innerText = time;
        timer = setInterval(function () {
            time--;
            document.getElementsByClassName("time")[0].innerText = time;
            gameOver();
        }, 1000);
        timer_toggle = true;
    }
    function stopTimer() {
        clearInterval(timer);
        timer_toggle = false;
    }
    function continueTimer() {
        clearInterval(timer);
        document.getElementsByClassName("time")[0].innerText = time;
        timer = setInterval(function () {
            time--;
            document.getElementsByClassName("time")[0].innerText = time;
            gameOver();
        }, 1000);
        timer_toggle = true;
    }
    function toggleTimer() {
        if (time <= 0) {
            return;
        }
        if (timer_toggle)
            clearInterval(timer);
        else
            timer = setInterval(function () {
                time--;
                document.getElementsByClassName("time")[0].innerText = time;
                gameOver();
            }, 1000);
        timer_toggle = !timer_toggle;
    }
    function gameOver() {
        if (document.getElementsByClassName("time")[0].innerText == "0") {
            pauseAnimation();
            makeUnclickable();
            stopTimer();
            document.getElementsByClassName('game-over')[0].classList.remove('hide');
            document.getElementsByClassName('game-over')[0].innerText = "Ваш счет: " + global_score;
        }
        else
            return;
    }
    document.getElementsByClassName("back")[0].addEventListener("click", function () {
        pauseAnimation();
        stopTimer();
        document.getElementsByClassName('game-over')[0].classList.add('hide');
        toggleGame();
        toggleMenu();
    });
    start_btn.addEventListener("click", function () {
        toggleGame();
        toggleMenu();
        initialTargets();
        appendListeners();
        startTimer();
        startAnimation();
        resetScore();
        makeClickable();
    });
    document.getElementsByClassName("stop")[0].addEventListener("click", function () {
        toggleAnimation();
        toggleTimer();
        toggleClickable();
    });
    lines[0].children[0].addEventListener("animationiteration", function () {
        changeTargets();
    });
    document
        .getElementsByClassName("difficulty-btn")[0]
        .addEventListener("click", function () {
        document.getElementsByClassName("difficulty")[0].classList.remove("hide");
    });
    document
        .getElementsByClassName("back-to-menu")[0]
        .addEventListener("click", function () {
        document.getElementsByClassName("difficulty")[0].classList.add("hide");
    });
    document
        .getElementsByClassName("tooltip-btn")[0]
        .addEventListener("click", function () {
        document.getElementsByClassName("tooltip-screen")[0].classList.remove("hide");
    });
    document
        .getElementsByClassName("back-to-menu")[1]
        .addEventListener("click", function () {
        document.getElementsByClassName("tooltip-screen")[0].classList.add("hide");
    });
    document
        .getElementsByClassName("form-range")[0]
        .addEventListener("input", function () {
        var value = document.getElementsByClassName("form-range")[0].value;
        var vars = document.documentElement.style;
        document.getElementsByClassName("form-label")[0].innerText =
            "Сложность: " + value;
        switch (value) {
            case "1":
                vars.setProperty("--time1", "13s");
                vars.setProperty("--time2", "15s");
                vars.setProperty("--time3", "17s");
                break;
            case "2":
                vars.setProperty("--time1", "9s");
                vars.setProperty("--time2", "11s");
                vars.setProperty("--time3", "13s");
                break;
            case "3":
                vars.setProperty("--time1", "5s");
                vars.setProperty("--time2", "7s");
                vars.setProperty("--time3", "9s");
                break;
            default:
                break;
        }
    });
};
