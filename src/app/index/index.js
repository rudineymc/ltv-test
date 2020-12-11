import $ from 'jquery';
import NavbarTemplate from '@/app/common/navbar';
import FooterTemplate from '@/app/common/footer';
import EmailFormLookupTemplate from '@/app/common/email-form-lookup';
import './index.scss';

export default class IndexPage {
  constructor() {
    const $body = $('body');
    const searchForm = $('.js-email-form').get(0);
    new NavbarTemplate($body);
    new FooterTemplate($body);
    new EmailFormLookupTemplate($(searchForm), {
      title: 'Search Any Email Address',
      description: " - Look up the owner's name, photos and online profiles. See what you find!",
      spanText: 'Start Here',
      onSubmit: (text) => location.href = `/search?q=${btoa(text)}`,
    });
  }
}

$(document).ready(() => {
  new IndexPage();
});
