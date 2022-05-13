import ReactLoading from "react-loading";

export default function Spinner() {
  return (
    <div>
      <ReactLoading
        type="spinningBubbles"
        color="#276ee7"
        height="100px"
        width="100px"
      />
    </div>
  )
}
