// Update the count down every 47 ms
let timerInterval = setInterval(updateTimer, 47);

// Set the date we're counting down to
let countDownDate = new Date('Feb 26, 2022 20:15:00').getTime(); // Default Date

nodecg.listenFor('startTimer', newVal => {
	if (newVal.time !== '') {
		const dt = new Date();
		countDownDate = new Date(dt.toDateString() + ' ' + newVal.time + ':00').getTime();
		clearInterval(timerInterval);
		timerInterval = setInterval(updateTimer, 47);
	}
});

function updateTimer() {
	// Find the distance between now and the count down date
	const timer = calculateTimer();
	const timerHTML = constructHTML(timer);

	// Display the result in the element with id='timer'
	document.getElementById('timer').innerHTML = timerHTML;

	// If the count down is finished, write some text
	if (timer.distance < 0) {
		clearInterval(timerInterval);
		document.getElementById('timer').innerHTML = '<div class = "default-text">Starting <br> Soon</div>';
	}
}

// Find the distance between now and the count down date
function calculateTimer() {
	// Get today's date and time
	const now = new Date().getTime();

	// Find the distance between now and the count down date
	const distance = countDownDate - now;

	// Time calculations for days, hours, minutes and seconds
	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);
	const milliseconds = Math.floor((distance % 1000));

	const timer = {
		distance,
		days,
		hours,
		minutes,
		seconds,
		milliseconds
	};
	return timer;
}

// Constructs the HTML for the Timer
function constructHTML(timer) {
	let timerHTML = '';

	if (timer.days !== 0) {
		timerHTML += '<div class="countdown-container">';
		timerHTML += '<span class="countdown-heading">Days</span>';
		timerHTML += '<span class="countdown-value">' + padding(timer.days) + '</span>';
		timerHTML += '</div>';

		timerHTML += '<div class="countdown-container">';
		timerHTML += '<span class="countdown-colon">:</span>';
		timerHTML += '</div>';
	}

	timerHTML += '<div class="countdown-container">';
	timerHTML += '<span class="countdown-heading">Hours</span>';
	timerHTML += '<span class="countdown-value">' + padding(timer.hours) + '</span>';
	timerHTML += '</div>';

	timerHTML += '<div class="countdown-container">';
	timerHTML += '<span class="countdown-colon">:</span>';
	timerHTML += '</div>';

	timerHTML += '<div class="countdown-container">';
	timerHTML += '<span class="countdown-heading">Minutes</span>';
	timerHTML += '<span class="countdown-value">' + padding(timer.minutes) + '</span>';
	timerHTML += '</div>';

	timerHTML += '<div class="countdown-container">';
	timerHTML += '<span class="countdown-colon">:</span>';
	timerHTML += '</div>';

	timerHTML += '<div class="countdown-container">';
	timerHTML += '<span class="countdown-heading">Seconds</span>';
	timerHTML += '<span class="countdown-value">' + padding(timer.seconds) + '</span>';
	timerHTML += '</div>';

	timerHTML += '<div class="countdown-container">';
	timerHTML += '<span class="countdown-colon">:</span>';
	timerHTML += '</div>';

	timerHTML += '<div class="countdown-container">';
	timerHTML += '<span class="countdown-heading">Milliseconds</span>';
	timerHTML += '<span class="countdown-value millisecons">' + paddingMillis(timer.milliseconds) + '</span>';
	timerHTML += '</div>';

	return timerHTML;
}

// Adds leading zero
function padding(n) {
	return (n < 10) ? ('0' + n) : n;
}

// Adds leading zero
function paddingMillis(n) {
	if (n < 100) {
		n = '0' + n;
	} else if (n < 10) {
		n = '00' + n;
	}

	return n;
}
