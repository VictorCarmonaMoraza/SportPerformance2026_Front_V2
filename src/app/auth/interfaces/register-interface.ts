
export namespace RegisterResponse {

  export interface Register {
    data: Data;
    message: string;
    status: number;
  }

  export interface Data {
    email: string;
    nameuser: string;
  }

}
