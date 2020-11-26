$(document).ready(function () {
    function generateTable(data) {
        $("table tbody tr").remove();
        for (let item of data) {
            let id = item.id;
            let name = item.first_name + item.last_name;
            let email = item.email;
            let avatar = item.avatar;
            let markup = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + email + "</td><td><img src=" + avatar + "></td><td> <input type='button' class='delete-row' value='Delete'></td></tr> ";
            $("table tbody").append(markup);
        }
    }

    function deleteRow() {
        $(".delete-row").click(function () {
            let id = $(this).parents("tr").children()[0].innerText;
            $(this).parents("tr").remove();
        });
    }

    function searchUser(data) {
        $("table tbody tr").remove();
        let id = data.id;
        let name = data.first_name + data.last_name;
        let email = data.email;
        let avatar = data.avatar;
        let markup = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + email + "</td><td><img src=" + avatar + "></td><td> <input type='button' class='delete-row' value='Delete'></td></tr> ";
        $("table tbody").append(markup);
    }

    function dataFromServer(id) {
        return $.ajax({
            url: (id != null) ? "https://reqres.in/api/users/" + id + "" : "https://reqres.in/api/users?page=1",
            type: "GET",
        });
    }

    $("#get-user").on("click", function () {
        let id = $("#user-id").val();
        dataFromServer(id)
            .then(function (data) {
                searchUser(data.data);
            })
            .then(deleteRow)
            .fail(function () {
                alert("ops");
            })
    });

    $("#get-users").on("click", function () {
        dataFromServer()
            .then(function (data) {
                generateTable(data.data);
            })
            .then(deleteRow)
            .fail(function () {
                alert("ops");
            })
    });

});


