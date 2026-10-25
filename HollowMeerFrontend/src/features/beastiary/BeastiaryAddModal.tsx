import { useRef } from "react";
import { BeastAddForm } from "./BeastiaryAddForm";
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
                    <div className="weapon-modal parchment" ref={modalRef}>
                        <h1>Adding Beast</h1>
                        <div className="weapon-modal-form">
                            <BeastAddForm
                                onAdd={onAdd}
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
