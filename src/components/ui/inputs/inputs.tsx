import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  ReactNode,
  useState,
} from "react";
import s from "./inputs.module.scss";
import {EyeOpenIcon} from "@/assets/components/eyeOpenIcon.tsx";
import {EyeNoneIcon} from "@/assets/components/eyeNoneIcon.tsx";
import {SearchIcon} from "@/assets/components/searchIcon.tsx";
import {SearchIconFocus} from "@/assets/components/searchIconFocus.tsx";
import clsx from "clsx";

export type InputProps<T extends ElementType = "input"> = {
  variant?: "default" | "toggle" | "search";
  type: "text" | "search" | "password";
  text?: string;
  label?: string;
  error?: string;
  children?: ReactNode
  disabled?: boolean;
  placeholder?: string;
  errorMessage?: string;
} & ComponentPropsWithoutRef<T>;

export const Inputs = forwardRef<HTMLInputElement, InputProps>(
  (props, ref): JSX.Element => {
    const {
      onChange, onBlur, type, error, className,
      disabled, label, children, placeholder,
      variant = "default", onKeyDown, errorMessage, ...res
    } = props;

    const [value, setValue] = useState<string>("");
    const [focus, setFocus] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      setValue(e.currentTarget.value);
      setFocus(true)
    };

    const classname = clsx(variant === "search" && !errorMessage && s.searchInput,
      errorMessage && variant === "search" && s.searchInput + " " + s.error,
      errorMessage && (variant === "default" || variant === "toggle") && s.input + " " + s.error, s.input, className)

    const handler = (e: FocusEvent) => {
      e.preventDefault()
      setFocus(!focus)
    };
    const onBlurHandler = () => {
      setFocus(false)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        onKeyDown?.(e);
      }
    };

    return (
      <div className={s.inputBlock}>
        <span className={s.label}>{variant === "search" ? "" : label}</span>
        <div className={s.buttonBlock}>
          {type === 'password' &&
              <button className={s.eyeButton} disabled={disabled}
                      onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeNoneIcon/> :
                  <EyeOpenIcon disabled={disabled}/>}
              </button>}
          {type === 'search' &&
              <div className={s.search}>
                {!focus ? <SearchIcon/> : <SearchIconFocus/>}
              </div>}
        </div>
        <div className={s.root}>
          <input
            tabIndex={0}
            onFocus={handler}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            ref={ref}
            value={value}
            className={classname}
            placeholder={placeholder}
            disabled={disabled}
            type={type === 'password' && !showPassword ? 'password' : type === 'search' ? 'search' : 'text'}
            onKeyDown={onKeyPressHandler}
            {...res}
          />
        </div>
        <span className={s.labelError}>{errorMessage}</span>
      </div>
    );
  }
);
