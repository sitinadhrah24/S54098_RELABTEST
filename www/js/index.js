$(function () {


        var link2 = crossroads.addRoute("", function () {
                $("#divHome").show();
                $("#divStaff").hide();
                $("#divEmail").hide();

        });


        var link9 = crossroads.addRoute("/email", function () {
                $(".navbar-collapse li").removeClass("active");
                $(".navbar-collapse li a[href='#staff']").parent().addClass("active");
                var email = sessionStorage.ttoken;
                var datalist = "email=" + email;
                $.ajax({
                        type: "post",
                        url: "http://www.skimtech.my/ClassicModels/GetStaff",
                        data: datalist,
                        cache: false,
                        success: function (mydata) {
                                var myData = JSON.parse(mydata);
                                //alert(mydata);
                                var lastIndex = myData.length - 1;
                                var htmlText = "";
                                if (myData[lastIndex].status === 1) {
                                        for (var i = 0; i < lastIndex; i++) {
                                                htmlText = htmlText + "<tr><td>" + myData[i].id
                                                        + "</td><td><a href='#viewstaff/" + myData[i].id + "'>" + myData[i].email
                                                        + "</a></td></tr>";
                                        }
                                        $("#tblEmail tbody").html(htmlText);
                                }
                        },
                        error: function () {
                                console.log("ajax error!");
                                alert("Please contact admin!");
                        }
                });
                $("#divHome").hide();
                $("#divStaff").show();
                $("#divEmail").show();
        });

        var link5 = crossroads.addRoute("/viewstaff/{id}", function (id) {
                
                var datalist = "id=" + id;
                $.ajax({
                        type: "post",
                        url: "http://www.skimtech.my/ClassicModels/GetStaffById",
                        data: datalist,
                        cache: false,
                        success: function (mydata) {
                                var myData = JSON.parse(mydata);
                                var lastIndex = myData.length - 1;
                                var htmlText = "";
                                if (myData.status === 1) {
                                        htmlText = htmlText + "<tr><td>" + myData.firstname +
                                                "</td><td>" + myData.extension +
                                                "</td><td>" + myData.jobtitle +
                                                "</td><td>" + myData.id +
                                                "</td><td>" + myData.email +
                                                "</td><td>" + myData.lastname +
                                                "</td></tr>";

                                        $("#tblStaff tbody").html(htmlText);
                                }
                        },
                        error: function () {
                                console.log("ajax error!");
                                alert("Please contact admin!");
                        }
                });


        });

        function parseHash(newHash, oldHash) {
                crossroads.parse(newHash);

        }

        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        hasher.init();

});