import { useState } from "react";
import type { BeastData } from "../../api/beasts";
import * as beastsApi from "../../api/beasts";
import { useFetch } from "../../hooks/useFetch";
import { useSave } from "../../hooks/useSave";

export function useBeasts() {
    const [search, setSearch] = useState("");
    const {
        data: beasts,
        loading,
        error,
        setData: setBeasts,
    } = useFetch(() => beastsApi.getAll(search), [search]);
    const { saving, saveError, runSave } = useSave();

    function addBeast(data: BeastData) {
      return runSave(async () => {
        const created = await beastsApi.create(data);
        setBeasts([...(beasts ?? []), created]);
      }, "Could not save the weapon.");
    }

  return {
    beasts,
    loading,
    error,
    saving,
    saveError,
    search,
    setSearch,
    addBeast,
  };
}