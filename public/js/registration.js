//Get data from front end and connect to OKTA create users APIs in routes folder
$(document).ready(function() {
  //$("#password").password('toggle');

  $(document.body).on("click", "#registerModal #oktaRegister", function() {
    //event.preventDefault();
    console.log("I'm here");
    //var registerModal = $("#registerform");
    var newFirstname = $("#registerModal #firstname").val().trim();
    var newLastname = $("#registerModal #lastname").val().trim();
    var newEmail = $("#registerModal #email").val().trim();
    var newPassword = $("#registerModal #password").val().trim();
    var newMobile = $("#registerModal #mobilephone").val().trim();
    var newPreferredLoc = $("#registerModal #preferredloc").val().trim();
    var newRadius = $("#registerModal #radius").find(':selected').data('size');
    var newRemote = $("#registerModal #remote").is(":checked");
    var newImage; // = $("#registerModal #imageUploadFile");

    var newRegistration = {
      firstName: newFirstname,
      lastName: newLastname,
      email: newEmail,
      password: newPassword,
      mobilePhone: newMobile,
      ploc: newPreferredLoc,
      radius: newRadius,
      remote: newRemote,
      image: newImage
    };

    console.log(newRegistration);

    $.post("/api/register", newRegistration).done(function(data) {
      if (data) {
        console.log(data);

        $("#successModal").modal("show");

      } else {
        alert("Oop! something went wrong. Please try again soon.");
      }

      $('#registerModal').on('hidden.bs.modal', function() {
        console.log("reset form");
        $(this).find('form').trigger('reset');
      });

      // $('#registerModal').is(':hidden', function() {
      //   console.log("reset form");
      //   $(this).find('form').trigger('reset');
      // });

    });
  });
});