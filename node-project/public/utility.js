$('.menu').click(function() {
    $('.sideBar').toggleClass('active');
    $('.menu').toggleClass('menuActive');
    $('.logo').toggleClass('h1Active');
  });

  $('#subscribe-btn').on('click', function() {
    var email = $('#email-input').val();
    console.log(email);
    
    let checkEmail = validateEmail(email);
    console.log(checkEmail.test(email));
    
    duplicateUserValidation(email)
      .then(function(userFound) {
        console.log(userFound);
        
        if (checkEmail.test(email) && !userFound) {
          $.ajax({
            url: 'http://localhost:3004/email',
            type: 'POST',
            dataType: "JSON",
            contentType: 'application/json',
            data: JSON.stringify({ email: email }),
            success: function(data) {
              console.log('Subscription successful!');
              console.log(data);
            },
            error: function(xhr, status, error) {
              console.log('Error:', error);
            }
          });
        } else {
          alert("User already exists or the email format is not valid");
        }
      })
      .catch(function(error) {
        console.error('Error checking user existence:', error);
        alert("Error checking user existence. Please try again.");
      });
  });
  
  function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex;
  }
  
  function duplicateUserValidation(email) {
    return new Promise(function(resolve, reject) {
      let found = false;
      email = email.toLowerCase(); 
      
      $.getJSON("http://localhost:3004/email", function(data) {
        console.log(data);
        for(let i = 0; i < data.length; i++) {
          if(data[i].email === email) {
            found = true;
            console.log(found);
            break;
          }
        } 
        console.log(found);
        resolve(found); // Resolve the Promise with found value
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error fetching data:', errorThrown);
        reject(errorThrown); // Reject the Promise with error
      });
    });
  }
