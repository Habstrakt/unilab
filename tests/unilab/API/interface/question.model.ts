interface TQuestionCategory {
  id: number,
  name: string
};



interface TQuestion {
  id: number,
  categoryId: number,
  createdAt: string,
  fullName: string,
  content: string,
  cityName: string,
  answeredAt: string,
  answerContent: string,
  specialist: TQuestionSpecialist
}

interface TQuestionSpecialist {
  fullName: string,
  avatarUrl: string,
  female: boolean,
  gender: string
}

interface TQuestionData {
  items: TQuestion[],
  total: number,
  page: number | string,
  size: number | string,
  pages: number
}

export {TQuestionCategory, TQuestionData}