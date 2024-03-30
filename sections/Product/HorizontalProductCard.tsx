import type { Product } from "apps/commerce/types.ts";
import { HorizontalProductCard } from "$components/product/HorizontalProductCard.tsx";
import { asset } from "$fresh/runtime.ts";
import { clx } from "deco-sites/brown-deco-camp/sdk/clx.ts";

export type maxWidth =
  | "max-w-xl"
  | "max-w-2xl"
  | "max-w-3xl"
  | "max-w-4xl"
  | "max-w-5xl"
  | "max-w-6xl"
  | "max-w-7xl"
  | "max-w-full";

export interface HorizontalProductSectionProps {
  products: Product[] | null;
  animation?: boolean;
  larguraMax?: maxWidth;
}

export function loader(props: HorizontalProductSectionProps, _req: Request) {
  return props;
}

const HorizontalProductSection = ({ products, animation, larguraMax }: HorizontalProductSectionProps) => {
  if (!products?.length) return null;

  return (
    <div class={clx("flex items-center justify-center gap-x-4 flex-wrap my-4 w-full mx-auto", larguraMax)}>
      {products.map((product) => (
        <HorizontalProductCard animation={animation} product={product} />
      ))}
    </div>
  );
};

export function LoadingFallback() {
  // Renderer spinners, skeletons and other placeholder
  return (
    <div class="container flex justify-center py-4">
      <div class="flex max-sm:flex-col gap-2">
        <div class="skeleton h-44 w-44 shrink-0 rounded-none"></div>
        <div class="flex flex-col w-[213px]">
          <div class="skeleton h-6 mb-2 rounded-none"></div>
          <div class="skeleton h-4 mb-2 rounded-none"></div>
          <div class="skeleton h-4 rounded-none mb-2"></div>
          <div class="skeleton h-6 mb-5 rounded-none"></div>
          <div class="skeleton h-12 w-full rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function ErrorFallback({ error: _error }: { error?: Error }) {
  return (
    <div class="flex flex-col mx-auto max-w-96">
      <img
        class={"mb-2"}
        src={asset("https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2021/03/juliette-fiuk-cuscuz.jpg")}
        alt={"Error"}
        height={400}
        width={400}
      />
      <p class={"mb-2"}>{_error?.message}</p>
      <a
        href="/cultura"
        class="btn btn-block bg-transparent hover:bg-primary border border-white hover:border-transparent"
      >
        Para Saber mais
      </a>
    </div>
  );
}

export default HorizontalProductSection;
