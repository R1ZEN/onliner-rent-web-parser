
export function getApartmentDescription(document: Document): string {
  try {
    let selector = '#container > div > div.l-gradient-wrapper > div > div > div.arenda-apartment > div.apartment-info > div:nth-child(4) > div > div.apartment-info__cell.apartment-info__cell_66 > div.apartment-info__sub-line.apartment-info__sub-line_extended-bottom';
    let result = document.querySelector(selector).textContent;

    return result.trim().replace(/[\r\n]+/gm, '');
  } catch (err) {
    return null;
  }
}

export function getApartmentPhone(document: Document): string[] {
  try {
    let selector = '#apartment-phones > ul';
    let el = document.querySelector(selector)
    let result = Array.from(el.children, ch => ch.textContent.trim());
    let set = new Set(result);

    return Array.from(set.values()).filter(Boolean);
  } catch (err) {
    return null;
  }
}

export function getApartmentOptions(document: Document): {type: string, available: boolean}[] {
  try {
    let selector = '#container > div > div.l-gradient-wrapper > div > div > div.arenda-apartment > div.apartment-info > div:nth-child(1) > div > div.apartment-info__cell.apartment-info__cell_66 > div.apartment-options';
    let el = document.querySelector(selector);
    let result = Array.from(el.children, ch => ({
      type: ch.textContent,
      available: !ch.classList.contains('apartment-options__item_lack'),
    })).reduce((acc, {type, available}) => {
      if (available) {
        acc.push(type);
      }
      return acc;
    }, []);

    return result;
  } catch(err) {
    return null;
  }
}
