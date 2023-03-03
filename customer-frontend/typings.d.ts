type User = {
  email: string;
  name: string;
  phone: string;
}

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  count?: number;
}

type BasketItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  count: number;
}
