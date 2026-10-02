import InstructionCard from "./InstructionCard.jsx";

export default function InstructionList({ title, items, isAdmin, onEdit, activeId, setActiveId }) {
  return (
    <section>
      <div className="list-heading">{title}</div>
      <div className="card-list">
        {items.map((ins) => (
          <div key={ins.id} id={`card-${ins.id}`} className={`card-slot${activeId === ins.id ? " is-active" : ""}`}>
            <InstructionCard
              ins={ins}
              isAdmin={isAdmin}
              onEdit={onEdit}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
