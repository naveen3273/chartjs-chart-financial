<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Financial | Chart.js</title>
		<script src="https://cdn.polyfill.io/v2/polyfill.js?features=default,String.prototype.repeat,Array.prototype.find,Array.prototype.findIndex,Math.trunc,Math.sign"></script>
		<script src="https://cdn.jsdelivr.net/npm/luxon@1.19.3"></script>
		<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.0"></script>
		<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon@0.2.0"></script>
		<script src="./chartjs-chart-financial.js" type="text/javascript"></script>
		<link rel="stylesheet" type="text/css" href="style.css">
		<link rel="icon" href="./favicon.ico"/>
	</head>
	<body>
		<h1>Chart.js - Financial chart</h1>
		<p>See the <a href="https://github.com/chartjs/chartjs-chart-financial/tree/master/docs">Source Code</a>, <a href="https://github.com/chartjs/chartjs-chart-financial">README</a>, and <a href="https://www.chartjs.org/docs/">Chart.js docs</a> for more details.</p>
		<h2>Sample Chart</h2>
		<div style="width:1000px; height: 600px;">
			<canvas id="chart"></canvas>
		</div>
		<div>
			Bar Type:
			<select id="type">
				<option value="candlestick" selected>Candlestick</option>
				<option value="ohlc">OHLC</option>
			</select>
			Color Scheme:
			<select id="color-scheme">
				<option value="muted" selected>Muted</option>
				<option value="neon">Neon</option>
			</select>
			Border:
			<select id="border">
				<option value="true" selected>Yes</option>
				<option value="false">No</option>
			</select>
			<button id="update">Update</button>
			<button id="randomizeData">Randomize Data</button>
		</div>
		<script src="jquery-3.3.1.min.js"></script>
    <script src="underscore-min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-crosshair@1.1.2" charset="utf-8"></script>
		<!-- <script type="text/javascript" src="jquery.ajax-cross-origin.min.js"></script> -->

		<script type="text/javascript" src="index.js"></script>
	</body>
</html>
