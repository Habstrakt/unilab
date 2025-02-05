interface City {
  id: number;
  uid: string;
  name: string;
  phone: string;
  record_button: boolean;
  record_cashing: boolean;
  parent_id: number | null;
};

export {City}