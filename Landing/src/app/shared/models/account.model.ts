export class AccountOutput {
    name: string;
    lastName: string;
    email: string;
    code: string;
    pesel: string;
    isOrganDonor: boolean;
}

export class DiseasesOutput {
    name: string;
}

export class DiseasesInput {
    id: number;
    name: string;
    appUserID: number;
}

export class AllergiesOutput {
    name: string;
    type: string;
}

export class AllergiesInput {
    id: number;
    name: string;
    type: string;
    appUserID: number;
}

export class ContactsOutput {
    phoneNumber: number;
    contactPersonRole: string;
    optionalName: string;
}

export class ContactsInput {
    id: number;
    phoneNumber: number;
    contactPersonRole: string;
    appUserID: number;
    optionalName: string;
}

export class MedicationsOutput {
    name: string;
    portion: number;
    howOften: string;
}

export class MedicationsInput {
    id: number;
    name: string;
    portion: number;
    howOften: string;
    appUserID: number;
}

export class VaccinationsOutput {
    name: string;
    date: string;
}

export class VaccinationsInput {
    id: number;
    name: string;
    date: string;
    appUserID: number;
}

export class BloodTypeOutput {
    type: string;
    factor: string;
}

export class BloodTypeInput {
    id: number;
    type: string;
    factor: string;
    appUserID: number;
}

export class EmailOutput {
    exists: boolean;
}

export class OrganDonorOutput {
    isOrganDonor: boolean;
}

export class CodeOutput {
    exists: boolean;
}

export class InformationOutput {
    name: string;
    email: string;
}

export class CardBase64 {
    base64Code: string;
}


