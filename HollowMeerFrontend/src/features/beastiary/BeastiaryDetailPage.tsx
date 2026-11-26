import { Link, useNavigate, useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { type Beast } from "../../types/Beast";
import { type BeastData } from "../../api/beasts";
import BeastAddModal from "./BeastiaryAddModal";
import * as beastsApi from "../../api/beasts";
import "../armoury/Armoury.css";
import { useState } from "react";
import { useBeast } from "./useBeast";


function BeastiaryDetailPage()
{
    const { id } = useParams();
    const navigate = useNavigate();
    const {
            beast,
            loading,
            error,
            saveError,
            updateBeast,
            deleteBeast
        } = useBeast(Number(id));
    const [showModal, setShowModal] = useState(false);

   async function handleDelete() {
        const response = await deleteBeast();
        if (response) navigate("/beastiary");
    }
   
    async function handleUpdate(data: BeastData) {
        const response = await updateBeast(data);
        if (response) setShowModal(false);
        return response;
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
                onSave={handleUpdate}
            />
            <div className="parchment">
                <h2>{beast.name}</h2>
                {saveError && <p className="form-error">{saveError}</p>}
                <dl className="weapon-stats">
                    <dt>Region</dt> <dd>{beast.region.name}</dd>
                    <dt>Description</dt> <dd>{beast.description}</dd>
                </dl>
                {beast.imageUrl && (
                        <img className="beast-drawing" src={beast.imageUrl} alt={beast.name} />
                    )}
                <div className="detail-actions">
                    <Link className="btn" to="/beastiary">Back to beastiary</Link>
                    <button className="btn btn--danger" onClick={handleDelete}>delete</button>
                    <button className="btn" onClick={() => setShowModal(true)}>Edit</button>
                </div>
            </div>
        </>
    );
}

export default BeastiaryDetailPage;