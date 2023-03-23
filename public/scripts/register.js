$(document).ready(function() {
    $('button[type="button"]').click(function() {
      var username = $('#username_input').val();
      var email = $('#email_input').val();
      var password = $('#password_input').val();
      var location = $('#location_input').val();
      const hashValue = CryptoJS.MD5(email);
      console.log(hashValue)
      $.ajax({
        url: '/register/createUser',
        type: 'POST',
        data:{
            username: username,
            email: email,
            password: hashValue,
            location: location
        },
        contentType:"application/x-www-form-urlencoded",
        dataType:"json",
        success: function(response) {
          console.log(response); // Handle success response
        },
        error: function(xhr, status, error) {
          console.log(xhr.responseText); // Handle error response
        }
      });
    });
  });
  