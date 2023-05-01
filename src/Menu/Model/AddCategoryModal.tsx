function AddCategoryModal({title, open, onClose, children}) {
  const overlayClasses = open
    ? "fixed inset-0 bg-black opacity-50 z-10"
    : "hidden";

  const modalClasses = open
    ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-20"
    : "hidden";

  return (
    <>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={modalClasses}>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </>
  );
}

export default AddCategoryModal;
