function getYear(selector) {
	document.querySelector(selector).innerText = (new Date()).getFullYear()
}
getYear(".copyright span")




