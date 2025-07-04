export type PortItemPropsTypes = {
  title: string;
  description: string;
  backgroundColor: string;
  id: number;
  type: string;
  route: string;
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
  type: string;
};

export type UserInfoTypes = {
  gender: string;
  image: string;
  role: string;
  userId: string;
  userLogin: string;
  userName: string;
  userPassword: string;
  birthdate: number | string;
  friends: any;
  verified: boolean;
};

export type questionTypes = {
  id: number;
  question: string;
  answer: string;
};

export type FeedbacksTypes = {
  body: string;
  date: number;
  header: string;
  rating: number;
  id: string;
  authorId: string;
  likedUsers: any;
  postId: number;
};

export type AntivirusTypes = {
  question: string;
  inputOrSelect: string;
  selectOptions: string[];
  state: string;
  id: number;
};

export type SingleForumItemProps = {
  authorId: string;
  comments: any;
  createdAt: number;
  description: string;
  header: string;
  id: string;
  count: number;
};
