import { Component } from '@angular/core';
import { ViewController, NavParams, Platform } from 'ionic-angular';
import { Device } from '../device/device';
import { BluetoothSerial } from 'ionic-native';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  devices: Device[];
  isConnected: boolean;

  constructor(public viewCtrl: ViewController, public params: NavParams, public platform : Platform) {
    this.devices = this.params.data;
    console.log(this.params);

    if (this.platform.is('cordova')) {
      console.log('cordova');
      console.log(this.devices);
      BluetoothSerial.isConnected().then(success => {
        this.isConnected = success;
      }, error => {
        this.isConnected = false;
      });
    } else {
      console.log(this.devices);
      this.isConnected = true;
    }
  }

  connectToDevice(device) {
    console.log('Connect To Device');
    BluetoothSerial.connect(device.address).subscribe(device => {
      BluetoothSerial.isConnected().then(success => {
        this.isConnected = success;
        this.close();
      }, error => {
        this.isConnected = false;
      });
    });
  }

  disconnectToDevice() {
    console.log('Disconnect To Device');
    if (this.platform.is('cordova')) {
      BluetoothSerial.disconnect();
    }
    this.isConnected = false;
    this.viewCtrl.dismiss(this.isConnected);
  }

  close() {
    this.viewCtrl.dismiss(this.isConnected);
  }
}
