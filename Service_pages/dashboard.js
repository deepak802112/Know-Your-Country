app.service("dashboardService", [
  "$http",
  function ($http) {
    this.fetchCountryData = function (cb) {
      $http({
        method: "GET",
        url: "https://restcountries.com/v3.1/all",
      }).then(
        function (response) {
          console.log(response);
          cb(response.data);
        },
        function (e) {
          console.log("error is:", e);
        }
      );
    };
  },
]);
