import { useState } from "react";
import type { WeaponData } from "../../api/weapons";
import * as weaponsApi from "../../api/weapons";
import { useFetch } from "../../hooks/useFetch";
import { useSave } from "../../hooks/useSave";

export function useWeapons() {
    const [search, setSearch] = useState("");
    const {
        data: weapons,
        loading,
        error,
        setData: setWeapons,
    } = useFetch(() => weaponsApi.getAll(search), [search]);
    const { saving, saveError, runSave } = useSave();

    function addWeapon(data: WeaponData) {
      return runSave(async () => {
        const created = await weaponsApi.create(data);
        setWeapons([...(weapons ?? []), created]);
      }, "Could not save the weapon.");
    }

  return {
    weapons,
    loading,
    error,
    saving,
    saveError,
    search,
    setSearch,
    addWeapon,
  };
}