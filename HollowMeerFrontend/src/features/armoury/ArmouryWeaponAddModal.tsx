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
                    <div className="weapon-modal" style={{ backgroundColor: "gray"}} ref={modalRef}>
                        <h1>Adding weapon</h1>
                        <div className="weapon-modal-form">
                            <ArmouryWeaponForm
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