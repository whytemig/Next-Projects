"use server";

export const loginAction = (values: { email: string; password: string }) => {
  console.log("server action working ", values);
};
