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

export type UserInfoTypes = {
  gender: string;
  image: string;
  role: string;
  userId: string;
  userLogin: string;
  userName: string;
  userPassword: string;
  birthdate: string;
};

export type FeedbacksTypes = {
  body: string;
  date: any;
  header: string;
  rating: number;
  id: string;
  author: UserInfoTypes;
  likedUsers: any;
};
