import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CommonForm = ({
  action,
  formControls,
  btnType,
  isBtnDisabled,
  ButtonText,
  formData,
  setFormData,
  handleFileChange,
  setShowJobDialog,
  RefreshPage
}) => {

  const renderInput = (getControl) => {
    let content = null;
    switch (getControl.componentType) {
      case "input":
      default:
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              disabled={getControl.disabled}
              placeholder={getControl.placeholder}
              name={getControl.name}
              id={getControl.name}
              value={formData[getControl.name]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
              className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        );
        break;

      case "file":
        content = (
          <Label
            htmlFor={getControl.name}
            className="flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
          >
            <h2>{getControl.label}</h2>
            <Input onChange={handleFileChange} id={getControl.name} type="file" />
          </Label>
        );
        break;
    }
    return content;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (typeof action === "function") {
      await action();
    }

    if (typeof setShowJobDialog === "function") {
      setShowJobDialog(false);
    }

    if (typeof RefreshPage === "function") {
      RefreshPage();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formControls.map((control) => renderInput(control))}
      <div className="mt-6 w-full">
        <Button
          type={btnType || "submit"}
          className="disabled:opacity-50 flex h-11 items-center justify-center"
          disabled={isBtnDisabled}
        >
          {ButtonText}
        </Button>
      </div>
    </form>
  );
};

export default CommonForm;
