import { useState } from "react";

export function useSave() {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function runSave(action: () => Promise<void>, fallback: string): Promise<boolean> {
    setSaving(true);
    setSaveError(null);
    try {
      await action();
      return true;
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : fallback);
      return false;
    } finally {
      setSaving(false);
    }
  }

  return { saving, saveError, runSave };
}