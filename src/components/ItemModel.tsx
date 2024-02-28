import { ShoppingItem } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { api } from "~/utils/api";

interface ItemModelProps {
  setModelOpen: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<ShoppingItem[]>>;
}

const ItemModel: FC<ItemModelProps> = ({ setModelOpen, setItems }) => {
  const [input, setInput] = useState<string>("");

  const { mutate: create } = api.post.create.useMutation({
    onSuccess(shoppingItem) {
      setItems((prev) => [...prev, shoppingItem]);
    },
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="space-y-4 bg-white p-3">
        <h3 className="text-xl font-semibold"> Name of Item</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="focus:border-vilet-300 w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:ring focus:ring-violet-50"
        />
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600"
            onClick={() => setModelOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-gray-500 p-2 text-xs text-white transition hover:bg-violet-600"
            onClick={() => {
              create({ name: input });
              setModelOpen(false);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModel;
