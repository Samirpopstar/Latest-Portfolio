const clickedBtn = document.querySelectorAll(".about-btn");
const description = document.querySelector(".description--content");

const form = document.querySelector("form");

const fullName = document.querySelector("#full-name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const textContent = document.querySelector("#text-content");

const nameError = document.querySelector(".name-error");
const emailError = document.querySelector(".email-error");
const subjectError = document.querySelector(".subject-error");
const contentError = document.querySelector(".content-error");

const subBtn = document.querySelector(".contact-btn");

const validateName = () => {
  const name = fullName.value;
  if (name.length === 0) {
    fullName.style.borderColor = "red";
    nameError.textContent = "Name is Required";
    return false;
  }

  if (!name.match(/^[A-za-z]{2,}\s{1}[A-za-z]{2,}/)) {
    fullName.style.borderColor = "red";
    nameError.textContent = "Write Full Name";
    return false;
  }

  fullName.style.borderColor = "seagreen";
  nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;
};

const validateEmail = () => {
  const emails = email.value;
  if (emails === "") {
    email.style.borderColor = "red";
    emailError.textContent = "Enter an Email";
    return false;
  }

  if (!emails.match(/[A-Za-z\d\_\.\-]{2,}[@][a-z]{2,}[\.][a-z]{2,3}/)) {
    email.style.borderColor = "red";
    emailError.textContent = "Please Enter a valid Email";
    return false;
  }

  email.style.borderColor = "seagreen";
  emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;
};

const validateSubject = () => {
  const subjects = subject.value;
  if (subjects === "") {
    subject.style.borderColor = "red";
    subjectError.textContent = "Subject is Required";
    return false;
  }

  if (!subjects.match(/[A-Za-z\d\_\.\-]{5,}/)) {
    subject.style.borderColor = "red";
    subjectError.textContent = "Please enter a valid subject";
    return false;
  }

  subject.style.borderColor = "seagreen";
  subjectError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;
};

const validateMessage = () => {
  const message = textContent.value;
  let left = 30 - message.length;

  if (left > 0) {
    textContent.style.borderColor = "";
    contentError.textContent = `${left} more characters required`;
    return false;
  }

  textContent.style.borderColor = "seagreen";
  contentError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;
};

const validateForm = () => {
  if (
    !validateName() ||
    !validateEmail() ||
    !validateSubject() ||
    !validateMessage()
  ) {
    return false;
  }
  return true;
};

subBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (validateForm()) {
    sendMail();
  }
});

// Send Contact Form Details to my Email

function sendMail() {
  let params = {
    from_name: fullName.value,
    email_id: email.value,
    message: textContent.value,
    subject: subject.value,
  };

  emailjs
    .send("service_f73zwhr", "template_zsxp7vh", params)
    .then((res) => {
      (fullName.value = ""),
        (email.value = ""),
        (textContent.value = ""),
        (subject.value = "");

      fullName.style.borderColor = "";
      subject.style.borderColor = "";
      email.style.borderColor = "";
      textContent.style.borderColor = "";

      const error = document.querySelectorAll(".error");
      error.forEach((err) => {
        err.innerHTML = "";
      });
      const successMsg = document.querySelector("#success-message");
      successMsg.innerHTML = `Message Sent Successfully <i class="fa-solid fa-circle-check"></i>`;

      setTimeout(() => {
        successMsg.innerHTML = ``;
      }, 5000);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

const desContent1 = `<div class="about-skills">
<img class="about-tech--stack" src="/icons/js.png" /><img
  class="about-tech--stack"
  src="/icons/react.png"
/><img class="about-tech--stack" src="/icons/node-js.png" /><img
  class="about-tech--stack"
  src="/icons/css.png"
/><img class="about-tech--stack" src="/icons/mongoDB.png" /><img
  class="about-tech--stack"
  src="/icons/sass.png"
/>
</div>`;

const desContent2 = `<div class="about-education">
<div class="education-item">
  <p class="edu-date">
    <i class="fa-solid fa-calendar"></i>2023 - 2027
  </p>
  <h3 class="edu-level">
    <i class="fa-solid fa-graduation-cap"></i> Bachelor's in
    Computer Application
  </h3>
  <ul class="education-skill">
    <li>
      - Learned React and MERN through youtube and
      udemy course.
    </li>
    <li>- Deeply understood in making responsive and dynamic websites.</li>
  </ul>
</div>
<div class="education-item">
  <p class="edu-date">
    <i class="fa-solid fa-calendar"></i>2021 - 2023
  </p>
  <h3 class="edu-level">
  <i class="fa-solid fa-school"></i></i> High School
  </h3>
  <ul class="education-skill">
    <li>
      - Learned Html, CSS and JavaScript and creating responsive
      websites.
    </li>
    <li>
      - Learned C Language and basics of backend development.
    </li>
  </ul>
</div>
</div>`;

description.insertAdjacentHTML("afterbegin", desContent1);

clickedBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    description.textContent = "";
    clickedBtn.forEach((btn) => {
      btn.classList.remove("highlight");
    });
    if (event.target.textContent === "Skills") {
      btn.classList.add("highlight");
      description.insertAdjacentHTML("afterbegin", desContent1);
    } else {
      btn.classList.add("highlight");
      description.insertAdjacentHTML("afterbegin", desContent2);
    }
  });
});

// Dynamic year date update
const yearDate = document.querySelector(".year-date");

const date = new Date().getFullYear();

yearDate.textContent = date;

// Change Navbar color with scroll

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Change Navbar active link on scroll

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector(`.nav-link a[href="#${id}"]`)
          .classList.add("active");
      });
    }
  });
};
