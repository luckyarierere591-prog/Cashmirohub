/* =========================================================
   CASHMIRO HUB
   Telegram Mini App Frontend
   ========================================================= */


/* =========================================================
   TELEGRAM
   ========================================================= */

const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();

    try {
        tg.setHeaderColor("#070b10");
        tg.setBackgroundColor("#070b10");
    } catch (error) {
        console.log("Telegram theme settings unavailable.");
    }
}


/* =========================================================
   DEMO DATABASE
   ========================================================= */

const defaultUser = {

    name: "Cashmiro Member",

    age: "",

    game: "FC Mobile",

    username: "telegram_member",

    coins: 100,

    matches: 0,

    wins: 0

};


let user =
    JSON.parse(
        localStorage.getItem("cashmiro_user")
    ) || defaultUser;


/* =========================================================
   FIXTURES
   ========================================================= */

const fixtures = [

    {
        league: "Cashmiro League",
        home: "MR_Alienz",
        away: "ThebossX",
        homeIcon: "⚽",
        awayIcon: "🔥",
        date: "Thursday",
        time: "7:30 PM"
    },

    {
        league: "Premier League",
        home: "Creshocks",
        away: "YFNSTAR",
        homeIcon: "🟢",
        awayIcon: "🔴",
        date: "Friday",
        time: "8:30 PM"
    },

    {
        league: "Champions League",
        home: "Lord_Dominion",
        away: "KabeloTxG",
        homeIcon: "👑",
        awayIcon: "⚡",
        date: "Saturday",
        time: "7:30 PM"
    },

    {
        league: "World Cup",
        home: "Kvng_Glenn007",
        away: "Ladlz",
        homeIcon: "🌍",
        awayIcon: "🏆",
        date: "Sunday",
        time: "8:30 PM"
    }

];


/* =========================================================
   UPDATES
   ========================================================= */

const updates = [

    {
        title: "Community Announcement",
        text:
            "Members are expected to remain active and participate in community tournaments.",
        time: "Today"
    },

    {
        title: "Match Time",
        text:
            "Community matches begin from 7:30 PM or 8:30 PM and above.",
        time: "Today"
    },

    {
        title: "Telegram Updates",
        text:
            "Follow the official Telegram community for fixtures and tournament announcements.",
        time: "Today"
    }

];


/* =========================================================
   PREDICTIONS
   ========================================================= */

const predictions = [

    {
        id: 1,
        question: "Who will win?",
        match: "MR_Alienz vs ThebossX",
        options: [
            "MR_Alienz",
            "ThebossX"
        ],
        reward: 20
    },

    {
        id: 2,
        question: "Who will win?",
        match: "Creshocks vs YFNSTAR",
        options: [
            "Creshocks",
            "YFNSTAR"
        ],
        reward: 20
    }

];


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageName) {

    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });


    const selectedPage =
        document.getElementById(
            pageName + "Page"
        );


    if (selectedPage) {
        selectedPage.classList.add("active");
    }


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.page === pageName
            ) {
                button.classList.add("active");
            }

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   USER PROFILE
   ========================================================= */

function updateUserInterface() {

    const name =
        user.name || "Member";


    document.getElementById(
        "welcomeName"
    ).textContent = name;


    document.getElementById(
        "profileName"
    ).textContent = name;


    document.getElementById(
        "profileUsername"
    ).textContent =
        "@" + (user.username || "member");


    document.getElementById(
        "detailName"
    ).textContent =
        user.name || "Not set";


    document.getElementById(
        "detailAge"
    ).textContent =
        user.age || "Not set";


    document.getElementById(
        "detailGame"
    ).textContent =
        user.game || "Not set";


    document.getElementById(
        "detailCoins"
    ).textContent =
        user.coins;


    document.getElementById(
        "coinBalance"
    ).textContent =
        user.coins;


    document.getElementById(
        "coinsSmall"
    ).textContent =
        user.coins;


    document.getElementById(
        "matchesPlayed"
    ).textContent =
        user.matches;


    document.getElementById(
        "wins"
    ).textContent =
        user.wins;


    document.getElementById(
        "editName"
    ).value =
        user.name || "";


    document.getElementById(
        "editAge"
    ).value =
        user.age || "";


    document.getElementById(
        "editGame"
    ).value =
        user.game || "FC Mobile";


    /* Telegram user */

    if (
        tg &&
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user
    ) {

        const telegramUser =
            tg.initDataUnsafe.user;


        if (!user.username ||
            user.username === "telegram_member") {

            user.username =
                telegramUser.username ||
                telegramUser.first_name ||
                "member";

        }

    }

}


/* =========================================================
   SAVE PROFILE
   ========================================================= */

function saveProfile() {

    const name =
        document.getElementById(
            "editName"
        ).value.trim();


    const age =
        document.getElementById(
            "editAge"
        ).value;


    const game =
        document.getElementById(
            "editGame"
        ).value;


    if (!name) {

        alert("Please enter your name.");

        return;

    }


    user.name = name;

    user.age = age;

    user.game = game;


    localStorage.setItem(
        "cashmiro_user",
        JSON.stringify(user)
    );


    updateUserInterface();

    closeModal();

}


