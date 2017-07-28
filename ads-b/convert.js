

var city=process.argv[2];
var year=process.argv[3];

console.log(city + year);


var fs = require('fs');

for (var month=1; month<=12; month++) {
	var m = month.toString();
	if (month < 10) {
		m = '0' + m;
	}
	for (var day=1; day<=31; day++) {
		var d = day.toString();
		if (day < 10) {
			d = '0' + d;
		}

		var filename='./' + city + year + '/' + city + year + m + d + ".json";
		var i;
		var j;
		var item;
		try {
			var json = require(filename);
			if (json.history.date.mon != m || json.history.date.mday != d) {
				throw "date does not match " + m + d;
			} else {
				// console.log(filename);
			}
		
			var observations = json.history.observations;
			for (i = 0, len=observations.length; i < len; ++i){
				item = observations[i];

				var data= {
				  "year": parseInt(item.date.year),
				  "mon": parseInt(item.date.mon),
				  "mday": parseInt(item.date.mday),
				  "hour": parseInt(item.date.hour),
				  "min": parseInt(item.date.min),
				  "tempm": parseFloat(item.tempm),
				  "dewptm": parseFloat(item.dewptm),
				  "hum": parseFloat(item.hum),
				  "wspdm": parseFloat(item.wspdm),
				  "wdird": parseFloat(item.wdird),
				  "wdire": parseFloat(item.wdire),
				  "pressurem": parseFloat(item.pressurem),
				  "conds": item.conds,
				  "fog": parseInt(item.fog),
				  "rain": parseInt(item.rain),
				  "snow": parseInt(item.snow),
				  "hail": parseInt(item.hai),
				  "thunder": parseInt(item.thunder),
				  "tornado": parseInt(item.tornado)};

				fs.appendFileSync('./' + city + year + 'hourly.json', JSON.stringify(data) + '\n');  
				// item.year = item.date.year;
				// item.mon = item.date.mon;
				// item.mday = item.date.mday;
				// item.hour = item.date.hour;
				// item.min = item.date.min;

				// delete item.date;
				// delete item.utcdate;

				// fs.appendFileSync('./' + city + year + 'hourly.json', JSON.stringify(item) + '\n')
			}

			var dailysummary = json.history.dailysummary;
			for (j = 0, len=dailysummary.length; j < len; ++j){
				var daily=dailysummary[j];

				if (daily.hasOwnProperty('date')) {
					daily.year = daily.date.year;
					daily.mon = daily.date.mon;
					daily.mday = daily.date.mday;
					daily.hour = daily.date.hour;
					daily.min = daily.date.min;
				}

				delete daily.date;
				
				fs.appendFileSync('./' + city + year + 'daily.json', JSON.stringify(daily) + '\n')
			}
		}
		catch (err) {
			// console.log(filename + ' ' + err + i + ' ' + j + '\n' + JSON.stringify(item));
			console.log(filename + ' ' + err);
		}		
	}
}
