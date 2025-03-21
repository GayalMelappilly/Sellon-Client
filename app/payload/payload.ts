export interface FormDataPayload {
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | undefined;
    password: string | undefined;
    phone_number: string | undefined;
    role: string | undefined;
    address: string | undefined;
    avatar: string | undefined;
    status: string | undefined;
}

export interface LoginFormDataPayload {
    identifier: string;
    password: string;
}