// dashboard controller

app.controller("dashboardCtrl", [
  "dashboardService",
  "$scope",
  "$location",
  "$window",
  function (dashboardService, $scope, $location,$window) {
    var checkAuth = $window.localStorage.getItem("user");
    if (checkAuth) {
      // Redirect: To movies page. If the user already logged-in.
      $location.path("/login")
    }
    $scope.countries = [];
    $scope.filteredCountries = [];
    $scope.selectedAlphabet = "";
    $scope.selectedRegion = "";
    $scope.searchQuery = "";
    $scope.searchType = "country";
    $scope.alphabets = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    );
    $scope.regions = [];

    // getting data from service
    $scope.fetchCountryData = function () {
      dashboardService.fetchCountryData(function (data) {
        $scope.countries = data;
        console.log($scope.countries);
        $scope.filteredCountries = $scope.countries;
        $scope.extractRegions();
      });
    };

    // Extract unique regions on the basis of continents from countries
    $scope.extractRegions = function () {
      var regions = [];
      $scope.countries.forEach(function (country) {
        if (country.region && !regions.includes(country.region)) {
          regions.push(country.region);
        }
      });
      $scope.regions = regions;
    };

    //redirecting to home page,if you click on the button
    $scope.backHome = function () {
      $location.path("/signup");
    };

    // Filter countries based on selected alphabet, region, and search query
    $scope.filterCountries = function () {
      var filteredCountries = $scope.countries;

      if ($scope.selectedAlphabet !== "") {
        filteredCountries = filteredCountries.filter(function (country) {
          return (
            country.name.common.charAt(0).toUpperCase() ===
            $scope.selectedAlphabet
          );
        });
      }

      if ($scope.selectedRegion !== "") {
        filteredCountries = filteredCountries.filter(function (country) {
          return country.region === $scope.selectedRegion;
        });
      }
      
      //search query

      if ($scope.searchQuery !== "") {
        var query = $scope.searchQuery.toLowerCase();
        filteredCountries = filteredCountries.filter(function (country) {
          if ($scope.searchType === "country") {
            return country.name.common.toLowerCase().includes(query);
          } else if ($scope.searchType === "capital") {
            return (
              country.capital &&
              country.capital[0].toLowerCase().includes(query)
            );
          }
        });
      }

      $scope.filteredCountries = filteredCountries;
    };

    // Get language names for each country
    $scope.getLanguageNames = function (country) {
      if (country.languages) {
        return Object.values(country.languages).join(", ");
      }
      return "";
    };
    //Get the currency of each country
    $scope.getCurrencyNames = function (country) {
      if (country.currencies) {
        return Object.keys(country.currencies)[0]; //it will return the first key of currency property
      }
      return "";
    };

    // Get capital for each country
    $scope.getCapital = function (country) {
      if (country.capital) {
        return country.capital[0];
      }
      return "";
    };

    // Initialize the country data
    $scope.fetchCountryData();
  },
]);
