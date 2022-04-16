import { toast } from "react-toastify";

const ERROR = (txt) => {
  return toast.error(txt);
};
const SUCCESS = (txt) => {
  return toast.success(txt);
};
const WARNING = (txt) => {
  return toast.warning(txt);
};
const DEFAULT = (txt) => {
  return toast(txt);
};

export default { DEFAULT, SUCCESS, WARNING, ERROR };
