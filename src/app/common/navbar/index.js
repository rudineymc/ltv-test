import template from './navbar.html';

export default class NavbarTemplate {
  constructor($parentElement) {
    $parentElement.prepend(template);
  }
}
