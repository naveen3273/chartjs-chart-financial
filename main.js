$(function() {
  formattedData = [];
  namespace = {
    defaults: {
      BASE_URL: "https://api.kraken.com/0/public/",
      CURRENT_URL: "https://api.kraken.com/0/public/",
      OHLC_DATA_INTERVAL: 1,
      PAIR: "XXBTZEUR"
    },

    init: function(options) {
      this.setURL(options.url);
      this.setInterval(options)
      this.setPair(options)

      return this;
    },

    fetch: function() {
      return $.ajax({
        url: this.getURL(),
        type: "POST",
        crossDomain: true,
        data: {
          pair: this.PAIR,
          interval: this.OHLC_DATA_INTERVAL
        },
        dataType: "json",
      })
    },

    setURL: function(url) {
      this.defaults.CURRENT_URL = this.defaults.BASE_URL + url;
      return this;
    },

    setInterval: function(options) {
      this.OHLC_DATA_INTERVAL = (typeof(options.interval) !== "undefined") ? options.interval : this.OHLC_DATA_INTERVAL;
      return this;
    },

    setPair: function(options) {
      this.PAIR = (typeof(options.interval) !== "undefined") ? options.pair : this.PAIR;
      return this;
    },

    getURL: function() {
      return this.defaults.CURRENT_URL;
    },

    formateData: function(data) {
      processedData = [];
      $.each(data.result[this.defaults.PAIR], function(index, item) {
        // console.log(item);
        processedData.push({
          x: item[0] * 1000,
          y: [item[1], item[2], item[3], item[4]]
        });
      })

      return processedData;
    },

    prepareCandlestickChart: function(ele) {
      var optionsCandlestick = {
        chart: {
          id: 'candles',
          height: 550,
          type: 'candlestick',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: false
          },
          animations: {
            enabled: false,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },

          // toolbar: {
          //   show: true,
          //   tools: {
          //     download: false,
          //     selection: false,
          //     zoom: false,
          //     zoomin: false,
          //     zoomout: false,
          //     pan: false,
          //     reset: false | '<img src="/static/icons/reset.png" width="20">',
          //     customIcons: []
          //   }
          // },
        },
        fill: {
          type: 'pattern',
          pattern: {
            style: 'slantedLines',
            width: 3,
            height: 3,
            strokeWidth: 2
          }
        },

        annotations: {
          yaxis: [{
            y: 6600,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396"
              },
              text: "Y Axis Annotation"
            }
          }],
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: '#a6e22e',
              downward: '#f64f4b'
            }
          }
        },
        grid: {
          row: {
            colors: ['#000']
          },
          column: {
            colors: ['#000']
          }
        },
        series: [{
          data: formattedData
        }],
        stroke: {
          width: 1
        },
        series: [{
          data: formattedData
        }],
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MMM \'yy',
              day: 'dd MMM',
              hour: 'HH:mm'
            }
          },
          tooltip: {
            enabled: true
          },
          labels: {
            show: true
          },
          tooltip: {
            enabled: true,
            formatter: function(value) {
              var date = new Date(value);
              var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
            },
          },
        },
        yaxis: {
          labels: {
            show: true
          },
          tooltip: {
            enabled: true,
            offsetX: -30,
            formatter: function(value) {
              return value;
            }
          }
        }
      }

      return new ApexCharts(
        document.querySelector(ele),
        optionsCandlestick
      );
    },

    prepareChart: function(ele) {
      var options = {
        chart: {
          height: 160,
          type: 'candlestick',
          brush: {
            enabled: true,
            target: 'candles'
          },
          selection: {
            enabled: true,
            xaxis: {
              min: formattedData[0].x,
              max: formattedData[50].x
            },
            fill: {
              color: '#ccc',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
            }
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 1
        },
        series: [{
          data: formattedData
        }],
        xaxis: {
          type: 'datetime',

        },
        yaxis: {
          labels: {
            show: true
          }
        }
      }

      return new ApexCharts(
        document.querySelector("#chart-bar"),
        options
      );
    },

    renderChart: function(data) {
      // console.log(data);
      formattedData = namespace.formateData(data);

      console.log(formattedData);

      namespace.chartCandlestick = namespace.prepareCandlestickChart('#chart');
      namespace.chartCandlestick.render();

      window.setInterval(function() {
        namespace.fetch().done(namespace.updateChart)
      }, 15000)

      // chartCandlestick.updateSeries([{
      //   data:
      // }])
      // var chart = namespace.prepareChart('#chart-bar');
      // chart.render();
    },

    updateChart: function(data) {
      var data = namespace.formateData(data);
      namespace.chartCandlestick.updateSeries([{
        data: data
      }])
    }
  }

  namespace
    .init({
      url: "OHLC",
      interval: 1,
      pair: "XXBTZEUR"
    })
    .fetch()
    .done(namespace.renderChart);

  $("#1-minute").click(function() {
    namespace.setInterval({
      interval: 1
    }).fetch().done(namespace.updateChart);
  });

  $("#5-minutes").click(function() {
    namespace.setInterval({
      interval: 5
    }).fetch().done(namespace.updateChart);
  });

  $("#15-minutes").click(function() {
    namespace.setInterval({
      interval: 15
    }).fetch().done(namespace.updateChart);
  });

  $("#30-minutes").click(function() {
    namespace.setInterval({
      interval: 30
    }).fetch().done(namespace.updateChart);
  });

  $("#1-hour").click(function() {
    namespace.setInterval({
      interval: 60
    }).fetch().done(namespace.updateChart);
  });

  $("#4-hours").click(function() {
    namespace.setInterval({
      interval: 240
    }).fetch().done(namespace.updateChart);
  });

  $("#1-day").click(function() {
    namespace.setInterval({
      interval: 1440
    }).fetch().done(namespace.updateChart);
  });

  $("#1-week").click(function() {
    namespace.setInterval({
      interval: 10080
    }).fetch().done(namespace.updateChart);
  });

  $("#2-weeks").click(function() {
    namespace.setInterval({
      interval: 21600
    }).fetch().done(namespace.updateChart);
  });
})
