sorular = [{
        src: "./assets/muzik0.webm",
        srcType: "video",
        controls: true,
        soru: "Dinlediğiniz türküyü kim seslendirmektedir?",
        cevaplar: {
            a: "Aşık Veysel",
            b: "Neşet Ertaş",
            c: "Mahzuni Şerif",
            d: "Orhan Veli Kanık"
        },
        dogruCevap: "a"
    },
    {
        src: "./assets/fatih-sultan.jpg",
        srcType: "img",
        soru: "Fatih Sultan Mehmet’in babası kimdir?",
        cevaplar: {
            a: "I. Mehmet",
            b: "Yıldırım Beyazıt",
            c: "II. Murat"
        },
        dogruCevap: "c"
    },
    {
        src: "./assets/superlig.jpg",
        srcType: "img",
        soru: "Türkiye Süper Liginde 4 yıldızı olan futbol takımı hangisidir?",
        cevaplar: {
            a: "Fenerbahçe",
            b: "Galatasaray",
            c: "Beşiktaş"
        },
        dogruCevap: "b"
    },
    {
        src: "./assets/tablo.jpeg",
        srcType: "img",
        soru: "Bu tablo kime aittir?",
        cevaplar: {
            a: "Leonardo da Vinci",
            b: "Raffaello Sanzio",
            c: "Michelangelo"
        },
        dogruCevap: "a"
    },
    {
        src: "./assets/ronaldo.webm",
        srcType: "video",
        soru: "Cristiano Ronaldo daha önce hangi futbol takımında oynamıştır?",
        cevaplar: {
            a: "Bayern Munich",
            b: "Liverpool",
            c: "Manchester City",
            d: "Manchester United",
            e: "Arsenal"
        },
        dogruCevap: "d"
    }
];
sorular = shuffle(sorular);
console.log(sorular);
var guncelSoru = 0;
var answered = false;
var clicked = false;
var puan = 0;
var soruSayisi = sorular.length;
var dakika = 00;
var saniye = 00;
var dakikaElement = document.getElementById("dakika");
var saniyeElement = document.getElementById("saniye");
var Interval;

function getQuestion(d) {

    return sorular[d];
}

function joker() {
    if (saniye == 0) {
        return;
    }
    clearInterval(Interval);
    setTimeout(() => {
        var guncelSorular = document.querySelectorAll(".cevap-button");
        let sayac = 0;
        guncelSorular.forEach(element => {
            if (sayac != 2) {
                if (sorular[guncelSoru - 1].dogruCevap !== element.value) {
                    element.style = "color: darkgray !important; cursor: auto;";
                    element.removeAttribute("onclick");
                    sayac++;
                }

            }
        })
        document.getElementsByClassName("joker")[0].style = "text-decoration: line-through;color: red; cursor:auto;"
        document.getElementsByClassName("joker")[0].removeAttribute("onclick");
        Interval = setInterval(startTimer, 1000);
    }, 1000);
}

function answerQuestion(e) {
    if (clicked) {
        return false;
    }
    clearInterval(Interval);
    clicked = true;
    e.style = "background:blue";
    setTimeout(() => {
        if (e.value === sorular[guncelSoru - 1].dogruCevap) {
            e.style = "background:green";
            puan += 20;
            document.getElementsByClassName("puan")[0].innerHTML = "Puan: " + puan + " / 100";
            document.getElementsByClassName("cevap-nedir")[0].innerHTML = "Doğru cevap!";
        } else {
            e.style = "background: red";
            var a = document.getElementsByTagName("button");
            var cevap = Array.from(a).filter(el => el.value === sorular[guncelSoru - 1].dogruCevap);
            document.getElementsByClassName("cevap-nedir")[0].innerHTML = "Yanlış cevap!";
            cevap[0].style = "background:green";
        }
        answered = true;
    }, 2000);
    setTimeout(() => {
        saniye = 0;
        startGame();
        clicked = false;
    }, 3000);
}

