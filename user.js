//Post button
$(document).ready(function () {

    $("#new-user").on("click", function (e) {
        $("#new-user-form").toggle();
    });

    $("#submit-user").click(function () {
        var id = $("#user-id").val();
        var name = $("#name").val();
        var email = $("#email").val();
        var gender = $("#gender").val();
        var status = $("#status").val();
        $(".table tbody tr").append(
            '<tr>' +
            '<td>' + id + '</td' > +
            '<td>' + name + '</td>' +
            '<td>' + email + '</td>' +
            '<td>' + gender + '</td>' +
            '<td>' + status + '</td>' +
            '<td>' + '</td>' +
            '</tr>'
        );
        $('.table tbody > tr:last-child').append(
            `<i class="ui-icon ui-icon-pencil edit-button" id="` + user.id + `"></i>
             <i class="ui-icon ui-icon-trash delete-button" id="`+ user.id + `"></i> </td>`);
    })
})

$(document).ready(function () {

    getUsers();

    function getUsers() {
        $('#usersBody').html('');
        $.ajax({
            url: 'https://gorest.co.in/public/v2/users',
            method: 'get',
            dataType: 'json',
            data: {
                test: 'test data'
            },
            success: function (data) {
                $(data).each(function (i, user) {
                    $('#users-body').append($("<tr>")
                        .append($("<td>").append(user.id))
                        .append($("<td>").append(user.name))
                        .append($("<td>").append(user.email))
                        .append($("<td>").append(user.gender))
                        .append($("<td>").append(user.status))
                        .append($("<td>").append(
                            `<i class="ui-icon ui-icon-pencil edit-button" id="` + user.id + `"></i>
                             <i class="ui-icon ui-icon-trash delete-button" id="`+ user.id + `"></i> </td>`)));
                })
            },
            error: function () {
                alert("error");
            }
        });
    }

    function getUserById(id) {
        $.ajax({
            url: 'https://gorest.co.in/public/v2/users/' + id,
            method: 'get',
            dataType: 'json',
            success: function (data) {
                $(data).each(function (i, user) {
                    $('#second-users-body').append($("<tr>")
                        .append($("<td>").append(user.id))
                        .append($("<td>").append(user.name))
                        .append($("<td>").append(user.email))
                        .append($("<td>").append(user.gender))
                        .append($("<td>").append(user.status))
                    );
                })
            },
            error: function () {
                alert("error");
            }
        });
    }

    $("#btn-get").click(function () {
        getUserById($("#get-user").val());


    function deleteUser(id) {
        $.ajax({
            url: 'https://gorest.co.in/public/v2/users/' + id,
            method: 'DELETE',
            dataType: 'json',
            success: function () {
                getUsers();
            },
            error: function () {
                alert("error");

            }
        });
    }

    $("body").on("click", ".delete-button", function () {
    
        var id = $(this).closest("tr").find('td:eq(0)').text();

        deleteUser(id);
    });


    function postUser(data) {
        $.ajax({
            url: 'http://localhost:3000/api/users',
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function(data) {
                console.log(data);
                getUsers();
            },
            error: function () {
                alert("error");

            }
        });
    }

    $("#submit-user").on("click", function(e) {
        let data = {
            name: $($("#new-user-form")[0].name).val(),
            email: $($("#new-user-form")[0].email).val(),
            gender: $($("#new-user-form")[0].gender).val(),
            status: $($("#new-user-form")[0].status).val()
        } 
         postTUser(data);
         $("#new-user-form").trigger("reset");
         $("#new-user-form").toggle();
         e.preventDefault();
        
     });




    });
});
