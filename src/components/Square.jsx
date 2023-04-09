export default function Square({ key, value, click, winnerObj, index }) {
  let style = {
    backgroundColor: "#7f8c8d",
    transition: "all 0.7s ease-in-out"
  };
  return (
    <>
      <button
        key={index}
        className="square"
        onClick={click}
        style={winnerObj.lines.includes(index) ? style : {}}
      >
        {value}
      </button>
    </>
  );
}
