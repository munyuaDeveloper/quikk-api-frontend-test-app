export interface IFormField {
    id: string
    name: string
    code: string
    place_holder: string
    input_type: string
    field_type: string
    required: boolean
  }

  export interface ITransaction {
    _id: string
    amount: number
    type: string
    user: User
    receiver?: Receiver
    sender?: Sender
    createdAt: string
    __v: number
  }
  
  export interface User {
    _id: string
    first_name: string
    last_name: string
    phone_number: string
  }
  
  export interface Receiver {
    _id: string
    first_name: string
    last_name: string
    phone_number: string
  }
  export interface Sender {
    _id: string
    first_name: string
    last_name: string
    phone_number: string
  }