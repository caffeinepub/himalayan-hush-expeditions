import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    contactPerson: string;
    email: string;
    curriculumBoard: string;
    preferredDates: string;
    message: string;
    phone: string;
    groupSize: bigint;
    schoolName: string;
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    submitInquiry(schoolName: string, contactPerson: string, email: string, phone: string, preferredDates: string, groupSize: bigint, curriculumBoard: string, message: string): Promise<void>;
}
