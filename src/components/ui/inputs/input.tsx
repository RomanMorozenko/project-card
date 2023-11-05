import { ComponentPropsWithoutRef, forwardRef, useState } from "react";

import clsx from "clsx";

import s from "./inputs.module.scss";

import { EyeNoneIcon } from "@/assets/components/eyeNoneIcon.tsx";
import { EyeOpenIcon } from "@/assets/components/eyeOpenIcon.tsx";
import { SearchIcon } from "@/assets/components/searchIcon.tsx";
import { Typography } from "@/components/ui/typography";

export type InputProps = {
  label?: string;
  errorMessage?: string;
} & ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref): JSX.Element => {
    const { type, label, errorMessage, className, disabled, ...res } = props;

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const inputClassName = clsx(
      s.input,
      type === "search" && s.search,
      errorMessage && s.error,
    );

    const inputType = getInputType(type, showPassword);

    return (
      <div className={clsx(s.inputBlock, className)}>
        <Typography variant={"body2"} as={"span"} className={s.label}>
          {type === "search" ? "" : label}
        </Typography>
        <div className={s.buttonBlock}>
          {type === "password" && (
            <button
              className={s.eyeButton}
              disabled={disabled}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeNoneIcon />
              ) : (
                <EyeOpenIcon disabled={disabled} />
              )}
            </button>
          )}
        </div>
        <div className={s.root}>
          {type === "search" && <SearchIcon />}
          <input
            ref={ref}
            className={inputClassName}
            disabled={disabled}
            type={inputType}
            {...res}
          />
        </div>
        <Typography variant={"caption"} as={"span"} className={s.labelError}>
          {errorMessage}
        </Typography>
      </div>
    );
  },
);
const getInputType = (
  type: ComponentPropsWithoutRef<"input">["type"],
  showPassword: boolean,
) => {
  if (type === "search") return "search";
  if (type === "password" && !showPassword) return "password";

  return type;
};
