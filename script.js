/* =========================================
   ELEMENTS
========================================= */

const envelope =
    document.getElementById("envelope");

const envelopeScreen =
    document.getElementById("envelopeScreen");

const birthdayScreen =
    document.getElementById("birthdayScreen");

const birthdayMusic =
    document.getElementById("birthdayMusic");

const cake =
    document.getElementById("cake");

const candle =
    document.querySelector(".candle");

const flame =
    document.querySelector(".flame");

const messageOverlay =
    document.getElementById("messageOverlay");

const closeMessage =
    document.getElementById("closeMessage");


/* =========================================
   STATE
========================================= */

let envelopeOpened = false;


/* =========================================
   PLAY MUSIC
========================================= */

function playBirthdayMusic() {

    /*
        Volume between 0 and 1.
    */

    birthdayMusic.volume = 0.7;


    /*
        Start from the beginning.
    */

    birthdayMusic.currentTime = 0;


    /*
        Because this function is called
        from the envelope click, browsers
        should allow playback.
    */

    const playPromise =
        birthdayMusic.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                console.log(
                    "🎵 Birthday music started!"
                );

            })
            .catch((error) => {

                console.error(
                    "❌ Music failed to play:",
                    error
                );

            });

    }
}


/* =========================================
   OPEN ENVELOPE
========================================= */

function openEnvelope() {

    if (envelopeOpened) {
        return;
    }

    envelopeOpened = true;


    /* Open envelope */

    envelope.classList.add("open");


    /*
        IMPORTANT:
        Start audio immediately while this
        function is still responding to the
        user's click.
    */

    playBirthdayMusic();


    /* Fade envelope */

    setTimeout(() => {

        envelopeScreen.style.opacity = "0";

        envelopeScreen.style.transform =
            "scale(1.05)";

    }, 1000);


    /* Show birthday screen */

    setTimeout(() => {

        envelopeScreen.style.display =
            "none";


        birthdayScreen.style.pointerEvents =
            "auto";


        birthdayScreen.style.opacity =
            "1";


        birthdayScreen.style.transform =
            "scale(1)";


        startCake();

    }, 1750);

}


/* =========================================
   START CAKE
========================================= */

function startCake() {

    /*
        Remove previous animation state.
    */

    cake.classList.remove("start");


    /*
        Force browser repaint so CSS
        animations restart correctly.
    */

    void cake.offsetWidth;


    /*
        Start cake sequence.
    */

    cake.classList.add("start");

}


/* =========================================
   SHOW FINAL MESSAGE
========================================= */

function showFinalMessage() {

    messageOverlay.classList.add("show");

}


/* =========================================
   ENVELOPE CLICK
========================================= */

envelope.addEventListener(
    "click",
    openEnvelope
);


/* =========================================
   ENVELOPE KEYBOARD
========================================= */

envelope.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openEnvelope();

        }

    }
);


/* =========================================
   CANDLE CLICK
========================================= */

candle.addEventListener(
    "click",
    showFinalMessage
);


/* =========================================
   FLAME CLICK
========================================= */

flame.addEventListener(
    "click",
    showFinalMessage
);


/* =========================================
   CLOSE MESSAGE
========================================= */

closeMessage.addEventListener(
    "click",
    function() {

        messageOverlay.classList.remove(
            "show"
        );

    }
);


/* =========================================
   CLICK OUTSIDE MESSAGE
========================================= */

messageOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target === messageOverlay
        ) {

            messageOverlay.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            messageOverlay.classList.remove(
                "show"
            );

        }

    }
);