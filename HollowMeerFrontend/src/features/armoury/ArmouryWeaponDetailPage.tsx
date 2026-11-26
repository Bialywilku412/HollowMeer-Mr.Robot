import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { type WeaponData } from "../../api/weapons";
import WeaponAddModal from "./ArmouryWeaponAddModal";
import { useWeapon } from "./useWeapon";
import "./Armoury.css"

function ArmouryWeaponDetailPage()
{
    const { id } = useParams();
    const navigate = useNavigate();
    const {
            weapon,
            loading,
            error,
            saveError,
            updateWeapon,
            deleteWeapon
        } = useWeapon(Number(id));
    const [showModal, setShowModal] = useState(false);
        
    async function handleDelete() {
        const response = await deleteWeapon();
        if (response) navigate("/armoury");
    }

    async function handleUpdate(data: WeaponData) {
        const response = await updateWeapon(data);
        if (response) setShowModal(false);
        return response;
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error || !weapon) {
        return <p>{error ?? "Weapon not found."}</p>;
    }

    return(
        <>
            <WeaponAddModal
                show={showModal}
                setShow={setShowModal}
                editingWeapon={weapon}
                onSave={handleUpdate}
            />
            <div className="parchment">
                <h2>{weapon.name}</h2>
                {saveError && <p className="form-error">{saveError}</p>}
                <dl className="weapon-stats">
                    <dt>Type</dt> <dd>{weapon.weaponType.name}</dd>
                    <dt>Condition</dt> <dd>{weapon.weaponCondition.name}</dd>
                    <dt>Dangerous</dt> <dd>{weapon.isDangerous ? "yes" : "no"}</dd>
                    <dt>Note</dt> <dd>{weapon.note}</dd>
                </dl>
                <div className="detail-actions">
                    <Link className="btn" to="/armoury">Back to weapons</Link>
                    <button className="btn btn--danger" onClick={handleDelete}>delete</button>
                    <button className="btn" onClick={() => setShowModal(true)}>Edit</button>
                </div>
            </div>
        </>
    );
}

export default ArmouryWeaponDetailPage;