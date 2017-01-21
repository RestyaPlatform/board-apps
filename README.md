### Restyaboard Apps

|Name|Description|Creator|Version|Price|Download
| ------------------- | --------------------------------- | -------------------- | -------------------- |-------------------- |-------------------- |
|Amazon Echo|Access your Restyaboard notifications through Amazon Echo. This Restyaboard Alexa Skill is developed using AWS Lambda. You will need to login to Restyaboard in Amazon Alexa Android App.|[Restya](http://restya.com/) |0.1.1|Paid|[Visit](http://restya.com/board/apps/r_amazon_echo)|
|Auto Archive Expired Cards|Enables automated archiving for expired cards.|[Restya](http://restya.com/) |0.1.1|Paid|[Visit](http://restya.com/board/apps/r_auto_archive_expired_cards)|
|Canned Response|Adds option to setup ready-made text comments in cards.|[Restya](http://restya.com/) |0.1.1|Paid|[Visit](http://restya.com/board/apps/r_canned_response)|
|Dashboard Charts|Adds charts with summary in dashboard, for easy filtering of Today Todos, etc.|[Restya](http://restya.com/) |0.1.1|Paid|[Visit](http://restya.com/board/apps/r_chart)|
|Chat|Enables integration with XMPP based chat.|[Restya](http://restya.com/) |0.1.1|Paid|[Visit](http://restya.com/board/apps/r_chat)|
|[Theming/CSSilize](r_cssilize)|CSSilize, theming partner|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_cssilize-v0.1.1.zip)|
|ElasticSearch|Adds easy filtering of cards. Useful when you have multiple boards|[Restya](http://restya.com/) |0.1.1|Paid|[Visit](http://restya.com/board/apps/r_elasticsearch)|
|Estimated Time Tracking|Adds estimated time tracking option for each cards.|[Restya](http://restya.com/) |0.1.1|Paid|[Visit](http://restya.com/board/apps/r_estimated_time)|
|Gantt View|Adds Gantt view for handling projects.|[Restya](http://restya.com/) |0.1.1|Paid|[Visit](http://restya.com/board/apps/r_gantt_view)|
|[Hide Card ID](r_hide_card_id)|Hide Card ID from cards listing as in Trello|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_hide_card_id-v0.1.1.zip)|
|Import from GitHub|Enables importing projects and tickets from GitHub|[Restya](http://restya.com/) |0.1.2|Paid|[Visit](http://restya.com/board/apps/r_import_github)|
|Instant Add Card|Allows users to add card quickly across boards--without having to open boards.|[Restya](http://restya.com/) |0.1.1|Paid|[Visit](http://restya.com/board/apps/r_instant_add_card)|
|LDAP|Enables users to login using their LDAP accounts.|[Restya](http://restya.com/) |0.1.1|Paid|[Visit](http://restya.com/board/apps/r_ldap_login)|
|SEO Checklist|Adds ready to use template SEO checklist template for performing search engine optimization.|[Restya](http://restya.com/) |0.1.1|Paid|[Visit](http://restya.com/board/apps/r_seo_checklist)|
|Slack|Enables posting to Slack from Restyaboard|[Restya](http://restya.com/) |0.1.2|Paid|[Visit](http://restya.com/board/apps/r_slack)|
|Support Desk|Transforms Restyaboard into an easy support desk software. Comes with support widget that captures support requests from users.|[Restya](http://restya.com/) |0.1.2|Paid|[Visit](http://restya.com/board/apps/r_support_app)|
|[Collaborate/TogetherJS](r_togetherjs)|Collaborate using Mozilla's TogetherJS|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_togetherjs-v0.1.1.zip)|
|Website QA Checklist|Adds ready to use checklist template for performing QA on a website.|[Restya](http://restya.com/) |0.1.1|Paid|[Visit](http://restya.com/board/apps/r_website_qa_checklist)|
|Zapier|Zapier is IFTTT like workflow automation service that enables integration with over 500 other websites. This app enables connecting to Zapier.|[Restya](http://restya.com/) |0.1.2|Paid|[Visit](http://restya.com/board/apps/r_zapier)|

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