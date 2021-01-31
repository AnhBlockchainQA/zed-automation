module.exports = {
    FILTER_BUTTON : ".search-filter > .content-bar > #stable-filters-left > .filters-btn > .filters",
    GENDER_SPAN: "//div[contains(@class,'side-filter-section')]/div[@class='stable-filter-content']/div[descendant::text()='GENDER']/div[@class='Collapsible']/span",
    COLT_CHECKBOX: ".f-part:nth-child(4) > .Collapsible > .Collapsible__contentOuter > .Collapsible__contentInner > .z-checkbox:nth-child(2) > .primary-text",
    STALLION_CHECKBOX: ".f-part:nth-child(4) > .Collapsible > .Collapsible__contentOuter > .Collapsible__contentInner > .z-checkbox:nth-child(3) > .primary-text",
    CLOSE_BUTTON: "//div[contains(@class,'side-filter-section')]/div[@class='stable-filter-content']/div[contains(@class,'side-filter-head')]/button",
    MY_STABLE_MALE_HORSES: "#stable-main .stable-content .row .column_full .accordion-content .accordion .accordion .panel",
    SELECTED_MALE_HORSE: "#stable-main .stable-content .row .column_full .accordion-content .accordion .accordion .panel:nth-child(${i}) .panel__label .label-content .name",
    CUSTOM_BREED_BUTTON: "#stable-main .row .accordion-content .accordion .panel:nth-child(${i}) .panel__inner .panel__content .panel-btns .icn-txt:nth-child(2)",
    STUD_DURATION: ':text("Set duration")',
    SEVEN_DAYS_OPTION: ':text("7 Days"):below(:text("Set duration"))',
    ONE_DAY_OPTION: ':text("1 Day"):below(:text("Set duration"))',
    THREE_DAYS_OPTION: ':text("3 Days"):below(:text("Set duration"))',
    SELECTED_MALE_HORSE_NAME: ".breed-form .section-content .horse-part .horse-info .primary-text",
    NEXT_BUTTON: "//div[@class='section-footer']/div[@class='handle-btns']/button[text()='next']",
    PROCEED_BUTTON: "//button[text()='Proceed']",
    TOTAL_THOROUGHBREDS: ".stable-info .desc-part .stable-stat:nth-child(1) h3",
    NUMBER_HORSE: ".accordion-content .panel"
};
