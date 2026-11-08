import { Link, useNavigate, useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { type Beast } from "../../types/Beast";
import BeastAddModal from "./BeastiaryAddModal";
import * as beastsApi from "../../api/beasts";
import "../armoury/Armoury.css";
import { useState } from "react";


function BeastiaryDetailPage()
{
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data: beast,
        loading,
        error,
        setData: setBeast
    } = useFetch(() => beastsApi.getById(Number(id)), [id]);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    async function updateBeast(updated: Beast) {
        try {
            const saved = await beastsApi.update(updated.id, {
                name: updated.name,
                region: updated.region,
                description: updated.description,
                imageUrl: updated.imageUrl ?? "",
            });
            setBeast(saved);
            setShowModal(false);
            setSaveError(null);
        } catch (err) {
            setSaveError(
                err instanceof Error ? err.message : "Could not save the beast.",
            );
        }
    }

    async function deleteBeast() {
        if (!beast) return;
        try {
            await beastsApi.remove(beast.id);
            navigate("/beastiary");
        } catch (err) {
            setSaveError(
                err instanceof Error ? err.message : "Could not delete the beast.",
            );
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error || !beast) {
        return <p>{error ?? "Beast not found."}</p>;
    }

    return(
        <>
            <BeastAddModal
                show={showModal}
                setShow={setShowModal}
                editingBeast={beast}
                onUpdate={updateBeast}
            />
            <div className="parchment">
                <h2>{beast.name}</h2>
                {saveError && <p className="form-error">{saveError}</p>}
                <dl className="weapon-stats">
                    <dt>Region</dt> <dd>{beast.region}</dd>
                    <dt>Description</dt> <dd>{beast.description}</dd>
                </dl>
                {beast.imageUrl && (
                        <img className="beast-drawing" src={beast.imageUrl} alt={beast.name} />
                    )}
                <div className="detail-actions">
                    <Link className="btn" to="/beastiary">Back to beastiary</Link>
                    <button className="btn btn--danger" onClick={deleteBeast}>delete</button>
                    <button className="btn" onClick={() => setShowModal(true)}>Edit</button>
                </div>
            </div>
        </>
    );
}

export default BeastiaryDetailPage;