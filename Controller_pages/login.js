// LoginController

app.controller("LoginController", [
  "demoService",
  "$scope",
  "$location",
  function (demoService, $scope, $location) {
    $scope.login = function () {
      demoService.getUserData(function (data) {
        $scope.userlist = data;
        console.log($scope.userlist);
        var flag = true;
        let obj = {};

        for (obj of $scope.userlist) {
          if (
            obj.email === $scope.user.email &&
            obj.password === $scope.user.password
          ) {
            flag = false;
            // alert("Congratulation " + obj.name + " you login sucessfully😍");
            $location.path("/dashboard");
            setTimeout(function () {
              alert("Congratulation " + obj.name + " you login sucessfully😍");
            }, 500);
          }
        }

        // if (flag == false) {
        //   // alert("Congratulation you login sucessfully😍");
        //   alert("Welcome"+obj.email);
        // }

        if (flag) {
          alert("Invalid Creditional😔");
        }
      });
    };
  },
]);
