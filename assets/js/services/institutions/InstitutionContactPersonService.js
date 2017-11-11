'use strict';

oiaApplication.service('InstitutionContactPersonService',
	function($http) {
		let contactPersonFormBean = {};
		let addBean = function(obj){
			contactPersonFormBean.contactPersonId = obj.contactPersonId;
			contactPersonFormBean.contactPersonType = obj.contactPersonType;
			contactPersonFormBean.parentId = obj.parentId;
			contactPersonFormBean.contactPersonFullName = obj.contactPersonFullName;
			contactPersonFormBean.contactPersonEmail = obj.contactPersonEmail;
			contactPersonFormBean.contactPersonNumber = obj.contactPersonNumber;
			contactPersonFormBean.facultyId = obj.facultyId;
			contactPersonFormBean.position = obj.position;
			contactPersonFormBean.projectName = obj.projectName;
			contactPersonFormBean.contactPersonFunction = obj.contactPersonFunction;
			contactPersonFormBean.prospect = obj.prospect;
			contactPersonFormBean.research = obj.research;
			contactPersonFormBean.alumnus = obj.alumnus;
			contactPersonFormBean.tbc = obj.tbc;
		}
		let getBean = function(){
			return contactPersonFormBean;
		}

		return {
			addBean: addBean,
			getBean: getBean
		};
	}
);
