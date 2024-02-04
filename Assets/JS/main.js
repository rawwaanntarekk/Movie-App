"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let content = document.getElementById("content");
  let result = [];
  let filteredData = [];

  let phone = document.getElementById("phone");
  let age = document.getElementById("age");
  let pass = document.getElementById("pass");
  let repass = document.getElementById("repass");
  let mail = document.getElementById("mail");

  async function fetchData() {
    //fetch data will not continue untill fetch is completed
    //awaited function (fetch) must return a promise
    //awaited function (fetch) must be inside an async function
    //async function will always return a promise
    //Default method is GET
    //fetch(url, {method: "POST", body: JSON.stringify(data)})
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    );
    //response.json() will return a promise

    const data = await response.json();

    result = data.results;

    if (result.length > 0) {
      $(".loading").fadeOut(2000);
      $(".loader").fadeOut(2000, () => {
        $("body").removeClass("overflow-hidden");
        $(".loading").remove();
      });
    }

    return result;
  }

  //function display data
  function displayData(data) {
    let movies = "";
    data.forEach((item) => {
      movies += `
      <div class="col-sm-10 col-md-6 col-lg-4 mx-auto moviee overflow-hidden ">
      <div class="layer d-none">
      <h3>${item.title}</h3>
      </div>

                <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" class="w-100 poster" alt="">
            </div>`;
    });

    content.innerHTML = movies;
  }

  fetchData().then((data) => {
    displayData(data);
  });

  $(".poster").on("mouseover", function () {
    $(".layer").removeClass("d-none");
  });

  //search function by title
  function searchData(data) {
    const searchInput = document.getElementById("search").value.toLowerCase();
    filteredData = data.filter((item) => {
      if (item.title !== undefined) {
        let comp = item.title.toLowerCase();
        return comp.includes(searchInput);
      }
      return false;
    });

    return filteredData;
  }

  $("#search").on("input", function () {
    fetchData().then((data) => {
      searchData(data);
      console.log(filteredData);
      displayData(filteredData);
    });
  });

  //animating sidebar

  $("#icon").on("click", () => {
    $("#icon").removeClass();
    $(".side-inner").toggleClass("width");
    $(".icons").toggleClass("move");
    $(".list").toggleClass("slide");
  });

  let isValid = false;

  //regex for email
  function checkEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(mail.value)) {
      mail.classList.remove("wrong");
      $(".mail").addClass("d-none");
    } else {
      mail.classList.add("wrong");
      $(".mail").removeClass("d-none");
    }
  }

  mail.addEventListener("input", () => {
    checkEmail();
  });

  //regex for phone
  function checkPhone() {
    const phoneRegex = /^(011|012|010|015)\d{8}$/;

    if (phoneRegex.test(phone.value)) {
      phone.classList.remove("wrong");
      $(".phone").addClass("d-none");
    } else {
      phone.classList.add("wrong");
      $(".phone").removeClass("d-none");
    }
  }

  phone.addEventListener("input", () => {
    checkPhone();
  });

  //check for age
  function checkAge() {
    if (parseInt(age.value) > 16) {
      age.classList.remove("wrong");
      $(".age").addClass("d-none");
    } else {
      age.classList.add("wrong");
      $(".age").removeClass("d-none");
    }
  }

  age.addEventListener("input", () => {
    checkAge();
  });

  //regex for password

  function checkPassword() {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (passwordRegex.test(pass.value)) {
      pass.classList.remove("wrong");
      $(".pass").addClass("d-none");
    } else {
      pass.classList.add("wrong");
      $(".pass").removeClass("d-none");
    }
  }

  pass.addEventListener("input", () => {
    checkPassword();
  });

  function checkRepassword() {
    if (repass.value === pass.value) {
      repass.classList.remove("wrong");
      $(".repass").addClass("d-none");
    } else {
      repass.classList.add("wrong");
      $(".repass").removeClass("d-none");
    }
  }

  repass.addEventListener("input", () => {
    checkRepassword();
  });

  // Checking if all inputs are valid
  function checkValidity() {
    isValid =
      mail.value !== "" &&
      phone.value !== "" &&
      age.value !== "" &&
      pass.value !== "" &&
      repass.value !== "" &&
      !(
        mail.classList.contains("wrong") ||
        phone.classList.contains("wrong") ||
        age.classList.contains("wrong") ||
        pass.classList.contains("wrong") ||
        repass.classList.contains("wrong")
      );
  }

  $(".send").on("mouseenter", () => {
    checkValidity();

    if (isValid) {
      $(".send").removeClass("btnEscape");
    } else {
      $(".send").toggleClass("btnEscape");
    }
  });
});
