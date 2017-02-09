(function ($) {
    'use strict';


    /*=========================
     Variables
     ========================== */

    //DOM var
    let $jobRole = $('#title'),
        $jobOther = $('#other-title'),
        $designTheme = $('#design'),
        $activitiesLabels = $(".activities label"),
        $activitiesChecks = $('.activities input'),
        $mailField = $('#mail'),
        //script var
        registerTotal = 0;

    //init page DOM and submit warnings
    $('#name').focus();
    $('#payment option[value="credit card"]').prop("selected", true);
    $mailField.after('<p class="emailMsg">Please Enter a Valid Email</p>');
    $('.emailMsg').hide();
    $('button').after('<span class="submitMsg">Please Correctly Fill in the Fields Shown Above</span>');
    $('.submitMsg').hide();
    $('#colors-js-puns').hide();
    $jobOther.hide();


    /*-----------------------
      Event handlers
    -----------------------*/

    // Check job role select options
    $jobRole.on('change', function (e) {
        $jobOther.hide();
        if ($(this).val() === 'other') {
            $jobOther.show();
        }
    })

    $designTheme.on('change', function (e) {
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
            $("#color").children().hide();
        }
    })

    //Register activites event change
    $('.activities input').on('change', function (e) {
        let $current = $(this),
            labelText = $current.parent().text(),
            checkedDay = getCurrentDay(labelText),
            checkedTime = getCurrentTime(labelText);

        //add register totals
        addRegisterTotals($current);

        //run if box was checked
        if ($current.is(':checked')) {
            if (checkedDay === 'Tuesday') {
                //add class to current time selected
                showLabels(checkedTime);
                //clear label on checked box
                clearLabel($current);
            }
        } else {
            if (checkedDay === 'Tuesday') {
                //clear labels
                clearLabels(checkedTime);
            }
        }
    });

    //event for payment changes
    $('#payment').on('change', function (e) {
        if ($(this).val() === "credit card") {
            showPayments($('#credit-card'));
        } else if ($(this).val() === "paypal") {
            showPayments($('#paypal'));
        } else {
            showPayments($('#bitcoin'));
        }
    });

    //event for form submit validation
    $('form').on('submit', function (e) {
        // e.preventDefault();
        checkName();
        validateEmail();
        checkCheckbox();
        checkCreditCard();

        //check if notValid class has been added to anything
        if ($('.notValid').length === 0) {
            $('.submitMsg').hide();
        } else {
            e.preventDefault();
            $('.submitMsg').show();
        }
    });

    $('#name').keyup(function (e) {
        checkName();
    })

    $('#mail').keyup(function (e) {
        validateEmail();
    })

    /*-----------------------
      Functions
    -----------------------*/

    //run when input changed to disable boxes
    function showLabels(string) {
        //add class
        $(`label:contains("${string}"):contains("Tuesday")`).addClass('notAvail');
        //disable check boxes
        $(`label:contains("${string}"):contains("Tuesday")`).children().prop('disabled', true);
    }

    function clearLabels(string) {
        //remove class
        $(`label:contains("${string}"):contains("Tuesday")`).removeClass('notAvail');
        //enable check boxes
        $(`label:contains("${string}"):contains("Tuesday")`).children().prop('disabled', false);
    }

    //get what day was selected
    let getCurrentDay = (el) => checkIfTxt(el, 'Tuesday') ? 'Tuesday' : 'Other';

    //get what time was selected
    let getCurrentTime = (el) => checkIfTxt(el, '1pm') ? '1pm' : '9am';

    //return true if txt found
    let checkIfTxt = (current, string) => current.indexOf(string) >= 0;

    function clearLabel(current) {
        //remove not active on current label
        current.parent().removeClass('notAvail');
        //enable checkbox
        current.prop('disabled', false);

        //remove form invalid error
        $(".activities").removeClass("notValid");
    }

    //add total register cost
    function addRegisterTotals(current) {
        if (current.attr("name") === "all") {
            if ($(".activities [name = all]").prop("checked")) {
                registerTotal += 200;
            } else {
                registerTotal -= 200;
            }
        } else {
            if (current.prop("checked")) {
                registerTotal += 100;
            } else {
                registerTotal -= 100;
            }
        }
        $(".activities p").remove();
        $('.activities').append(`<p id="price"> $${registerTotal} </p>`);
    }

    //run when payment has changed
    function showPayments(selected) {
        $('#credit-card, #paypal, #bitcoin').hide();
        selected.show();
    }

    //validate name has been added
    function checkName() {
        if ($("#name").val().length < 1) {
            $("#name").addClass("notValid");
        } else {
            $("#name").removeClass("notValid");
        }
    };

    //check for @ and . characters in email string
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

    //make sure something is checked in activites section
    function checkCheckbox() {
        if ($(".activities input:checked").length > 0) {
            $(".activities").removeClass("notValid");
        } else {
            $(".activities").addClass("notValid");
        }
    };

    //validate credit card, zip, ccv character length
    function checkCreditCard() {
        if ($("#cc-num").val().length < 13 || $("#cc-num").val().length > 16) {
            $("#cc-num").addClass("notValid");
        } else {
            $("#cc-num").removeClass("notValid");
        }

        if ($("#zip").val().length === 5) {
            $("#zip").removeClass("notValid");
        } else {
            $("#zip").addClass("notValid");
        }

        if ($("#cvv").val().length === 3) {
            $("#cvv").removeClass("notValid");
        } else {
            $("#cvv").addClass("notValid");
        }
    };
})(jQuery);