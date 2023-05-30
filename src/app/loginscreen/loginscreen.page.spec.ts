import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginscreenPage } from './loginscreen.page';
import { LoginPage } from '../login/login.page';
import { NavController
 } from '@ionic/angular';
describe('LoginscreenPage', () => {
  let component: LoginscreenPage;
  let fixture: ComponentFixture<LoginscreenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function irAlLogin(){
    this.navCtrl.navigateForward(LoginPage)
  };

});
function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}

