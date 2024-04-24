//launch the function when the webpage is loaded 
window.onload = function () {
  hamburger = document.querySelector(".hamburger");
  hamburger.onclick = function () {
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
  }

  var source = document.getElementById("card_template").innerHTML;
  //compilling the handlebars
    var template = Handlebars.compile(source);
    var target = document.getElementById("sub_container");
    target.innerHTML = template(data.cards[0]);
};
//array for the template data
    var data = {
        cards: [
          {
            card: [
              {
                title: "Luxury GMT Watch",
                value: "GMT Master II Batman $25000",
                shortCode: "luxury",
              },
              {
                title: "Basic GMT Watch",
                value: "Tudor Black Bay Pro Price $4150",
                shortCode: "basic",
              },
              {
                title: "Entry Level GMT Watch",
                value: " Traska Venturer GMT Price $695",
                shortCode: "entry",
              },
            ],
          },
        ],
      };
      //function to check whether the email is valid 
      function ValidateEmail(inputText)
      {
      //var mailformat i took it from the internet Taha Sufiyan,"How to Do an Email Validation in JavaScript?"https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript [Nov 25, 2022]
      var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      //using conditional statement to help check the input
      if(inputText.value.match(mailformat))
      {
      alert("You have entered a valid email address!");    //The pop up alert for a valid email address
      document.form1.text1.focus();
      return true;
      }
      else
      {
      alert("You have entered an invalid email address!");    //The pop up alert for an invalid email address
      document.form1.text1.focus();
      return false;
      }
      }