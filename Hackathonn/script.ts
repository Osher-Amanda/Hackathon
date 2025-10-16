interface Task {
  name: string;
  indoorAlternative: string;
}

const apiKey = "e506257c876eb303d7a39209780b2d67";

// HTML elements
const cityInput = document.getElementById("city") as HTMLInputElement;
const weatherInfo = document.getElementById("weatherInfo") as HTMLElement;
const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const altInput = document.getElementById("altInput") as HTMLInputElement;
const addTaskBtn = document.getElementById("addTask") as HTMLButtonElement;
const getWeatherBtn = document.getElementById("getWeather") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLDivElement;

let currentWeather: string = "";
let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

// Outfit suggestion
function getOutfit(weather: string): string {
  const outfits: { [key: string]: string } = {
    clear: "T-shirt and sunglasses 😎",
    clouds: "Light sweater or hoodie ☁️",
    rain: "Waterproof jacket and boots 🌧️",
    thunderstorm: "Raincoat and sturdy shoes ⚡",
    snow: "Warm coat, gloves, and boots ❄️",
    mist: "Light jacket and scarf 🌫️"
  };
  return outfits[weather] || "Dress comfortably!";
}

// Check bad weather for outdoor tasks
function isBadWeather(weather: string): boolean {
  const bad = ["rain", "thunderstorm", "snow"];
  return bad.includes(weather.toLowerCase());
}

// Fetch weather from API
async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return alert("Enter a city!");

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();

    if (data.cod !== 200) {
      weatherInfo.textContent = `Error: ${data.message}`;
      return;
    }

    currentWeather = data.weather[0].main.toLowerCase();
    weatherInfo.textContent = `Current weather in ${city}: ${data.weather[0].main}, ${data.main.temp}°C`;

    renderTasks();
  } catch (err) {
    console.error(err);
    alert("Failed to fetch weather.");
  }
}

// Add task
function addTask() {
  const name = taskInput.value.trim();
  const indoorAlternative = altInput.value.trim();
  if (!name) return alert("Enter a task!");

  tasks.push({ name, indoorAlternative });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  altInput.value = "";
  renderTasks();
}

// Remove task
function removeTask(index: number) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Render tasks and outfit
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";

    const taskToShow = isBadWeather(currentWeather) ? task.indoorAlternative : task.name;
    const outfit = getOutfit(currentWeather);

    div.innerHTML = `
      <p>Task: ${taskToShow}</p>
      <p>Suggested outfit: ${outfit}</p>
      <button onclick="removeTask(${index})">Remove</button>
    `;

    taskList.appendChild(div);
  });
}

// Event listeners
addTaskBtn.onclick = addTask;
getWeatherBtn.onclick = getWeather;
window.removeTask = removeTask;

// Initial render
renderTasks();
