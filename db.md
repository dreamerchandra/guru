```js
{
  Category: {
    <category-id>: {
      label: <string>,
    }
  }
}

{
  Rating: {
    hash<userId,carDid>: {
      cardId: <card-id>,
      createdBy: <userId>,
      value: <integer>,
      description: <textfield>,
      lastModifiedAt: <timestamp>, 
    }
  }
}


{
  Chapter: {
    <chapter-id>: {
      createdBy: <personId>,
      createdAt: <timestamp>,
      lastModifiedAt: <timestamp>,
      title: <string>,
      tag: Array<string>,
      batches: {{studentId}: true}, // https://stackoverflow.com/a/52969138/5277189
      titleImg: <url>,
      category: Array<CategoryUiD>,
      folders: Array<folder-id>,
      keywords: UniqueArray<lower(Token(title, tag), category)>
      Cards: {
        <card-id>: { // no indexing
            createdBy: <personId>,
            title: String,
            lastModifiedAt: <timestamp>,
            description: String,
            type: <question|concept>,
            imgUrl: url,
        },
        <card-id2>: {
            lastModifiedAt: <timestamp>,
            createdBy: <personId>,
            description: String,
            type: <question|concept>,
            imgUrl: url,
            question: Array<{id: questionId, label: String}>, // for MCQ single entity will be present and for match it will have multiple question
            options: Array<{id: answerId, label: String}>,
            answerKey: Array<{questionId: <questionId>, answerId: <answerId>}>
          }
        }
      }
    }
  }
}


{
  Folder: {
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
  Batches: { // just for display
    <userId>: {
      students: Array<{displayName: string, id: <uid>, imgUrl: <sting>}>,
    }
  }
}


{
  User: {
    <user-id>: {
      category: <cat-id>
    }
  }
}
```

Storage bucket
```
{
  chapter: {
    <chapter-id>: {
      original: img,
    }
    card: {
      card-id: {
        original: img,
      }
    }
  }
  user: {
    <user-id>: {
      original: img,
    }
  }
}
```
