import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loggerData = [];

  constructor(public alertCtrl: AlertController) {
  }

  toLog(type, msg) {
    if (type == 'warn') {
      console.warn(msg);
      this.loggerData.push({color: 'orange', text: msg});
    } else if (type == 'log') {
      console.log(msg);
      this.loggerData.push({color: 'black', text: msg});
    } else if (type == 'error') {
      console.error(msg);
      this.loggerData.push({color: 'red', text: msg});
    } else if (type == 'debug') {
      console.debug(msg);
      this.loggerData.push({color: 'blue', text: msg});
    }
  }

  MfpInit() {
    this.toLog('debug','-- trying to init WL client');
    var wlInitOptions = {
        mfpContextRoot : '/mfp',
        applicationId : 'com.ibm.websample'
    };
    WL.Client.init(wlInitOptions).then((success) => {
      this.toLog('debug','-- WL client init done');

      this.toLog('debug','-- trying to obtain authorization token');
      WLAuthorizationManager.obtainAccessToken().then((success) => {
              this.toLog('debug','-- succesfully got a token');
            },
            (failure) => {
              this.toLog('error','-- failed to get a token');
            }
          );
    }, (failure) => {
      this.toLog('error','-- failed to init MFPF Web SDK');
    });
  }

  AuthInit() {
    this.toLog('debug','-- creating UserLogin challenge handler');
    this.AuthHandler = WL.Client.createSecurityCheckChallengeHandler("UserLogin");

    this.AuthHandler.handleChallenge = ((response) => {
        this.toLog('debug','-- inside UserLogin handleChallenge');

        if(response.errorMsg){
          var msg = response.errorMsg + '<br>';
          msg += 'Remaining attempts: ' + response.remainingAttempts;
          WL.Logger.error("Auth error: " + response.errorMsg);
          WL.Logger.send();
        }

        this.DisplayLogin(msg);
    })

  }

  CallUnprotected() {
    this.toLog('debug','-- trying to call unprotected adapter');
    var resourceRequest = new WLResourceRequest(
        "/adapters/javaAdapter/resource/unprotected/",
        WLResourceRequest.GET
    );

    resourceRequest.send().then((response) => {
            this.toLog('debug',"-- success: " + response.responseText);
        },
        (failure)  => {
            this.toLog('error',"-- failure: " + JSON.stringify(failure));
        }
    );
  }

  CallProtected() {
    this.toLog('debug','-- trying to call protected adapter');
    var resourceRequest = new WLResourceRequest(
        "/adapters/javaAdapter/resource/protected/",
        WLResourceRequest.GET
    );

    resourceRequest.send().then((response) => {
            this.toLog('debug',"-- success: " + response.responseText);
        },
        (failure)  => {
            this.toLog('error',"-- failure: " + JSON.stringify(failure));
        }
    );
  }

  DisplayLogin(msg) {
    this.toLog('debug','-- opening login prompt');
    if(msg){
      this.toLog('warn','-- error message: ', msg);
    }
    let prompt = this.alertCtrl.create({
          title: 'Login',
          message: "Enter equal username and pass to proceed",
          inputs: [
            {
              name: 'username',
              placeholder: 'username'
            },
            {
              name: 'password',
              placeholder: 'password'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                this.toLog('warn','-- login cancelled');
              }
            },
            {
              text: 'Login',
              handler: data => {
                this.toLog('debug','-- trying to log in user ', data.username);
                this.AuthHandler.submitChallengeAnswer(data);
              }
            }
          ]
        });
    prompt.present();
  }

  LogOut() {
    this.toLog('debug','-- doing logout from UserLogin');
    WLAuthorizationManager.logout("UserLogin");
  }

}
