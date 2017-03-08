import {
    Component,
    OnInit,
    NgModule,
    Compiler,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { AddressService } from '../core/address/address.service';
import { AddressModule } from '../address/address.module';

@Component({
  selector: 'app-inject-address',
  templateUrl: './inject-address.component.html',
  styleUrls: ['./inject-address.component.css']
})
export class InjectAddressComponent implements OnInit {
  private html: string = "";
  @ViewChild('container', { read: ViewContainerRef }) private container: ViewContainerRef;

  constructor(private addressService: AddressService, private compiler: Compiler,) { }

  ngOnInit() {
    this.addressService.getHTML().subscribe(data => {
        this.html = data as string;
        this.addComponent(this.html);
    });
  }
  private addComponent(template: string) {
      console.log(template)
      @Component({ template: template })
      class TemplateComponent { }

      @NgModule({
          declarations: [TemplateComponent],
          imports: [AddressModule]
      })
      class TemplateModule { }

      const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
      const factory = mod.componentFactories.find((comp) => {
            return comp.componentType === TemplateComponent
          }
      );

      this.container.createComponent(factory);
  }
}
