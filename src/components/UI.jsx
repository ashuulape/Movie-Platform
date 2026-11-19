import React from "react";

export const Button = ({
  variant = "secondary",
  className = "",
  ...props
}) => (
  <button
    className={`ui-button ui-button--${variant} ${className}`.trim()}
    {...props}
  />
);

export const Input = ({ className = "", ...props }) => (
  <input className={`ui-input ${className}`.trim()} {...props} />
);
