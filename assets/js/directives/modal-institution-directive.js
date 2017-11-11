'use strict';

oiaApplication.directive('modalContactPerson',function(){
  return {
    restrict : "AE",
    controller: "@",
    name:"controllerName",
    scope: {"pageCode" : "@pageCode"},
    templateUrl : "institutions/modal-institution-contact-person.tpl.html"
  }
});
