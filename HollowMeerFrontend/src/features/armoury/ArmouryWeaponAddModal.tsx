import { useRef } from "react";
import { ArmouryWeaponForm } from "./ArmouryWeaponForm";
import "./Armoury.css"
import type { Weapon } from "../../types/Weapon";
import type { WeaponData } from "../../api/weapons";

type WeaponModalProps = {
    editingWeapon: Weapon | null;
    onAdd?: (data: WeaponData) => void;
    onUpdate?: (id: number, data: WeaponData) => void;
    setShow: (show: boolean) => void;
    show: boolean;
}

export default function WeaponAddModal({ editingWeapon, onAdd, onUpdate, setShow, show} : WeaponModalProps) {
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
                        <h1>Adding weapon</h1>
                        <div className="weapon-modal-form">
                            <ArmouryWeaponForm
                                editingWeapon={editingWeapon}
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