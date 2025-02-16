export const completedTask = () => {
	const container = document.querySelector(".container-card-task");

	if (container) {
		container.addEventListener("click", (event) => {
			if (event.target.classList.contains("btn-complete")) {
				const card = event.target.closest(".card-item");

				if (card) {
					card.classList.add("removing");
					card.addEventListener("animationend", () => {
						card.remove();
					});

					let savedCards = localStorage.getItem("cards");
					if (savedCards) {
						const containerHTML = container.innerHTML;

						const updatedHTML = containerHTML.replace(card.outerHTML, "");
						localStorage.setItem("cards", updatedHTML);
					}
				}
			}
		});
	}
};

export const editCardTask = () => {
	const container = document.querySelector(".container-card-task");
	const btnSaveModal = document.querySelector(".btn-modal-save");

	if (container) {
		container.addEventListener("click", (event) => {
			if (event.target.classList.contains("btn-edit")) {
				const card = event.target.closest(".card-item");

				if (!card) return;

				const hiddenStartDate = card.querySelector(".hidden-start-date");
				const hiddenEndDate = card.querySelector(".hidden-end-date");

				const modal = document.querySelector("#editTaskModal");
				const exitbtn = modal.querySelector(".close-btn");
				const time = card.querySelector(".time");

				const taskStartDateEl = document.querySelector("#editTaskStartDate");
				const taskEndDateEl = document.querySelector("#editTaskEndDate");

				if (hiddenStartDate && hiddenEndDate && taskStartDateEl && taskEndDateEl) {
					taskStartDateEl.value = hiddenStartDate.textContent.trim();
					taskEndDateEl.value = hiddenEndDate.textContent.trim();
				}

				modal.style.display = "block";

				const exit = () => {
					modal.style.display = "none";
				};
				const changeDate = () => {
					const startDate = new Date(taskStartDateEl.value);
					const endDate = new Date(taskEndDateEl.value);
					const daysDiff = (endDate - startDate) / 86400000;
					time.textContent = daysDiff;

					hiddenStartDate.textContent = taskStartDateEl.value;
					hiddenEndDate.textContent = taskEndDateEl.value;

					modal.style.display = "none";
				};

				btnSaveModal.addEventListener("click", changeDate);

				exitbtn.addEventListener("click", exit);
				window.addEventListener("click", (event) => {
					if (event.target === modal) {
						exit();
					}
				});
			}
		});
	}
};

export const openDateImput = () => {
	const dataInputArr = document.querySelectorAll(".form-control");

	dataInputArr.forEach((item) => {
		item.addEventListener("click", () => {
			item.showPicker();
		});
	});
};
