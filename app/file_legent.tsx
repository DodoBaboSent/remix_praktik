export function FileLegend() {
  return (
    <>
      <div className="d-flex flex-column border rounded p-3 mt-2">
        <h4>Типы документов</h4>
        <p className="fw-bold m-0">lic = Лицензия</p>
        <p className="fw-bold m-0">leg = Документ (законодательные основы)</p>
        <p className="fw-bold m-0">cat = страница каталога</p>
        <p className="fw-bold m-0">pay = платные услуги</p>
        <p className="fw-bold m-0">raz = документы для секции "разное"</p>
        <p className="fw-bold m-0">nop = документы для секции "Непрофильные активы"</p>
      </div>
    </>
  );
}
