# Microservices POC

## Messenger service

Shares messages between users in session

**API:**

`createUser` - creates user that can send messages

`createSession` - creates session where users can share their messages

`joinUser` - joins user in stated session

`sendMessage` - sends message in stated session. Only users in stated session will receive the message

`receiveMessages` - receives all messages for stated user

`listUsers` - lists all users

`listSessions` - lists all sessions

**Flow example:**

1. Creating users to share messages between them

<details>

**Requests:**

```gql
mutation CreateUser {
  createUser(input: { name: "Frank" }) {
    id
  }
}
```

```gql
mutation CreateUser {
  createUser(input: { name: "Jack" }) {
    id
  }
}
```

**Responses:**

```gql
{
  "data": {
    "createUser": {
      "id": "3383f73e-6c38-48c6-8841-cda09d736974"
    }
  }
}
```

```gql
{
  "data": {
    "createUser": {
      "id": "4f949b53-10f6-4624-98e6-8e2aae338752"
    }
  }
}
```

</details>

2. Creating session

<details>

**Request:**

```gql
mutation CreateSession {
  createSession(input: { name: "private" }) {
    id
  }
}
```

**Response:**

```gql
{
  "data": {
    "createSession": {
      "id": "096185ce-90d0-4342-98b1-3152424337ec"
    }
  }
}
```

</details>

3. Joining users in our session

<details>

**Requests:**

```gql
mutation JoinUser {
  joinUser(
    input: {
      userId: "3383f73e-6c38-48c6-8841-cda09d736974"
      sessionId: "096185ce-90d0-4342-98b1-3152424337ec"
    }
  ) {
    success
  }
}
```

```gql
mutation JoinUser {
  joinUser(
    input: {
      userId: "4f949b53-10f6-4624-98e6-8e2aae338752"
      sessionId: "096185ce-90d0-4342-98b1-3152424337ec"
    }
  ) {
    success
  }
}
```

**Response:**

```gql
{
  "data": {
    "joinUser": {
      "success": true
    }
  }
}
```

```gql
{
  "data": {
    "joinUser": {
      "success": true
    }
  }
}
```

</details>

4. Sending message as `Frank`

<details>

**Request:**

```gql
mutation SendMessage {
  sendMessage(
    input: {
      senderId: "3383f73e-6c38-48c6-8841-cda09d736974"
      sessionId: "096185ce-90d0-4342-98b1-3152424337ec"
      payload: "Message from Frank"
    }
  ) {
    id
  }
}
```

**Response:**

```gql
{
  "data": {
    "sendMessage": {
      "id": "d2596d7c-2305-4e16-a965-1402cd55f3b3"
    }
  }
}
```

</details>

5. Receiving message as `Jack`

<details>

**Request:**

```gql
mutation ReceiveMessages {
  receiveMessages(input: { userId: "4f949b53-10f6-4624-98e6-8e2aae338752" }) {
    messages {
      id
      senderId
      sessionId
      payload
    }
  }
}
```

**Response:**

```gql
{
  "data": {
    "receiveMessages": {
      "messages": [
        {
          "id": "d2596d7c-2305-4e16-a965-1402cd55f3b3",
          "senderId": "3383f73e-6c38-48c6-8841-cda09d736974",
          "sessionId": "096185ce-90d0-4342-98b1-3152424337ec",
          "payload": "Message from Frank"
        }
      ]
    }
  }
}
```

</details>

## Timer service

Creates timers

**API:**

`createTimer` - creates timer

`startTimer` - starts timer countdown

`stopTimer` - stops timer countdown

`removeTimer` - removes timer

`listTimers` - lists all timers

**Flow example:**

1. Creating timer

<details>

**Request:**

```gql
mutation CreateTimer {
  createTimer(input: { code: "Timer1" }) {
    id
  }
}
```

**Response:**

```gql
{
  "data": {
    "createTimer": {
      "id": "8e2d8546-ccee-4224-b4f6-7ef0f3511ce4"
    }
  }
}
```

</details>

2. Starting timer

<details>

**Request:**

```gql
mutation StartTimer {
  startTimer(input: { id: "8e2d8546-ccee-4224-b4f6-7ef0f3511ce4" }) {
    id
  }
}
```

**Response:**

```gql
{
  "data": {
    "startTimer": {
      "id": "8e2d8546-ccee-4224-b4f6-7ef0f3511ce4"
    }
  }
}
```

</details>

3. Checking timer countdown

<details>

**Request:**

```gql
query ListTimers {
  listTimers {
    timers {
      id
      code
      time
      isRunning
    }
  }
}
```

**Response:**

```gql
{
  "data": {
    "listTimers": {
      "timers": [
        {
          "id": "8e2d8546-ccee-4224-b4f6-7ef0f3511ce4",
          "code": "Timer1",
          "time": 50,
          "isRunning": true
        }
      ]
    }
  }
}
```

</details>

4. Stopping timer

<details>

**Request:**

```gql
mutation StopTimer {
  stopTimer(input: { id: "8e2d8546-ccee-4224-b4f6-7ef0f3511ce4" }) {
    id
  }
}
```

**Response:**

```gql
{
  "data": {
    "stopTimer": {
      "id": "8e2d8546-ccee-4224-b4f6-7ef0f3511ce4"
    }
  }
}
```

</details>

5. Removing timer

<details>

**Request:**

```gql
mutation RemoveTimer {
  removeTimer(input: { id: "8e2d8546-ccee-4224-b4f6-7ef0f3511ce4" }) {
    id
  }
}
```

**Response:**

```gql
{
  "data": {
    "removeTimer": {
      "id": "8e2d8546-ccee-4224-b4f6-7ef0f3511ce4"
    }
  }
}
```

</details>
