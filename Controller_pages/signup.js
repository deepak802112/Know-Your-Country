// SignupController

app.controller("SignupController", [
  "$scope",
  "$location",
  "signupService",
  "demoService",
  function ($scope, $location, signupService, demoService) {

    $scope.signup = function () {
      var obj = {};
      obj.name = $scope.user.name;
      obj.email = $scope.user.email;
      obj.password = $scope.user.password;
      // password validation.
      if (obj.password.length < 6) {
        alert("Password must contain atleast 6 characters.");
        return;
      } else if (obj.password.includes(" ")) {
        alert("Password shouldn't contain any space.");
        return;
      }


    // for checking that useris existing in local storage or not
      demoService.getUserData(function (data) {
        $scope.userlist = data;
        var toggle = true;
        for (let user of $scope.userlist) {
          if (user.email === obj.email) {
            toggle = false;
            $location.path("/register");
          }
        }
        if (toggle === false) {
          alert("This user already exist😊");
        }

        if (toggle) {
          signupService.sendUserData(obj);
          $location.path("/login");
        }
      });
      // signupService.sendUserData(obj);
      // $location.path("/login");
      // $scope.some = obj;
    };
  },
]);
