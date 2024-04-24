//to launch the function when the webpage is loaded
window.onload = function () {
  hamburger = document.querySelector(".hamburger");
  hamburger.onclick = function () {
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
  }

  var source = document.getElementById("card_template").innerHTML;
  //to compile the templates
    var template = Handlebars.compile(source);
    var target = document.getElementById("sub_container");
    target.innerHTML = template(data.cards[0]);
};
//array for the template datas
    var data = {
        cards: [
          {
            card: [
              {
                title: "Luxury Dive Watch",
                value: "Audermars Piguet Royal Oak Offshore $46000",
                shortCode: "luxury",
              },
              {
                title: "Basic Dive Watch",
                value: "Tag Heuer Monaco Price $4995",
                shortCode: "basic",
              },
              {
                title: "Entry Level Chronograph Watch",
                value: "Seagull 1963 Price $359",
                shortCode: "entry",
              },
            ],
          },
        ],
      };
      function ValidateEmail(inputText)
      {
      //var mailformat i took it from the internet Taha Sufiyan,"How to Do an Email Validation in JavaScript?"https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript [Nov 25, 2022]
      var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(inputText.value.match(mailformat))//using if statement to check the email input
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