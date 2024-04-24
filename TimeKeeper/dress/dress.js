//to launch the function when the webpage is loaded
window.onload = function () {
  hamburger = document.querySelector(".hamburger");
  hamburger.onclick = function () {
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
  }

  const imgs = document.getElementById('imgs')
  const leftBtn = document.getElementById('left')
  const rightBtn = document.getElementById('right')

  const img = document.querySelectorAll('#imgs img')

  let idx = 0
//so that the carousel auto rotates 
  let interval = setInterval(run, 2000)

  function run() {
    idx++//idx++ so that the image autoruns
    changeImage()
  }
  //using if statment to change the image
  function changeImage() {
    if (idx > img.length - 1) { //img.length -1 as the index starts from 0
      idx = 0
    } else if (idx < 0) {
      idx = img.length - 1
    }

    imgs.style.transform = `translateX(${-idx * 500}px)`
  }

  function resetInterval() {
    clearInterval(interval)
    interval = setInterval(run, 2000)
  }
  //click right image shifts
  rightBtn.addEventListener('click', () => {
    idx++
    changeImage()
    resetInterval()
  })
  //click left image shifts
  leftBtn.addEventListener('click', () => {
    idx--
    changeImage()
    resetInterval()
  })

  var source = document.getElementById("card_template").innerHTML;
  //to compile the handlebars
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
          title: "Luxury Dress Watch",
          value: "PATEK PHILIPPE Nautilus Moonphase $270000",
          shortCode: "luxury",
        },
        {
          title: "Basic Dress Watch",
          value: "Jaeger LeCoultre Reverso  Price $8300",
          shortCode: "basic",
        },
        {
          title: "Entry Level Dress Watch",
          value: "Junghans Max Bill Automatic Price $1095",
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
if(inputText.value.match(mailformat))//using if statement to check the input of the email
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