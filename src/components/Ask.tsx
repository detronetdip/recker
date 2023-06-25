function Ask({ trigger }: { trigger: (x: number) => void }) {
  return (
    <>
      <div className="form">
        <h4>Add Data for</h4>
        <div className="btnrow">
          <button onClick={() => trigger(1)}>Today</button>
          <button onClick={() => trigger(2)}>Past day</button>
        </div>
      </div>
    </>
  );
}

export default Ask;
