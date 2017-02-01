// (function ($) {
'use strict';


/*=========================
 DOM variables
 ========================== */

let $jobRole = $('#title'),
    $jobOther = $('<input type="text" id="other-title" placeholder="Your Job Role">'),
    $designTheme = $('#design'),
    $colors = $('#color'),
    $payment = $('#payment'),
    registerTotal,
    $mailField = $('#mail');


$('#name').focus();
$('#payment option[value="credit card"]').prop("selected", true);
$mailField.after('<p class="emailMsg">Please Enter a Valid Email</p>');
$('.emailMsg').hide();
$('button').after('<span class="submitMsg">Please Correctly Fill in the Fields Shown Above</span>');
$('.submitMsg').hide();
$('#colors-js-puns').hide();


/*-----------------------
  Event handlers
-----------------------*/

// Check job role select options
$jobRole.on('change', function(e) {
    $jobOther.insertAfter($('#title')).hide();
    if ($(this).val() === 'other') {
        $jobOther.show();
    }
})

$designTheme.on('change', function(e) {
    $('#colors-js-puns').show();


    if ($(this).val() === 'js puns') {
        $("#color [value=tomato]").attr("selected", false);
        $("#color [value=cornflowerblue]").attr("selected", true);
        $("#colors-js-puns").show();
        $("#color").children().show();
        $("#color").children(":contains('JS shirt')").hide();
    } else if ($(this).val() === 'heart js') {
        $("#color [value=cornflowerblue]").attr("selected", false);
        $("#color [value=tomato]").attr("selected", true);
        $("#colors-js-puns").show();
        $("#color").children().show();
        $("#color").children(":contains('Puns')").hide();
    } else {
        $("#color").children().show();
    }
})

//Register activites event change
$('.activities input').on('change', function(e) {
  // debugger

  // if(!e.target.checked){
  //   e.target.checked = true;
  // }

  checkCheckbox();
    let $current = $(this),
        name = $current.attr('name'),
        labelText = $current.parent().text(),
        checked = $current.prop('checked');

    //clear and set checkboxes
    $("label").removeClass('notAvail');
    // $('.activities input').prop('checked', false);
    // $current.prop('checked', true);

    //check what text is in the clicked label
    if (labelText.indexOf('1pm') >= 0) {
        showLabels('1pm', $current);
    } else if (labelText.indexOf('9am') >= 0) {
        showLabels('9am', $current);
    }
});

//event for payment changes
$('#payment').on('change', function(e) {
    // debugger
    if ($(this).val() === "credit card") {
        showPayments($('#credit-card'));
    } else if ($(this).val() === "paypal") {
        showPayments($('#paypal'));
    } else {
        showPayments($('#bitcoin'));
    }
});

//event for form submit validation
$('form').on('submit', function(e) {
    e.preventDefault();
    // debugger
    checkName();
    validateEmail();
    checkCheckbox();
    checkCreditCard();

    if($('.notValid').length === 0) {
      $('.submitMsg').hide();
      console.log('form valid');
    } else {
      $('.submitMsg').show();
    }
});

$('#name').keyup(function(e){
  checkName();
})

$('#mail').keyup(function(e){
  validateEmail();
})

/*-----------------------
  Functions
-----------------------*/

//run when input changed to disable boxes
function showLabels(name, current) {
    $("label:contains(" + name + ")").addClass('notAvail');
    current.parent().removeClass('notAvail');
    registerTotal += current
}

//run when payment has changed
function showPayments(selected) {
    $('#credit-card, #paypal, #bitcoin').hide();
    selected.show();
}


function checkName() {
    if ($("#name").val().length < 1) {
        $("#name").addClass("notValid");
    } else {
        $("#name").removeClass("notValid");
    }
};

function validateEmail() {
    let atpos = $mailField.val().indexOf("@"),
        dotpos = $mailField.val().lastIndexOf(".");

    if (atpos < 1 || dotpos < atpos + 2) {
        $('.emailMsg').show();
        $mailField.addClass("notValid");
        return false;
    }
    $mailField.removeClass("notValid");
    $('.emailMsg').hide();
}

function checkCheckbox(){
  if($(".activities input:checked").length > 0){
    $(".activities").removeClass("notValid");
  }else{
    $(".activities").addClass("notValid");
  }
};

function checkCreditCard(){
  if($("#cc-num").val().length < 13 || $("#cc-num").val().length > 16){
    $("#cc-num").addClass("notValid");
  }else{
    $("#cc-num").removeClass("notValid");
  }

  if($("#zip").val().length === 5){
    $("#zip").removeClass("notValid");
  }else{
    $("#zip").addClass("notValid");
  }

  if($("#cvv").val().length === 3){
    $("#cvv").removeClass("notValid");
  }else{
    $("#cvv").addClass("notValid");
  }
};





// })(jQuery);
