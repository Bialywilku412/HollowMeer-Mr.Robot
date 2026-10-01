import { useRef } from "react";
import { ArmouryWeaponForm } from "./ArmouryWeaponForm";
import "./Armoury.css"

export default function WeaponAddModal({ show, setShow, onAdd }) {
    const modalRef = useRef(null);

    return (
        <>
            {show ? (
                <div className="weapon-modal-window" onClick={(e) => {
                    if (modalRef.current.contains(e.target)) {
                        return;
                    }
                    setShow(false);
                    }}
                >
                    <div style={{ backgroundColor: "purple"}} ref={modalRef}>
                        <h1>My modalRef</h1>
                        <ArmouryWeaponForm
                            onAdd={onAdd}
                        />
                        <button onClick={() => setShow(false)}> close </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}