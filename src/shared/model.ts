export class Region implements Unique {
    id: string;
    name: string;
    description: string;
    zone: Zone = new Zone();
}

export class Zone {
    center: Location = new DefaultLocation();
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

export class DefaultLocation extends Location {
    constructor() {
        super(51.500390404939786, -0.12429392429589825) // BigBen
    }
}

export class Promotion implements Unique {
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

export class Company implements Unique {
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
    location: Location = new DefaultLocation()
}

export class ServiceProvider implements Unique {
    id: string;
    regionId: string;
    profileId: string;
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

export interface Unique {
    id: string
}