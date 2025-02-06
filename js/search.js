export const searchInput = document.getElementById("taskSearchInput");

export const search = () => {
	const filterText = searchInput.value.toLowerCase();
	const tasks = document.querySelectorAll(".card-item");

	tasks.forEach((task) => {
		const taskTitle = task.querySelector(".card-title").textContent.toLowerCase();
		const taskDescription = task.querySelector(".card-text").textContent.toLowerCase();

		if (taskTitle.includes(filterText) || taskDescription.includes(filterText)) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
};

searchInput.addEventListener("input", search);
