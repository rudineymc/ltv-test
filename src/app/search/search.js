import './search.scss';
import $ from 'jquery';
import NavbarTemplate from '@/app/common/navbar';
import FooterTemplate from '@/app/common/footer';
import EmailFormLookupTemplate from '@/app/common/email-form-lookup';
import CardListTemplate from '@/app/search/card-list';

export default class SearchPage {

  baseClass = '.js-search';
  $loading;
  $results;
  $emailForm;

  constructor() {
    const $body = $('body');
    const $searchForm = $('.js-email-form').eq(0);
    this.$loading = $(`${this.baseClass}__loading`);
    this.$loading.hide();
    this.$results = $(`${this.baseClass}__results`);
    this.$emailForm = $('.js-email-form');
    new NavbarTemplate($body);
    new FooterTemplate($body);
    new EmailFormLookupTemplate($searchForm, {
      title: 'Can’t Find The Right Person?',
      description: " - Make a new search",
      spanText: 'Try Again',
      onSubmit: (text) => {
        window.history.pushState('', '', `/search?q=${btoa(text)}`);
        this.searchByEmail();
      }
    });
    this.searchByEmail();
  }

  searchByEmail() {
    const emailParam = this.getParameterByName('q');
    const email = atob(emailParam || '');
    if (!email) {
      return;
    }
    this.$results.hide();
    this.$emailForm.hide();
    this.$loading.show();

    $.ajax(`https://cors-anywhere.herokuapp.com/https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${email}`, {
      method: 'GET',
      headers: {
        Origin: 'ltv-data-api.herokuapp.com'
      }
    })
    .done((data) => {
      new CardListTemplate($('.js-search__results').eq(0), Array.isArray(data) ? data : [data]);
    }).fail(() => {
      new CardListTemplate($('.js-search__results').eq(0), []);
    }).always(() => {
      this.$results.show();
      this.$loading.hide();
      this.$emailForm.show();
    });
  }

  /**
   * This should be moved to a different helper
   */
  getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}

$(document).ready(() => {
  new SearchPage();
});
