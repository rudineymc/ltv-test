import './footer.scss';
import template from './footer.html';

export default class FooterTemplate {
  constructor($parentElement) {
    $parentElement.append(template);
  }
}
