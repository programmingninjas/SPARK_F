import Navbar from "../../components/common/Navbar";

const ShapeDetection = () => {
  const handleDragStart = (e: any) => {
    e.dataTransfer.setData("text", e.target.id);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const realId = e.target.id;
    const id = e.dataTransfer.getData("text");
    if (realId[0] == id) {
      const draggableElement = document.getElementById(id);
      e.target.appendChild(draggableElement);
    }

  };
  return (
    <div className="grid place-items-center">
      <Navbar />

      <h1 className="text-2xl sm:text-4xl lg:text-6xl mb-8 font-semibold">
        <span className="gradient-text">Place all the shapes correctly</span>
      </h1>

      <div className="mb-32" style={{ display: "flex" }}>
        <div
          id="sCont"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "gray",
            margin:'30px'
          }}
        ></div>
        <div
          id="rCont"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            width: "150px",
            height: "80px",
            backgroundColor: "gray",
            margin:'30px'
          }}
        ></div>
        <div
          id="cCont"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "gray",
            margin:'30px',
            borderRadius:"100%"
          }}
        ></div>
      </div>

      <div style={{ display: "flex" }}>
        <div
        className="mr-12"
          id="s"
          draggable
          onDragStart={handleDragStart}
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "red",
          }}
        ></div>
        <div
        className="mr-12"
          id="r"
          draggable
          onDragStart={handleDragStart}
          style={{
            width: "150px",
            height: "80px",
            backgroundColor: "green",
          }}
        ></div>
        <div
        className="mr-12"
          id="c"
          draggable
          onDragStart={handleDragStart}
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "yellow",
            borderRadius:"100%"
          }}
        ></div>
      </div>
    </div>
  );
};

export default ShapeDetection;
