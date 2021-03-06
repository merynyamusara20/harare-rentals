$('.showcase .item').hover(function (){
    $(this).addClass('hover');
    $(this).find('.overlay').hide().delay(1000).fadeIn(3000);
}).mouseleave(function (){
    $(this).find('.overlay').show();
});

$('.rentals-results>div:nth-of-type(2)').on('click',function (){
   $('.select-items').slideToggle();
}); 




 $('.currency-container').hide();
$(".dollar").click(function(){
    $(".currency-container").slideToggle();
  });

$(".btnn").click(function() {
  $(".drop-menu").toggle();  
});

// handles selections on a bootstrap dropdown list
$(".dropdown-menu a ").click(function(e){
    e.preventDefault();
    $(this).parents(".dropdown").find('.dropdown-toggle').text($(this).text());
});

$('.carousel').carousel({
    interval: false,
  });

window.onload = function() {
  $(".currency-container").hide();
};

document.onscroll = function() {
        if (window.innerHeight + window.scrollY > document.body.clientHeight) {
          $(".fixed-icon").show();
        }
        else{
          $(".fixed-icon").hide();
        }
    }

// $(".fixed-icon").click(function() {
//     $('html,body').animate({
//         scrollTop: $("#nav").offset().top},
//         'slow');
// });

$('a.fixed-icon[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (t) {
  if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var e = $(this.hash);
      e = e.length ? e : $("[name=" + this.hash.slice(1) + "]"), e.length && (t.preventDefault(), $("html, body").animate({
          scrollTop: e.offset().top
      }, 600, function () {
          var t = $(e);
          if (t.focus(), t.is(":focus")) return !1;
          t.attr("tabindex", "-1"), t.focus()
      }))
  }
});



$('.carousel').carousel();

$(document).ready(function(){
    $('.owl-one').owlCarousel({
       loop:true,
    margin:10,
    autoplay:false,
    autoplayTimeout:400000,
       nav:true,
    navigation:true,
    navText: ['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],
    autoplayHoverPause:true,
    responsive:{
        0:{
          items:4,
        
        },
        768:{
          items:5,   
        },
        1440:{
           items:6, 
         
        },
        576:{
            items:3,
            nav:true,
            
        }
       
    }
    });

    

});

$(document).ready(function(){
  var owl = $('.owl-two');
  owl.owlCarousel({
    loop:true,
    margin:10,
    items:3,
    autoplay:false,
    autoplayTimeout:400000,
     nav:true,
    navigation:true,
    autoplayHoverPause:true,
    responsive:{
        0:{
          items:1,
        
        },
        768:{
          items:2,   
        },
        1440:{
           items:3, 
         
        },
        576:{
            items:1,
            nav:true,
            
        }
       
    }
  });
  
  // Custom Button
  $('.controls mb-3 owl-prev .prev').click(function() {
    owl.trigger('next.owl.carousel');
  });
  $('.controls mb-3 owl-prev .next').click(function() {
    owl.trigger('prev.owl.carousel');
  });
  
});




// 
$(document).ready(function(){
	
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) 
		{
			$('#back_to_top').fadeIn();
		} 
		else 
		{
			$('#back_to_top').fadeOut();
		}
	});
	

	$('#back_to_top').click(function(){
		$('html, body').animate({scrollTop : 0},700);
		return false;
	});
	
});









/**
 * bootstrap-multiselect.js
 * https://github.com/davidstutz/bootstrap-multiselect
 *
 * Copyright 2012, 2013 David Stutz
 * 
 * Dual licensed under the BSD-3-Clause and the Apache License, Version 2.0.
 */
