import {Link} from "react-router-dom";

const BottomWarning = ({label, buttonText, to}) => {
  return (
    <div className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        <Link className="cursor-pointer underline pl-1 text-indigo-700" to={to}>
          {buttonText}
        </Link>
    </div>
  )
}

export default BottomWarning