app.service("demoService", [
    "$http",
    function ($http) {
      this.getUserData = function (cb) {
        $http({
          method: "GET",
          url: "http://localhost:3000/users",
        }).then(
          function (res) {
            cb(res.data);
          },
          function (e) {
            console.log("error"+e);
          }
        );
      };
    }])
  