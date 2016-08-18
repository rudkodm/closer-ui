export class Region {
    id:string;
    name:string;
    description:string;
    zone:Zone = new Zone();
}

export class Zone {
    center:ZoneCenter = new ZoneCenter();
    radius:number;
}

export class ZoneCenter {
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
    location: Location
}

export class Service {
    id: string;
    regionId: string;
    businessCategory: string;
    addressDetails: AddressDetails;
    contactDetails: ContactDetails;
}