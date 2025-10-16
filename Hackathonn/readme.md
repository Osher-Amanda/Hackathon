Hackathon: Weather-Based Daily Planner
Description

This project is a weather-adaptive daily planner. It allows you to:

It checks the current weather for any city using the OpenWeather API.

Add tasks with indoor alternatives.

Automatically picks whether to do the outdoor task or indoor alternative based on the weather.

Suggests an appropriate outfit based on the current weather conditions.

This project is built using HTML, CSS, and TypeScript, compiled to JavaScript for browser use. It also uses localStorage to save your tasks in the browser.

Features

Dynamic weather check: Fetches weather info (temperature, condition) for any city.

Indoor/outdoor task selection: Automatically chooses the best task to do based on the weather (e.g., indoor if it’s raining).

Outfit suggestions: Recommends clothing based on the weather conditions.

Persistent tasks: Tasks are saved in the browser even after refreshing.

How It Works:

Enter a city and click Check Weather to fetch current weather conditions.

Add a task and its indoor alternative.

The app will automatically display the appropriate task based on the weather and show a suggested outfit.

Click Remove to delete tasks.