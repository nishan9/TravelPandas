const distance = require('google-distance-matrix');

exports.handler = (event, context, callback) => {

    distance.key('AIzaSyCMBNvgbXl1QfSS2JNnDx5MPwbZouyBbJw');
    origins = [JSON.parse(event.body).PassengerAddress]
    AddressRadius = JSON.parse(event.body).DriverAddressList
    destinations = AddressRadius.map(x => x.address)
    resultList = destinations.map(x => {return {address: x, value: 0}});
    RadiusList = AddressRadius.map(x => x.radius)

    distance.matrix(origins, destinations, function (err, distances) {
      if (!err)
      filterlist = []
      results = distances.rows[0].elements;
      for (let i = 0; i < results.length; i++){
        resultList[i].value = results[i].distance.value
      }
      const LessthanRadius = resultList.filter((x, i) => x.value < RadiusList[i])
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(LessthanRadius)
      });
    })
}
