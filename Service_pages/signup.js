app.service("signupService",["$http","$location",function($http,$location){
    this.sendUserData = function (obj) {
        console.log("hii");
        $http({
          method: "POST",
          url: " http://localhost:3000/users",
          data: obj,  
        }).then(
          function (res) {
            // return res.post;
            console.log(res);
            alert("Signup successful😊");
      //       console.log(response);
            $location.path("/login");
          },
          function (e) {
            console.log(e);
          }
        );
      };
}])