import MaintenanceDeletionModal from "./maintenanceDeletionModal";

export default function MaintenanceMethod({ data }) {
    return(
        <div className="w-full rounded-lg bg-transparent border border-black flex items-center justify-between my-1"> 
            <p className="ml-5">{data.maintenanceTypeName}</p>
            <MaintenanceDeletionModal id={data.id} />
        </div>
    )
}