module.exports = {
    FILTER_BUTTON : ".search-filter > .content-bar > #stable-filters-left > .filters-btn > .filters",
    GENDER_SPAN: "//div[contains(@class,'side-filter-section')]/div[@class='stable-filter-content']/div[descendant::text()='GENDER']/div[@class='Collapsible']/span",
    COLT_CHECKBOX: ".f-part:nth-child(4) > .Collapsible > .Collapsible__contentOuter > .Collapsible__contentInner > .z-checkbox:nth-child(2) > .primary-text",
    STALLION_CHECKBOX: ".f-part:nth-child(4) > .Collapsible > .Collapsible__contentOuter > .Collapsible__contentInner > .z-checkbox:nth-child(3) > .primary-text",
    CLOSE_BUTTON: "//div[contains(@class,'side-filter-section')]/div[@class='stable-filter-content']/div[contains(@class,'side-filter-head')]/button",
    MY_STABLE_MALE_HORSES: "//section[@id='stable-main']//div[@class='row']//div[@class='panel'][not(.//div[contains(@class,'name')][text()='Newborn'])][not(.//span[contains(@class,'stud')])]",
    SELECTED_MALE_HORSE: "(//section[@id='stable-main']//div[@class='row']//div[@class='panel'][not(.//div[contains(@class,'name')][text()='Newborn'])][not(.//span[contains(@class,'stud')])])[${i}]//div[@class='label-content']//div[contains(@class,'name')]",
    CUSTOM_BREED_BUTTON: "#stable-main .row .accordion-content .accordion .panel:nth-child(${i}) .panel__inner .panel__content .panel-btns .icn-txt:nth-child(2)",
    STUD_DURATION: ':text("Set duration")',
    SEVEN_DAYS_OPTION: ':text("7 Days"):below(:text("Set duration"))',
    ONE_DAY_OPTION: ':text("1 Day"):below(:text("Set duration"))',
    THREE_DAYS_OPTION: ':text("3 Days"):below(:text("Set duration"))',
    SELECTED_MALE_HORSE_NAME: ".breed-form .section-content .horse-part .horse-info .primary-text",
    NEXT_BUTTON: "//div[@class='section-footer']/div[@class='handle-btns']/button[text()='next']",
    PROCEED_BUTTON: "//button[text()='Proceed']",
    TOTAL_THOROUGHBREDS: ".stable-info .desc-part .stable-stat:nth-child(1) h3",
    NUMBER_HORSE: ".accordion-content .panel",
    NEWBORN_LIST: "//section[@id='stable-main']//div[@class='row']//div[@class='panel'][not(.//span[contains(@class,'stud')])]//div[contains(@class,'name') and text()='Newborn']",
    SELECTED_NEWBORN: "(//section[@id='stable-main']//div[@class='row']//div[@class='panel'][not(.//span[contains(@class,'stud')])]//div[contains(@class,'name') and text()='Newborn'])[${i}]",
    NEWBORN_EDIT_FORM: ".offspring-name-edit-form section .video-content video",
    OKAY_BUTTON: ".offspring-naming-modal-content > .offspring-name-edit-form > section > .section-footer > .primary-btn",
    NEWBORN_HORSE_NAME_INPUT : 'css=[placeholder="Choose Name"]',
    NEWBORN_NAME_CHECKBOX : '.offspring-name-edit-form > section > .section-footer > .z-checkbox > .primary-text',
    HORSE_NOMINATION_CONFIRM_BUTTON: '.offspring-naming-modal-content > .offspring-name-edit-form > section > .section-footer > .primary-btn',
    LOADING_ICON: ".offspring-naming-modal section .loader-container img",
    NEWBORN_UPDATE_HORSENAME: "(//section[@id='stable-main']//div[@class='row']//div[@class='panel'][not(.//span[contains(@class,'stud')])]//div[contains(@class,'name') and contains(text(),'${name}')]",
    MY_STABLE_LOADING_ICON: "#stable-main .stable-content .accordion-content .accordion .loader-container img",
    MY_STABLE_LAST_HORSE: "//section[@id='stable-main']//div[@class='row']//div[@class='panel'][last()]",
    SEARCH_INPUT: "#stable-filters-left input.search",
    MY_STABLE_HORSE_LIST : "#stable-main .row .accordion-content .accordion .panel",
    CUSTOM_HORSE: "//section[@id='stable-main']//div[@class='row']//div[@class='panel']//div[contains(@class,'name') and text()='${name}']",
    NEW_BORN_HORSE: ".accordion-content .accordion .panel:nth-child(1) .label-content .left .primary-text.name",
    BUTTON_NAME: ".accordion-content .accordion .panel:nth-child(1) .label-content .right button",
    REFER_EMAIL_INPUT: ".top-part input[type='email']",
    SEND_REFER_BUTTON: ".top-part button"
};
