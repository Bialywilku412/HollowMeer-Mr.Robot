import { useState } from "react";
import type { WeaponData } from "../../api/weapons";
import * as weaponsApi from "../../api/weapons";
import { useFetch } from "../../hooks/useFetch";
import { useSave } from "../../hooks/useSave";

export function useWeapon(id: number) {
    const {
        data: weapon,
        loading,
        error,
        setData: setWeapon,
    } = useFetch(() => weaponsApi.getById(id), [id]);
    const [showModal, setShowModal] = useState(false);
    const { saving, saveError, runSave } = useSave();

    function updateWeapon(data: WeaponData) {
        return runSave(async () => {
            const updated = await weaponsApi.update(id, data);
            setWeapon(updated);
        }, "Could not save the weapon.");
    }

  function deleteWeapon() {
    return runSave(async () => {
      await weaponsApi.remove(id);
    }, "Could not delete the weapon.");
  }

  return {
    weapon,
    loading,
    error,
    saving,
    saveError,
    updateWeapon,
    deleteWeapon,
    showModal,
    setShowModal
  };
}