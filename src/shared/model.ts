export class Region {
    id: string;
    name: string;
    description: string;
    zone: Zone = new Zone();
}

export class Zone {
    constructor(lat?: number, lng?: number, rad?: number) {
        this.center = new Location(lat, lng);
        this.radius = rad;
    }

    center: Location;
    radius: number;
}

export class Location {
    constructor(lat?: number, lng?: number) {
        this.latitude = lat;
        this.longitude = lng;
    }

    latitude: number;
    longitude: number;
}

export class Promotion {
    id: string;
    serviceId: string;
    promoCode: string;
    media: string;
    title: string;
    expirationDateTime: Date;
    shortDescription: string;
    fullDescription: string;
    rule: Rule = new Rule();
}

export class Rule {
    description: string;
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