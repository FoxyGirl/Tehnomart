/* jshint browser: true */

/**** Modal window for Write Us form"  ****/
(function() {
  'use strict';
  
  var modalShadow = document.getElementById('modalShadow'),
      modalContactUs = document.getElementById('modalContactUs'),
      formContactUs = modalContactUs.querySelector('form[name=formContactUs]'),
      formFields = formContactUs.querySelectorAll('input, textarea'),
      writeUs = document.getElementById('writeUs');      
  
  function hideModal() {
    modalShadow.classList.remove('show');
    modalContactUs.classList.remove('show');    
  }
  
  function clearForm() {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].value = '';
    }
  }
  
  /*****************/
  
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].removeAttribute('required');
  }
  
  writeUs.addEventListener('click', function(e) {
    e.preventDefault();
    clearForm();
    modalShadow.classList.add('show');
    modalContactUs.classList.add('show');
    formFields[0].focus();
  });
  
  formContactUs.addEventListener('submit', function(e) {
    e.preventDefault();
    var errors = [];
    
    for (var i = 0; i < formFields.length; i++) {
      if (formFields[i].value == '') {        
        formFields[i].style.borderColor = 'red'; 
        errors.push(formFields[i]);        
      } else {
        formFields[i].style.borderColor = '';
      }
    }
          
    if (errors.length > 0) {
        errors[0].focus();
        return false;
    } else { 
      hideModal();
      return true; 
    }
    
  });
  
  formContactUs.addEventListener('reset', function() {
      hideModal();
  });
  
})();


/**** Catalog Slider ****/
(function () {
  'use strict';
  
  var promoSlider = document.getElementById('promoSlider'),
      sliderContent = promoSlider.querySelectorAll('.promo-slider-item'),
      controlBlock = promoSlider.querySelector('.promo-slider-controls'),
      sliderControls = controlBlock.getElementsByTagName('i');
  
  function changeSlider(e) {
    var targetElem = e.target;
    if (targetElem.tagName != 'I')  {
      return;
    } else {
      var activeControl = targetElem.getAttribute('data-toggler');
      activeControl = +activeControl;
      controlBlock.querySelector('.active-control').classList.remove('active-control');
      sliderControls[activeControl].classList.add('active-control');
      
      var prevSlide = promoSlider.querySelector('.preactive-slide');
      
      if (prevSlide !== null) {
        prevSlide.classList.remove('preactive-slide');
      }      
      
      var oldActiveSlide = promoSlider.querySelector('.active-slide');
      oldActiveSlide.classList.remove('active-slide');
      oldActiveSlide.classList.add('preactive-slide');
      sliderContent[activeControl].classList.add('active-slide');
    }
  }
  
  
  /***********************/
  
  while (sliderControls.length < sliderContent.length) {
    var newControl = document.createElement('i');
    controlBlock.appendChild(newControl);
  }
  
  for (var i = 0; i < sliderControls.length; i++) {
    sliderControls[i].setAttribute('data-toggler', i);
  }
  
  controlBlock.addEventListener('click', changeSlider);
  
  
})();