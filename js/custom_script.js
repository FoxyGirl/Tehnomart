(function () {
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
    for (var i=0; i < formFields.length; i++) {
      formFields[i].value = '';
    }
  }
  
  /*****************/
  
  for (var i=0; i < formFields.length; i++) {
    formFields[i].removeAttribute('required');
  }
  
  writeUs.addEventListener('click', function (e) {
    e.preventDefault();
    clearForm();
    modalShadow.classList.add('show');
    modalContactUs.classList.add('show');
    formFields[0].focus();
  });
  
  formContactUs.addEventListener('submit', function (e) {
    e.preventDefault();
    var errors = [];
    
    for (var i=0; i < formFields.length; i++) {
      if ( formFields[i].value == '' ) {        
        formFields[i].style.borderColor = 'red'; 
        errors.push(formFields[i]);        
      } else {
        formFields[i].style.borderColor = '';
      };
    };
          
    if ( errors.length > 0 ) {
        errors[0].focus();
        return false;
    } else { 
      hideModal();
      return true; 
    };
    
  });
  
  formContactUs.addEventListener('reset', function () {
      hideModal();
  });
  
})();