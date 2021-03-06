const weather = require("weather-js");

module.exports = async () => {
	return new Promise(async (resolve, reject) => {
		setTimeout(() => {
			reject("Weather fetch timed out!");
		}, 10000);

		weather.find({ search: "30313", degreeType: "F" }, (err, res) => {
			if (err) {
				console.log(err);
				return;
			}
			let {
				current: { temperature, feelslike, humidity, skytext },
				forecast
			} = res[0];
			let { precip } = forecast[1];
			const response =
				"\nIt is currently " + skytext.toLowerCase() + " out.\n" +
				"Temp: " + temperature + "\xB0F, feels like " + feelslike + "\xB0\n" +
				"Humidity: " + humidity + "%\n" + precip + "% chance of rain";
			resolve(response);
		});
	});
};
