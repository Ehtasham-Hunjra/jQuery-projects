// $.getJSON("http://127.0.0.1:5500/db.json", function(data) {
//         console.log(data.contact);
// });

//http://127.0.0.1:5500/db.json
$('.submit-btn').on('click', function() {
    var name = '';
    var msg = '';
    var email = $('.user-email').val();
    name = $('.name').val();
    msg = $('.message').val();
    console.log(email);
    var name_len = false;
    name_len = validNameLength(name);
    var msg_len = false;
    msg_len = validMessageLength(msg);
    let checkEmail = validateEmail(email);
    console.log(checkEmail.test(email));
    
    duplicateUserValidation(email)
      .then(function(userFound) {
        console.log(userFound);
        
        if (checkEmail.test(email) && !userFound && name_len && msg_len) {
          $.ajax({
            url: 'http://localhost:3004/contacts',
            type: 'POST',
            dataType: "JSON",
            contentType: 'application/json',
            data: JSON.stringify({ messge: msg, name: name, email: email  }),
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
      
      $.getJSON("http://localhost:3004/contacts", function(data) {
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

  function validNameLength(name) {
   if(name.length > 25) {
    alert("User does not exceed more then 25 characters");
   return false;
   } 
   return true;
  }

  function validMessageLength(msg) {
    if(msg.length > 70) {
        alert("Message does not exceed more then 70 characters");
        return false;
   } 
   return true;
  }