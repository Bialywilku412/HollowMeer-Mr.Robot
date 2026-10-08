import { useRef } from "react";
import { BeastWeaponForm } from "./BeastiaryAddForm";
import "../armoury/Armoury.css"

export default function BeastAddModal({ show, setShow, onAdd }) {
    const modalRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {show ? (
                <div className="weapon-modal-window" onClick={(e) => {
                    if (modalRef.current?.contains(e.target)) {
                        return;
                    }
                    setShow(false);
                    }}
                >
                    <div className="weapon-modal" style={{ backgroundColor: "gray"}} ref={modalRef}>
                        <h1>Adding Beast</h1>
                        <div className="weapon-modal-form">
                            <BeastWeaponForm
                                onAdd={onAdd}
                                setShow={setShow}
                            />
                        </div>
                        <button className="close-btn" onClick={() => setShow(false)}> close </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
