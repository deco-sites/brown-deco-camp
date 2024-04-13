import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { ProductCardFlagProps } from "deco-sites/brown-deco-camp/flags/multivariate/productCardFlag.ts";
import AddToCartButtonVTEX from "deco-sites/brown-deco-camp/islands/AddToCartButton/vtex.tsx";
import LikeButtonIsland from "deco-sites/brown-deco-camp/islands/LikeButtonIsland.tsx";
import { useOffer } from "deco-sites/brown-deco-camp/sdk/useOffer.ts";
import { formatCurrency } from "deco-sites/brown-deco-camp/utils/formatCurrency.ts";

export interface HorizontalProductCardProps {
  /**
   * @title Produtos
   */
  products: ProductCardFlagProps;
  animateImage: boolean;
}

export function ErrorFallback({ error }: { error?: Error }) {
  console.log("error HorizontalProductCard: ", error);

  return (
    <div class="w-full max-w-5xl px-4 mx-auto py-8 lg:py-10 flex flex-col gap-8 lg:gap-10">
      <a
        href="/culturas"
        aria-label={`Ver página Culturas`}
        class="flex gap-2 sm:gap-4 md:gap-8 p-2 sm:p-4 md:p-6 rounded-xl bg-neutral-content"
      >
        <div class={`w-40 md:w-48 h-40 md:h-48 flex justify-center items-center overflow-hidden rounded`}>
          <img
            loading="lazy"
            width="200"
            height="279"
            src="/image/banner-fallback.png"
            alt="Imagem de cerâmica"
            class="duration-300 hover:scale-110"
          />
        </div>

        <div class="flex flex-col gap-3 sm:gap-4 md:gap-8 flex-1 ">
          <h2 class="line-clamp-2 md:line-clamp-3 text-base md:text-lg text-base-content uppercase font-normal">
            Cerâmica indígena
          </h2>
          <span class="line-clamp-1 md:line-clamp-3 text-base-content text-xs md:text-sm font-light">
            Venha ver a arte da cultura indígena brasileiras, que traz lindas peças de cerâmica para alegrar sua casa
          </span>
          <button class="btn btn-block max-w-48 mt-auto">Para saber mais</button>
        </div>
      </a>
    </div>
  );
}

export function LoadingFallback() {
  const skeleton = {
    background: "linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%)",
    backgroundSize: "1000px 100%",
  };

  return (
    <div class="w-full max-w-5xl px-4 mx-auto py-8 lg:py-10 flex flex-col gap-8 lg:gap-10">
      <div class="flex gap-2 sm:gap-4 md:gap-8 p-2 sm:p-4 md:p-6 rounded-xl bg-neutral-content">
        <div style={skeleton} class="animate-pulse bg-animation w-40 md:w-48 h-40 md:h-48 rounded bg-gray-300" />

        <div class="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-8 flex-1 ">
          <div class="flex flex-col gap-1 md:gap-8 flex-1">
            <h2 style={skeleton} class="h-12 md:h-7 w-full animate-pulse rounded" />
            <span style={skeleton} class="h-4 md:h-5 w-full animate-pulse rounded" />
          </div>

          <div class="flex flex-col gap-1 md:gap-8 md:pl-8 md:border-l md:border-solid md:border-gray-300">
            <div class="flex flex-col gap-1">
              <span style={skeleton} class="h-5 w-44 animate-pulse rounded hidden md:inline-flex" />
              <span style={skeleton} class="h-5 max-w-48 w-full md:max-w-none md:w-44 animate-pulse rounded" />
            </div>

            <div class="flex flex-col gap-2 mt-auto max-w-48 md:max-w-none">
              <span style={skeleton} class="h-12 max-w-48 w-full md:max-w-none md:w-44 animate-pulse rounded" />
              <span style={skeleton} class="h-12 w-44 animate-pulse rounded hidden md:inline-flex" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HorizontalProductCard({ animateImage, products }: HorizontalProductCardProps) {
  if (!products?.length) {
    return ErrorFallback({ error: new Error("Sem produtos para renderizar") });
  }

  return (
    <div class="w-full max-w-5xl px-4 mx-auto py-8 lg:py-10 flex flex-col gap-8 lg:gap-10">
      {products.map((product: any) => {
        const productID = product.productID;
        const url = product.url;
        const image = product.image?.[0];
        const name = product.name;
        const description = product.description;
        const { listPrice, price } = useOffer(product.offers);

        if (!productID) {
          return ErrorFallback({ error: new Error("Produto sem ID") });
        }
        if (!url) return ErrorFallback({ error: new Error("Produto sem URL") });
        if (!name) {
          return ErrorFallback({ error: new Error("Produto sem nome") });
        }

        const eventItem = mapProductToAnalyticsItem({
          product,
          breadcrumbList: undefined,
          price,
          listPrice,
        });

        return (
          <a
            key={`horizontal-product-card-${productID}`}
            href={url}
            aria-label={`Ver produto ${name}`}
            class="flex gap-2 sm:gap-4 md:gap-8 p-2 sm:p-4 md:p-6 rounded-xl bg-neutral-800 relative"
          >
            {!!image && (
              <div class={`w-40 md:w-48 h-40 md:h-48 flex justify-center items-center overflow-hidden rounded`}>
                <Image
                  width={200}
                  height={279}
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={image.url!}
                  alt={image.alternateName}
                  decoding="async"
                  loading="lazy"
                  class={`duration-300 ${animateImage ? "hover:scale-110" : ""}`}
                />
              </div>
            )}

            {!image && <div class="w-40 md:w-48 h-40 md:h-48 rounded bg-neutral-50" />}

            <div class="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-8 flex-1 ">
              <div class="flex flex-col gap-1 md:gap-8 flex-1 sm:pr-20 md:pr-0">
                <h2 class="line-clamp-2 md:line-clamp-3 text-base md:text-lg text-base-content uppercase font-normal">
                  {name}
                </h2>
                {!!description && (
                  <span class="line-clamp-1 md:line-clamp-3 text-base-content text-xs md:text-sm font-light">
                    {description}
                  </span>
                )}
              </div>

              <div class="flex flex-col gap-1 md:gap-8 md:pl-8 md:border-l md:border-solid md:border-gray-300">
                <div class="flex flex-col gap-1">
                  {!!listPrice && (
                    <span class="line-through text-sm hidden md:inline-flex">{formatCurrency(listPrice)}</span>
                  )}
                  {!!price && <span class="text-sm text-primary">{formatCurrency(price)}</span>}
                </div>

                {!price && <span class="text-sm">Indisponível</span>}

                <div class="flex flex-col gap-2 mt-auto max-w-48 md:max-w-none">
                  {!!price && (
                    <AddToCartButtonVTEX eventParams={{ items: [eventItem] }} productID={productID} seller={"1"} />
                  )}
                  <button class="btn btn-block hidden md:inline-flex">Ver produto</button>
                </div>
              </div>
            </div>

            <LikeButtonIsland productID={productID} />
          </a>
        );
      })}
    </div>
  );
}
