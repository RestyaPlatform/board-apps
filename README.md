### Restyaboard Apps

|Name|Description|Creator|Version|Price|Download|Repo
| ------------------- | --------------------------------- | -------------------- | -------------------- |-------------------- |-------------------- |-------------------- |
|[Amazon Echo App](r_amazon_echo)|Access your Restyaboard notifications through Amazon Echo. This Restyaboard Alexa Skill is developed using AWS Lambda. You will need to login to Restyaboard in Amazon Alexa Android App.|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_amazon_echo-v0.1.1.zip)|[Repository](r_amazon_echo)|
|[Theming/CSSilize](r_cssilize)|CSSilize, theming partner|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_cssilize-v0.1.1.zip)|[Repository](r_cssilize)|
|[Estimated Time Custom Field](r_estimated_time)|Adds estimated time custom input. This will be displayed in the card listing to arrange them easily.|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_estimated_time-v0.1.1.zip)|[Repository](r_estimated_time)|
|[Hide Card ID](r_hide_card_id)|Hide Card ID from cards listing as in Trello|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_hide_card_id-v0.1.1.zip)|[Repository](r_hide_card_id)|
|[Import from GitHub](r_import_github)|Import GitHub repositories. users, issues and comments|[Restya](http://restya.com/) |0.1.2|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_import_github-v0.1.2.zip)|[Repository](r_import_github)|
|[SEO Checklist](r_seo_checklist)|Readymade SEO checklist of essential SEO tips and tasks|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_seo_checklist-v0.1.1.zip)|[Repository](r_seo_checklist)|
|[Post my comments to Slack](r_slack)|Auto post your comments to Slack|[Restya](http://restya.com/) |0.1.2|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_slack-v0.1.2.zip)|[Repository](r_slack)|
|[Collaborate/TogetherJS](r_togetherjs)|Collaborate using Mozilla's TogetherJS|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_togetherjs-v0.1.1.zip)|[Repository](r_togetherjs)|
|[Website QA Checklist](r_website_qa_checklist)|Readymade QA checklist of best practices|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_website_qa_checklist-v0.1.1.zip)|[Repository](r_website_qa_checklist)|
|[Auto Archive Expired Cards](r_workflow_for_cards)|Automatically archives expired cards.|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_workflow_for_cards-v0.1.1.zip)|[Repository](r_workflow_for_cards)|
|[Zapier Connect](r_zapier)|This app generates "access token" that you should use it in Zapier to connect with your Restyaboard account.|[Restya](http://restya.com/) |0.1.2|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_zapier-v0.1.1.zip)|[Repository](r_zapier)|

### Steps to create new app
- Create a new folder by name of your app name in apps folder.
- App folder name must start with `r_`.
- Create `app.json` file with your app details which is explained below.
- Create js folder with `app.js` and include the app file in `app.json`. If any new library file need means Create libs folder within `js` folder and add it in `libs` folder and include it in `app.json` file.

### App folder
- app.json
- js
- css (if needed)
- img (if needed)
- README.md

### app.json

The content of the file is used in index page. For example, content should look as follows
```javascript
{
	"name" : "your_app_name",
	"description" : "your_app_description",
	"author" : "",
	"author_email" : "",
	"author_url" : "",
	"version" : "your_app_version",
	"price" :
	"settings_description" : "",
	"settings" : {
		"setting_name": {
			"label" : "",
			"info" : "",
			"value" : "",
			"is_public" : true
		},
	},
	"assets" : {
		"css" : [],
		"js" : [
			"apps/your_app_name/js/app.js"
		]
	},
	"enabled" : true
}
```
Here, 
	
- `name` - app name which is displayed in admin side app listing page to differentiate the name.
- `description` - app description for understanding purpose. 
- `author`, `author_email`, `author_url`, `version` for documentation standards.
- `settings_description` - settings description for how to create a application.
- `settings` - settings contains your app client id, secret key, OAuth token url.
    - `setting_name` - Your setting name (allow only a-z, 0-9, _ ).
        - `label` - Label value will be used in label of setting text box.
        - `info` - Info value will be showed under setting text box.
        - `value` - Admin will configure this in UI.
        - `is_public` - To show/hide settings value in user side. (e.g., OAuth client secret should not visible to user. So for that settings you should set is_public as `false`).
- `assets` - assets contains css, js files which are need to run your app.
- `enabled` - status of your app.

### OAuth implementation

In Restyabord, we have implemented a generic OAuth callback to get the access token. To use this approach you have to follow the below steps:
- For OAuth implementation you should include your application client id, client secret, OAuth token URL in `app.json` under settings field.
- You have to add your app folder name in prefix of client id, client secret, OAuth token URL. i.e `your_app_name_client_id`, `your_app_name_client_secret`, `your_app_name_oauth_token_url`.
- Your request to get access token should be like this `oauth_callback/your_app_name/CODE`.

### Best Practices

App script contains a time consuming calls or scripts then use [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to run the script in background.