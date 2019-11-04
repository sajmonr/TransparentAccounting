import {Pipe, PipeTransform} from "@angular/core";
import {CurrencyPipe} from "@angular/common";

@Pipe({
  name: 'accountingCurrency'
})
export class AccountingCurrencyPipe extends CurrencyPipe implements PipeTransform{
  transform(value: any, currencyCode?: string, display?: "code" | "symbol" | "symbol-narrow" | string | boolean, digitsInfo?: string, locale?: string): string | null {
    const number = parseFloat(value);

    if(isNaN(number))
      return null;

    let output = super.transform(value, currencyCode, display, digitsInfo, locale);

    if(number < 0)
      output = `(${output.replace('-', '')})`;

    return output;
  }
}