/* =========================================================
   PROFILE MODAL
   ========================================================= */

function openEditProfile() {

    document
        .getElementById("profileModal")
        .classList.remove("hidden");

}


function closeModal() {

    document
        .getElementById("profileModal")
        .classList.add("hidden");

}


/* =========================================================
   NEXT MATCH
   ========================================================= */

function renderNextMatch() {

    const match =
        fixtures[0];


    document.getElementById(
        "nextMatch"
    ).innerHTML = `

        <div class="match-date">
            ${match.date.toUpperCase()}
            • ${match.time}
        </div>

        <div class="teams">

            <div class="team">

                <div class="team-logo">
                    ${match.homeIcon}
                </div>

                <strong>
                    ${match.home}
                </strong>

            </div>


            <div class="vs">
                VS
            </div>


            <div class="team">

                <div class="team-logo">
                    ${match.awayIcon}
                </div>

                <strong>
                    ${match.away}
                </strong>

            </div>

        </div>

        <div class="match-status">
            ${match.league}
        </div>

    `;

}


/* =========================================================
   FIXTURES
   ========================================================= */

function renderFixtures() {

    const container =
        document.getElementById(
            "fixturesContainer"
        );


    container.innerHTML = "";


    fixtures.forEach(match => {

        const card =
            document.createElement("div");


        card.className =
            "fixture-card";


        card.innerHTML = `

            <div class="fixture-top">

                <span class="fixture-league">
                    ${match.league}
                </span>

                <span class="fixture-time">
                    ${match.date} • ${match.time}
                </span>

            </div>


            <div class="fixture-teams">

                <div class="fixture-team">

                    <div>
                        ${match.homeIcon}
                    </div>

                    <strong>
                        ${match.home}
                    </strong>

                </div>


                <div class="fixture-vs">
                    VS
                </div>


                <div class="fixture-team">

                    <div>
                        ${match.awayIcon}
                    </div>

                    <strong>
                        ${match.away}
                    </strong>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   UPDATES
   ========================================================= */

function renderUpdates() {

    const container =
        document.getElementById(
            "updatesContainer"
        );


    container.innerHTML = "";


    updates.forEach(update => {

        const card =
            document.createElement("div");


        card.className =
            "update-card";


        card.innerHTML = `

            <h4>
                ${update.title}
            </h4>

            <p>
                ${update.text}
            </p>

            <div class="update-time">
                ${update.time}
            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   PREDICTIONS
   ========================================================= */

function renderPredictions() {

    const container =
        document.getElementById(
            "predictionContainer"
        );


    container.innerHTML = "";


    predictions.forEach(prediction => {

        const card =
            document.createElement("div");


        card.className =
            "prediction-card";


        card.innerHTML = `

            <h3>
                ${prediction.question}
            </h3>

            <div class="prediction-date">
                ${prediction.match}
            </div>


            <div class="prediction-options">

                ${prediction.options
                    .map(option => `

                        <button
                            onclick="
                                makePrediction(
                                    ${prediction.id},
                                    '${option}'
                                )
                            "
                        >
                            ${option}
                        </button>

                    `)
                    .join("")}

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   MAKE PREDICTION
   ========================================================= */

function makePrediction(
    predictionId,
    option
) {

    const predictionKey =
        "prediction_" +
        predictionId;


    const alreadyPredicted =
        localStorage.getItem(
            predictionKey
        );


    if (alreadyPredicted) {

        alert(
            "You have already predicted this match."
        );

        return;

    }


    localStorage.setItem(
        predictionKey,
        option
    );


    /*
       Demo reward.

       IMPORTANT:
       In the real version, the server
       should calculate and award coins.
    */

    user.coins += 20;


    localStorage.setItem(
        "cashmiro_user",
        JSON.stringify(user)
    );


    updateUserInterface();


    alert(
        "Prediction submitted! +20 community coins."
    );

}


/* =========================================================
   THEME
   ========================================================= */

function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

}


function showAbout() {

    alert(
        "Cashmiro Hub\n\nFootball gaming community platform.\n\nPlay • Connect • Grow"
    );

}


/* =========================================================
   TELEGRAM USER
   ========================================================= */

function loadTelegramUser() {

    if (
        !tg ||
        !tg.initDataUnsafe ||
        !tg.initDataUnsafe.user
    ) {
        return;
    }


    const telegramUser =
        tg.initDataUnsafe.user;


    /*
       Telegram supplies the identity.

       In production this data MUST
       be verified by your backend.
    */


    if (
        !user.name ||
        user.name === "Cashmiro Member"
    ) {

        user.name =
            telegramUser.first_name ||
            "Telegram Member";

    }


    user.username =
        telegramUser.username ||
        telegramUser.first_name ||
        "member";


    updateUserInterface();

}


/* =========================================================
   START APPLICATION
   ========================================================= */

function startApp() {

    loadTelegramUser();

    renderNextMatch();

    renderFixtures();

    renderUpdates();

    renderPredictions();

    updateUserInterface();


    setTimeout(() => {

        document
            .getElementById(
                "loadingScreen"
            )
            .classList.add("hidden");


        document
            .getElementById("app")
            .classList.remove("hidden");

    }, 700);

}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    startApp
);