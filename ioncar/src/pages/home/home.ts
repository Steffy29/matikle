import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { BluetoothSerial } from 'ionic-native';
import { Device } from '../device/device';
import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  devices: Device[];
  isConnected: boolean;
  isCordova: boolean;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public platform : Platform) {
    this.devices = [];
    this.isConnected = false;
    this.isCordova = this.platform.is('cordova');
  }

  presentModal() {
    let modal = this.modalCtrl.create(ModalPage, this.devices);
    modal.onDidDismiss(data => {
      this.isConnected = data;
      console.log(data);
    });
    modal.present();
  }

  startScanning() {
    console.log('Scanning Started');
    this.devices = [];
    let first = true;
    let devices;

    if (this.isCordova) {
      BluetoothSerial.list().then((lists) => {
        lists.forEach(function(device) {
          console.log(device.address);
          console.log(device);
          if (first) {
            devices = [{
              name: device.name,
              address: device.address,
              id: device.id
            }];
            first = false;
          } else {
            devices.push({
              name: device.name,
              address: device.address,
              id: device.id
            });
          }
        })
        this.devices = devices;
        this.presentModal();
      });
    } else {
      console.log('Service not available');
      this.devices = [{name: 'HC-06', address: '98:D3:37:00:A7:E0', id: '98:D3:37:00:A7:E0'},
                      {name: 'G Watch F44A', address: '2C:54:CF:78:F4:4A', id: '2C:54:CF:78:F4:4A'}];
      this.presentModal();
    }
  }

  up() {
    if (this.isCordova) {
      if (this.isConnected) {
        BluetoothSerial.write("f").then(success => {
          console.log('ça marche');
        }, error => {
          console.log(error);
        });
      } else {
        alert('Vous devez d\'abord vous connecter au device !');
      }
    } else {
      alert('Clic sur le bouton Up');
    }
  }

  down() {
    if (this.isCordova) {
      if (this.isConnected) {
        BluetoothSerial.write("b").then(success => {
          console.log('ça marche');
        }, error => {
          console.log(error);
        });
      } else {
        alert('Vous devez d\'abord vous connecter au device !');
      }
    } else {
      alert('Clic sur le bouton Down');
    }
  }

  right() {
    if (this.isCordova) {
      if (this.isConnected) {
        BluetoothSerial.write("r").then(success => {
          console.log('ça marche');
        }, error => {
          console.log(error);
        });
      } else {
        alert('Vous devez d\'abord vous connecter au device !');
      }
    } else {
      alert('Clic sur le bouton Right');
    }
  }

  left() {
    if (this.isCordova) {
      if (this.isConnected) {
        BluetoothSerial.write("l").then(success => {
          console.log('ça marche');
        }, error => {
          console.log(error);
        });
      } else {
        alert('Vous devez d\'abord vous connecter au device !');
      }
    } else {
      alert('Clic sur le bouton Left');
    }
  }

  stop() {
    console.log(this.isCordova);
    if (this.isCordova) {
      if (this.isConnected) {
        BluetoothSerial.write("s").then(success => {
          console.log('ça marche');
        }, error => {
          console.log(error);
        });
      } else {
        alert('Vous devez d\'abord vous connecter au device !');
      }
    } else {
      alert('Clic sur le bouton Stop');
    }
  }

  test() {
    BluetoothSerial.readRSSI().then(rssi => {
      console.log(rssi);
    }, error => {
      console.log(error);
      BluetoothSerial.showBluetoothSettings().then(settings => {
        console.log(settings);
      });
    });
    BluetoothSerial.available().then(success => {
      console.log(success);
    });

    BluetoothSerial.write("A").then(success => {
      console.log('test BluetoothSerial');
    });
  }
}
