/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, {useEffect, useRef, useState} from 'react';

const BarcodeReaderComponent = () => {
  const logMsgElement = useRef(null);
  const openButton = useRef(null);
  const closeButton = useRef(null);
  const barcodeDataText = useRef(null);
  const symbTypeText = useRef(null);
  const readTimeText = useRef(null);
  let defaultReader = null;
  let readerAutoClosed = false;
  let hidden, visibilityChange;

  const [isReaderOpened, setReaderOpened] = useState(false);

  useEffect(() => {
    // Function to handle visibility change
    const handleVisibilityChange = () => {
      if (document[hidden]) {
        closeBarcodeReader(true);
      } else {
        if (readerAutoClosed) {
          openBarcodeReader();
        }
      }
    };

    // Initial setup function
    const setup = () => {
      if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
      } else if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
      }

      if (
        hidden &&
        typeof document.addEventListener !== 'undefined' &&
        typeof document[hidden] !== 'undefined'
      ) {
        document.addEventListener(
          visibilityChange,
          handleVisibilityChange,
          false,
        );
      }

      openButton.current.addEventListener('click', openButtonClicked);
      closeButton.current.addEventListener('click', closeButtonClicked);
    };

    // Run setup on component mount
    setup();

    return () => {
      if (
        hidden &&
        typeof document.removeEventListener !== 'undefined' &&
        typeof document[hidden] !== 'undefined'
      ) {
        document.removeEventListener(
          visibilityChange,
          handleVisibilityChange,
          false,
        );
      }
    };
  }, []);

  const onBarcodeReaderComplete = result => {
    if (result.status === 0) {
      logMsgElement.current.innerHTML =
        '<b>Log:</b><br>BarcodeReader object successfully created';
      updateUI(true, true);

      defaultReader.setBuffered(
        'Symbology',
        'Code39',
        'Enable',
        'true',
        onSetBufferedComplete,
      );
      defaultReader.setBuffered(
        'Symbology',
        'Code128',
        'EnableCode128',
        'true',
        onSetBufferedComplete,
      );
      defaultReader.commitBuffer(onCommitComplete);

      defaultReader.addEventListener(
        'barcodedataready',
        onBarcodeDataReady,
        false,
      );
      window.addEventListener('beforeunload', onBeforeUnload);
    } else {
      defaultReader = null;
      logMsgElement.current.innerHTML += `<p style="color:red">Failed to create BarcodeReader, status: ${result.status}, message: ${result.message}</p>`;
      alert(`Failed to create BarcodeReader, ${result.message}`);
    }
  };

  const onSetBufferedComplete = result => {
    if (result.status !== 0) {
      logMsgElement.current.innerHTML += `<p style="color:red">setBuffered failed, status: ${result.status}, message: ${result.message}</p>`;
      logMsgElement.current.innerHTML += `<p>Family=${result.family} Key=${result.key} Option=${result.option}</p>`;
    }
  };

  const onCommitComplete = resultArray => {
    if (resultArray.length > 0) {
      resultArray.forEach(result => {
        if (result.status !== 0) {
          logMsgElement.current.innerHTML += `<p style="color:red">commitBuffer failed, status: ${result.status}, message: ${result.message}</p>`;
          if (
            result.method === 'getBuffered' ||
            result.method === 'setBuffered'
          ) {
            logMsgElement.current.innerHTML += `<p>Method=${result.method} Family=${result.family} Key=${result.key} Option=${result.option}</p>`;
          }
        }
      });
    }
  };

  const onBarcodeDataReady = (data, type, time) => {
    barcodeDataText.current.value = data;
    symbTypeText.current.value = type;
    readTimeText.current.value = time;
  };

  const updateUI = (readerOpened, clearData) => {
    openButton.current.disabled = readerOpened;
    closeButton.current.disabled = !readerOpened;
    setReaderOpened(readerOpened);
    if (clearData) {
      barcodeDataText.current.value = '';
      symbTypeText.current.value = '';
      readTimeText.current.value = '';
    }
  };

  const openBarcodeReader = () => {
    if (!defaultReader) {
      defaultReader = new BarcodeReader(null, onBarcodeReaderComplete);
    }
  };

  const closeBarcodeReader = isAutoClose => {
    if (defaultReader) {
      readerAutoClosed = isAutoClose;
      defaultReader.close(result => {
        if (result.status === 0) {
          logMsgElement.current.innerHTML +=
            '<p style="color:blue">BarcodeReader successfully closed.</p>';
          defaultReader = null;
          updateUI(false, false);
          window.removeEventListener('beforeunload', onBeforeUnload);
        } else {
          logMsgElement.current.innerHTML += `<p style="color:red">Failed to close BarcodeReader, status: ${result.status}, message: ${result.message}</p>`;
        }
      });
    }
  };

  const openButtonClicked = () => {
    openBarcodeReader();
  };

  const closeButtonClicked = () => {
    closeBarcodeReader(false);
  };

  const onBeforeUnload = e => {
    const message = 'Please close BarcodeReader before leaving this page.';
    (e || window.event).returnValue = message;
    return message;
  };

  return (
    <div>
      <button id="openButton" ref={openButton}>
        Open Reader
      </button>
      <button id="closeButton" ref={closeButton}>
        Close Reader
      </button>
      <div id="logMsg" ref={logMsgElement}></div>
      <input
        type="text"
        id="BarcodeData"
        ref={barcodeDataText}
        placeholder="Barcode Data"
        readOnly
      />
      <input
        type="text"
        id="SymbType"
        ref={symbTypeText}
        placeholder="Symbology Type"
        readOnly
      />
      <input
        type="text"
        id="ReadTime"
        ref={readTimeText}
        placeholder="Read Time"
        readOnly
      />
    </div>
  );
};

export default BarcodeReaderComponent;
