document.addEventListener('keydown', function (event) {
	const elId = event.key.toLowerCase()
	const el = document.querySelector(`[data-key='${elId}']`)
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

