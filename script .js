document.addEventListener("DOMContentLoaded", function () {
    const plannerElement = document.getElementById("planner");

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
        for (let hour = 0; hour < 24; hour++) {
            createPlannerItem(hour, tasks[hour] || "");
        }
    };

    const saveTasks = () => {
        const tasks = {};
        document.querySelectorAll(".planner-item").forEach(item => {
            const hour = item.getAttribute("data-hour");
            const task = item.querySelector("input").value;
            tasks[hour] = task;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const createPlannerItem = (hour, task) => {
        const plannerItem = document.createElement("div");
        plannerItem.classList.add("planner-item");
        plannerItem.setAttribute("data-hour", hour);

        const timeLabel = document.createElement("span");
        timeLabel.textContent = `${hour}:00`;
        plannerItem.appendChild(timeLabel);

        const taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.value = task;
        plannerItem.appendChild(taskInput);

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", saveTasks);
        plannerItem.appendChild(saveButton);

        plannerElement.appendChild(plannerItem);
    };

    loadTasks();
});