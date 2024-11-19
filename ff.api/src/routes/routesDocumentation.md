# Challenge Routes Documentation

## Create Challenge

- **Method**: `POST`
- **Route**: `/challenges/create`
- **Description**: Creates a new challenge in the database
- **Request Body**:
  ```typescript
  {
      challengeType: string;  // Type of challenge (e.g., "cut-guessr", "quiz", "conversation-starter")
      cutGuessrData?: {       // Required if challengeType is "cut-guessr"
          animal: string;
          cut: string;
      };
      quizData?: {            // Required if challengeType is "quiz"
          title: string;
          questions: {
              type: "slider" | "single-choice" | "multiple-choice" | "text-input";
              min?: number;
              max?: number;
              question: string;
              options: string[];
              correctAnswer: string[];
              feedbackTitle: string[];
              feedbackMessage: string[];
          }[];
      };
      conversationStarterData?: {  // Required if challengeType is "conversation-starter"
          category: string;
          text: string;
      }[];
  }
  ```
- **Response Body**:
  ```typescript
  {
      _id: string;
      challengeType: string;
      cutGuessrData?: {
          animal: string;
          cut: string;
      };
      quizData?: {
          title: string;
          questions: Array<{
              type: string;
              min?: number;
              max?: number;
              question: string;
              options: string[];
              correctAnswer: string[];
              feedbackTitle: string[];
              feedbackMessage: string[];
          }>;
      };
      conversationStarterData?: Array<{
          category: string;
          text: string;
      }>;
  }
  ```

## Get Challenge by ID

- **Method**: `GET`
- **Route**: `/challenges/challenge/:id`
- **Description**: Retrieves a specific challenge by its ID
- **Parameters**:
  - `id`: Challenge identifier (MongoDB ObjectId)
- **Response Body**:
  ```typescript
  {
      _id: string;
      challengeType: string;
      cutGuessrData?: {
          animal: string;
          cut: string;
      };
      quizData?: {
          title: string;
          questions: Array<{
              type: string;
              min?: number;
              max?: number;
              question: string;
              options: string[];
              correctAnswer: string[];
              feedbackTitle: string[];
              feedbackMessage: string[];
          }>;
      };
      conversationStarterData?: Array<{
          category: string;
          text: string;
      }>;
  }
  ```

## Generate Challenge

- **Method**: `POST`
- **Route**: `/challenges/generate`
- **Description**: Generates a new challenge based on progression path context and quest parameters
- **Request Body**:
  ```typescript
  {
      progressionPathId: string;  // MongoDB ObjectId of the progression path
      unitNumber: number;         // Index of the unit in the progression path
      questNumber: number[];      // Array of quest indices to generate challenges for
  }
  ```
- **Response Body**:
  ```typescript
  {
    _id: string;
    title: string;
    description: string;
    units: Array<{
      id: string;
      title: string;
      levels: number;
      description: string;
      quests: Array<{
        type: string;
        minigameId: string;
        title: string;
        description: string;
        minigameData: string; // MongoDB ObjectId of the generated challenge
      }>;
    }>;
  }
  ```

# Progression Path Routes Documentation

## Create Progression Path

- **Method**: `POST`
- **Route**: `/progressionPaths/create`
- **Description**: Creates a new progression path with specified units and quests
- **Request Body**:
  ```typescript
  {
      title: string;
      description: string;
      units: [{
          id: string;
          title: string;
          levels: number;
          description: string;
          quests: [{
              type: string;
              minigameId: string;
              title: string;
              description: string;
          }]
      }]
      official: boolean; // Default is false
  }
  ```
- **Response Body**:
  ```typescript
  {
      _id: string;
      title: string;
      description: string;
      units: [{
          id: string;
          title: string;
          levels: number;
          description: string;
          quests: [{
              type: string;
              minigameId: string;
              title: string;
              description: string;
              minigameData?: string;
          }]
      }]
      official: boolean;
  }
  ```

## Generate Progression Path

- **Method**: `POST`
- **Route**: `/progressionPaths/generate`
- **Description**: Generates a progression path using AI based on a provided prompt
- **Request Body**:
  ```typescript
  {
    prompt: string; // Description of the desired progression path
  }
  ```
- **Response Body**: Same as Create Progression Path response

```typescript
  {
      _id: string;
      title: string;
      description: string;
      units: [{
          id: string;
          title: string;
          levels: number;
          description: string;
          quests: [{
              type: string;
              minigameId: string;
              title: string;
              description: string;
              minigameData?: string;
          }]
      }]
      official: boolean;
  }
```

## Get All Progression Paths

- **Method**: `GET`
- **Route**: `/progressionPaths`
- **Description**: Retrieves all progression paths in the system
- **Response Body**:
  ```typescript
  [
      {
          _id: string;
          title: string;
          description: string;
          units: Array<{
              id: string;
              title: string;
              levels: number;
              description: string;
              quests: Array<{
                  type: string;
                  minigameId: string;
                  title: string;
                  description: string;
                  minigameData?: string;
              }>;
          }>;
          official: boolean;
      }
  ]
  ```

