import './email-form-lookup.scss';
import $ from 'jquery';
import template from './email-form-lookup.html';

export default class EmailFormLookupTemplate {

  mainSelector = '.js-email-form-lookup';
  $form;
  $input;
  $errorMessage;
  $title;
  $description;
  $descriptionSpan;
  onValidSubmit;

  constructor($parentElement, { title, description, spanText, onSubmit }) {
    $parentElement.html(template);

    this.onValidSubmit = onSubmit;
    this.onSubmit = this.onSubmit.bind(this);
    this.keyup = this.keyup.bind(this);
    this.$form = $($parentElement.find(this.mainSelector).get(0));
    this.$form.submit(this.onSubmit);
    this.$errorMessage = $(this.$form.find(`${this.mainSelector}__error`).get(0));
    this.$input = $(this.$form.find(`${this.mainSelector}__input`).get(0));
    this.$input.keyup(this.keyup);

    this.$title = $(this.$form.find(`${this.mainSelector}__title`).get(0));
    this.$description = $(this.$form.find(`${this.mainSelector}__description`).get(0));
    this.$descriptionSpan = $(this.$form.find(`${this.mainSelector}__description-span`).get(0));

    this.$title.text(title);
    this.$description.append(description);
    this.$descriptionSpan.text(spanText);
  }

  addInputValidationState($input) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmailValid = emailRegex.test($input.val().toLowerCase());
    $input.toggleClass('is-invalid', !isEmailValid);
    this.$errorMessage.toggleClass('d-none', isEmailValid);

    return isEmailValid;
  }

  keyup(e) {
    this.addInputValidationState($(e.currentTarget));
  }

  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const isValid = this.addInputValidationState(this.$input);
    if (isValid) {
      this.onValidSubmit(this.$input.val());
    }
  }
}
