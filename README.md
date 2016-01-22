### Restyaboard Apps

|Name|Description|Creator|Version|Price|Download|Repo
| ------------------- | --------------------------------- | -------------------- | -------------------- |-------------------- |-------------------- |-------------------- |
|[CSSilize Widget](r_cssilize)|Slice a website or mobile apps. Starting from $35|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_cssilize-v0.1.1.zip)|[Repository](r_cssilize)|
|[Import from GitHub](r_import_github)|Import your GitHub repositories as boards and issues as card for the board.|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_import_github-v0.1.1.zip)|[Repository](r_import_github)|
|[Post messages to Slack](r_slack)|Post messages to Slack for each activities from your site|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_slack-v0.1.1.zip)|[Repository](r_slack)|
|[TogetherJS Widget](r_togetherjs)|Enable collaboration using Mozilla's TogetherJS|[Restya](http://restya.com/) |0.1.1|Free|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/r_togetherjs-v0.1.1.zip)|[Repository](r_togetherjs)|


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