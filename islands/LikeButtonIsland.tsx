import { useSignal } from "@preact/signals";
import Icon from "$components/ui/Icon.tsx";
import { invoke } from "deco-sites/brown-deco-camp/runtime.ts";
import { total } from "$sdk/useTotalLikes.ts";
import { useEffect } from "preact/hooks";
import { SendEventOnClick } from "deco-sites/brown-deco-camp/components/Analytics.tsx";
import { useId } from "deco-sites/brown-deco-camp/sdk/useId.ts";

export interface LikeButtonIslandProps {
  productID: string;
}

function LikeButtonIsland({ productID }: LikeButtonIslandProps) {
  const selected = useSignal(false);
  const quantity = useSignal(0);
  const id = useId();

  useEffect(() => {
    const updateTotals = async () => {
      const totalLikes = await invoke["deco-sites/brown-deco-camp"].loaders.totalLikesLoader();
      const totalLikesProduct = await invoke["deco-sites/brown-deco-camp"].loaders.totalLikesProductLoader({
        productID,
      });
      total.value = totalLikes.total;
      quantity.value = totalLikesProduct.product;
    };

    updateTotals();
    setInterval(updateTotals, 30000);
  });

  const handleToggleLike = async (e: MouseEvent) => {
    e.preventDefault();
    selected.value = true;

    await invoke["deco-sites/brown-deco-camp"].actions.sendLikesAction({
      productID: productID,
    });

    const totalLikes = await invoke["deco-sites/brown-deco-camp"].loaders.totalLikesLoader();
    total.value = totalLikes.total;
    const totalLikesProduct = await invoke["deco-sites/brown-deco-camp"].loaders.totalLikesProductLoader({ productID });
    quantity.value = totalLikesProduct.product;
  };

  return (
    <button
      id={id}
      class="absolute left-4 sm:left-auto sm:right-4 top-4 flex items-center justify-center gap-1 p-1 sm:p-2 rounded bg-neutral sm:bg-white min-w-14"
      onClick={(e) => handleToggleLike(e)}
    >
      {!selected.value ? (
        <Icon id="MoodSmile" width={24} height={24} />
      ) : (
        <Icon id="MoodCheck" width={24} height={24} />
      )}
      <span class={`min-w-4 text-center text-xs font-thin ${!selected.value ? "text-gray-500" : "text-secondary"}`}>
        {quantity.value}
      </span>

      <SendEventOnClick
        id={id}
        event={{
          name: "post_score",
          params: {
            score: quantity.value + 1,
            level: 5,
            character: String(productID),
          },
        }}
      />
    </button>
  );
}

export default LikeButtonIsland;
