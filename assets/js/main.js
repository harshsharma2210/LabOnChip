/**
* Template Name: Kelly - v4.7.0
* Template URL: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }
  const TEXT_UPDATING_SPEED = 55

  //duration of type cursor blink animation
  const BLINK_ANIM_DURATION = 2400
  
  //text array to show & loop through
  const textArr = [
    "Welcome to Control System Virtual Laboratory",
  ]
  
  //index of the current text of the textArr that is being animated
  let currentTextIndex = -1
  
  const myText = document.querySelector(".text")
  const typeCursor = document.querySelector(".cursor")
  
  //add letter with recursion
  const addLetter = (letterIndex) => {
    //if reached the end of the text stop adding letters and animate cursor blink
    if (letterIndex >= textArr[currentTextIndex].length) {
      blinkTypeCursor()
      return
    }
    setTimeout(() => {
      //logic behind adding text
      myText.textContent += textArr[currentTextIndex][letterIndex]
      //recursion: call addLetter to add the next letter in the text
      addLetter(letterIndex + 1)
    }, TEXT_UPDATING_SPEED)
  }
  
  //remove letter with recursion
  const removeLetter = (letterIndex) => {
    //if removed all stop removing letters and call updateText to start animating the next text
    if (letterIndex < 0) {
      updateText()
      return
    }
    setTimeout(() => {
      //logic behind removing text with slice
      myText.textContent = textArr[currentTextIndex].slice(0, letterIndex)
      //recursion: call removeLetter to remove the previous letter in the text
      removeLetter(letterIndex - 1)
    }, TEXT_UPDATING_SPEED)
  }
  
  //blink the cursor when not updating text
  const blinkTypeCursor = () => {
    //add blink by adding blink animation class from css
    typeCursor.classList.add("blinkAnim")
    setTimeout(() => {
      //stop blinking by removing blink class 
      typeCursor.classList.remove("blinkAnim")
      // call removeLetter to start removing letter
      removeLetter(textArr[currentTextIndex].length)
    }, BLINK_ANIM_DURATION)
  }
  
  const updateText = () => {
    //change current text index to switch to next text
    currentTextIndex++
    //loop back if reached the end
    if (currentTextIndex === textArr.length) {
      currentTextIndex = 0
    }
    //call addLetter
    addLetter(0)
  }
  
  //initial text update after 1 seconds
  setTimeout(() => updateText(), 1000)
  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()
var myQuestions = [
  {
    question: "The function of the proportional mode is to ____________?",
    answers: {
      a: 'Provide gain',
      b: 'Eliminate offsets',
      c: 'To speed up the response and minimize the overshoot',
       d: 'All of the above'
    },
    correctAnswer: 'a'
  },
  {
    question: "In which one of the following controllers, the performance will improve with time?",
    answers: {
      a: 'PID',
      b: 'ANN',
      c: 'Both a and b',
      d: 'None of these'
    },
    correctAnswer: 'b'
  },
  {
    question: "Which one of the following constants is represented by Kp?",
    answers: {
      a: 'PID',
      b: 'ANN',
      c: 'Both a and b',
      d: 'None of these'
    },
    correctAnswer: 'b'
  },
  {
    question: "In which one of the following controllers, the performance will improve with time?",
    answers: {
     a: 'Proportional',
     b: 'Integral',
     c:  'Derivative',
     d: 'All of the above'
    },
    correctAnswer: 'a'
  }

];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

  function showQuestions(questions, quizContainer){
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for(var i=0; i<questions.length; i++){
      
      // first reset the list of answers
      answers = [];

      // for each available answer...
      for(letter in questions[i].answers){

        // ...add an html radio button
        answers.push(
          '<label>'
            + '<input type="radio" + name="question' + i +'"  value="'+letter+'">'
            + letter + ': '
            + questions[i].answers[letter] + '&nbsp;' + '&nbsp;'
          + '</label>'
        );
      }

      // add this question and its answers to the output
      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
  }


  function showResults(questions, quizContainer, resultsContainer){
    
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
    
    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;
    
    // for each question...
    for(var i=0; i<questions.length; i++){

      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
      
      // if answer is correct
      if(userAnswer===questions[i].correctAnswer){
        // add to the number of correct answers
        numCorrect++;
        
        // color the answers green
        answerContainers[i].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[i].style.color = 'red';
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }

  // show questions right away
  showQuestions(questions, quizContainer);
  
  // on submit, show results
  submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
  }

}


