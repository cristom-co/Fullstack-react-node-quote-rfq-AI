export interface IQuotes {
    id: string;
    client: string;
    email: string;
    phoneNumber: string;
    deliveryLocation: string;
    deliveryDate: string;
    products: string;
    total: string;
    createdAt: string;
    updatedAt: string;
  }


  export interface StoreState {
    //states
    listQuotes: IQuotes[] 
    //actions
    updateListQuoutes: (qoutes: IQuotes[]) => void
  }