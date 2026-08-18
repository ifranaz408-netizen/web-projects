/* ==================== */
/* TRIPORA - SMART TRAVEL PLANNER */
/* ==================== */


/* ==================== */
/* ELEMENTS */
/* ==================== */

const tripForm = document.getElementById("tripForm");
const destinationInput = document.getElementById("destination");
const durationInput = document.getElementById("duration");
const budgetInput = document.getElementById("budget");
const generateButton = document.getElementById("generateTrip");

const destinationButtons = document.querySelectorAll(".destination-button");
const navLinks = document.querySelectorAll(".nav-menu a");


/* ==================== */
/* TRIP FORM */
/* ==================== */

tripForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const destination = destinationInput.value.trim();
    const duration = Number(durationInput.value);
    const budget = Number(budgetInput.value);

    const travelStyle = document.querySelector(
        'input[name="travelStyle"]:checked'
    );

    const selectedInterests = document.querySelectorAll(
        'input[name="interest"]:checked'
    );


    /* ==================== */
    /* VALIDATION */
    /* ==================== */

    if (!destination) {
        showMessage("Please enter your destination.");
        destinationInput.focus();
        return;
    }

    if (!duration || duration <= 0) {
        showMessage("Please select your trip duration.");
        durationInput.focus();
        return;
    }

    if (!budget || budget <= 0) {
        showMessage("Please enter a valid budget.");
        budgetInput.focus();
        return;
    }

    if (!travelStyle) {
        showMessage("Please select your travel style.");
        return;
    }

    if (selectedInterests.length === 0) {
        showMessage("Please select at least one interest.");
        return;
    }


    /* ==================== */
    /* GET INTERESTS */
    /* ==================== */

    const interests = Array.from(selectedInterests).map(function (item) {
        return item.value;
    });


    /* ==================== */
    /* TRIP DATA */
    /* ==================== */

    const tripData = {
        destination: destination,
        duration: duration,
        budget: budget,
        travelStyle: travelStyle.value,
        interests: interests
    };


    console.log("Trip Data:", tripData);


    /* ==================== */
    /* LOADING STATE */
    /* ==================== */

    setLoadingState(true);


    setTimeout(function () {

        setLoadingState(false);

        createTripResult(tripData);

    }, 700);

});


/* ==================== */
/* LOADING STATE */
/* ==================== */

function setLoadingState(isLoading) {

    if (isLoading) {

        generateButton.disabled = true;
        generateButton.textContent = "Creating Your Trip...";

    } else {

        generateButton.disabled = false;
        generateButton.textContent = "Generate My Trip";

    }

}


/* ==================== */
/* CREATE TRIP RESULT */
/* ==================== */

function createTripResult(tripData) {

    const existingResult = document.querySelector(".trip-result");

    if (existingResult) {
        existingResult.remove();
    }


    const tripResult = document.createElement("section");

    tripResult.className = "trip-result";


    const interestsText = tripData.interests.join(", ");


    tripResult.innerHTML = `

        <div class="container">

            <div class="section-heading">

                <span class="section-tag">
                    YOUR TRAVEL PLAN
                </span>

                <h2>
                    ${tripData.destination}
                </h2>

                <p>
                    A ${tripData.duration}-day
                    ${tripData.travelStyle.toLowerCase()}
                    trip based on your interests in
                    ${interestsText}.
                </p>

            </div>


            <div class="trip-summary">

                <div class="summary-card">
                    <span>Duration</span>
                    <strong>${tripData.duration} Days</strong>
                </div>

                <div class="summary-card">
                    <span>Budget</span>
                    <strong>$${tripData.budget}</strong>
                </div>

                <div class="summary-card">
                    <span>Travel Style</span>
                    <strong>${tripData.travelStyle}</strong>
                </div>

                <div class="summary-card">
                    <span>Interests</span>
                    <strong>${tripData.interests.length}</strong>
                </div>

            </div>


            <div class="itinerary">

                ${generateItinerary(tripData)}

            </div>


            <div class="trip-actions">

                <button class="trip-action" id="cheaperTrip">
                    Make It Cheaper
                </button>

                <button class="trip-action" id="addActivities">
                    Add Activities
                </button>

                <button class="trip-action" id="saveTrip">
                    Save Trip
                </button>

            </div>

        </div>
    `;


    const plannerSection = document.querySelector(".planner-section");

    plannerSection.insertAdjacentElement(
        "afterend",
        tripResult
    );


    tripResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    addTripActions(tripData);

}


/* ==================== */
/* GENERATE ITINERARY */
/* ==================== */

function generateItinerary(tripData) {

    const days = [];

    const activities = getActivities(
        tripData.destination,
        tripData.interests
    );


    for (let i = 1; i <= tripData.duration; i++) {

        const firstActivity =
            activities[(i - 1) % activities.length];

        const secondActivity =
            activities[i % activities.length];

        const thirdActivity =
            activities[(i + 1) % activities.length];


        days.push(`

            <article class="itinerary-day">

                <div class="itinerary-number">
                    ${String(i).padStart(2, "0")}
                </div>

                <div class="itinerary-content">

                    <div class="itinerary-header">

                        <div>

                            <span>
                                DAY ${i}
                            </span>

                            <h3>
                                ${getDayTitle(i)}
                            </h3>

                        </div>

                        <strong>
                            $${getDailyBudget(
                                tripData.budget,
                                tripData.duration
                            )}
                        </strong>

                    </div>


                    <div class="activity-list">

                        <div class="activity">
                            <span>Morning</span>
                            <strong>${firstActivity}</strong>
                        </div>

                        <div class="activity">
                            <span>Afternoon</span>
                            <strong>${secondActivity}</strong>
                        </div>

                        <div class="activity">
                            <span>Evening</span>
                            <strong>${thirdActivity}</strong>
                        </div>

                    </div>

                </div>

            </article>

        `);

    }


    return days.join("");

}


