document.addEventListener('keydown', function (event) {
	const elId = event.key.toLowerCase()
	const timerDisplay = document.getElementById('timerDisplay')
	const timerStartKey = timerDisplay.getAttribute('data-start-key')
	const timerPauseKey = timerDisplay.getAttribute('data-pause-key')
	const timerResetKey = timerDisplay.getAttribute('data-reset-key')
	switch (elId) {
		case timerStartKey:
			startTimer()
			break
		case timerPauseKey:
			pauseTimer()
			break
		case timerResetKey:
			resetTimer()
			break
	}
	const el = document.getElementById(elId)
	if (el) {
		const parent = el.parentNode
		parent.querySelectorAll('.show').forEach((el) => {
			el.classList.remove('show')
			el.querySelectorAll('video, audio').forEach((media) => {
				media.pause()
			})
		})
		el.classList.add('show')
		el.querySelectorAll('video, audio').forEach((media) => {
			if (media.readyState >= 3) {
				media.play()
			}
		})
	}
})

// Define variables for timer values
let minutes = 0
let seconds = 0
let milliseconds = 0

// Define the timer interval variable
let interval

// Function to start the timer
function startTimer() {
	clearInterval(interval) // Clear any existing intervals
	interval = setInterval(updateTimer, 10) // Update the timer every 10 milliseconds
}

// Function to pause the timer
function pauseTimer() {
	clearInterval(interval)
}

// Function to reset the timer
function resetTimer() {
	clearInterval(interval)
	minutes = 0
	seconds = 0
	milliseconds = 0
	document.getElementById('timerDisplay').innerHTML = '00:00:00'
}

// Function to update the timer
function updateTimer() {
	milliseconds += 10
	if (milliseconds >= 1000) {
		milliseconds = 0
		seconds++
		if (seconds >= 60) {
			seconds = 0
			minutes++
		}
	}

	// Format the timer values into strings with leading zeros
	let minutesStr = minutes < 10 ? '0' + minutes : minutes
	let secondsStr = seconds < 10 ? '0' + seconds : seconds
	let millisecondsStr = milliseconds < 100 ? '0' + Math.floor(milliseconds / 10) : Math.floor(milliseconds / 10)

	// Display the timer values
	document.getElementById('timerDisplay').innerHTML = minutesStr + ':' + secondsStr + ':' + millisecondsStr
}

