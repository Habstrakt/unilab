interface TArticleItem {
    "id": number | string,
    "imageUrl": string,
    "title": string,
    "contentPreview": string,
    "content": string,
    "date": string
}

interface TArticle {
  items: TArticleItem[],
  "total": number,
  "page": number | string,
  "size": number | string,
  "pages": number
}



export {TArticle, TArticleItem}