/* ==================== */
/* ACTIVITIES */
/* ==================== */

function getActivities(destination, interests) {

    const activityLibrary = {

        Beaches: [
            `Relax at a popular beach in ${destination}`,
            "Enjoy a sunset by the water",
            "Explore the coastline"
        ],

        Shopping: [
            `Explore shopping areas in ${destination}`,
            "Visit a local market",
            "Discover local stores and boutiques"
        ],

        Food: [
            `Try local food in ${destination}`,
            "Explore popular food spots",
            "Enjoy a local dinner experience"
        ],

        Sightseeing: [
            `Visit famous landmarks in ${destination}`,
            "Explore the city center",
            "Take a city sightseeing tour"
        ],

        Adventure: [
            `Try an outdoor activity in ${destination}`,
            "Explore an adventurous attraction",
            "Discover a new outdoor experience"
        ],

        Culture: [
            `Explore cultural attractions in ${destination}`,
            "Visit a museum or historic site",
            "Discover local traditions"
        ]

    };


    let activities = [];


    interests.forEach(function (interest) {

        if (activityLibrary[interest]) {

            activities = activities.concat(
                activityLibrary[interest]
            );

        }

    });


    if (activities.length === 0) {

        activities = [
            `Explore ${destination}`,
            "Discover local attractions",
            "Enjoy the city"
        ];

    }


    return activities;

}


/* ==================== */
/* DAY TITLE */
/* ==================== */

function getDayTitle(day) {

    const titles = [
        "Discover the City",
        "Explore Local Highlights",
        "Experience Something New",
        "Relax and Explore",
        "Enjoy Your Journey",
        "Final Day Experience"
    ];


    return titles[(day - 1) % titles.length];

}


/* ==================== */
/* DAILY BUDGET */
/* ==================== */

function getDailyBudget(totalBudget, totalDays) {

    return Math.round(totalBudget / totalDays);

}


/* ==================== */
/* TRIP ACTIONS */
/* ==================== */

function addTripActions(tripData) {

    const cheaperButton =
        document.getElementById("cheaperTrip");

    const activitiesButton =
        document.getElementById("addActivities");

    const saveButton =
        document.getElementById("saveTrip");


    /* ==================== */
    /* MAKE IT CHEAPER */
    /* ==================== */

    cheaperButton.addEventListener("click", function () {

        tripData.budget =
            Math.round(tripData.budget * 0.8);

        createTripResult(tripData);

        showMessage(
            `Your trip has been updated with a lower budget of $${tripData.budget}.`
        );

    });


    /* ==================== */
    /* ADD ACTIVITIES */
    /* ==================== */

    activitiesButton.addEventListener("click", function () {

        const extraInterest =
            tripData.interests[0];

        const activities =
            getActivities(
                tripData.destination,
                [extraInterest]
            );

        const activityList =
            document.querySelectorAll(".activity-list");

        activityList.forEach(function (list, index) {

            const extraActivity =
                activities[index % activities.length];

            const activity =
                document.createElement("div");

            activity.className = "activity";

            activity.innerHTML = `
                <span>Extra</span>
                <strong>${extraActivity}</strong>
            `;

            list.appendChild(activity);

        });


        showMessage(
            "Extra activities have been added to your itinerary."
        );

    });


    /* ==================== */
    /* SAVE TRIP */
    /* ==================== */

    saveButton.addEventListener("click", function () {

        saveTrip(tripData);

    });

}


/* ==================== */
/* SAVE TRIP */
/* ==================== */

function saveTrip(tripData) {

    const savedTrips =
        JSON.parse(
            localStorage.getItem("triporaTrips")
        ) || [];


    savedTrips.push({
        ...tripData,
        savedAt: new Date().toISOString()
    });


    localStorage.setItem(
        "triporaTrips",
        JSON.stringify(savedTrips)
    );


    showMessage(
        "Your trip has been saved successfully."
    );

}


/* ==================== */
/* DESTINATION BUTTONS */
/* ==================== */

destinationButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const card =
            button.closest(".destination-card");

        const destinationName =
            card.querySelector("h3").textContent;

        const destination =
            destinationName.split(",")[0];


        destinationInput.value =
            destination;


        document.querySelector("#planner").scrollIntoView({
            behavior: "smooth"
        });


        destinationInput.focus();

    });

});


/* ==================== */
/* MESSAGE NOTIFICATION */
/* ==================== */

function showMessage(message) {

    const oldMessage =
        document.querySelector(".toast-message");

    if (oldMessage) {
        oldMessage.remove();
    }


    const toast =
        document.createElement("div");

    toast.className = "toast-message";

    toast.textContent = message;


    document.body.appendChild(toast);


    setTimeout(function () {

        toast.classList.add("show");

    }, 20);


    setTimeout(function () {

        toast.classList.remove("show");

        setTimeout(function () {
            toast.remove();
        }, 300);

    }, 3000);

}


/* ==================== */
/* NAVIGATION */
/* ==================== */

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


/* ==================== */
/* INITIAL MESSAGE */
/* ==================== */

console.log(
    "Tripora Smart Travel Planner loaded successfully."
);
