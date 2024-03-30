import Image from "apps/website/components/Image.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import { Product } from "apps/commerce/types.ts";
import { formatPrice } from "$sdk/format.ts";
import { useOffer } from "$sdk/useOffer.ts";
import LikeButtonIsland from "$islands/LikeButtonIsland.tsx";

interface HorizontalProductCardProps {
  product: Product;
  animation?: boolean;
}

export const HorizontalProductCard = ({ product, animation }: HorizontalProductCardProps) => {
  const { productID, name, url, offers, isVariantOf, image: images } = product;

  const description = product.description || isVariantOf?.description;
  const { listPrice, price, seller } = useOffer(offers);

  const eventParams = {
    items: [{ item_url: url, quantity: 1, item_name: name! }],
  };

  const [image] = images ?? [];

  return (
    <div class={`flex items-center justify-between w-full px-4`}>
      <div class={"max-w-44 overflow-hidden"}>
        {image.url && (
          <Image
            src={image.url}
            width={175}
            height={115}
            loading="lazy"
            alt={name}
            class={"data-[scale=true]:hover:scale-125 transition-all data-[scale=true]:cursor-pointer"}
            data-scale={animation}
          />
        )}
      </div>

      <div class="ml-2 flex flex-col">
        <h2 class={"mb-2"}>{name}</h2>
        <p class={"text-xs mb-2"}>{description}</p>
        {listPrice && <p class={"line-through"}>De {formatPrice(listPrice, offers?.priceCurrency)}</p>}
        {price && <p class={"mb-5"}>{formatPrice(price, offers?.priceCurrency)}</p>}
        {price && <AddToCartButtonVTEX eventParams={eventParams} productID={productID} seller={seller ?? "1"} />}

        <div class="relative">
          <LikeButtonIsland productID={productID} />
        </div>
      </div>
    </div>
  );
};
