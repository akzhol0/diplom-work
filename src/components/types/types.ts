export type PortItemPropsTypes = {
  title: string;
  description: string;
  backgroundColor: string;
  id: number;
  type: string;
};

export type CardPropsTypes = {
  img: string;
  title: string;
  description: string;
  id: number;
};

export type ServiceCardPropsTypes = {
  title: string;
  description: string;
  price: string;
  id: number;
  card: PortItemPropsTypes;
};

export type QuestionTypes = {
  question: string;
  answer: string;
  id: number;
};
