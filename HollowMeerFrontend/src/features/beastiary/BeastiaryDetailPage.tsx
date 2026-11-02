import { Link, useNavigate, useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import * as beastsApi from "../../api/beasts";
import "../armoury/Armoury.css";


function BeastiaryDetailPage()
{
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data: beast,
        loading,
        error,
    } = useFetch(() => beastsApi.getById(Number(id)), [id]);

    function onDelete() {
        if (beast) {
            beastsApi.deleteById(beast.id);
        }
        navigate("/beastiary");
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error || !beast) {
        return <p>{error ?? "Beast not found."}</p>;
    }

    return(
        <>

            <div className="parchment">
                <h2>{beast.name}</h2>
                <dl className="weapon-stats">
                    <dt>Region</dt> <dd>{beast.region}</dd>
                    <dt>Description</dt> <dd>{beast.description}</dd>
                </dl>
                {beast.imageUrl && (
                        <img className="beast-drawing" src={beast.imageUrl} alt={beast.name} />
                    )}
                <div className="detail-actions">
                    <Link className="btn" to="/beastiary">Back to beastiary</Link>
                    <button className="btn btn--danger" onClick={onDelete}>delete</button>
                </div>
            </div>
        </>
    );
}

export default BeastiaryDetailPage;