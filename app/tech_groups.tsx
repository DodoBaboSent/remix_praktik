import { useState } from "react";

type TechProps = {
    techGroup: {id: string, name: string}[]
}

export function TechGroups(props: TechProps) {
    const [showGroups, setShowGroups] = useState(false)

  return (
    <>
      {showGroups ? (
        <>
          <div
            className="border rounded p-3 d-flex flex-row mt-2 hover-cursor"
            onClick={() => setShowGroups(false)}
          >
            <p className="fw-bold m-0">▼ Нажмите, чтобы скрыть список групп</p>
          </div>
          <h1>Группы</h1>
          <div className="d-flex flex-column p-3 border rounded">
            {props.techGroup.map((El) => {
              return (
                <>
                  <div
                    className="d-flex flex-row border-bottom panel-row"
                    key={El.id + "_div"}
                  >
                    <p
                      className="border-end p-2 m-0"
                      style={{ width: "400px" }}
                      key={El.id + "_id"}
                    >
                      {El.id}
                    </p>
                    <p
                      className="border-end p-2 m-0"
                      style={{ width: "400px" }}
                      key={El.id + "_name"}
                    >
                      {El.name}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div
            className="border rounded p-3 d-flex flex-row mt-2 hover-cursor"
            onClick={() => setShowGroups(true)}
          >
            <p className="fw-bold m-0">
              ▼ Нажмите, чтобы раскрыть список групп
            </p>
          </div>
        </>
      )}
    </>
  );
}
