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

export type PathPropsTypes = {
  img: string;
  title: string;
  id: number;
  description: string[];
};

export type ServiceCardPropsTypes = {
  title: string;
  description: string;
  price: string;
  id: number;
  card: PortItemPropsTypes;
};
