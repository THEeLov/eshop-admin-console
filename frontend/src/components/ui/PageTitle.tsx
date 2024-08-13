import { cn } from "../../utils";
import { FC } from "react";

type PageTitleProps = JSX.IntrinsicElements["h2"];

const PageTitle: FC<PageTitleProps> = (props) => {
  const { children, className, ...otherProps } = props;

  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...otherProps}
    >
      {children}
    </h2>
  );
};

export default PageTitle;
