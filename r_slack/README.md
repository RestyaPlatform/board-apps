### Post messages to Slack

- Login with your Slack account.
- We will fetch your Slack channels and create a mapping with your assigned board names and store it in localStorage.
- If any new activities done in the board, then script will post the activities as a message to corresponding channels in Slack.
- If the board is not in a Slack channel, we will create a channel using board name and post the message to it.