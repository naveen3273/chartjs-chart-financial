axios
      .post(`https://api.kraken.com/0/public/OHLC`, {
        pair: "XXBTZEUR",
        interval: 1
      })
      .then(res => {
        const dataPoints = res.result["XXBTZEUR"];
        this.setState({ dataPoints });
      });
