menuIcon.addEventListener("click", () => {
	menuIcon.children[0].classList.toggle("fa-xmark")
	if (menuIcon.classList.contains("fa-xmark")) {
		menuIcon.children[0].innerText = "×"
	}
	menuNav.classList.toggle("closed")
})