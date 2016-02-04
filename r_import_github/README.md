### Import from GitHub

- Login with your GitHub account.
- We will insert your GitHub repositories as a board.
- We will create users with default password restya and email as empty for each repository users from GitHub.
- Assign the created users as board members.
- We will create default lists for each board which are New, Assigned, In Progress, Feedback, Closed.
- We will insert every issue as a card in the list based on following criteria.

  - If issue state is not equal to open, issue will be added as a card in "Closed" list.
  - If issue comment count is not equal zero, issue will be as a card added in "Feedback" list.
  - If issue has milestone date, issue will be added as a card in "In Progress" list.
  - If issue assigned to user, issue will be added as a card in "Assigned" list.
  - If issue is not match any criteria, issue will be added as a card in "New" list.

- Assign labels to each cards, milestone date to card due date and assigned users to card members.
- Also we will insert issue comments to respective card comments.