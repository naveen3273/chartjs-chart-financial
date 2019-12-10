$(function(){
	var barCount = 60;
	var initialDateStr = '01 Apr 2017 00:00 Z';
	formattedData = [];

	var ctx = document.getElementById('chart').getContext('2d');
	ctx.canvas.width = 1000;
	ctx.canvas.height = 600;
	data = null;

	$.ajax({
		url: "https://api.kraken.com/0/public/OHLC",
		type: "POST",
		data: {
			pair: "XXBTZEUR",
			interval: 15
		},
		// crossOrigin: true,
		dataType: "json",
	}).done(function(data){
		console.log(data);
		$.each(data.result.XXBTZEUR, function(index, item){
			// console.log(item);
			formattedData.push(
				{
					t : item[0],
					o : item[1],
					h : item[2],
					l : item[3],
					c : item[4]
				}
			);
		})
		var filteredData = _.filter(formattedData, function(item, index){ if(index % 1 === 0) return item; });
		console.log(formattedData);

		var chart = new Chart(ctx, {
			type: 'candlestick',
			data: {
				datasets: [{
					label: 'CHRT - Chart.js Corporation',
					data: filteredData
				}]
			},
			options: {
		    plugins: {
		      crosshair: {
		        sync: {
		          enabled: true,          
		        }
		      }
		    },
				scales: {
					xAxes: [{
						type: 'time',
            distribution: 'series',
						afterBuildTicks: function(scale, ticks) {
							// console.log(scale._unit);
							var majorUnit = scale._unit;
							var firstTick = ticks[0];
							var i, ilen, val, tick, currMajor, lastMajor;

							val = luxon.DateTime.fromMillis(ticks[0].value);
							if ((majorUnit === 'minute' && val.second === 0)
									|| (majorUnit === 'hour' && val.minute === 0)
									|| (majorUnit === 'day' && val.hour === 9)
									|| (majorUnit === 'month' && val.day <= 3 && val.weekday === 1)
									|| (majorUnit === 'year' && val.month === 0)) {
								firstTick.major = true;
							} else {
								firstTick.major = false;
							}
							lastMajor = val.get(majorUnit);

							for (i = 1, ilen = ticks.length; i < ilen; i=i+60) {
								tick = ticks[i];
								val = luxon.DateTime.fromMillis(tick.value);
								currMajor = val.get(majorUnit);
								tick.major = currMajor !== lastMajor;
								lastMajor = currMajor;
							}
							return ticks;
						}
					}]
				}
			}
		});
	});
});
