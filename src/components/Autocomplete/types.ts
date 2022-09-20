import { RefObject } from "react";

export interface Country {
  name: string;
  code: string;
}

export interface ListItemRefs {
  [key: number]: RefObject<HTMLLIElement>
}