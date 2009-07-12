function LoginAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

LoginAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
	this.cookie = new Mojo.Model.Cookie("HoptoadHelper");
	this.login_credentials = { api_subdomain:"", api_token:"" }
	if (this.cookie.get() != null) {
		this.login_credentials = this.cookie.get();
	}
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	// Token Text Field
	this.controller.setupWidget('api_token', 
			{ textFieldName: 'api_token', 
				multiline: false, 
				focus: false, 
				textCase: Mojo.Widget.steModeLowerCase },
			{ value: this.login_credentials.api_token, 
				disabled: false });
				
	// Subdomain Text Field
	this.controller.setupWidget('subdomain', 
			{ textFieldName: 'subomain', 
				multiline: false, 
				focus: true, 
				textCase: Mojo.Widget.steModeLowerCase }, 
			{ value: this.login_credentials.api_subdomain, 
				disabled: false });

	// Authenticate Button
	this.controller.setupWidget("loginButton",
	  	{},
	  	{ label : "Authenticate",
	  	   disabled: false }
	);
	
	/* add event handlers to listen to events from widgets */
	this.authenticate = this.authenticate.bindAsEventListener(this);
	Mojo.Event.listen(this.controller.get('loginButton'), Mojo.Event.tap, this.authenticate)
}

LoginAssistant.prototype.authenticate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	
	this.cookie = new Mojo.Model.Cookie("HoptoadHelper");
	if (this.cookie.get() != null) {
		this.login_credentials = this.cookie.get();
		Mojo.Controller.errorDialog("Subdomain: " + this.login_credentials.api_subdomain);
	} else {
		this.login_credentials = {
			api_subdomain: "cmg",
			api_token: "asdfasdfasdfasdf"
		}
		this.cookie.put(this.login_credentials);
		Mojo.Controller.errorDialog("Created Cookie");
	}
	
}

LoginAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}


LoginAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

LoginAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
 	Mojo.Event.stopListening(this.controller.get('loginButton'), Mojo.Event.tap, this.authenticate);
}
