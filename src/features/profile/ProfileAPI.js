export function fetchData(amount = 1) {
    return new Promise((resolve) => {
      fetch(`https://api.opendota.com/api/heroStats`)
        .then(response => response.json())
        .then(data => {
            resolve([...data]);
        })
        .catch(err => console.error(this.props.url, err.toString()))
    });
  }
  