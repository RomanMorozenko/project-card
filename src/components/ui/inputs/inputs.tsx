import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  KeyboardEvent,
  useState,
} from "react";

import eyeNone from "./img/eye-none.svg";
import eyeOpenDisabled from "./img/eye-open-disabled.svg";
import eyeOpen from "./img/eye-open.svg";
import searchIconFocus from "./img/magnifying-glass-focus.svg";
import searchIcon from "./img/magnifying-glass.svg";
import s from "./inputs.module.scss";

export type InputProps<T extends ElementType = "input"> = {
  variant?: "default" | "toggle" | "search";
  type: "text" | "search" | "password";
  text?: string;
  label?: string;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  errorMessage?: string;
} & ComponentPropsWithoutRef<T>;

// any because with return type of JSXElement appears an error Property 'children' is missing in type 'Element' but required in type 'ReactPortal'
export const Inputs = forwardRef<HTMLInputElement, InputProps>(
  (props, ref): any => {
    const {
      onChange,
      onBlur,
      type = "text",
      error,
      disabled,
      label,
      placeholder,
      variant = "default",
      onKeyDown,
      errorMessage,
      ...res
    } = props;

    const [value, setValue] = useState<string>("");
    const [typeInput, setTypeInput] = useState(type);
    const [focus, setFocus] = useState<boolean>(false);

    const showHandler = () => {
      setTypeInput(typeInput === "password" ? "text" : "password");
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      setValue(e.currentTarget.value);
    };

    const result =
      variant === "search" && !errorMessage
        ? s.searchInput
        : errorMessage && variant === "search"
        ? s.searchInput + " " + s.error
        : errorMessage && (variant === "default" || variant === "toggle")
        ? s.input + " " + s.error
        : s.input;

    // const result =
    //   variant === 'search' && !error
    //     ? s.searchInput
    //     : error && variant === 'search'
    //       ? s.searchInput + ' ' + s.error
    //       : (error && (variant === 'default' || variant === 'toggle'))
    //         ? s.input + ' ' + s.error
    //         : s.input;

    const handler = () => setFocus((focus) => !focus);
    const onBlurHandler = () => {
      setFocus(false);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        onKeyDown?.(e);
      }
    };

    const iconToRender = () => {
      if (variant === "default" || variant === "search") {
        return "";
      } else if (disabled) {
        return (
          <img
            src={eyeOpenDisabled}
            alt="eye-open"
            className={s.eyeOpenIcon}
            onClick={showHandler}
          />
        );
      } else if (typeInput === "password") {
        return (
          <img
            src={eyeNone}
            alt="eye-closed"
            className={s.eyeOpenIcon}
            onClick={showHandler}
          />
        );
      } else {
        return (
          <img
            src={eyeOpen}
            alt="eye-open"
            className={s.eyeOpenIcon}
            onClick={showHandler}
          />
        );
      }
    };

    const searchIconToRender = () => {
      if (variant === "search" && focus) {
        return (
          <img src={searchIconFocus} alt="search-icon" className={s.search} />
        );
      } else if (variant === "search") {
        return <img src={searchIcon} alt="search-icon" className={s.search} />;
      } else {
        return "";
      }
    };

    return (
      <div className={s.inputBlock}>
        <span className={s.label}>{variant === "search" ? "" : label}</span>
        <div className={s.inputImages}>
          {/* {variant === "default" || variant === "search" ? (
            ""
          ) : disabled ? (
            <img
              src={eyeOpenDisabled}
              alt="eye-open"
              className={s.eyeOpenIcon}
              onClick={showHandler}
            />
          ) : typeInput === "password" ? (
            <img
              src={eyeNone}
              alt="eye-closed"
              className={s.eyeOpenIcon}
              onClick={showHandler}
            />
          ) : (
            <img
              src={eyeOpen}
              alt="eye-open"
              className={s.eyeOpenIcon}
              onClick={showHandler}
            />
          )} */}
          {/* !!!! Implemented a func instead of code above */}
          {iconToRender()}
          {/* {variant === "search" && focus ? (
            <img src={searchIconFocus} alt="search-icon" className={s.search} />
          ) : variant === "search" ? (
            <img src={searchIcon} alt="search-icon" className={s.search} />
          ) : (
            ""
          )} */}
          {/* !!!! Implemented a func instead of code above */}
          {searchIconToRender()}
        </div>
        <div className={s.root}>
          <input
            tabIndex={0}
            onFocus={handler}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            ref={ref}
            value={value}
            className={result}
            placeholder={placeholder}
            disabled={disabled}
            type={typeInput}
            onKeyDown={onKeyPressHandler}
            {...res}
          />
        </div>
        <span className={s.labelError}>{errorMessage}</span>
      </div>
    );
  }
);
