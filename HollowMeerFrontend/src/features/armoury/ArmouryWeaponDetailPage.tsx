import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as weaponsApi from "../../api/weapons";
import { type WeaponData } from "../../api/weapons";
import { useFetch } from "../../hooks/useFetch";
import "./Armoury.css"
import WeaponAddModal from "./ArmouryWeaponAddModal";

function ArmouryWeaponDetailPage()
{
    const { id } = useParams();
    const navigate = useNavigate();
    const {
            data: weapon,
            loading,
            error,
            setData: setWeapon
        } = useFetch(() => weaponsApi.getById(Number(id)), [id]);
        const [saveError, setSaveError] = useState<string | null>(null);
        const [showModal, setShowModal] = useState(false);

   
    async function updateWeapon(id: number, data: WeaponData) {
            try {
                const updated = await weaponsApi.update(id, data);
                setWeapon(updated);
                setShowModal(false);
                setSaveError(null);
            } catch (err) {
                setSaveError(
                    err instanceof Error ? err.message : "Could not save the weapon.",
                );
            }
        }
    
    async function deleteWeapon() {
           if (!weapon) return;
           try {
               await weaponsApi.remove(weapon.id);
               navigate("/armoury");
           } catch (err) {
               setSaveError(
                   err instanceof Error ? err.message : "Could not delete the weapon.",
               );
           }
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
                onUpdate={updateWeapon}
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
                    <button className="btn btn--danger" onClick={deleteWeapon}>delete</button>
                    <button className="btn" onClick={() => setShowModal(true)}>Edit</button>
                </div>
            </div>
        </>
    );
}

export default ArmouryWeaponDetailPage;