## Get Progression Path by ID

- **Method**: `GET`
- **Route**: `/progressionPaths/progressionPath/:id`
- **Description**: Retrieves a specific progression path by its ID
- **Parameters**:
  - `id`: MongoDB ObjectId of the progression path
- **Response Body**: Same as Create Progression Path response

```typescript
  {
      _id: string;
      title: string;
      description: string;
      units: [{
          id: string;
          title: string;
          levels: number;
          description: string;
          quests: [{
              type: string;
              minigameId: string;
              title: string;
              description: string;
              minigameData?: string;
          }]
      }]
      official: boolean;
  }
```

## Update Progression Path

- **Method**: `PATCH`
- **Route**: `/progressionPaths/progressionPath/:id`
- **Description**: Updates a specific progression path
- **Parameters**:
  - `id`: MongoDB ObjectId of the progression path
- **Request Body**: Partial progression path object (same structure as Create request)

```typescript
  {
      title: string;
      description: string;
      units: [{
          id: string;
          title: string;
          levels: number;
          description: string;
          quests: [{
              type: string;
              minigameId: string;
              title: string;
              description: string;
          }]
      }]
      official: boolean;
  }
```

- **Response Body**: Updated progression path (same as Create response)

```typescript
  {
      _id: string;
      title: string;
      description: string;
      units: [{
          id: string;
          title: string;
          levels: number;
          description: string;
          quests: [{
              type: string;
              minigameId: string;
              title: string;
              description: string;
              minigameData?: string;
          }]
      }]
      official: boolean;
  }
```

# Player Progression Path Routes Documentation

## Create Player Progression Path

- **Method**: `POST`
- **Route**: `/playerProgressionPaths/create`
- **Description**: Creates a new player progression path by copying an existing progression path and associating it with a user
- **Request Body**:
  ```typescript
  {
    userId: string; // MongoDB ObjectId of the user
    progressionPathId: string; // MongoDB ObjectId of the progression path to copy
  }
  ```
- **Response Body**:
  ```typescript
  {
    _id: string;
    title: string;
    description: string;
    units: Array<{
      id: string;
      title: string;
      levels: number;
      description: string;
      quests: Array<{
        type: string;
        minigameId?: string;
        minigameData?: string;
        recipeId?: string;
        title: string;
        description: string;
      }>;
    }>;
    official: boolean;
    user: string; // MongoDB ObjectId of the user
    progress: {
      unitNumber: number;
      questNumber: number;
    }
  }
  ```

## Get Player Progression Paths by User

- **Method**: `GET`
- **Route**: `/playerProgressionPaths/byUser/:userId`
- **Description**: Retrieves all progression paths associated with a specific user
- **Parameters**:
  - `userId`: MongoDB ObjectId of the user
- **Response Body**:
  ```typescript
  Array<{
    _id: string;
    title: string;
    description: string;
    units: Array<{
      id: string;
      title: string;
      levels: number;
      description: string;
      quests: Array<Quest>;
    }>;
    official: boolean;
    user: string;
    progress: {
      unitNumber: number;
      questNumber: number;
    };
  }>;
  ```

## Get Player Progression Path by ID

- **Method**: `GET`
- **Route**: `/playerProgressionPaths/playerProgressionPath/:id`
- **Description**: Retrieves a specific player progression path by its ID
- **Parameters**:
  - `id`: MongoDB ObjectId of the player progression path
- **Response Body**: Same as Create Player Progression Path response

```typescript
{
  _id: string;
  title: string;
  description: string;
  units: Array<{
    id: string;
    title: string;
    levels: number;
    description: string;
    quests: Array<{
      type: string;
      minigameId?: string;
      minigameData?: string;
      recipeId?: string;
      title: string;
      description: string;
    }>;
  }>;
  official: boolean;
  user: string; // MongoDB ObjectId of the user
  progress: {
    unitNumber: number;
    questNumber: number;
  }
}
```

## Update Player Progression Path

- **Method**: `PATCH`
- **Route**: `/playerProgressionPaths/playerProgressionPath/:id`
- **Description**: Updates a specific player progression path, typically used to update progress
- **Parameters**:
  - `id`: MongoDB ObjectId of the player progression path
- **Request Body**: Partial player progression path object (same structure as Create Player Progression Path response)
  ```typescript
  {
      progress?: {
          unitNumber: number;
          questNumber: number;
      };
      // Other fields from PlayerProgressionPath model can also be updated
  }
  ```
- **Response Body**: Same as Create Player Progression Path response

```typescript
{
  _id: string;
  title: string;
  description: string;
  units: Array<{
    id: string;
    title: string;
    levels: number;
    description: string;
    quests: Array<{
      type: string;
      minigameId?: string;
      minigameData?: string;
      recipeId?: string;
      title: string;
      description: string;
    }>;
  }>;
  official: boolean;
  user: string; // MongoDB ObjectId of the user
  progress: {
    unitNumber: number;
    questNumber: number;
  }
}
```