function showAnswer() {
    var a = document.getElementsByTagName("button");
    setTimeout(() => {
        Array.from(a).forEach(data => {
            data.style = "cursor:auto; background-color: lightgray;";
            data.removeAttribute("onclick");
        });
        var cevap = Array.from(a).filter(el => el.value === sorular[guncelSoru - 1].dogruCevap);
        document.getElementsByClassName("cevap-nedir")[0].innerHTML = "Süre doldu!";
        cevap[0].style = "background:green";
    }, 2000);
    setTimeout(() => {
        saniye = 0;
        startGame();
    }, 3000);
}

function clearBox(elementID) {
    var div = document.getElementById(elementID);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function reset() {
    sorular = shuffle(sorular);
    guncelSoru = 0;
    answered = false;
    puan = 0;
    document.getElementsByClassName("puan")[0].innerHTML = "Puan: 0 / 100";
    soruSayisi = sorular.length;
    dakika = 00;
    saniye = 00;
    dakikaElement = document.getElementById("dakika");
    saniyeElement = document.getElementById("saniye");
    Interval;
    startGame();
}

function startGame() {
    answered = false;
    if (guncelSoru === soruSayisi) {
        document.getElementById("quiz-img").remove();
        document.getElementById("soru-no").innerHTML = "";
        document.getElementsByClassName("cevap-nedir")[0].remove();
        clearBox("right");
        clearInterval(Interval);
        var img = document.createElement("IMG");
        img.classList.add("w-100", "border-10");
        img.src = "./assets/cu-bg.jpg";
        img.id = "quiz-img";
        document.getElementsByClassName("before-start")[0].appendChild(img);
        document.getElementsByClassName("info-text")[0].innerHTML = "Yarışma Bitti! <br> Puanınız:  " + puan;
        var button = document.createElement("button");
        button.classList.add("start-button");
        button.id = "start-button";
        button.innerHTML = "Yeniden Oyna";
        button.type = "submit";
        button.setAttribute("onclick", "reset()");
        document.getElementById("right").appendChild(button);
        return;
    }
    if (guncelSoru > 0) {
        clearBox("right");
    }
    if (saniye == 00) {
        document.getElementById("quiz-img").remove();
        var soru = getQuestion(guncelSoru);
        if (soru.srcType == "img") {
            var img = document.createElement("IMG");
            img.src = soru.src;
            img.classList.add("w-100", "border-10");
            img.id = "quiz-img";
        } else {
            var video = document.createElement("video");
            video.autoplay = true;
            video.controls = soru.controls ? soru.controls : false;
            video.classList.add("w-100");
            video.id = "quiz-img";
            video.src = soru.src;
            console.log(video);
            var img = video;
        }
        var txt = document.createElement("P");
        txt.innerHTML = "Cevap Nedir?:";
        txt.classList.add("cevap-nedir");
        document.getElementsByClassName("right-section")[0].appendChild(txt);
        if (guncelSoru === 0) {
            document.getElementById("start-button").remove();
        }
        for (answer in soru.cevaplar) {
            var button = document.createElement("BUTTON");
            button.type = "submit";
            button.value = answer;
            button.classList.add("cevap-button");
            button.innerHTML = soru.cevaplar[answer];
            button.setAttribute("onclick", "answerQuestion(this)");
            document.getElementsByClassName("right-section")[0].appendChild(button);
        }
        document.getElementById("soru-no").innerHTML = "Soru #" + (guncelSoru + 1);
        document.getElementById("soru-no").style = "display:block;"
        document.getElementsByClassName("info-text")[0].innerHTML = soru.soru;
        document.getElementsByClassName("before-start")[0].appendChild(img);
        clearInterval(Interval);
        saniye = 10;
        Interval = setInterval(startTimer, 1000);
        guncelSoru++;
    }
}


function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

function startTimer() {
    if (saniye <= 9) {
        saniyeElement.innerHTML = "0" + saniye;
    }

    if (saniye > 9) {
        saniyeElement.innerHTML = saniye;

    }

    if (saniye === 0) {
        if (!answered) {
            clearInterval(Interval);
            showAnswer();
        }
        saniyeElement.innerHTML = "0" + 0;
        return true;
    }
    saniye--;
}