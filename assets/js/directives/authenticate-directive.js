'use strict';

oiaApplication.directive('hasAuthority',function(localStorageService){
  return {
    restrict : "A",
    link: function(scope, element, attrs){
        const setVisible = function(){
            element.removeClass('hidden');
        }
        const setHidden = function(){
            element.addClass('hidden');
        }
        const user = localStorageService.get('userSession');
        const authority = attrs.hasAuthority;
        // console.log(user);
        // console.log(authority);
        if(authority === '*'){
            setVisible();
        }else if(authority === user.chulaMsRole.roleName){
            setVisible();
        }else{
            setHidden();
        }

        //----- can add edit
        // if(isVisible){
        //     if(user.canAddEdit === 'Y'){
        //         setVisible();
        //     }else{
        //         setHidden();
        //     }
        // }
        
        //----- can view
        // if(isVisible){
        //     if(user.canView === 'Y'){
        //         setReadOnly();
        //     }else{
        //         setTouch();
        //     }
        // }
    }
  }
})
.directive('canAction', function(localStorageService){
    return {
        restrict : "A",
        link: function(scope, element,attrs){
            const setVisible = function(){
                element.removeClass('hidden');
            }
            const setHidden = function(){
                element.addClass('hidden');
            }
            const user = localStorageService.get('userSession');
            const pageCode = attrs.canAction;
            const action =  _.find(user.chulaMsRole.chulaTrWebPageMapRoles,function(val){
                return val.chulaMsWebPage.webPageCode == pageCode;
            });
            // console.log(user);
            // console.log("action.canAddEdit: "+action.canAddEdit);
            
            //----- can add edit
            if(action.canAddEdit === 'Y'){
                setVisible();
            }else{
                setHidden();
            }
        }
      }
})
.directive('isViewOnly', function(localStorageService){
    return {
        restrict : "A",
        link: function(scope, element,attrs){
            const setReadOnly = function(){
                element.prop('disabled',true);
            }
            const setTouch = function(){
                element.prop('disabled',false);
            }
            const user = localStorageService.get('userSession');
            // console.log(user.chulaMsRole.chulaTrWebPageMapRoles);
            const pageCode = attrs.isViewOnly;
            const action = _.find(user.chulaMsRole.chulaTrWebPageMapRoles,function(val){
                return val.chulaMsWebPage.webPageCode == pageCode;
            });
            // console.log(user);
            // console.log("action.viewOnly: "+action.viewOnly);
            
            //----- can add edit
            if(action.viewOnly === 'Y'){
                setReadOnly();
            }else{
                setTouch();
            }
        }
      }
})