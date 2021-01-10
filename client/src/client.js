export default class Client {
  getData(endpoint) {
    const requestOptions = {
      method: 'GET',
      // headers: {
      //   'Accept': 'application/json',
      //   'Access-Control-Allow-Origin':'*',
      //   'Content-Type': 'applications/json'
      // }
    };
    return fetch(`http://localhost:8080/${endpoint}`, requestOptions)
      .then((response) => response.json())
      .catch((e) => console.log(e));
  }

  post(data, endpoint) {
    return fetch(`http://localhost:8080/${endpoint}`, {
      method: 'POST',  
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .catch(e => console.log(e)); 
  }
}