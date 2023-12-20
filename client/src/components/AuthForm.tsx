import { MainTypes } from "../App";
import movieIcon from "../assets/movieIcon.svg";

import {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";

interface Types {
  formType: string;
  setFormType: (value: string) => void;
  getValues: UseFormGetValues<MainTypes>;
  register: UseFormRegister<MainTypes>;
  signUp: () => Promise<void>;
  signIn: () => Promise<void>;
  reset: UseFormReset<MainTypes>;
  errors: FieldErrors<MainTypes>;
  handleSubmit: UseFormHandleSubmit<MainTypes, undefined>;
}

const AuthForm = ({
  handleSubmit,
  formType,
  setFormType,
  getValues,
  register,
  signUp,
  signIn,
  reset,
  errors,
}: Types) => {
  const onSubmit = async () => {
    if (getValues("email") && getValues("password"))
      try {
        if (formType === "signUp") {
          await signUp();
        } else if (formType === "signIn") {
          await signIn();
        }
        reset();
      } catch (error) {
        console.error("SignUp failed:", error);
      }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col mt-12 items-center gap-[58.4px] text-[15px] px-6 md:gap-[72.4px] md:mt-20"
    >
      <img className="w-8 h-auto" src={movieIcon} alt="movies icon" />
      <div className="text-white bg-[#161D2F] p-6 w-full rounded-[10px] max-w-[400px] md:p-8">
        <h2 className="text-[32px] tracking-[-0.05px]">
          {formType === "signUp" ? "Sign Up" : "Login"}
        </h2>
        <div className="my-10 flex flex-col gap-6">
          <div className="relative">
            <input
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email address",
                },
              })}
              className={`bg-[#161D2F] outline-0 border-b-[1px] ${
                errors.email?.message
                  ? "border-b-[#FC4747]"
                  : "border-b-[#5A698F]"
              } pb-[18px] pl-4 w-full`}
              type="email"
              placeholder="Email address"
            />
            {errors.email?.message && (
              <p className="text-[#FC4747] absolute right-0 top-0">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Minimum length is 5",
                },
              })}
              className={`bg-[#161D2F] outline-0 border-b-[1px] ${
                errors.email?.message
                  ? "border-b-[#FC4747]"
                  : "border-b-[#5A698F]"
              } pb-[18px] pl-4 w-full`}
              type="password"
              placeholder="Password"
            />
            {errors.password?.message && (
              <p className="text-[#FC4747] absolute right-0 top-0">
                {errors.password.message}
              </p>
            )}
          </div>
          {formType === "signUp" && (
            <div className="relative">
              <input
                {...register("repeatPassword", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                className={`bg-[#161D2F] outline-0 border-b-[1px] ${
                  errors.email?.message
                    ? "border-b-[#FC4747]"
                    : "border-b-[#5A698F]"
                } pb-[18px] pl-4 w-full`}
                type="password"
                placeholder="Repeat Password"
              />
              {errors.repeatPassword?.message && (
                <p className="text-[#FC4747] absolute right-0 top-0">
                  {errors.repeatPassword?.message}
                </p>
              )}
            </div>
          )}
        </div>
        <button className="bg-[#FC4747] rounded py-[14px] w-full mb-6">
          {formType === "signUp"
            ? "Create an account"
            : "Login to your account"}
        </button>
        <p className="text-center">
          {formType === "signUp"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            onClick={() => {
              setFormType(`${formType === "signUp" ? "signIn" : "signUp"}`);
              reset();
            }}
            className="text-[#FC4747] ml-2"
          >
            {formType === "signUp" ? "Login" : "Sign Up"}
          </span>{" "}
        </p>
      </div>
    </form>
  );
};

export default AuthForm;
