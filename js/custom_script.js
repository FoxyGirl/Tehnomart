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
      sliderContent = promoSlider.getElementsByClassName('promo-slider-item'),
      controlBlock = promoSlider.querySelector('.promo-slider-controls'),
      sliderControls = controlBlock.getElementsByTagName('i'),
      prevSlide = promoSlider.querySelector('.active-slide'),
      activeControl = 0,
      zIndexSlider = 10 - 1,
      prevArrow = promoSlider.querySelector('.promo-slider-arrows > .prev'),
      nextArrow = promoSlider.querySelector('.promo-slider-arrows > .next');    
    
  //кросс-браузерное получение стилей элемента (elem)
  function getStyle(elem) {
    return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
  }
  
  function changeSliderByControls(e) {
    var targetElem = e.target;
    if (targetElem.tagName != 'I')  {
      return;
    } else {
      activeControl = targetElem.getAttribute('data-toggler');
      activeControl = Number(activeControl);
      changeSlideControl(activeControl);
    }
  }

  function changeSlideControl(activeControl) {
    controlBlock.querySelector('.active-control').classList.remove('active-control');
    sliderControls[activeControl].classList.add('active-control');

    changePrevSlide();
    sliderContent[activeControl].classList.add('active-slide'); 
  }
  
  function changePrevSlide() {
    if (prevSlide !== null) {
        prevSlide.style.zIndex = '';
      }    
      
    prevSlide = promoSlider.querySelector('.active-slide');
    prevSlide.classList.remove('active-slide');
    prevSlide.style.zIndex = zIndexSlider;
  }
  
  function changeSliderByArrows(direction) {
    var direction = direction;
    switch (direction) {
      case 'right' :
        ++activeControl;
        if (activeControl === sliderContent.length) {
          activeControl = 0;
        } 
       // changeSlideControl(activeControl);
      console.log('!!!');
      break;
        
      case 'left' :
        --activeControl;
        if (activeControl < 0) {
          activeControl = sliderContent.length - 1;
        }
      break;
        
      default:
        alert( 'Я таких значений не знаю' );        
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
  
  controlBlock.addEventListener('click', changeSliderByControls);  
  
  nextArrow.addEventListener('click', function() {
    changeSliderByArrows('right');
    changeSlideControl(activeControl);
  });
  
  prevArrow.addEventListener('click', function() {
    changeSliderByArrows('left');
    changeSlideControl(activeControl);
  });
  
})();