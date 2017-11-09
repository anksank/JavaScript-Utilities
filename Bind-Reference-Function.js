
			// Example of a function override - Taken from CNG
      // May help in understanding the behavoir of Bind in JavaScript
      // Implementation of manual save of Visual Filter Variant
			if (!CustomFilter.bVariantManagementFlag) return;

			var oBase_fetchVariant = SmartVisualFilterBar.prototype.fetchVariant;
			SmartVisualFilterBar.prototype.fetchVariant = jQuery.proxy(function () {
				// Get the page variant of the application
				var alr_pageVariant = $(document.getElementsByClassName('sapUiCompVarMngmt')[0]).control()[0];
				// Get the control for which the variant info has to be updated
				var alr_visualFilterBar = $(document.getElementsByClassName('sapSuiteVisualFilterBar')[0]).control()[0];
				
				// In case the visual filter bar of the page variant is undefined, continue with 
				// 'STANDARD'
				if (!alr_pageVariant || !alr_visualFilterBar) {
					var boundFunction = oBase_fetchVariant.bind(this);
					return boundFunction();
				}
				
				if (alr_pageVariant.getSelectionKey() !== "*standard*") {
					// In case of any other variant, save the state of the visual filter as it is in the variant
					return {
						config : alr_pageVariant.getVariantContent(alr_visualFilterBar, alr_pageVariant.getSelectionKey())
					}
				}

				var boundFunction = oBase_fetchVariant.bind(this);
				return boundFunction();

			}, SmartVisualFilterBar.prototype);

			CustomFilter.bVariantManagementFlag = true;
