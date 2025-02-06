export const addCard = () => {
	const btn = document.querySelector(".btn");
	const containerCardTask = document.querySelector(".container-card-task");

	if (!btn || !containerCardTask) {
		console.error("Элементы кнопки или контейнера не найдены!");
		return;
	}

	const taskTypeEl = document.getElementById("taskType");
	const taskDescriptionEl = document.getElementById("taskDescription");
	const taskPriorityEl = document.getElementById("taskPriority");
	const taskStartDateEl = document.getElementById("taskStartDate");
	const taskEndDateEl = document.getElementById("taskEndDate");
	const form = document.getElementById("taskForm");

	window.addEventListener("DOMContentLoaded", () => {
		const savedCards = localStorage.getItem("cards");
		if (savedCards) {
			containerCardTask.innerHTML = savedCards;
		}
	});

	btn.addEventListener("click", () => {
		const taskType = taskTypeEl.selectedOptions[0].text;
		const taskDescription = taskDescriptionEl.value;
		const taskPriority = taskPriorityEl.selectedOptions[0].text.slice(-2);
		const startDate = new Date(taskStartDateEl.value);
		const endDate = new Date(taskEndDateEl.value);

		if (startDate > endDate) {
			alert("Дата окончания не может быть раньше даты начала!");
			return;
		}

		const daysDiff = (endDate - startDate) / 86400000;

		const startDateFormatted = startDate.toISOString().slice(0, 10);
		const endDateFormatted = endDate.toISOString().slice(0, 10);

		const cardHTML = `
            <div class="card-item">
                <div class="header-card">
                    <h4 class="card-title">${taskType}</h4>
                    <a href="#"><span>${taskPriority}</span></a>
                </div>
                <p class="card-text">${taskDescription}</p>
                <p class="card-time">
                    <span class="time">${daysDiff}</span> дней
                </p>
                <p class="hidden-start-date" style="display: none">${startDateFormatted}</p>
                <p class="hidden-end-date" style="display: none">${endDateFormatted}</p>
                <div class="card-buttons">
                    <button class="btn-complete">✔ Выполнено</button>
                    <button class="btn-edit">✏ Редактировать</button>
                </div>
            </div>
        `;

		containerCardTask.insertAdjacentHTML("afterbegin", cardHTML);

		localStorage.setItem("cards", containerCardTask.innerHTML);

		form.reset();
	});
};
