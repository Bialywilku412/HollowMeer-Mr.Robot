import { useRef } from "react";
import { BeastAddForm } from "./BeastiaryAddForm";
import type { Beast } from "../../types/Beast";
import "../armoury/Armoury.css"

type BeastModalProps = {
    editingBeast: Beast | null;
    onAdd?: (name: string, region: string, description: string, imageUrl: string) => void;
    onUpdate?: (beast: Beast) => void;
    setShow: (show: boolean) => void;
    show: boolean;
}

export default function BeastAddModal({ editingBeast, onAdd, onUpdate, show, setShow} : BeastModalProps) {
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
                                onAdd={onAdd}
                                onUpdate={onUpdate}
                                setShow={setShow}
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
