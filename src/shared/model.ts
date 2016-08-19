export class Region {
    id:string;
    name:string;
    description:string;
    zone:Zone = new Zone();
}

export class Zone {
    center:Location = new Location();
    radius:number;
}

export class Location {
    latitude:number;
    longitude:number;
}

export class Promotion {
    id:string;
    serviceId:string;
    promoCode:string;
    media:string;
    title:string;
    expirationDateTime:Date;
    shortDescription:string;
    fullDescription:string;
}

export class Company {
    id: string;
    name: string;
    description: string;
    contactDetails: ContactDetails;
    services: ServiceProvider[];
}

export class ContactDetails {
    phoneNumber1: string;
    phoneNumber2: string;
    emailAddress: string;
    webSite: string;
}

export class AddressDetails {
    country: string;
    city: string;
    address: string;
    location: Location = new Location()
}

export class ServiceProvider {
    id: string;
    regionId: string;
    name: string;
    businessCategory: string;
    registerDetails: PersonDetails = new PersonDetails();
    addressDetails: AddressDetails = new AddressDetails();
    contactDetails: ContactDetails = new ContactDetails();
}

export class PersonDetails {
    name: string;
    surname: string;
}