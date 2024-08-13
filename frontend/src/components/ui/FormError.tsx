import { cn } from "../../utils";
import { HTMLAttributes, forwardRef } from "react";

const FormError = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  if (!children) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
});

export default FormError;
