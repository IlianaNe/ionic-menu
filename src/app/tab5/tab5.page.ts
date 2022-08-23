import { Component, OnInit } from '@angular/core';
import { MetaMapCapacitor } from "@avo121/mati-capacitor-plugin";
import { Capacitor } from "@capacitor/core";
import { MetaMapService } from '../api/meta-map.service';
import { NetworkInterface } from '@awesome-cordova-plugins/network-interface/ngx';
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  providers: [NetworkInterface]
})
export class Tab5Page implements OnInit {
  idToken = "";

  constructor(private metaService: MetaMapService, private networkInterface: NetworkInterface) {
    this.idToken = this.metaService.leerToken();
  }

  ngOnInit() {
  }

  showMetaMapFlow() {
    if (Capacitor.isNativePlatform()) {
    }
    let metadataParams = { param1: "value1" };
    let registerParams = { clientId: "5e94a3c0aac162001b1c892c", flowId: "62fbc517d106dd001dfca192", metadata: metadataParams };

    MetaMapCapacitor.showMetaMapFlow(registerParams)
      .then(verification => console.log("verification success:" + verification.verificationID))
      .catch((err) => console.log(err))
  }

  crearToken() {
    this.metaService.getToken();
  }

  newUser() {
    this.metaService.newUser();
  }

  newDocuments() {
    this.metaService.newDocuments();
  }

  getUser() {
    this.metaService.getUser();
  }

  verificationStatus(status:string) {
    this.metaService.verificationStatus(status);
  }

  deleteUser() {
    this.metaService.deleteUser();
  }

}
