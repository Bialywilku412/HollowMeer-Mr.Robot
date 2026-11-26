import { useRef } from "react";
import { BeastAddForm } from "./BeastiaryAddForm";
import type { Beast } from "../../types/Beast";
import "../armoury/Armoury.css"
import type { BeastData } from "../../api/beasts";

type BeastModalProps = {
    editingBeast: Beast | null;
    onSave: (data: BeastData) => Promise<boolean>;
    setShow: (show: boolean) => void;
    show: boolean;
}

export default function BeastAddModal({ editingBeast, onSave, show, setShow} : BeastModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {show ? (
                <div className="weapon-modal-window" onClick={(e) => {
                    if (modalRef.current?.contains(e.target as Node)) {
                        return;
                    }
                    setShow(false);
                    }}
                >
                    <div className="weapon-modal parchment" ref={modalRef}>
                        <div className="weapon-modal-form">
                            <BeastAddForm
                                editingBeast={editingBeast}
                                onSave={onSave}
                            />
                        </div>
                        <button className="btn btn--ghost" onClick={() => setShow(false)}> close </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
