import { useState } from "react";
import type { BeastData } from "../../api/beasts";
import * as beastsApi from "../../api/beasts";
import { useFetch } from "../../hooks/useFetch";
import { useSave } from "../../hooks/useSave";

export function useBeast(id: number) {
    const {
        data: beast,
        loading,
        error,
        setData: setBeast,
    } = useFetch(() => beastsApi.getById(id), [id]);
    const [showModal, setShowModal] = useState(false);
    const { saving, saveError, runSave } = useSave();

    function updateBeast(data: BeastData) {
        return runSave(async () => {
            const updated = await beastsApi.update(id, data);
            setBeast(updated);
        }, "Could not save the weapon.");
    }

  function deleteBeast() {
    return runSave(async () => {
      await beastsApi.remove(id);
    }, "Could not delete the weapon.");
  }

  return {
    beast,
    loading,
    error,
    saving,
    saveError,
    updateBeast,
    deleteBeast,
    showModal,
    setShowModal
  };
}