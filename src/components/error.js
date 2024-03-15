export const ErrorBox = (message) => {
    console.log(message)
  return (
    <div className="w-full my-1">
      <div className="w-full text-sm flex justify-center items-start rounded-ee-sm">
        <p className="w-full m-0 p-0 text-start text-red-600">{message.message}</p>
      </div>
    </div>
  );
};
