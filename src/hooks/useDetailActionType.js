const useDetailActionType = (id) => {
  const isNew = id === -1;
  const isEdit = !isNew;

  return {
    isNew,
    isEdit,
  };
};

export default useDetailActionType;
