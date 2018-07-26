# Would You Rather Project

## Download and start project

You can either download this project or git clone from the github link [https://github.com/minkhati/min-react-redux-poll](https://github.com/minkhati/min-react-redux-poll)

If you have downloaded the zip file then unzip it in your local computer drive and change directory to that directory name that you have unzipped. Or if you have cloned it using git clone then change directory to the the cloned name.

Then install all the packages with the project using either npm or yarn"

For example:

`git clone git@github.com:minkhati/min-react-redux-poll.git`

`cd min-react-redux-poll`

`npm install`

You can run now by giving the following command:

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute | Type   | Description                                                                                                                                                                                                    |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id        | String | The user’s unique identifier                                                                                                                                                                                   |
| name      | String | The user’s first name and last name                                                                                                                                                                            |
| avatarURL | String | The path to the image file                                                                                                                                                                                     |
| questions | Array  | A list of ids of the polling questions this user created                                                                                                                                                       |
| answers   | Object | The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options. |

### Questions

Questions include:

| Attribute | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| id        | String | The question’s unique identifier       |
| author    | String | The author’s unique identifier         |
| timestamp | String | The time when the question was created |
| optionOne | Object | The first voting option                |
| optionTwo | Object | The second voting option               |

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type   | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| votes     | Array  | A list that contains the id of each user who voted for that option |
| text      | String | The text of the option                                             |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_saveUser(User)`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1.  `_getUsers()` Method

_Description_: Get all of the existing users from the database.  
_Return Value_: Object where the key is the user’s id and the value is the user object.

2.  `_saveUser(User)` Method

_Description_: Save the user in the database.  
_Parameters_: Object that includes the following properties: `name`, and `avatarURL`. More details about these properties:

| Attribute | Type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| name      | String | The name of the user who posted the question |
| avatarURL | String | The URL of the user avatar                   |

_Return Value_: An object that has the following properties: `id`, `name`, `avatarURL`, `questions`, `answers`. More details about these properties:

| Attribute | Type   | Description                                                                                                                               |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| id        | String | The id of the user that was posted                                                                                                        |
| name      | String | The name of the user                                                                                                                      |
| avatarURL | String | The URL of the user avatar. The default URL is given                                                                                      |
| questions | Array  | The array to store the question id that has been created by this user                                                                     |
| answers   | Object | The object has a question id as a key and 'optionOne' or 'optionTwo' as a value depending upon the user has voted for the question option |

3.  `_getQuestions()` Method

_Description_: Get all of the existing questions from the database.  
_Return Value_: Object where the key is the question’s id and the value is the question object.

4.  `_saveQuestion(question)` Method

_Description_: Save the polling question in the database.  
_Parameters_: Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute     | Type   | Description                                |
| ------------- | ------ | ------------------------------------------ |
| author        | String | The id of the user who posted the question |
| optionOneText | String | The text of the first option               |
| optionTwoText | String | The text of the second option              |

_Return Value_: An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type   | Description                                                                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| id        | String | The id of the question that was posted                                                                                       |
| author    | String | The id of the user who posted the question                                                                                   |
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| timestamp | String | The time when the question was created                                                                                       |

5.  `_saveQuestionAnswer(object)` Method

_Description_: Save the answer to a particular polling question in the database.
_Parameters_: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute  | Type   | Description                                                                             |
| ---------- | ------ | --------------------------------------------------------------------------------------- |
| authedUser | String | The id of the user who answered the question                                            |
| qid        | String | The id of the question that was answered                                                |
| answer     | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"` |
