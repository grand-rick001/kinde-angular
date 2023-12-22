import { ModuleWithProviders, NgModule } from '@angular/core';
import { KindeAngularService } from "./kinde-angular.service";
import { factoryToken, KindeClientFactory } from "./kinde-client-factory.service";
import { KindeConfigInterface } from "./interfaces/kinde-config.interface";
import { kindeConfigToken } from "./tokens/config.token";

@NgModule()
export class KindeAngularModule {
  static forRoot(config: KindeConfigInterface): ModuleWithProviders<KindeAngularModule> {
    return {
      ngModule: KindeAngularModule,
      providers: [
        KindeAngularService,
        {
          provide: kindeConfigToken,
          useValue: config
        },
        {
          provide: factoryToken,
          useFactory: KindeClientFactory.createClient,
          deps: [kindeConfigToken]
        }
      ]
    }
  }
}