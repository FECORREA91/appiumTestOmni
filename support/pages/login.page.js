const BasePage = require('./base.page');

class LoginPage extends BasePage {
    get usernameField() { return $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.EditText'); }
    get passwordField() { return $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.widget.EditText'); }
    get loginButton() { return $('//android.view.ViewGroup[@content-desc="Iniciar sesión"]'); }
    get errorMessage() { return $('//android.widget.TextView[@text="Ha ocurrido un error, revisa que tú email y contraseña sean correctos!"]'); }
    get acceptButton() { return $ ('//android.widget.TextView[@text="Aceptar"]');}

    async open() {
        await super.open();
        // Additional app launch logic if needed
    }

    async login(username, password) {
        await this.setValue(this.usernameField, username);
        await this.setValue(this.passwordField, password);
    }

    async submit() {
        await this.click(this.loginButton);
    }

    async accept() {
    await this.click(this.acceptButton);
    }


}

module.exports = new LoginPage();