!function($) {
    
  "use strict";// jshint ;_;

  if (typeof ko != 'undefined' && ko.bindingHandlers && !ko.bindingHandlers.multiselect) {
      ko.bindingHandlers.multiselect = {
          init : function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {},
          update : function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
              var ms = $(element).data('multiselect');
              if (!ms) {
                  $(element).multiselect(ko.utils.unwrapObservable(valueAccessor()));
              }
              else if (allBindingsAccessor().options && allBindingsAccessor().options().length !== ms.originalOptions.length) {
                  ms.updateOriginalOptions();
                  $(element).multiselect('rebuild');
              }
          }
      };
  }

  function Multiselect(select, options) {

      this.options = this.mergeOptions(options);
      this.$select = $(select);
      
      // Initialization.
      // We have to clone to create a new reference.
      this.originalOptions = this.$select.clone()[0].options;
      this.query = '';
      this.searchTimeout = null;
      
      this.options.multiple = this.$select.attr('multiple') == "multiple";
      this.options.onChange = $.proxy(this.options.onChange, this);
      
      // Build select all if enabled.
      this.buildContainer();
      this.buildButton();
      this.buildSelectAll();
      this.buildDropdown();
      this.buildDropdownOptions();
      this.buildFilter();
      this.updateButtonText();

      this.$select.hide().after(this.$container);
  };

  Multiselect.prototype = {
      
      // Default options.
      defaults: {
          // Default text function will either print 'None selected' in case no
          // option is selected, or a list of the selected options up to a length of 3 selected options.
          // If more than 3 options are selected, the number of selected options is printed.
          buttonText: function(options, select) {
              if (options.length == 0) {
                  return this.nonSelectedText + ' <b class="caret"></b>';
              }
              else {
                  
                  if (options.length > 1) {
                      return options.length + ' ' + this.nSelectedText + ' <b class="caret"></b>';
                  }
                  else {
                      var selected = '';
                      options.each(function() {
                          var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).html();
                          
                          //Hack by Victor Valencia R.
                          if($(select).hasClass('multiselect-icon')){
                              var icon = $(this).data('icon');
                              label = '<span class="glyphicon ' + icon + '"></span> ' + label;
                          }
                          
                          selected += label + ', ';
                      });
                      return selected.substr(0, selected.length - 2) + ' <b class="caret"></b>';
                  }
              }
          },
          // Like the buttonText option to update the title of the button.
          buttonTitle: function(options, select) {
              if (options.length == 0) {
                  return this.nonSelectedText;
              }
              else {
                  var selected = '';
                  options.each(function () {
                      selected += $(this).text() + ', ';
                  });
                  return selected.substr(0, selected.length - 2);
              }
          },
          // Is triggered on change of the selected options.
          onChange : function(option, checked) {

          },
          buttonClass: 'btn',
          dropRight: false,
          selectedClass: 'active',
          buttonWidth: 'auto',
          buttonContainer: '<div class="btn-group custom-btn" />',
          // Maximum height of the dropdown menu.
          // If maximum height is exceeded a scrollbar will be displayed.
          maxHeight: false,
          includeSelectAllOption: false,
          selectAllText: ' Select all',
          selectAllValue: 'multiselect-all',
          enableFiltering: false,
          enableCaseInsensitiveFiltering: false,
          filterPlaceholder: 'Search',
          // possible options: 'text', 'value', 'both'
          filterBehavior: 'text',
          preventInputChangeEvent: false,        
          nonSelectedText: 'Property Types',            
          nSelectedText: 'Property Types'
      },
      
      // Templates.
      templates: {
          button: '<button type="button" class="multiselect dropdown-toggle form-control" data-toggle="dropdown"></button>',
          ul: '<ul class="multiselect-container dropdown-menu custom-multi"></ul>',
          filter: '<div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span><input class="form-control multiselect-search" type="text"></div>',
          li: '<li><a href="javascript:void(0);"><label></label></a></li>',
          liGroup: '<li><label class="multiselect-group"></label></li>'
      },
      
      constructor: Multiselect,
      
      buildContainer: function() {
          this.$container = $(this.options.buttonContainer);
      },
      
      buildButton: function() {
          // Build button.
          this.$button = $(this.templates.button).addClass(this.options.buttonClass);
          
          // Adopt active state.
          if (this.$select.prop('disabled')) {
              this.disable();
          }
          else {
              this.enable();
          }
         
          // Manually add button width if set.
          if (this.options.buttonWidth) {
              this.$button.css({
                  'width' : this.options.buttonWidth
              });
          }

          // Keep the tab index from the select.
          var tabindex = this.$select.attr('tabindex');
          if (tabindex) {
              this.$button.attr('tabindex', tabindex);
          }
         
          this.$container.prepend(this.$button)
      },
      
      // Build dropdown container ul.
      buildDropdown: function() {
          
          // Build ul.
          this.$ul = $(this.templates.ul);
          
          if (this.options.dropRight) {
              this.$ul.addClass('pull-right');
          }
          
          // Set max height of dropdown menu to activate auto scrollbar.
          if (this.options.maxHeight) {
              // TODO: Add a class for this option to move the css declarations.
              this.$ul.css({
                  'max-height': this.options.maxHeight + 'px',
                  'overflow-y': 'auto',
                  'overflow-x': 'hidden'
              });
          }
          
          this.$container.append(this.$ul)
      },
      
      // Build the dropdown and bind event handling.
      buildDropdownOptions: function() {
          
          this.$select.children().each($.proxy(function(index, element) {
              // Support optgroups and options without a group simultaneously.
              var tag = $(element).prop('tagName').toLowerCase();
              if (tag == 'optgroup') {
                  this.createOptgroup(element);
              }
              else if (tag == 'option') {
                  this.createOptionValue(element);
              }
              // Other illegal tags will be ignored.
          }, this));

          // Bind the change event on the dropdown elements.
          $('li input', this.$ul).on('change', $.proxy(function(event) {
              var checked = $(event.target).prop('checked') || false;
              var isSelectAllOption = $(event.target).val() == this.options.selectAllValue;

              // Apply or unapply the configured selected class.
              if (this.options.selectedClass) {
                  if (checked) {
                      $(event.target).parents('li').addClass(this.options.selectedClass);
                  }
                  else {
                      $(event.target).parents('li').removeClass(this.options.selectedClass);
                  }
              }
              
              // Get the corresponding option.
              var value = $(event.target).val();
              var $option = this.getOptionByValue(value);

              var $optionsNotThis = $('option', this.$select).not($option);
              var $checkboxesNotThis = $('input', this.$container).not($(event.target));

              // Toggle all options if the select all option was changed.
              if (isSelectAllOption) {
                  $checkboxesNotThis.filter(function() {
                      return $(this).is(':checked') != checked;
                  }).trigger('click');
              }

              if (checked) {
                  $option.prop('selected', true);

                  if (this.options.multiple) {
                      // Simply select additional option.
                      $option.prop('selected', true);
                  }
                  else {
                      // Unselect all other options and corresponding checkboxes.
                      if (this.options.selectedClass) {
                          $($checkboxesNotThis).parents('li').removeClass(this.options.selectedClass);
                      }

                      $($checkboxesNotThis).prop('checked', false);
                      $optionsNotThis.prop('selected', false);

                      // It's a single selection, so close.
                      this.$button.click();
                  }

                  if (this.options.selectedClass == "active") {
                      $optionsNotThis.parents("a").css("outline", "");
                  }
              }
              else {
                  // Unselect option.
                  $option.prop('selected', false);
              }

              this.updateButtonText();
              this.$select.change();
              this.options.onChange($option, checked);
              
              if(this.options.preventInputChangeEvent) {
                  return false;
              }
          }, this));

          $('li a', this.$ul).on('touchstart click', function(event) {
              event.stopPropagation();
              $(event.target).blur();
          });

          // Keyboard support.
          this.$container.on('keydown', $.proxy(function(event) {
              if ($('input[type="text"]', this.$container).is(':focus')) {
                  return;
              }
              if ((event.keyCode == 9 || event.keyCode == 27) && this.$container.hasClass('open')) {
                  // Close on tab or escape.
                  this.$button.click();
              }
              else {
                  var $items = $(this.$container).find("li:not(.divider):visible a");

                  if (!$items.length) {
                      return;
                  }

                  var index = $items.index($items.filter(':focus'));

                  // Navigation up.
                  if (event.keyCode == 38 && index > 0) {
                      index--;
                  }
                  // Navigate down.
                  else if (event.keyCode == 40 && index < $items.length - 1) {
                      index++;
                  }
                  else if (!~index) {
                      index = 0;
                  }

                  var $current = $items.eq(index);
                  $current.focus();

                  if (event.keyCode == 32 || event.keyCode == 13) {
                      var $checkbox = $current.find('input');

                      $checkbox.prop("checked", !$checkbox.prop("checked"));
                      $checkbox.change();
                  }

                  event.stopPropagation();
                  event.preventDefault();
              }
          }, this));
      },
      
      // Will build an dropdown element for the given option.
      createOptionValue: function(element) {
          if ($(element).is(':selected')) {
              $(element).prop('selected', true);
          }

          // Support the label attribute on options.
          var label = $(element).attr('label') || $(element).html();            
          var value = $(element).val();
                      
          //Hack by Victor Valencia R.            
          if($(element).parent().hasClass('multiselect-icon') || $(element).parent().parent().hasClass('multiselect-icon')){                                
              var icon = $(element).data('icon');
              label = '<span class="glyphicon ' + icon + '"></span> ' + label;
          } 
          
          var inputType = this.options.multiple ? "checkbox" : "radio";

          var $li = $(this.templates.li);
          $('label', $li).addClass(inputType);
          $('label', $li).append('<input type="' + inputType + '" />');
          
          //Hack by Victor Valencia R.
          if(($(element).parent().hasClass('multiselect-icon') || $(element).parent().parent().hasClass('multiselect-icon')) && inputType == 'radio'){                
              $('label', $li).css('padding-left', '0px');
              $('label', $li).find('input').css('display', 'none');
          }

          var selected = $(element).prop('selected') || false;
          var $checkbox = $('input', $li);
          $checkbox.val(value);

          if (value == this.options.selectAllValue) {
              $checkbox.parent().parent().addClass('multiselect-all');
          }

          $('label', $li).append(" " + label);

          this.$ul.append($li);

          if ($(element).is(':disabled')) {
              $checkbox.attr('disabled', 'disabled').prop('disabled', true).parents('li').addClass('disabled');
          }

          $checkbox.prop('checked', selected);

          if (selected && this.options.selectedClass) {
              $checkbox.parents('li').addClass(this.options.selectedClass);
          }
      },

      // Create optgroup.
      createOptgroup: function(group) {
          var groupName = $(group).prop('label');

          // Add a header for the group.
          var $li = $(this.templates.liGroup);
          $('label', $li).text(groupName);
          
          //Hack by Victor Valencia R.
          $li.addClass('text-primary');
          
          this.$ul.append($li);
          
          // Add the options of the group.
          $('option', group).each($.proxy(function(index, element) {                
              this.createOptionValue(element);
          }, this));
      },
      
      // Add the select all option to the select.
      buildSelectAll: function() {
          var alreadyHasSelectAll = this.$select[0][0] ? this.$select[0][0].value == this.options.selectAllValue : false;
          // If options.includeSelectAllOption === true, add the include all checkbox.
          if (this.options.includeSelectAllOption && this.options.multiple && !alreadyHasSelectAll) {
              this.$select.prepend('<option value="' + this.options.selectAllValue + '">' + this.options.selectAllText + '</option>');
          }
      },
      
      // Build and bind filter.
      buildFilter: function() {
          
          // Build filter if filtering OR case insensitive filtering is enabled and the number of options exceeds (or equals) enableFilterLength.
          if (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering) {
              var enableFilterLength = Math.max(this.options.enableFiltering, this.options.enableCaseInsensitiveFiltering);
              if (this.$select.find('option').length >= enableFilterLength) {
                  
                  this.$filter = $(this.templates.filter);
                  $('input', this.$filter).attr('placeholder', this.options.filterPlaceholder);
                  this.$ul.prepend(this.$filter);

                  this.$filter.val(this.query).on('click', function(event) {
                      event.stopPropagation();
                  }).on('keydown', $.proxy(function(event) {
                      // This is useful to catch "keydown" events after the browser has updated the control.
                      clearTimeout(this.searchTimeout);

                      this.searchTimeout = this.asyncFunction($.proxy(function() {

                          if (this.query != event.target.value) {
                              this.query = event.target.value;

                              $.each($('li', this.$ul), $.proxy(function(index, element) {
                                  var value = $('input', element).val();
                                  if (value != this.options.selectAllValue) {
                                      var text = $('label', element).text();
                                      var value = $('input', element).val();
                                      if (value && text && value != this.options.selectAllValue) {
                                          // by default lets assume that element is not
                                          // interesting for this search
                                          var showElement = false;

                                          var filterCandidate = '';
                                          if ((this.options.filterBehavior == 'text' || this.options.filterBehavior == 'both')) {
                                              filterCandidate = text;
                                          }
                                          if ((this.options.filterBehavior == 'value' || this.options.filterBehavior == 'both')) {
                                              filterCandidate = value;
                                          }

                                          if (this.options.enableCaseInsensitiveFiltering && filterCandidate.toLowerCase().indexOf(this.query.toLowerCase()) > -1) {
                                              showElement = true;
                                          }
                                          else if (filterCandidate.indexOf(this.query) > -1) {
                                              showElement = true;
                                          }

                                          if (showElement) {
                                              $(element).show();
                                          }
                                          else {
                                              $(element).hide();
                                          }
                                      }
                                  }
                              }, this));
                          }
                      }, this), 300, this);
                  }, this));
              }
          }
      },

      // Destroy - unbind - the plugin.
      destroy: function() {
          this.$container.remove();
          this.$select.show();
      },

      // Refreshs the checked options based on the current state of the select.
      refresh: function() {
          $('option', this.$select).each($.proxy(function(index, element) {
              var $input = $('li input', this.$ul).filter(function() {
                  return $(this).val() == $(element).val();
              });

              if ($(element).is(':selected')) {
                  $input.prop('checked', true);

                  if (this.options.selectedClass) {
                      $input.parents('li').addClass(this.options.selectedClass);
                  }
              }
              else {
                  $input.prop('checked', false);

                  if (this.options.selectedClass) {
                      $input.parents('li').removeClass(this.options.selectedClass);
                  }
              }

              if ($(element).is(":disabled")) {
                  $input.attr('disabled', 'disabled').prop('disabled', true).parents('li').addClass('disabled');
              }
              else {
                  $input.prop('disabled', false).parents('li').removeClass('disabled');
              }
          }, this));

          this.updateButtonText();
      },

      // Select an option by its value or multiple options using an array of values.
      select: function(selectValues) {
          if(selectValues && !$.isArray(selectValues)) {
              selectValues = [selectValues];
          }
          
          for (var i = 0; i < selectValues.length; i++) {
              
              var value = selectValues[i];
              
              var $option = this.getOptionByValue(value);
              var $checkbox = this.getInputByValue(value);

              if (this.options.selectedClass) {
                  $checkbox.parents('li').addClass(this.options.selectedClass);
              }

              $checkbox.prop('checked', true);
              $option.prop('selected', true);                
              this.options.onChange($option, true);
          }

          this.updateButtonText();
      },

      // Deselect an option by its value or using an array of values.
      deselect: function(deselectValues) {
          if(deselectValues && !$.isArray(deselectValues)) {
              deselectValues = [deselectValues];
          }

          for (var i = 0; i < deselectValues.length; i++) {
              
              var value = deselectValues[i];
              
              var $option = this.getOptionByValue(value);
              var $checkbox = this.getInputByValue(value);

              if (this.options.selectedClass) {
                  $checkbox.parents('li').removeClass(this.options.selectedClass);
              }

              $checkbox.prop('checked', false);
              $option.prop('selected', false);               
              this.options.onChange($option, false);
          }

          this.updateButtonText();
      },

      // Rebuild the whole dropdown menu.
      rebuild: function() {
          this.$ul.html('');
          
          // Remove select all option in select.
          $('option[value="' + this.options.selectAllValue + '"]', this.$select).remove();
          
          // Important to distinguish between radios and checkboxes.
          this.options.multiple = this.$select.attr('multiple') == "multiple";
          
          this.buildSelectAll();
          this.buildDropdownOptions();
          this.updateButtonText();
          this.buildFilter();
      },
      
      // Build select using the given data as options.
      dataprovider: function(dataprovider) {
          var optionDOM = "";
          dataprovider.forEach(function (option) {
              optionDOM += '<option value="' + option.value + '">' + option.label + '</option>';
          });

          this.$select.html(optionDOM);
          this.rebuild();
      },

      // Enable button.
      enable: function() {
          this.$select.prop('disabled', false);
          this.$button.prop('disabled', false)
              .removeClass('disabled');
      },

      // Disable button.
      disable: function() {
          this.$select.prop('disabled', true);
          this.$button.prop('disabled', true)
              .addClass('disabled');
      },

      // Set options.
      setOptions: function(options) {
          this.options = this.mergeOptions(options);
      },

      // Get options by merging defaults and given options.
      mergeOptions: function(options) {
          return $.extend({}, this.defaults, options);
      },
      
      // Update button text and button title.
      updateButtonText: function() {
          var options = this.getSelected();
          
          // First update the displayed button text.
          $('button', this.$container).html(this.options.buttonText(options, this.$select));            
          
          // Now update the title attribute of the button.
          $('button', this.$container).attr('title', this.options.buttonTitle(options, this.$select));
          
      },

      // Get all selected options.
      getSelected: function() {
          return $('option[value!="' + this.options.selectAllValue + '"]:selected', this.$select).filter(function() {
              return $(this).prop('selected');
          });
      },
      
      // Get the corresponding option by ts value.
      getOptionByValue: function(value) {
          return $('option', this.$select).filter(function() {
              return $(this).val() == value;
          });
      },
      
      // Get an input in the dropdown by its value.
      getInputByValue: function(value) {
          return $('li input', this.$ul).filter(function() {
              return $(this).val() == value;
          });
      },
      
      updateOriginalOptions: function() {
          this.originalOptions = this.$select.clone()[0].options;
      },

      asyncFunction: function(callback, timeout, self) {
          var args = Array.prototype.slice.call(arguments, 3);
          return setTimeout(function() {
              callback.apply(self || window, args);
          }, timeout);
      }
  };

  $.fn.multiselect = function(option, parameter) {
      return this.each(function() {
          var data = $(this).data('multiselect'), options = typeof option == 'object' && option;

          // Initialize the multiselect.
          if (!data) {
              $(this).data('multiselect', ( data = new Multiselect(this, options)));
          }

          // Call multiselect method.
          if ( typeof option == 'string') {
              data[option](parameter);
          }
      });
  };

  $.fn.multiselect.Constructor = Multiselect;
  
  // Automatically init selects by their data-role.
  $(function() {
      $("select[role='multiselect']").multiselect();
  });

}(window.jQuery);


$(".dropdown").on("click", ".form li .dropdown-toggle", function(e) { 
    e.preventDefault();
    $(this).parent().addClass("show");
    $(this).attr("aria-expanded", "true");
    $(this).next().addClass("show"); 
  });




var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}



/* If the user clicks anywhere outside the select box,
then close all select boxes: */
// document.addEventListener("click", closeAllSelect);
//   function initMap() {
//     // The location of Uluru
//     var uluru = {lat: -25.344, lng: 131.036};
//     // The map, centered at Uluru
//     var map = new google.maps.Map(
//         document.getElementById('map'), {zoom: 4, center: uluru});
//     // The marker, positioned at Uluru
//     var marker = new google.maps.Marker({position: uluru, map: map});
    
//   }

// var textFieldVisible = true;

document.querySelector('#search-icon').addEventListener('click', function() {

  $('#billbo').toggleClass('hidden');
  
});


$('#search-icon').click(function(){
    $('#billboard').toggle();
    // $('#billbo').toggle();
})

