# Quiz maker

## Assumption

* The teachers can set any number of quizes and the students can take any number of quizes without restrictions.
* The teachers and students join the system by registering.

## Actors

### Teacher

#### Data

```json
{
  _id: ObjectId,
  username: String,
  password: String,
  email: String
}
```

#### actions

* authentication actions
* question CRUD
* quiz
  * Create
  * Read
  * Update
  * Delete
  * publish

### Student

#### Data

```json
{
  _id: ObjectId,
  username: String,
  password: String,
  email: String
}
```

#### actions

* authentication actions
* quiz
  * Read
* submission
  * create
  * read
  * update
  * commit

## Services

### Authentication

Authenticate comming user and identify his role.

### QuizMaker

Allow a teacher to make and manage an exam.

### QuizTaker

Allow student to take an exam.
