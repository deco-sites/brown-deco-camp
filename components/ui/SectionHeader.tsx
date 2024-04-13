import { clx } from "../../sdk/clx.ts";

export interface Props {
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  alignment?: "center" | "left";
  colorReverse?: boolean;
}

const fontSizeClasses = {
  Small: "lg:text-base",
  Normal: "lg:text-2xl",
  Large: "lg:text-2xl",
};

function Header(props: Props) {
  return (
    <>
      {props.title || props.description ? (
        <div class={`flex flex-col gap-1 ${props.alignment === "left" ? "text-left" : "text-center"}`}>
          {props.title && (
            <h1
              class={clx(
                "text-2xl font-light leading-8 lg:leading-10",
                props.colorReverse ? "text-primary-content" : "text-base-content",
                fontSizeClasses[props.fontSize || "Normal"]
              )}
            >
              {props.title}
            </h1>
          )}
          {props.description && (
            <h2
              class={clx(
                `leading-6 lg:leading-8 ${fontSizeClasses.Small}`,
                props.colorReverse ? "text-primary-content" : "text-base-content"
              )}
            >
              {props.description}
            </h2>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Header;
