// to launch the function when the webpage is loaded
window.onload = function () { 
  //to help with the hamburger icon to make it responsive
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
          title: "Diver Watch",
          value: "All watches tell time, but dive watches tell us a lot more...",
          shortCode: "diver",
          link: "../diver/diver.html",
        },
        {
          title: "Chronograph Watch",
          value: "These Chronograph will be used to measure time to different level of accuracy...",
          shortCode: "chrono",
          link: "../chronograph/chronograph.html",
        },
        {
          title: "Dress Watch",
          value: "The Dress Watch is a traditional and beautiful tribute to the art of watchmaking...",
          shortCode: "dress",
          link: "../dress/dress.html",
        },
        {
          title: "GMT Watch",
          value: "GMT watch is the ideal companion so that people who travel are always on time...",
          shortCode: "GMT",
          link: "../gmt/gmt.html",
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
//using if statement to check if the input is correct
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