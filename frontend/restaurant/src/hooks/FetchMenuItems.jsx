import React, { useState } from "react";
import { useRecoilState } from "recoil";
import menuItemsAtom from "../atoms/menuItemsAtom";
import useShowToast from "./useShowToast";

const FetchMenuItems = () => {
  const [menuItems, setMenuItems] = useRecoilState(menuItemsAtom);
  const showToast = useShowToast();

  const fetchMenuItemsData = async () => {
    try {
      const res = await fetch("/api/menu-items/get-menu-items");
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      setMenuItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  return fetchMenuItemsData;
};

export default FetchMenuItems;
