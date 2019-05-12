export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
    paymentMethod: string;
    street: string;
    street2?: string;
    city: string;
    postcode: number;
    phoneNumber: number;
    phoneNumbers?: number;
}
