```js
{
  category: Array<{label: String, id: UiD}>
}

{
  rating: {
    hash<userId,carDid>: {
      cardId: <card-id>,
      userId: <userId>,
      value: <integer>,
      description: <textfield>,
    }
  }
}


{
  chapter: {
    <chapter-id>: {
      createdBy: <personId>,
      createdAt: <timestamp>,
      lastModifiedAt: <timestamp>,
      title: <string>,
      tag: Array<string>,
      titleImg: <url>,
      category: Array<CategoryUiD>,
      folders: Array<folder-id>,
      keywords: UniqueArray<lower(Token(title, tag), category)>
      cards: {
        paginate: { // no indexing
          10: Array<{
            id: uniqueID,
            title: String,
            description: String,
            type: <question|concept>,
            img: url,
            question: Array<{id: questionId, label: String}>, // for MCQ single entity will be present and for match it will have multiple question
            options: Array<{id: answerId, label: String}>,
            answerKey: Array<{questionId: <questionId>, answerId: <answerId>}>
          }>,
          20: Array<{
            id: uniqueID,
            title: String,
            description: String,
            type: <question|concept>,
            img: url,
            question: Array<{id: questionId, label: String}>, // for MCQ single entity will be present and for match it will have multiple question
            options: Array<{id: answerId, label: String}>,
            answerKey: Array<{questionId: <questionId>, answerId: <answerId>}>
          }>
        }
      }
    }
  }
}


{
  folder: {
    <folder-id>: {
      createdBy: <personId>,
      createdAt: <timestamp>,
      lastModifiedAt: <timestamp>,
      title: <string>,
      tag: Array<string>,
      titleImg: <url>,
      category: Array<CategoryUiD>,
      keywords: UniqueArray<Token(title, tag), category>
    }
  }
}

{
  batches: { // just for display
    <batch-id>: {
      createdBy: <userId>,
      students: Array<{name: string, userId: <uid>, imgUrl: <sting>}>,
    }
  }
}
```
