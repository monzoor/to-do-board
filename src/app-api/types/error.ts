interface Error {
  message: string;
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

export type ErrorResponse = Error | undefined | any;
