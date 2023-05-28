export type FormSentRequest = {
    name: string;
    preparation_time: string;
    spiciness_scale?: number|string;
    diameter?: number|string;
    no_of_slices?: number|string;
    slices_of_bread?: number|string;
    type: string;
}
export type FormResponse = FormSentRequest & {
    id: number;
}