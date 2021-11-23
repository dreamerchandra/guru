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
            subType: <MATCH|MCQ>, // <MCQ>
            imgUrl: url,
            question: Array<{id: questionId, label: String}>, // for MCQ single entity will be present and for match it will have multiple question
            options: Array<{id: answerId, label: String}>,
            answerKey: Array<{questionId: <questionId>, answerId: <answerId>}>
          },
        <card-id3>: {
            lastModifiedAt: <timestamp>,
            createdBy: <personId>,
            description: String,
            type: <question|concept>,
            subType: <MATCH|MCQ>, // <MATCH>
            options: Array<{id: string, question: string, qImg: string, aImg: string, answer: string}>
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

{
  revisionQuestion: {
      <question-id>:  {
          lastModifiedAt: <timestamp>,
          createdBy: <personId>,
          description: String,
          type: <question|concept>,
          subType: <MATCH|MCQ>, // <MCQ>
          imgUrl: url,
          question: Array<{id: questionId, label: String}>, // for MCQ single entity will be present and for match it will have multiple question
          options: Array<{id: answerId, label: String}>,
          answerKey: Array<{questionId: <questionId>, answerId: <answerId>}>,
          tags: Array<String>,
          isVerified: <boolean> // true indicated crated by an partner institute
        },
      <question-id>: {
          lastModifiedAt: <timestamp>,
          createdBy: <personId>,
          description: String,
          type: <question|concept>,
          subType: <MATCH|MCQ>, // <MATCH>
          options: Array<{id: string, question: string, qImg: string, aImg: string, answer: string}>
          isVerified: <boolean> // true indicated crated by an partner institute
        }
      }
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
        original: img, // for mcq,
        <optionsId-original>: img // for match
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
