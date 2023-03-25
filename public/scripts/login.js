$(document).ready(function() {
    $('button[type="button"]').click(function() {
      var email = $('#email_input').val();
      var password = $('#password_input').val();
      var hashValue = CryptoJS.MD5(email+''+password).toString();
      console.log(hashValue)
      $.ajax({
        url: '/register/createUser',
        type: 'POST',
        data:{
            email: email,
            password_hash: hashValue,
        },
        contentType:"application/x-www-form-urlencoded",
        dataType:"json",
        success: function(response) {
          alert(response.message);
          window.location.href = '/login';
        },
        error: function(xhr, status, error) {
          var response = JSON.parse(xhr.responseText);
          $('#username_input').val('');
          $('#email_input').val('');
          $('#password_input').val('');
          $('#location_input').val('');
          if (response.message) {
            alert(response.message);
          } else {
            alert("An error occurred. Please try again.");
          }
        }
      });
    });
  });
