$(document).ready(function () {

    async function dataFromServer(id) {
        try {
            let result = await $.ajax({
                url: (id != null) ? "https://reqres.in/api/users/" : "https://reqres.in/api/users?page=1",
                data: { id: id },
                type: "GET",
            });
            return result;
        } catch {
            alert("ops");
        }
    }

    $("#get-user").on("click", async function () {
        let id = $("#user-id").val();
        var data = dataFromServer(id);
        await data.then(function (result) {
            searchUser(result.data)
        });
        deleteRow();
    });

    $("#get-users").on("click", async function () {
        var data = dataFromServer();
        await data.then(function (result) {
            generateTable(result.data)
        });
        deleteRow();
    });

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
});


