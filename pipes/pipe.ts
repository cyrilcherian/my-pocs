import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'formatMe'
})
export class FormatMe implements PipeTransform {
  transform(text: string): string {
    return " hi cyril";
  }
}
@Pipe({
  name: 'formatMeAgain'
})
export class FormatMeAgain implements PipeTransform {
  transform(text: string): string {
    return "Bye cyril";
  }
}
