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
      titleImg: <url>,
      category: Array<CategoryUiD>,
      folders: Array<folder-id>,
      keywords: UniqueArray<lower(Token(title, tag), category)>
      Cards: {
        <card-id>: { // no indexing
            title: String,
            createdBy: <personId>,
            description: String,
            type: <question|concept>,
            imgUrl: url,
            question: Array<{id: questionId, label: String}>, // for MCQ single entity will be present and for match it will have multiple question
            options: Array<{id: answerId, label: String}>,
            answerKey: Array<{questionId: <questionId>, answerId: <answerId>}>
        },
        <card-id2>: {
            title: String,
            description: String,
            type: <question|concept>,
            img: url,
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
  batches: { // just for display
    <batch-id>: {
      createdBy: <userId>,
      students: Array<{name: string, userId: <uid>, imgUrl: <sting>}>,
    }
  }
}
```


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
}
```
