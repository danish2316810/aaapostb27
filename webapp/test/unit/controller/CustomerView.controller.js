/*global QUnit*/

sap.ui.define([
	"app/postb27/controller/CustomerView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CustomerView Controller");

	QUnit.test("I should test the CustomerView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
