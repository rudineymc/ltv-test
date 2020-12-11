import './card.scss';
import $ from 'jquery';
import cardTemplate from './card.html';

export default class CardListTemplate {

  cardBaseClass = '.js-search-card';
  $container;
  cardList;

  constructor($parentElement, cardList) {
    // Clone the list to avoid possible reference issues
    this.$container = $parentElement;
    this.cardList = [...(cardList || []).map(x => ({...x}))];
    this.buildCard();
  }

  buildCard() {
    const cardsHtml = this.cardList.reduce((cards, c) => {
      const {
        email,
        first_name,
        last_name,
        description,
        address,
        phone_numbers,
        relatives
      } = c;
      const $card = $($.parseHTML(cardTemplate));
      const phones = phone_numbers.reduce((html, p) => html + `
        <li><a href="tel:${p}">${p}</a></li>
      `, '');
      const relativesList = relatives.reduce((html, p) => html + `<li>${p}</li>`, '');
      $($card.find(`${this.cardBaseClass}__name`).get(0)).text(`${first_name || ''} ${last_name || ''}`);
      $($card.find(`${this.cardBaseClass}__description`).get(0)).text(description);
      $($card.find(`${this.cardBaseClass}__email`).get(0)).text(email);
      $($card.find(`${this.cardBaseClass}__address`).get(0)).text(address);
      $($card.find(`${this.cardBaseClass}__phones`).get(0)).append('<ul>' + phones + '</ul>');
      $($card.find(`${this.cardBaseClass}__relatives`).get(0)).append('<ul>' + relativesList + '</ul>');
      return cards.add($card);
    }, $());

    const totalResults = this.cardList && this.cardList.length || 0;
    const resultsTitle = totalResults !== 1 ? 'Results' : 'Result';
    this.$container.html(cardsHtml);

    const resultsDescription = totalResults > 0 ? 'Look at the result below to see the details of the person you’re searched for.' : 'Try starting a new search below';
    this.$container.prepend(`
    <div class="text-center">
      <h1 class="text-primary display-4 font-weight-bold ${totalResults > 0 ? '' : 'pt-5 mt-5'}">${totalResults} ${resultsTitle}</h1>
      <h5 class="font-weight-normal ${totalResults > 0 ? '' : 'pb-5 mb-5'}">${resultsDescription}</h5>
    </div>
    `);
  }

  buildPhoneNumberButtons() {
    
  }
}
