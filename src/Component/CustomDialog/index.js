function Dialog({ onDialog }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.1)',
      }}
      onClick={() => onDialog(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <h3 style={{ marginBottom: '20px' }}>Apa anda yakin akan menghapusnya?</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => onDialog(false)}
            style={{
              background: 'green',
              color: 'white',
              padding: '10px',
              marginRight: '15px',
              border: 'none',
              cursor: 'pointer',
              width: '65px',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              overflow: 'hidden',
            }}
          >
            No
          </button>
          <button
            onClick={() => onDialog(true)}
            style={{
              background: 'red',
              color: 'white',
              padding: '10px',
              marginLeft: '15px',
              border: 'none',
              cursor: 'pointer',
              width: '65px',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              overflow: 'hidden',
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dialog;
